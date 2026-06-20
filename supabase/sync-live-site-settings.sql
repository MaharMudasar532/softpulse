-- Sync site_settings from live site https://softpulse.org
insert into site_settings (key, value, updated_at) values
  ('logo_url', '/logo.jpeg', now()),
  ('site_name', 'SoftPulse', now()),
  ('hero_badge', 'Software House & IT Training Institute', now()),
  ('hero_title', 'We Build Digital Products
& Train the Next Generation', now()),
  ('hero_subtitle', 'From scalable web platforms to hands-on tech courses — we help startups ship faster and students build real skills in Sargodha, Pakistan.', now()),
  ('contact_email', 'info@softpulse.org', now()),
  ('contact_phone', '+92 347 8787881', now()),
  ('contact_address', '176-FF Al Rehman Trade Center, Sargodha, Pakistan', now()),
  ('website_url', 'https://softpulse.org', now()),
  ('stat_projects', '50+', now()),
  ('stat_clients', '500+', now()),
  ('stat_rating', '98%', now())
on conflict (key) do update set
  value = excluded.value,
  updated_at = excluded.updated_at;
