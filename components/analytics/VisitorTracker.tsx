"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_KEY = "sp_visitor_id";
const SESSION_KEY = "sp_session_id";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getStoredSessionId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return sessionStorage.getItem(SESSION_KEY) || undefined;
}

function setStoredSessionId(id: string) {
  sessionStorage.setItem(SESSION_KEY, id);
}

async function sendAnalytics(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics",
        new Blob([body], { type: "application/json" })
      );
      return;
    }
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Non-blocking analytics
  }
}

function VisitorTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageViewIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | undefined>(getStoredSessionId());
  const enteredAtRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullPath =
    searchParams.toString().length > 0
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

  function clearHeartbeat() {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }

  function sendLeave() {
    if (!pageViewIdRef.current || !sessionIdRef.current) return;
    const durationSeconds = Math.round(
      (Date.now() - enteredAtRef.current) / 1000
    );
    if (durationSeconds < 1) return;

    sendAnalytics({
      type: "leave",
      pageViewId: pageViewIdRef.current,
      sessionId: sessionIdRef.current,
      durationSeconds,
    });
  }

  function sendHeartbeat() {
    if (!pageViewIdRef.current || !sessionIdRef.current) return;
    const durationSeconds = Math.round(
      (Date.now() - enteredAtRef.current) / 1000
    );
    if (durationSeconds < 1) return;

    sendAnalytics({
      type: "heartbeat",
      pageViewId: pageViewIdRef.current,
      sessionId: sessionIdRef.current,
      durationSeconds,
    });
  }

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let cancelled = false;

    async function trackPage() {
      sendLeave();
      clearHeartbeat();
      enteredAtRef.current = Date.now();

      const visitorId = getVisitorId();
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pageview",
          visitorId,
          sessionId: sessionIdRef.current,
          path: fullPath,
          title: document.title,
          referrer: document.referrer || undefined,
        }),
      });

      if (!res.ok || cancelled) return;

      const data = (await res.json()) as {
        sessionId?: string;
        pageViewId?: string;
      };

      if (data.sessionId) {
        sessionIdRef.current = data.sessionId;
        setStoredSessionId(data.sessionId);
      }
      if (data.pageViewId) {
        pageViewIdRef.current = data.pageViewId;
      }

      heartbeatRef.current = setInterval(sendHeartbeat, 15000);
    }

    trackPage();

    return () => {
      cancelled = true;
      sendLeave();
      clearHeartbeat();
    };
  }, [fullPath, pathname]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        sendLeave();
      }
    }

    function onBeforeUnload() {
      sendLeave();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return null;
}

export function VisitorTracker() {
  return (
    <Suspense fallback={null}>
      <VisitorTrackerInner />
    </Suspense>
  );
}
