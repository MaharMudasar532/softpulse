"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Phone, BookOpen } from "lucide-react";
import { AdminContentLoader } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";
import type { CourseApplication } from "@/lib/types";

const statuses = ["pending", "reviewed", "accepted", "rejected"];

export function CourseApplicationsManager() {
  const [applications, setApplications] = useState<CourseApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const supabase = createClient();

  async function loadApplications() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("course_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setApplications(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function updateStatus(id: string, status: string) {
    if (!supabase) return;
    await supabase
      .from("course_applications")
      .update({ status })
      .eq("id", id);
    await loadApplications();
  }

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Delete this application?")) return;
    await supabase.from("course_applications").delete().eq("id", id);
    await loadApplications();
  }

  const filtered =
    filter === "all"
      ? applications
      : applications.filter((a) => a.status === filter);

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    reviewed: "bg-blue-50 text-blue-700",
    accepted: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  if (loading) {
    return <AdminContentLoader count={4} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <p className="text-muted text-sm">
          {applications.length} applications
          {filter !== "all" && ` (${filter})`}
        </p>
        <div className="flex gap-2">
          {["all", ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-muted hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-lg">{app.name}</h4>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {app.email}
                  </span>
                  {app.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      {app.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[app.status] || "bg-slate-100"}`}
                >
                  {app.status}
                </span>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {app.course_title}
              </span>
              <span className="text-xs text-muted">({app.course_slug})</span>
            </div>

            {app.message && (
              <p className="text-sm text-muted leading-relaxed mb-4 bg-slate-50 rounded-xl p-4">
                {app.message}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
              <span className="text-xs text-muted">
                Applied {new Date(app.created_at).toLocaleString()}
              </span>
              <select
                value={app.status}
                onChange={(e) => updateStatus(app.id, e.target.value)}
                className="text-sm px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-muted py-12">
            No applications{filter !== "all" ? ` with status "${filter}"` : ""} yet.
          </p>
        )}
      </div>
    </div>
  );
}
