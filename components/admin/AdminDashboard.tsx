"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  MessageSquare,
  Mail,
  LogOut,
  ExternalLink,
  Zap,
  ShoppingBag,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SiteSettingsManager } from "@/components/admin/SiteSettingsManager";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { FiverrPortfolioManager } from "@/components/admin/FiverrPortfolioManager";
import { CourseApplicationsManager } from "@/components/admin/CourseApplicationsManager";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { ContactMessagesManager } from "@/components/admin/ContactMessagesManager";
import { AnalyticsManager } from "@/components/admin/AnalyticsManager";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Visitor Analytics", icon: BarChart3 },
  { id: "settings", label: "Site Settings", icon: Settings },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "fiverr", label: "Fiverr Gigs", icon: ShoppingBag },
  { id: "applications", label: "Course Applications", icon: GraduationCap },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "messages", label: "Messages", icon: Mail },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function AdminDashboard({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">SoftPulse</div>
              <div className="text-xs text-slate-400">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-border px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <span className="text-sm text-muted">{userEmail}</span>
        </header>

        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold mb-4">Visitor snapshot</h2>
                <AnalyticsManager compact />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabs.slice(2).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="bg-white rounded-2xl border border-border p-6 text-left hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <tab.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-1">{tab.label}</h3>
                  <p className="text-sm text-muted">
                    {tab.id === "settings" && "Logo, hero text, contact info"}
                    {tab.id === "analytics" && "Visitors, pages, time on site"}
                    {tab.id === "portfolio" && "Manage portfolio projects"}
                    {tab.id === "fiverr" && "Fiverr gigs & services"}
                    {tab.id === "applications" && "Course enrollment requests"}
                    {tab.id === "testimonials" && "Client reviews & ratings"}
                    {tab.id === "messages" && "Contact form submissions"}
                  </p>
                </button>
              ))}
              </div>
            </div>
          )}
          {activeTab === "analytics" && <AnalyticsManager />}
          {activeTab === "settings" && <SiteSettingsManager />}
          {activeTab === "portfolio" && <PortfolioManager />}
          {activeTab === "fiverr" && <FiverrPortfolioManager />}
          {activeTab === "applications" && <CourseApplicationsManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "messages" && <ContactMessagesManager />}
        </div>
      </main>
    </div>
  );
}
