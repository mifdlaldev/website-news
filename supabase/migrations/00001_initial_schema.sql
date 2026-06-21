-- ============================================
-- Website News — Initial Schema
-- ============================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. TABLES

-- Users (extends Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  avatar_url text,
  role text not null default 'reader' check (role in ('admin', 'editor', 'author', 'reader')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

-- Tags
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Articles
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  author_id uuid not null references public.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  featured boolean not null default false,
  is_breaking boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Article-Tags (junction)
create table if not exists public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

-- Article Views (tracking)
create table if not exists public.article_views (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  ip_address text,
  viewed_at timestamptz not null default now()
);

-- Comments
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bookmarks
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  article_id uuid not null references public.articles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, article_id)
);

-- Newsletter Subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. INDEXES

-- Articles
create index if not exists idx_articles_published
  on public.articles(status, published_at desc) where status = 'published';
create index if not exists idx_articles_author on public.articles(author_id);
create index if not exists idx_articles_category on public.articles(category_id);

-- Full-Text Search
alter table public.articles add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('indonesian', coalesce(title, '')), 'a') ||
    setweight(to_tsvector('indonesian', coalesce(excerpt, '')), 'b') ||
    setweight(to_tsvector('indonesian', coalesce(content, '')), 'c')
  ) stored;
create index if not exists articles_fts_idx
  on public.articles using gin(search_vector);

-- Comments
create index if not exists idx_comments_article
  on public.comments(article_id, status, created_at desc);

-- Bookmarks
create index if not exists idx_bookmarks_user on public.bookmarks(user_id);

-- Views
create index if not exists idx_views_article on public.article_views(article_id);
create index if not exists idx_views_trending
  on public.article_views(article_id, viewed_at desc);

-- 4. ROW LEVEL SECURITY

alter table public.users enable row level security;
alter table public.articles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.comments enable row level security;
alter table public.bookmarks enable row level security;
alter table public.article_views enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Users: read own, update own
create policy "Users can read own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own data"
  on public.users for update
  using (auth.uid() = id);

-- Articles: published read all, drafts read own, write by author/admin
create policy "Anyone can read published articles"
  on public.articles for select
  using (status = 'published');

create policy "Authors can read own drafts"
  on public.articles for select
  using (auth.uid() = author_id);

create policy "Authors can create articles"
  on public.articles for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own articles"
  on public.articles for update
  using (auth.uid() = author_id);

create policy "Admins can manage all articles"
  on public.articles for all
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Categories: read all, write admin
create policy "Anyone can read categories"
  on public.categories for select
  using (true);

create policy "Admins can manage categories"
  on public.categories for all
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Tags: read all, write admin
create policy "Anyone can read tags"
  on public.tags for select
  using (true);

create policy "Admins can manage tags"
  on public.tags for all
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Comments: read approved, create authenticated, moderate admin
create policy "Anyone can read approved comments"
  on public.comments for select
  using (status = 'approved');

create policy "Authenticated users can create comments"
  on public.comments for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update own comments"
  on public.comments for update
  using (auth.uid() = user_id);

create policy "Admins can moderate all comments"
  on public.comments for all
  using (
    exists (select 1 from public.users where id = auth.uid() and role in ('admin', 'editor'))
  );

-- Bookmarks: own only
create policy "Users can manage own bookmarks"
  on public.bookmarks for all
  using (auth.uid() = user_id);

-- Views: insert all, read admin
create policy "Anyone can record views"
  on public.article_views for insert
  with check (true);

create policy "Admins can read views"
  on public.article_views for select
  using (
    exists (select 1 from public.users where id = auth.uid() and role in ('admin', 'editor'))
  );

-- 5. AUTO-CREATE USER PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
