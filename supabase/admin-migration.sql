-- Run this if you already applied the original schema.sql
-- Adds admin panel tables, policies, and storage

create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;

create policy "Public can read site settings"
  on site_settings for select using (true);

create policy "Admin manage site settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Admin CRUD on existing tables
drop policy if exists "Admin manage portfolio" on portfolio_items;
create policy "Admin manage portfolio"
  on portfolio_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin manage testimonials" on testimonials;
create policy "Admin manage testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin read contact submissions" on contact_submissions;
create policy "Admin read contact submissions"
  on contact_submissions for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin delete contact submissions" on contact_submissions;
create policy "Admin delete contact submissions"
  on contact_submissions for delete
  using (auth.role() = 'authenticated');

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public read site assets" on storage.objects;
create policy "Public read site assets"
  on storage.objects for select
  using (bucket_id = 'site-assets');

drop policy if exists "Admin upload site assets" on storage.objects;
create policy "Admin upload site assets"
  on storage.objects for insert
  with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');

drop policy if exists "Admin update site assets" on storage.objects;
create policy "Admin update site assets"
  on storage.objects for update
  using (bucket_id = 'site-assets' and auth.role() = 'authenticated');

drop policy if exists "Admin delete site assets" on storage.objects;
create policy "Admin delete site assets"
  on storage.objects for delete
  using (bucket_id = 'site-assets' and auth.role() = 'authenticated');

-- Seed site settings (from live site softpulse.org)
insert into site_settings (key, value) values
  ('logo_url', '/logo.jpeg'),
  ('site_name', 'SoftPulse'),
  ('hero_badge', 'Software House & IT Training Institute'),
  ('hero_title', 'We Build Digital Products
& Train the Next Generation'),
  ('hero_subtitle', 'From scalable web platforms to hands-on tech courses — we help startups ship faster and students build real skills in Sargodha, Pakistan.'),
  ('contact_email', 'info@softpulse.org'),
  ('contact_phone', '+92 347 8787881'),
  ('contact_address', '176-FF Al Rehman Trade Center, Sargodha, Pakistan'),
  ('website_url', 'https://softpulse.org'),
  ('stat_projects', '50+'),
  ('stat_clients', '500+'),
  ('stat_rating', '98%')
on conflict (key) do nothing;
