import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  rangeToDate,
  type AnalyticsRange,
  type AnalyticsStats,
} from "@/lib/analytics";

export async function GET(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const service = createServiceClient();
  if (!service) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const range = (searchParams.get("range") || "7d") as AnalyticsRange;
  const since = rangeToDate(range);
  const sinceIso = since?.toISOString();

  let sessionsQuery = service.from("analytics_sessions").select("*");
  let pageViewsQuery = service.from("analytics_page_views").select("*");
  let visitorsQuery = service.from("analytics_visitors").select("*");

  if (sinceIso) {
    sessionsQuery = sessionsQuery.gte("started_at", sinceIso);
    pageViewsQuery = pageViewsQuery.gte("entered_at", sinceIso);
    visitorsQuery = visitorsQuery.gte("last_seen_at", sinceIso);
  }

  const [
    { data: sessions },
    { data: pageViews },
    { data: visitors },
  ] = await Promise.all([
    sessionsQuery.order("started_at", { ascending: false }).limit(200),
    pageViewsQuery.order("entered_at", { ascending: false }).limit(2000),
    visitorsQuery,
  ]);

  const sessionList = sessions || [];
  const pageViewList = pageViews || [];
  const visitorList = visitors || [];

  const uniqueVisitors = visitorList.length;
  const totalSessions = sessionList.length;
  const totalPageViews = pageViewList.length;

  const sessionDurations = sessionList
    .map((s) => s.duration_seconds || 0)
    .filter((d) => d > 0);
  const avgSessionSeconds =
    sessionDurations.length > 0
      ? Math.round(
          sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
        )
      : 0;

  const pageDurations = pageViewList
    .map((p) => p.duration_seconds || 0)
    .filter((d) => d > 0);
  const avgTimeOnPageSeconds =
    pageDurations.length > 0
      ? Math.round(pageDurations.reduce((a, b) => a + b, 0) / pageDurations.length)
      : 0;

  const pageMap = new Map<
    string,
    { views: number; totalTimeSeconds: number }
  >();

  for (const view of pageViewList) {
    const current = pageMap.get(view.path) || { views: 0, totalTimeSeconds: 0 };
    current.views += 1;
    current.totalTimeSeconds += view.duration_seconds || 0;
    pageMap.set(view.path, current);
  }

  const topPages = Array.from(pageMap.entries())
    .map(([path, stats]) => ({
      path,
      views: stats.views,
      totalTimeSeconds: stats.totalTimeSeconds,
      avgTimeSeconds:
        stats.views > 0 ? Math.round(stats.totalTimeSeconds / stats.views) : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const referrerMap = new Map<string, number>();
  for (const session of sessionList) {
    const ref = session.referrer?.trim() || "Direct / None";
    const label =
      ref === "Direct / None"
        ? ref
        : (() => {
            try {
              return new URL(ref).hostname;
            } catch {
              return ref.slice(0, 80);
            }
          })();
    referrerMap.set(label, (referrerMap.get(label) || 0) + 1);
  }

  const topReferrers = Array.from(referrerMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const visitorDeviceMap = new Map(
    visitorList.map((v) => [v.id, v.device_type || "unknown"])
  );
  const visitorBrowserMap = new Map(
    visitorList.map((v) => [v.id, v.browser || "unknown"])
  );

  const deviceCounts = new Map<string, number>();
  for (const session of sessionList) {
    const device = visitorDeviceMap.get(session.visitor_id) || "unknown";
    deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1);
  }

  const deviceBreakdown = Array.from(deviceCounts.entries())
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  const pagesBySession = new Map<string, typeof pageViewList>();
  for (const view of pageViewList) {
    const list = pagesBySession.get(view.session_id) || [];
    list.push(view);
    pagesBySession.set(view.session_id, list);
  }

  const recentSessions = sessionList.slice(0, 15).map((session) => ({
    id: session.id,
    visitor_id: session.visitor_id,
    started_at: session.started_at,
    duration_seconds: session.duration_seconds || 0,
    landing_path: session.landing_path,
    referrer: session.referrer,
    page_count: session.page_count || 0,
    device_type: visitorDeviceMap.get(session.visitor_id) || null,
    browser: visitorBrowserMap.get(session.visitor_id) || null,
    pages: (pagesBySession.get(session.id) || [])
      .sort(
        (a, b) =>
          new Date(a.entered_at).getTime() - new Date(b.entered_at).getTime()
      )
      .map((p) => ({
        path: p.path,
        title: p.title,
        duration_seconds: p.duration_seconds || 0,
        entered_at: p.entered_at,
      })),
  }));

  const stats: AnalyticsStats = {
    range,
    visitors: uniqueVisitors,
    sessions: totalSessions,
    pageViews: totalPageViews,
    avgSessionSeconds,
    avgTimeOnPageSeconds,
    topPages,
    topReferrers,
    deviceBreakdown,
    recentSessions,
  };

  return NextResponse.json(stats);
}
