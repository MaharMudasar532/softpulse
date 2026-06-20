import {
  portfolioItems as staticPortfolio,
  testimonials as staticTestimonials,
} from "@/lib/data/static";
import {
  defaultSiteSettings,
  siteSettingKeys,
} from "@/lib/data/site-settings";
import { createStaticClient } from "@/lib/supabase/static";
import { createClient } from "@/lib/supabase/server";
import type { FiverrPortfolioItem, PortfolioItem, SiteSettings, Testimonial } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();

  if (!supabase) {
    return defaultSiteSettings;
  }

  const { data, error } = await supabase.from("site_settings").select("key, value");

  if (error || !data?.length) {
    return defaultSiteSettings;
  }

  const settings = { ...defaultSiteSettings };
  for (const row of data) {
    if (siteSettingKeys.includes(row.key as keyof SiteSettings)) {
      settings[row.key as keyof SiteSettings] = row.value;
    }
  }

  return settings;
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = await createClient();

  if (!supabase) {
    return staticPortfolio;
  }

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return staticPortfolio;
  }

  return data;
}

export async function getPortfolioItemBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const supabase = await createClient();

  if (!supabase) {
    const item = staticPortfolio.find((p) => p.slug === slug);
    return item || null;
  }

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getPortfolioSlugs(): Promise<string[]> {
  const supabase = createStaticClient();

  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from("portfolio_items")
    .select("slug")
    .not("slug", "is", null);

  return (data || []).map((r) => r.slug).filter(Boolean);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();

  if (!supabase) {
    return staticTestimonials;
  }

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return staticTestimonials;
  }

  return data;
}

export async function getFiverrPortfolioItems(): Promise<FiverrPortfolioItem[]> {
  const supabase = await createClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("fiverr_portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return [];
  }

  return data;
}
