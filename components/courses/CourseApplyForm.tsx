"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

export function CourseApplyForm({ courseSlug, courseTitle }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/course-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          course_slug: courseSlug,
          course_title: courseTitle,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
      <h3 className="text-xl font-bold mb-2">Apply for This Course</h3>
      <p className="text-muted text-sm mb-6">
        Fill out the form below and we&apos;ll get back to you within 24 hours
        with enrollment details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Tell us about your background or questions..."
          />
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 rounded-xl px-4 py-3 animate-fade-up">
            <CheckCircle className="w-4 h-4 shrink-0" />
            Application submitted! We&apos;ll contact you soon.
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:scale-[0.98]"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Apply Now
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
