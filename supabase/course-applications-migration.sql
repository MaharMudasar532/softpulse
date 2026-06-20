-- Course applications
create table if not exists course_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  course_slug text not null,
  course_title text not null,
  message text,
  status text not null default 'pending',
  created_at timestamptz default now()
);

alter table course_applications enable row level security;

drop policy if exists "Anyone can apply for courses" on course_applications;
create policy "Anyone can apply for courses"
  on course_applications for insert with check (true);

drop policy if exists "Admin read course applications" on course_applications;
create policy "Admin read course applications"
  on course_applications for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admin update course applications" on course_applications;
create policy "Admin update course applications"
  on course_applications for update
  using (auth.role() = 'authenticated');

drop policy if exists "Admin delete course applications" on course_applications;
create policy "Admin delete course applications"
  on course_applications for delete
  using (auth.role() = 'authenticated');
