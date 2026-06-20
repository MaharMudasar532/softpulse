-- Fiverr portfolio / gig showcase
create table if not exists fiverr_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null default 'Mobile App Development',
  image_url text,
  fiverr_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table fiverr_portfolio_items enable row level security;

drop policy if exists "Public read fiverr portfolio" on fiverr_portfolio_items;
create policy "Public read fiverr portfolio"
  on fiverr_portfolio_items for select using (true);

drop policy if exists "Admin manage fiverr portfolio" on fiverr_portfolio_items;
create policy "Admin manage fiverr portfolio"
  on fiverr_portfolio_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Seed Fiverr gigs / portfolio (update via /admin)
insert into fiverr_portfolio_items (title, description, category, image_url, fiverr_url, sort_order)
select * from (values
  (
    'React Native Mobile App Development',
    'Cross-platform iOS & Android apps with React Native — from MVP to App Store launch. GPS, maps, real-time features, and polished UI.',
    'React Native',
    '/portfolio/pacepal.jpg',
    'https://www.fiverr.com/developerpro532',
    1
  ),
  (
    'Flutter Mobile App for Android & iOS',
    'Beautiful native-feel apps built with Flutter. Custom UI, API integration, Firebase/Supabase backend, and store deployment.',
    'Flutter',
    '/portfolio/whenn.jpg',
    'https://www.fiverr.com/developerpro532',
    2
  ),
  (
    'E-commerce & Marketplace Mobile App',
    'Full-featured shopping apps with catalogs, cart, payments, promotions, and brand integrations — like SHOOF security marketplace.',
    'E-commerce',
    '/portfolio/shoof.jpg',
    'https://www.fiverr.com/developerpro532',
    3
  ),
  (
    'Mobile App Bug Fixes & Updates',
    'Fix crashes, improve performance, update dependencies, and add new features to your existing React Native or Flutter app.',
    'Maintenance',
    '/portfolio/wafaa-pro.jpg',
    'https://www.fiverr.com/developerpro532',
    4
  ),
  (
    'GPS, Maps & Location-Based Apps',
    'Real-time GPS tracking, map discovery, geofencing, and route history — built for fitness, delivery, and social apps like PacePal.',
    'Maps & GPS',
    '/portfolio/pacepal.jpg',
    'https://www.fiverr.com/developerpro532',
    5
  ),
  (
    'Fintech & Loyalty Wallet Apps',
    'Digital wallets, loyalty programs, merchant dashboards, and secure authentication with multi-language support.',
    'Fintech',
    '/portfolio/wafaa-pro.jpg',
    'https://www.fiverr.com/developerpro532',
    6
  )
) as v(title, description, category, image_url, fiverr_url, sort_order)
where not exists (select 1 from fiverr_portfolio_items limit 1);
