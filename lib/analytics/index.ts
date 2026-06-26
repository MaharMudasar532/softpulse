import { UAParser } from "ua-parser-js";

export type AnalyticsRange = "today" | "7d" | "30d" | "all";

export type AnalyticsPageviewPayload = {
  type: "pageview";
  visitorId: string;
  sessionId?: string;
  path: string;
  title: string;
  referrer?: string;
};

export type AnalyticsLeavePayload = {
  type: "leave";
  pageViewId: string;
  sessionId: string;
  durationSeconds: number;
};

export type AnalyticsHeartbeatPayload = {
  type: "heartbeat";
  pageViewId: string;
  sessionId: string;
  durationSeconds: number;
};

export type AnalyticsPayload =
  | AnalyticsPageviewPayload
  | AnalyticsLeavePayload
  | AnalyticsHeartbeatPayload;

export type AnalyticsStats = {
  range: AnalyticsRange;
  visitors: number;
  sessions: number;
  pageViews: number;
  avgSessionSeconds: number;
  avgTimeOnPageSeconds: number;
  topPages: Array<{
    path: string;
    views: number;
    totalTimeSeconds: number;
    avgTimeSeconds: number;
  }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
  recentSessions: Array<{
    id: string;
    visitor_id: string;
    started_at: string;
    duration_seconds: number;
    landing_path: string;
    referrer: string | null;
    page_count: number;
    device_type: string | null;
    browser: string | null;
    pages: Array<{
      path: string;
      title: string | null;
      duration_seconds: number;
      entered_at: string;
    }>;
  }>;
};

const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview|headless|lighthouse|pagespeed/i;

export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_PATTERN.test(userAgent);
}

export function parseClientInfo(userAgent: string | null) {
  if (!userAgent) {
    return { device_type: "unknown", browser: "unknown", os: "unknown" };
  }

  const parsed = new UAParser(userAgent).getResult();
  const deviceType = parsed.device.type || "desktop";
  const browser = parsed.browser.name
    ? `${parsed.browser.name}${parsed.browser.version ? ` ${parsed.browser.major}` : ""}`
    : "unknown";
  const os = parsed.os.name
    ? `${parsed.os.name}${parsed.os.version ? ` ${parsed.os.version}` : ""}`
    : "unknown";

  return {
    device_type: deviceType,
    browser,
    os,
  };
}

export function rangeToDate(range: AnalyticsRange): Date | null {
  const now = new Date();
  switch (range) {
    case "today": {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return start;
    }
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins > 0 ? `${hours}h ${remMins}m` : `${hours}h`;
}

export function sanitizePath(path: string): string {
  if (!path || typeof path !== "string") return "/";
  const trimmed = path.trim().slice(0, 500);
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export function isSessionExpired(lastActivityAt: string | Date): boolean {
  const last = new Date(lastActivityAt).getTime();
  return Date.now() - last > SESSION_TIMEOUT_MS;
}
