-- SoftPulse Supabase Schema (idempotent — safe to re-run)
-- Run via: npm run db:migrate

-- Portfolio items
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  image_url text,
  link text,
  created_at timestamptz default now()
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  company text not null,
  content text not null,
  avatar_url text,
  rating integer default 5 check (rating >= 1 and rating <= 5),
  created_at timestamptz default now()
);

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  service text,
  created_at timestamptz default now()
);

-- Site settings (key-value store for logo, hero text, contact info, etc.)
create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table portfolio_items enable row level security;
alter table testimonials enable row level security;
alter table contact_submissions enable row level security;
alter table site_settings enable row level security;

-- Public read access
drop policy if exists "Public can read portfolio" on portfolio_items;
create policy "Public can read portfolio"
  on portfolio_items for select using (true);

drop policy if exists "Public can read testimonials" on testimonials;
create policy "Public can read testimonials"
  on testimonials for select using (true);

drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings"
  on site_settings for select using (true);

-- Anyone can submit contact forms
drop policy if exists "Anyone can submit contact" on contact_submissions;
create policy "Anyone can submit contact"
  on contact_submissions for insert with check (true);

-- Authenticated admin: full CRUD on content tables
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

drop policy if exists "Admin manage site settings" on site_settings;
create policy "Admin manage site settings"
  on site_settings for all
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

-- Storage bucket for site assets (logo, images)
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

-- Seed sample portfolio data (skip if already seeded)
insert into portfolio_items (title, category, description)
select * from (values
  ('FinTrack Pro', 'Mobile App', 'Personal finance app with AI-powered insights and real-time budgeting.'),
  ('StyleHub Store', 'Shopify', 'Premium fashion e-commerce with custom checkout and loyalty program.'),
  ('HealthConnect', 'Web App', 'Telemedicine platform connecting patients with healthcare providers seamlessly.'),
  ('EduLearn Platform', 'Web App', 'Interactive learning management system with live classes and progress tracking.'),
  ('FoodDash', 'React Native', 'On-demand food delivery app with real-time tracking and multi-restaurant support.'),
  ('SmartHome Hub', 'AI Integration', 'IoT dashboard with AI-powered automation and voice control integration.')
) as v(title, category, description)
where not exists (select 1 from portfolio_items limit 1);

-- Seed sample testimonials (skip if already seeded)
insert into testimonials (name, role, company, content, rating)
select * from (values
  ('Sarah Mitchell', 'CEO', 'TechVentures Inc.', 'SoftPulse transformed our vision into a stunning mobile app. Their attention to detail and technical expertise exceeded our expectations. Highly recommended!', 5),
  ('James Rodriguez', 'Founder', 'ShopBright', 'Our Shopify store conversion rate increased by 40% after SoftPulse redesigned and optimized our entire e-commerce experience. Incredible team!', 5),
  ('Emily Chen', 'Product Manager', 'HealthFirst', 'Working with SoftPulse on our telemedicine platform was seamless. They delivered on time, communicated clearly, and the quality was outstanding.', 5)
) as v(name, role, company, content, rating)
where not exists (select 1 from testimonials limit 1);
