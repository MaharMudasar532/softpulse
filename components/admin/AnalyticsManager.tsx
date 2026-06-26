"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  Clock,
  Eye,
  Globe,
  Monitor,
  RefreshCw,
  Users,
} from "lucide-react";
import { AdminContentLoader } from "@/components/ui/Skeleton";
import { formatDuration, type AnalyticsRange, type AnalyticsStats } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ranges: { id: AnalyticsRange; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "all", label: "All time" },
];

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: typeof Users;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      {hint && <div className="text-xs text-muted mt-1">{hint}</div>}
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  suffix,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
}) {
  const width = max > 0 ? Math.max(8, Math.round((value / max) * 100)) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium truncate" title={label}>
          {label}
        </span>
        <span className="text-muted shrink-0">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full gradient-bg transition-all duration-500"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function AnalyticsManager({ compact = false }: { compact?: boolean }) {
  const [range, setRange] = useState<AnalyticsRange>("7d");
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/stats?range=${range}`);
      if (!res.ok) {
        throw new Error("Failed to load analytics");
      }
      const data = (await res.json()) as AnalyticsStats;
      setStats(data);
    } catch {
      setError(
        "Could not load visitor analytics. Run npm run db:migrate:analytics if tables are missing."
      );
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (loading) {
    return <AdminContentLoader count={compact ? 2 : 4} />;
  }

  if (error || !stats) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <BarChart3 className="w-10 h-10 text-muted mx-auto mb-4" />
        <p className="text-muted">{error || "No analytics data yet."}</p>
        <button
          onClick={loadStats}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const maxPageViews = stats.topPages[0]?.views || 1;
  const maxReferrers = stats.topReferrers[0]?.count || 1;
  const maxDevices = stats.deviceBreakdown[0]?.count || 1;

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Visitors" value={stats.visitors} icon={Users} />
          <StatCard label="Sessions" value={stats.sessions} icon={Globe} />
          <StatCard label="Page views" value={stats.pageViews} icon={Eye} />
          <StatCard
            label="Avg. time on page"
            value={formatDuration(stats.avgTimeOnPageSeconds)}
            icon={Clock}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-muted text-sm">
            First-party visitor tracking — pages viewed, time spent, referrers, and
            sessions. Admin routes are not tracked.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-border bg-white p-1">
            {ranges.map((item) => (
              <button
                key={item.id}
                onClick={() => setRange(item.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  range === item.id
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={loadStats}
            className="p-2 rounded-xl border border-border bg-white hover:bg-slate-50"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 text-muted" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="Unique visitors" value={stats.visitors} icon={Users} />
        <StatCard label="Sessions" value={stats.sessions} icon={Globe} />
        <StatCard label="Page views" value={stats.pageViews} icon={Eye} />
        <StatCard
          label="Avg. session length"
          value={formatDuration(stats.avgSessionSeconds)}
          hint={`Avg. on page: ${formatDuration(stats.avgTimeOnPageSeconds)}`}
          icon={Clock}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-1 flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            Top pages
          </h3>
          <p className="text-sm text-muted mb-6">Where visitors spend the most time</p>
          <div className="space-y-4">
            {stats.topPages.length === 0 ? (
              <p className="text-sm text-muted">No page views recorded yet.</p>
            ) : (
              stats.topPages.map((page) => (
                <BarRow
                  key={page.path}
                  label={page.path}
                  value={page.views}
                  max={maxPageViews}
                  suffix={`· ${formatDuration(page.avgTimeSeconds)} avg`}
                />
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Traffic sources
          </h3>
          <p className="text-sm text-muted mb-6">How visitors found your site</p>
          <div className="space-y-4">
            {stats.topReferrers.length === 0 ? (
              <p className="text-sm text-muted">No referrer data yet.</p>
            ) : (
              stats.topReferrers.map((ref) => (
                <BarRow
                  key={ref.referrer}
                  label={ref.referrer}
                  value={ref.count}
                  max={maxReferrers}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-1 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-primary" />
            Devices
          </h3>
          <p className="text-sm text-muted mb-6">Session breakdown by device type</p>
          <div className="space-y-4">
            {stats.deviceBreakdown.length === 0 ? (
              <p className="text-sm text-muted">No device data yet.</p>
            ) : (
              stats.deviceBreakdown.map((item) => (
                <BarRow
                  key={item.device}
                  label={item.device}
                  value={item.count}
                  max={maxDevices}
                />
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Recent sessions
          </h3>
          <p className="text-sm text-muted mb-6">
            Visitor journeys — pages visited and time spent
          </p>

          {stats.recentSessions.length === 0 ? (
            <p className="text-sm text-muted">No sessions recorded yet.</p>
          ) : (
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
              {stats.recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-border p-4 bg-slate-50/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="text-sm">
                      <span className="font-semibold">
                        {new Date(session.started_at).toLocaleString()}
                      </span>
                      <span className="text-muted">
                        {" "}
                        · {session.device_type || "unknown"} · {session.browser || "browser"}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-primary">
                      {formatDuration(session.duration_seconds)} total
                    </div>
                  </div>
                  <div className="text-xs text-muted mb-3">
                    Landing: {session.landing_path}
                    {session.referrer ? ` · from ${session.referrer}` : " · direct"}
                  </div>
                  <div className="space-y-2">
                    {session.pages.map((page, index) => (
                      <div
                        key={`${session.id}-${page.path}-${index}`}
                        className="flex items-center justify-between gap-3 text-sm bg-white rounded-lg px-3 py-2 border border-border/60"
                      >
                        <span className="truncate font-medium">{page.path}</span>
                        <span className="text-muted shrink-0">
                          {formatDuration(page.duration_seconds)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
