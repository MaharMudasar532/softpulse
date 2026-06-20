"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SiteSettings } from "@/lib/types";

export function CTA({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Get In Touch"
          title="Ready to Build Something Amazing?"
          description="Tell us about your project and we'll get back to you within 24 hours."
          light
        />

        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-2">
                Project Details
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2 text-green-300 text-sm">
                <CheckCircle className="w-4 h-4" />
                Message sent! We&apos;ll be in touch soon.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={status === "loading"}
              className="w-full"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <Send className="w-5 h-5" />
            </Button>
          </form>
          </div>

          <div className="lg:col-span-2 glass rounded-2xl p-8 space-y-6 text-blue-100">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p>{settings.contact_address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Phone / WhatsApp</p>
                  <a
                    href="https://wa.me/923478787881"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {settings.contact_phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.contact_email}
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-200/80 border-t border-white/10 pt-4">
              Free consultations available Monday – Friday, 9 AM – 6 PM EST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
