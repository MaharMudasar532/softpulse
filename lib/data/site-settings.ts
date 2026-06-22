import type { SiteSettings } from "@/lib/types";

export const defaultSiteSettings: SiteSettings = {
  logo_url: "/logo.jpeg",
  site_name: "SoftPulse",
  hero_badge: "Software House & IT Training Institute",
  hero_title: "We Build Digital Products\n& Train the Next Generation",
  hero_subtitle:
    "From scalable web platforms to hands-on tech courses — we help startups ship faster and students build real-world skills.",
  contact_email: "info@softpulse.org",
  contact_phone: "+92 347 8787881",
  contact_address: "176-FF Al Rehman Trade Center, Sargodha, Pakistan",
  website_url: "https://softpulse.org",
  stat_projects: "50+",
  stat_clients: "500+",
  stat_rating: "98%",
};

export const siteSettingKeys = Object.keys(
  defaultSiteSettings
) as (keyof SiteSettings)[];
