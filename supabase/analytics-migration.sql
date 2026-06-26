-- Visitor analytics (first-party, privacy-friendly)
-- Run via: npm run db:migrate:analytics

create table if not exists analytics_visitors (
  id text primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  user_agent text,
  device_type text,
  browser text,
  os text,
  visit_count integer not null default 1
);

create table if not exists analytics_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null references analytics_visitors(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  referrer text,
  landing_path text not null,
  page_count integer not null default 0,
  is_active boolean not null default true
);

create table if not exists analytics_page_views (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references analytics_sessions(id) on delete cascade,
  visitor_id text not null references analytics_visitors(id) on delete cascade,
  path text not null,
  title text,
  entered_at timestamptz not null default now(),
  left_at timestamptz,
  duration_seconds integer not null default 0
);

create index if not exists idx_analytics_sessions_started_at
  on analytics_sessions (started_at desc);

create index if not exists idx_analytics_sessions_visitor_id
  on analytics_sessions (visitor_id);

create index if not exists idx_analytics_page_views_path
  on analytics_page_views (path);

create index if not exists idx_analytics_page_views_entered_at
  on analytics_page_views (entered_at desc);

create index if not exists idx_analytics_page_views_session_id
  on analytics_page_views (session_id);

alter table analytics_visitors enable row level security;
alter table analytics_sessions enable row level security;
alter table analytics_page_views enable row level security;

drop policy if exists "Admin read analytics visitors" on analytics_visitors;
create policy "Admin read analytics visitors"
  on analytics_visitors for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin read analytics sessions" on analytics_sessions;
create policy "Admin read analytics sessions"
  on analytics_sessions for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin read analytics page views" on analytics_page_views;
create policy "Admin read analytics page views"
  on analytics_page_views for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin delete analytics visitors" on analytics_visitors;
create policy "Admin delete analytics visitors"
  on analytics_visitors for delete
  using (auth.role() = 'authenticated');

drop policy if exists "Admin delete analytics sessions" on analytics_sessions;
create policy "Admin delete analytics sessions"
  on analytics_sessions for delete
  using (auth.role() = 'authenticated');

drop policy if exists "Admin delete analytics page views" on analytics_page_views;
create policy "Admin delete analytics page views"
  on analytics_page_views for delete
  using (auth.role() = 'authenticated');
