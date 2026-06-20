-- Portfolio detail fields
alter table portfolio_items add column if not exists slug text unique;
alter table portfolio_items add column if not exists long_description text;
alter table portfolio_items add column if not exists features text[] default '{}';
alter table portfolio_items add column if not exists google_play_url text;
alter table portfolio_items add column if not exists apple_store_url text;
alter table portfolio_items add column if not exists website_url text;

-- Backfill website_url from link where missing
update portfolio_items set website_url = link where website_url is null and link is not null;
