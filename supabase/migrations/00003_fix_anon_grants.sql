-- ============================================
-- Fix: Grant table permissions to anon role
-- RLS policies need underlying table access to work
-- ============================================

-- Grant schema usage
grant usage on schema public to anon;
grant usage on schema public to authenticated;

-- Grant read access to all public tables
grant select on public.articles to anon;
grant select on public.categories to anon;
grant select on public.tags to anon;
grant select on public.users to anon;
grant select on public.article_tags to anon;
grant select on public.comments to anon;

-- Authenticated users need write access to certain tables
grant select, insert on public.comments to authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
grant insert on public.article_views to anon;
