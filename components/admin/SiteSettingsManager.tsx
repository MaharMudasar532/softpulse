"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Save, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";
import {
  defaultSiteSettings,
  siteSettingKeys,
} from "@/lib/data/site-settings";
import type { SiteSettings } from "@/lib/types";

const fieldLabels: Record<keyof SiteSettings, string> = {
  logo_url: "Logo URL",
  site_name: "Site Name",
  hero_badge: "Hero Badge Text",
  hero_title: "Hero Title",
  hero_subtitle: "Hero Subtitle",
  contact_email: "Contact Email",
  contact_phone: "Contact Phone",
  contact_address: "Contact Address",
  website_url: "Website URL",
  stat_projects: "Projects Stat",
  stat_clients: "Students Trained Stat",
  stat_rating: "Rating Stat",
};

const textareaFields: (keyof SiteSettings)[] = ["hero_title", "hero_subtitle"];

export function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function loadSettings() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.from("site_settings").select("key, value");

      if (data?.length) {
        const merged = { ...defaultSiteSettings };
        for (const row of data) {
          if (siteSettingKeys.includes(row.key as keyof SiteSettings)) {
            merged[row.key as keyof SiteSettings] = row.value;
          }
        }
        setSettings(merged);
      }

      setLoading(false);
    }

    loadSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setMessage("");

    const rows = siteSettingKeys.map((key) => ({
      key,
      value: settings[key],
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });

    setSaving(false);
    setMessage(error ? "Failed to save settings." : "Settings saved successfully!");
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;

    setUploading(true);
    setMessage("");

    const ext = file.name.split(".").pop();
    const path = `logo-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setMessage("Failed to upload logo.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    setSettings((prev) => ({ ...prev, logo_url: data.publicUrl }));
    setUploading(false);
    setMessage("Logo uploaded! Click Save to apply.");
  }

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white rounded-2xl border border-border p-6">
          <Skeleton className="h-5 w-16 mb-4" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6 grid md:grid-cols-2 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={i < 2 ? "md:col-span-2" : ""}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Logo</h3>
        <div className="flex items-center gap-6">
          {settings.logo_url && (
            <Image
              src={settings.logo_url}
              alt="Logo preview"
              width={64}
              height={64}
              className="w-16 h-16 rounded-xl object-cover border border-border"
            />
          )}
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-primary text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Logo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
            </label>
            <p className="text-xs text-muted mt-2">Or set a URL below</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 grid md:grid-cols-2 gap-6">
        {siteSettingKeys.map((key) => (
          <div
            key={key}
            className={textareaFields.includes(key) ? "md:col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2">
              {fieldLabels[key]}
            </label>
            {textareaFields.includes(key) ? (
              <textarea
                value={settings[key]}
                onChange={(e) =>
                  setSettings({ ...settings, [key]: e.target.value })
                }
                rows={key === "hero_title" ? 3 : 2}
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            ) : (
              <input
                type="text"
                value={settings[key]}
                onChange={(e) =>
                  setSettings({ ...settings, [key]: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>
        ))}
      </div>

      {message && (
        <p
          className={`text-sm ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        Save Settings
      </button>
    </form>
  );
}
