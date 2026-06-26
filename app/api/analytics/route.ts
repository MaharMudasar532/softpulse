import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  isBotUserAgent,
  isSessionExpired,
  parseClientInfo,
  sanitizePath,
  type AnalyticsPayload,
} from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get("user-agent");

    if (isBotUserAgent(userAgent)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    const supabase = createServiceClient();
    if (!supabase) {
      return NextResponse.json({ ok: true, skipped: "no-db" });
    }

    const body = (await request.json()) as AnalyticsPayload;

    if (body.type === "pageview") {
      return handlePageview(supabase, body, userAgent);
    }

    if (body.type === "leave") {
      return handleLeave(supabase, body);
    }

    if (body.type === "heartbeat") {
      return handleHeartbeat(supabase, body);
    }

    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ ok: true });
  }
}

type ServiceClient = NonNullable<ReturnType<typeof createServiceClient>>;

async function handlePageview(
  supabase: ServiceClient,
  body: Extract<AnalyticsPayload, { type: "pageview" }>,
  userAgent: string | null
) {
  const visitorId = body.visitorId?.slice(0, 64);
  if (!visitorId) {
    return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
  }

  const path = sanitizePath(body.path);
  const title = body.title?.slice(0, 200) || path;
  const referrer = body.referrer?.slice(0, 500) || null;
  const client = parseClientInfo(userAgent);

  const { data: existingVisitor } = await supabase
    .from("analytics_visitors")
    .select("id, visit_count")
    .eq("id", visitorId)
    .maybeSingle();

  if (existingVisitor) {
    await supabase
      .from("analytics_visitors")
      .update({
        last_seen_at: new Date().toISOString(),
        visit_count: (existingVisitor.visit_count || 0) + 1,
        user_agent: userAgent,
        ...client,
      })
      .eq("id", visitorId);
  } else {
    await supabase.from("analytics_visitors").insert({
      id: visitorId,
      user_agent: userAgent,
      ...client,
    });
  }

  let sessionId = body.sessionId;
  let reuseSession = false;

  if (sessionId) {
    const { data: session } = await supabase
      .from("analytics_sessions")
      .select("id, ended_at, started_at")
      .eq("id", sessionId)
      .eq("visitor_id", visitorId)
      .maybeSingle();

    if (session && !isSessionExpired(session.ended_at || session.started_at)) {
      reuseSession = true;
    } else {
      sessionId = undefined;
    }
  }

  if (!sessionId || !reuseSession) {
    const { data: newSession, error } = await supabase
      .from("analytics_sessions")
      .insert({
        visitor_id: visitorId,
        referrer,
        landing_path: path,
        page_count: 1,
      })
      .select("id")
      .single();

    if (error || !newSession) {
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    sessionId = newSession.id;
  } else {
    const { data: session } = await supabase
      .from("analytics_sessions")
      .select("page_count")
      .eq("id", sessionId)
      .single();

    await supabase
      .from("analytics_sessions")
      .update({
        ended_at: new Date().toISOString(),
        page_count: (session?.page_count || 0) + 1,
        is_active: true,
      })
      .eq("id", sessionId);
  }

  const { data: pageView, error: pageViewError } = await supabase
    .from("analytics_page_views")
    .insert({
      session_id: sessionId,
      visitor_id: visitorId,
      path,
      title,
    })
    .select("id")
    .single();

  if (pageViewError || !pageView) {
    return NextResponse.json({ error: "Failed to record page view" }, { status: 500 });
  }

  return NextResponse.json({
    sessionId,
    pageViewId: pageView.id,
  });
}

async function handleLeave(
  supabase: ServiceClient,
  body: Extract<AnalyticsPayload, { type: "leave" }>
) {
  const duration = Math.min(Math.max(0, Math.round(body.durationSeconds)), 86400);

  await supabase
    .from("analytics_page_views")
    .update({
      duration_seconds: duration,
      left_at: new Date().toISOString(),
    })
    .eq("id", body.pageViewId);

  const { data: session } = await supabase
    .from("analytics_sessions")
    .select("started_at")
    .eq("id", body.sessionId)
    .maybeSingle();

  const sessionDuration = session
    ? Math.min(
        86400,
        Math.round((Date.now() - new Date(session.started_at).getTime()) / 1000)
      )
    : duration;

  await supabase
    .from("analytics_sessions")
    .update({
      duration_seconds: sessionDuration,
      ended_at: new Date().toISOString(),
      is_active: false,
    })
    .eq("id", body.sessionId);

  return NextResponse.json({ ok: true });
}

async function handleHeartbeat(
  supabase: ServiceClient,
  body: Extract<AnalyticsPayload, { type: "heartbeat" }>
) {
  const duration = Math.min(Math.max(0, Math.round(body.durationSeconds)), 86400);

  await supabase
    .from("analytics_page_views")
    .update({ duration_seconds: duration })
    .eq("id", body.pageViewId);

  const { data: session } = await supabase
    .from("analytics_sessions")
    .select("started_at")
    .eq("id", body.sessionId)
    .maybeSingle();

  const sessionDuration = session
    ? Math.min(
        86400,
        Math.round((Date.now() - new Date(session.started_at).getTime()) / 1000)
      )
    : duration;

  await supabase
    .from("analytics_sessions")
    .update({
      duration_seconds: sessionDuration,
      ended_at: new Date().toISOString(),
      is_active: true,
    })
    .eq("id", body.sessionId);

  return NextResponse.json({ ok: true });
}
