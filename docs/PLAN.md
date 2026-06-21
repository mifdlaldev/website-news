# PLAN.md — Website News Project Plan v1.0

> **Enterprise-grade plan.** Output dari WORKFLOWS/02-plan-project.md.
> Setelah approve, handoff ke `/start-work` untuk build.

---

## 🎯 Visi

Portal berita digital dengan fokus pada readability, performa, SEO, dan fitur lengkap — multi-author, komentar real-time, bookmark, trending, search, RSS, analytics dashboard, dan monetisasi Google AdSense. Gratis 100%.

---

## 👥 Target User

- **Primer**: Pembaca berita Indonesia (18-50 tahun), pencari informasi harian
- **Sekunder**: Pembaca global (English content)
- **Pain point**: Website berita Indonesia kebanyakan lambat, penuh iklan mengganggu, UX buruk

---

## 📦 Scope

### ✅ In Scope

| Fitur | Prioritas | Detail |
|---|---|---|
| **Artikel & Blog** | P0 | CRUD artikel, WYSIWYG editor (Tiptap), cover image, excerpt, slug otomatis |
| **Multi-author / Role** | P0 | Admin, editor, author, reader — permission berbeda |
| **Categories & Tags** | P0 | Hierarki kategori, tag bebas, filter artikel |
| **Search** | P0 | PostgreSQL Full-Text Search |
| **Comments** | P0 | Real-time via Supabase Realtime, moderated |
| **Bookmark** | P0 | User login bisa bookmark artikel |
| **Trending / Popular** | P0 | Berdasarkan views 7 hari (Redis cache) |
| **Image Gallery** | P1 | Multiple gambar per artikel, lightbox viewer |
| **Related Articles** | P1 | Berdasarkan kategori + tag yang sama |
| **RSS Feed** | P0 | Feed per kategori + global |
| **Analytics Dashboard** | P1 | Views, traffic, popular posts (Recharts) |
| **Newsletter** | P2 | Subscribe email, digest via QStash |
| **Dark Mode** | P1 | Toggle dark/light, persist |
| **Responsive** | P0 | Mobile-first, 5 breakpoint |
| **SEO** | P0 | Sitemap, meta tags, Open Graph, JSON-LD |
| **Monetisasi** | P2 | Google AdSense |

### ❌ Out of Scope (Fase 2)
PWA, Mobile App, Multi-language full, Paywall, AI-generated content

---

## 🛠️ Tech Stack (Final)

| Layer | Pilihan |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Icons** | Lucide React |
| **Animation** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Editor** | Tiptap (WYSIWYG) |
| **Database** | Supabase (PostgreSQL) |
| **Search** | PostgreSQL Full-Text Search (built-in) |
| **Auth** | Supabase Auth (email + Google OAuth) |
| **Storage** | Supabase Storage (AVIF/WebP transform) |
| **Realtime** | Supabase Realtime (komentar) |
| **Cache** | Upstash Redis |
| **Rate Limit** | Upstash Ratelimit |
| **Queue** | Upstash QStash |
| **Font** | next/font (self-hosted) |
| **Images** | sharp + next/image |
| **Deploy** | Vercel |
| **CI/CD** | GitHub Actions |
| **CDN + DNS** | Cloudflare |
| **Bot Protection** | Cloudflare Turnstile |
| **Analytics** | GA4 + Microsoft Clarity |
| **Error Tracking** | Sentry |
| **Monetisasi** | Google AdSense |
| **Tag Manager** | Google Tag Manager |

### Fonts (via next/font)
- **Headlines**: Playfair Display (serif, variable)
- **Body Artikel**: Source Serif 4 (serif, variable)
- **UI / Navigation**: Inter (sans-serif, variable)
- **Meta / Code**: JetBrains Mono (monospace, variable)

---

## 🗄️ Database Schema

### Entity Relationship
```
users ──1:N──▶ articles
users ──1:N──▶ comments
users ──1:N──▶ bookmarks
users ──1:N──▶ article_views
categories ──1:N──▶ articles
articles ──N:M──▶ tags (via article_tags)
```

### Tables

**users**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| email | text | UNIQUE, NOT NULL |
| name | text | NOT NULL |
| avatar_url | text | NULLABLE |
| role | text | NOT NULL, default 'reader' |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

*Note: password_hash & auth handled by Supabase Auth*

**categories**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| name | text | NOT NULL |
| slug | text | UNIQUE, NOT NULL |
| description | text | NULLABLE |

**tags**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| name | text | NOT NULL |
| slug | text | UNIQUE, NOT NULL |

**articles**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| title | text | NOT NULL |
| slug | text | UNIQUE, NOT NULL |
| excerpt | text | NOT NULL |
| content | text | NOT NULL (HTML from Tiptap) |
| cover_image | text | NULLABLE |
| status | text | NOT NULL, default 'draft' |
| author_id | UUID | FK → users |
| category_id | UUID | FK → categories, NULLABLE |
| featured | boolean | default false |
| is_breaking | boolean | default false |
| published_at | timestamptz | NULLABLE |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

**article_tags** (junction)
| Column | Type |
|---|---|
| article_id | UUID (FK → articles, CASCADE) |
| tag_id | UUID (FK → tags, CASCADE) |
| PK | (article_id, tag_id) |

**article_views**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| article_id | UUID | FK → articles |
| user_id | UUID | FK → users, NULLABLE |
| ip_address | text | NULLABLE |
| viewed_at | timestamptz | NOT NULL |

**comments**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| article_id | UUID | FK → articles |
| user_id | UUID | FK → users |
| content | text | NOT NULL |
| status | text | NOT NULL, default 'pending' |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

**bookmarks**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → users |
| article_id | UUID | FK → articles |
| created_at | timestamptz | NOT NULL |
| UNIQUE | (user_id, article_id) | |

**newsletter_subscribers**
| Column | Type | Constraint |
|---|---|---|
| id | UUID | PK |
| email | text | UNIQUE, NOT NULL |
| subscribed | boolean | default true |
| created_at | timestamptz | NOT NULL |

### Indexes

```sql
-- Performance
CREATE INDEX idx_articles_published ON articles(status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_comments_article ON comments(article_id, status, created_at DESC);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_views_article ON article_views(article_id);

-- Full-Text Search
ALTER TABLE articles ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('indonesian', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('indonesian', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('indonesian', coalesce(content, '')), 'C')
  ) STORED;
CREATE INDEX articles_fts_idx ON articles USING GIN(search_vector);
```

### Row Level Security (RLS)
- `articles`: SELECT for all, INSERT/UPDATE by author/admin only
- `comments`: SELECT for all, INSERT by authenticated, MODERATE by admin
- `bookmarks`: SELECT/INSERT/DELETE by own user only
- `article_views`: INSERT for all, SELECT for admin only
- `profiles`: SELECT by all, UPDATE by own user

---

## 🔌 API Endpoints

### Public
```
GET  /api/articles?page=&limit=&category=&tag=&sort=
GET  /api/articles/[slug]
GET  /api/articles/search?q=&category=&page=
GET  /api/articles/trending
GET  /api/categories
GET  /api/tags
GET  /api/comments?article_id=&page=
GET  /api/rss
GET  /api/rss/category/[slug]
```

### Auth (Supabase Auth)
```
POST /api/auth/register → { email, password, name }
POST /api/auth/login    → { email, password }
POST /api/auth/logout
GET  /api/auth/me       → { user }
POST /api/auth/oauth/google
```

### Protected (user login)
```
POST   /api/bookmarks              → { article_id }
DELETE /api/bookmarks/[id]
GET    /api/bookmarks?page=1

POST   /api/comments              → { article_id, content }
PUT    /api/comments/[id]         → { content }
DELETE /api/comments/[id]
```

### Admin/Editor
```
POST   /api/admin/articles
PUT    /api/admin/articles/[id]
DELETE /api/admin/articles/[id]
PATCH  /api/admin/articles/[id]/status
GET    /api/admin/articles?status=&page=

POST   /api/admin/categories
PUT    /api/admin/categories/[id]
DELETE /api/admin/categories/[id]

POST   /api/admin/tags
PUT    /api/admin/tags/[id]
DELETE /api/admin/tags/[id]

GET    /api/admin/users
PATCH  /api/admin/users/[id]/role

GET    /api/admin/comments?status=pending
PATCH  /api/admin/comments/[id]/status

GET    /api/admin/analytics/dashboard
```

### Response Format
```typescript
// Success:          { data: T }
// List (paginated): { data: T[], meta: { page, limit, total, total_pages } }
// Error:            { error: { code: string, message: string, details?: object } }
```

### HTTP Status Codes
200 Success | 201 Created | 400 Bad Request | 401 Unauthorized | 403 Forbidden | 404 Not Found | 409 Conflict | 429 Rate Limited | 500 Server Error

---

## 🏗️ Architecture

### Rendering Strategy
| Halaman | Strategy | Alasan |
|---|---|---|
| Homepage | SSG + ISR (60s) | Static, revalidate periodik |
| Artikel detail | SSG + ISR (60s) | SEO kritis |
| Kategori / Tag | SSG + ISR (300s) | Jarang berubah |
| Search | SSR | Real-time query |
| Trending | SSR + Redis cache (5m) | Data agregasi |
| Admin dashboard | SSR | Login required |
| Artikel draft | SSR | Hanya author/editor |

### Data Flow: Baca Artikel
```
[Click link] → next/link prefetch
  → GET /api/articles/[slug]
  → Cek Redis cache (hit → return)
  → Query PostgreSQL (miss → populate cache)
  → Increment views (async, fire-and-forget)
  → Return article + related + comments
```

### Data Flow: Tulis Komentar
```
[Submit form] → Zod validation (client + server)
  → Rate limit check (Upstash)
  → INSERT comments (status: pending)
  → Supabase Realtime → admin notification
  → Admin approve → UPDATE status
  → Realtime broadcast → comment appears
```

---

## 🔒 Security

- [ ] HTTPS enforced (Vercel + Cloudflare)
- [ ] CSP header configured
- [ ] CORS whitelist (own domain only)
- [ ] Rate limiting (auth: 5/15min, API: 100/1min)
- [ ] Input validation server-side (Zod)
- [ ] Parameterized queries (Supabase)
- [ ] Supabase Auth (httpOnly cookie, secure, sameSite)
- [ ] RLS enabled on all tables
- [ ] Cloudflare Turnstile (public forms)
- [ ] Sentry error tracking
- [ ] Secrets: .env in .gitignore

---

## 🧪 Testing

| Layer | Tool | Target |
|---|---|---|
| Unit | Vitest | ≥ 80% line |
| Component | Vitest + Testing Library | Critical components |
| API | Vitest + Supertest | All endpoints |
| E2E | Playwright | 5 critical flows |
| A11y | @axe-core/react | Per page |

**Critical E2E Flows:**
1. Baca artikel → lihat komentar → bookmark
2. Register → login → tulis komentar
3. Admin → buat artikel → publish
4. Search → filter by kategori
5. RSS feed valid

---

## 🚀 Deployment

| Environment | Platform | Branch | Trigger |
|---|---|---|---|
| Production | Vercel | main | Manual via GitHub |
| Preview | Vercel | feat/* | Auto per PR |

**CI/CD:**
```
Push → ESLint → tsc --noEmit → vitest run → pnpm build → Deploy Vercel
```

---

## 📁 Route Structure

```
src/
├── app/
│   ├── layout.tsx                    -- Root layout (fonts, metadata, providers)
│   ├── page.tsx                      -- Homepage (featured + latest + trending)
│   ├── artikel/[slug]/page.tsx       -- Artikel detail
│   ├── kategori/[slug]/page.tsx      -- Artikel per kategori
│   ├── tag/[slug]/page.tsx           -- Artikel per tag
│   ├── search/page.tsx               -- Search page
│   ├── trending/page.tsx             -- Trending all
│   ├── auth/   (login, register, callback)
│   ├── bookmark/page.tsx             -- User bookmark list
│   ├── profile/page.tsx              -- User profile
│   ├── admin/
│   │   ├── page.tsx                  -- Dashboard analytics
│   │   ├── articles/  (list, baru, edit)
│   │   ├── categories/
│   │   ├── tags/
│   │   ├── comments/                 -- Moderation
│   │   └── users/                    -- Manage users
│   ├── api/  (all endpoints as above)
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/          -- shadcn/ui
│   ├── layout/      -- Header, Footer, Sidebar
│   ├── articles/    -- ArticleCard, FeaturedHero
│   ├── comments/    -- CommentList, CommentForm
│   ├── search/      -- SearchBar, SearchResults
│   ├── admin/       -- Sidebar, AnalyticsChart
│   └── shared/      -- Loading, Empty, Error states
├── lib/
│   ├── supabase/    -- client, server, admin
│   ├── redis.ts     -- Upstash client
│   ├── ratelimit.ts -- Rate limit config
│   └── utils.ts     -- cn(), formatDate(), dll
├── types/           -- TypeScript types
└── proxy.ts    -- Auth + rate limit (Next.js 16: middleware → proxy)
```

---

## 📦 Prioritas Build

### Phase 1 — Foundation (P0)
1. Init project (Next.js + Tailwind + shadcn/ui + fonts)
2. Setup Supabase (project, DB, Auth, Storage)
3. Setup Upstash (Redis, Ratelimit)
4. Layout (Header, Footer, Root layout)
5. Database schema + migrations + RLS
6. Auth (register, login, logout, OAuth)
7. Articles CRUD (admin panel + public view)
8. Homepage (featured + latest articles)
9. Categories & Tags
10. Artikel detail page (with SEO meta)

### Phase 2 — Engagement (P1)
11. Search (PostgreSQL FTS)
12. Comments (create + moderation + realtime)
13. Bookmark (add, remove, list)
14. Trending (views tracking + Redis cache)
15. Related articles
16. RSS Feed
17. Dark mode
18. Image gallery in articles

### Phase 3 — Advanced (P2)
19. Analytics dashboard (Recharts)
20. Newsletter subscription (QStash)
21. Google AdSense integration
22. Google Analytics + Clarity setup
23. Sentry error tracking
24. Performance optimization & lighthouse audit

---

## 📊 Success Metrics

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | ≤ 2.5s |
| FCP | ≤ 1.8s |
| CLS | ≤ 0.1 |
| Bundle JS initial | ≤ 200KB gzipped |
| Error rate (Sentry) | < 0.1% |

---

> **Plan by:** Sisyphus (OpenCode AI)
> **Last updated:** 2026-06-21
