# Website News — Project Context for AI v1.0

> **File ini dibaca otomatis oleh OpenCode setiap kali kerja di project ini.**
> Berisi semua konteks project yang sudah disepakati.

---

## 🎯 Project Overview

| Field | Value |
|---|---|
| **Nama Project** | Website News |
| **Tipe** | Web app — Portal Berita / News Website |
| **Tujuan** | Portal berita dengan fitur lengkap: multi-author, komentar, bookmark, trending, RSS, analitik, dan monetisasi |
| **Target User** | Pembaca berita Indonesia & global, pencari informasi harian |
| **Vibe / Design Direction** | Editorial Premium — clean, typography-first, authoritative |
| **Bahasa** | Kode: English. UI: Bahasa Indonesia. Konten: Indonesia + English |
| **Stage** | Planning |
| **Owner** | Personal project |
| **Last updated** | 2026-06-21 |

**Penjelasan singkat:**
> Portal berita digital dengan fokus pada readability, performa, dan SEO. Menggunakan Next.js + Supabase + Tailwind CSS. Fitur: artikel multi-author, komentar real-time, bookmark, trending, search (PostgreSQL FTS), RSS feed, dashboard analytics, dan monetisasi Google AdSense.

---

## 🛠 Tech Stack (Final — Sudah Disepakati)

### Core
- **Language**: TypeScript (strict)
- **Runtime**: Node.js 22
- **Framework**: Next.js 16 (App Router)
- **Package Manager**: pnpm

### Frontend
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **UI Components**: shadcn/ui (Radix primitives)
- **Icons**: Lucide React (SVG — NO EMOJI)
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Rich Text Editor**: Tiptap (WYSIWYG untuk penulis artikel)

### Fonts (via next/font, self-hosted)
- **Headlines**: Playfair Display (serif, variable)
- **Body Artikel**: Source Serif 4 (serif, variable)
- **UI / Navigation**: Inter (sans-serif, variable)
- **Meta / Code**: JetBrains Mono (monospace, variable)

### Database & Backend
- **Database**: Supabase (PostgreSQL)
- **Search**: PostgreSQL Full-Text Search (built-in Supabase — gratis total)
- **Auth**: Supabase Auth (email + Google OAuth)
- **Storage**: Supabase Storage (gambar artikel, avatar)
- **Realtime**: Supabase Realtime (komentar)
- **Cache**: Upstash Redis
- **Rate Limiting**: Upstash Ratelimit
- **Job Queue**: Upstash QStash (newsletter, image processing)

### DevOps & Deployment
- **Hosting**: Vercel (production)
- **CI/CD**: GitHub Actions (lint → type check → test → build → deploy)
- **Domain & CDN**: Cloudflare (DNS + CDN + DDoS protection)
- **Bot Protection**: Cloudflare Turnstile (pengganti reCAPTCHA)

### Monitoring & Analytics
- **Error Tracking**: Sentry (free tier)
- **Web Analytics**: Google Analytics 4 (via @next/third-parties)
- **Session Replay & Heatmaps**: Microsoft Clarity (100% gratis, unlimited)
- **Tag Management**: Google Tag Manager (via @next/third-parties)
- **SEO**: Google Search Console
- **Monetisasi**: Google AdSense

### Package Lengkap

**Production dependencies:**
```
next, react, react-dom
@supabase/supabase-js, @supabase/ssr
@upstash/redis, @upstash/ratelimit, @upstash/qstash
@tiptap/react, @tiptap/starter-kit, @tiptap/extension-image
@tiptap/extension-link, @tiptap/extension-placeholder
react-hook-form, @hookform/resolvers, zod
framer-motion
date-fns
lucide-react
recharts
next-sitemap
feed
@next/third-parties
@sentry/nextjs
@microsoft/clarity
@turnstile/turnstile
sharp
posthog-js (dihapus — cukup GA4 + Clarity)
```

**Development dependencies:**
```
typescript, @types/node, @types/react, @types/react-dom
tailwindcss, postcss, autoprefixer
eslint, eslint-config-next, eslint-plugin-jsx-a11y
prettier, prettier-plugin-tailwindcss
@next/bundle-analyzer
@axe-core/react
supabase CLI
```

---

## 🚫 Hard Constraints (WAJIB DIIKUTI)

**Anti-hallucination guardrails:**
- [✅] **No emoji as icons** — pakai Lucide SVG
- [✅] **No `as any` atau type suppression**
- [✅] **No hardcoded secrets** — env var only
- [✅] **No SQL string concat** — parameterized queries via Supabase
- [✅] **No empty catch block**
- [✅] **No console.log** di production — pakai logger/Sentry
- [✅] **No direct commit ke main** — semua via PR/feat branch
- [✅] **No inline style** — `style={{}}` HARAM
- [✅] **No pure black (#000) atau pure white (#fff)**
- [✅] **No z-index: 9999** — pakai scale predefined

**Project-specific constraints:**
- ✅ Mobile-first (375px minimum)
- ✅ UI Bahasa Indonesia, kode English
- ✅ PostgreSQL Full-Text Search — **bukan Meilisearch/Algolia**
- ✅ PostHog **tidak dipakai** — cukup GA4 + Clarity + Sentry
- ✅ Cloudflare Tunnel untuk production nanti, skip di development

**WAJIB LOAD SKILLS SEBELUM MEMBUAT KOMPONEN FRONTEND — HARAM DILEWATI:**

Setiap kali akan menulis komponen frontend (header, card, button, layout, form, sidebar, dll),
WAJIB load SEMUA skills berikut TERLEBIH DAHULU:

```
1. design-taste-frontend   — design read, three dials, color strategy, anti-slop
2. impeccable              — polish, audit, anti-slop rules, typography, color calibration
3. shadcn                  — periksa API komponen, docs, customization sebelum pakai
4. frontend-design         — distinctive UI, creative direction, bold aesthetic
5. ui-ux-pro-max           — color palettes, font pairings, UX guidelines, style system
6. ui-ux-designer          — design system, accessibility, user-centered design
7. emil-design-eng         — animation, micro-interactions, polish, transform mastery
8. web-design-guidelines   — WCAG compliance, interface audit
```

**PROSES WAJIB SETIAP KALI MEMBUAT KOMPONEN FRONTEND (HARAM DILEWATI):**

```
STEP 1 — DESIGN READ (dari design-taste-frontend Section 0)
  Output satu baris: "Reading this as: <page kind> for <audience>, with <vibe> language"
  Contoh: "Reading this as: editorial news for Indonesian readers, Medium-style clean minimal"

STEP 2 — THREE DIALS (dari design-taste-frontend Section 1)
  Tentukan: DESIGN_VARIANCE (1-10), MOTION_INTENSITY (1-10), VISUAL_DENSITY (1-10)
  Wajib disesuaikan dengan design read.

STEP 3 — COLOR STRATEGY (dari design-taste-frontend Section 4.2 + impeccable Color)
  - Max 1 accent color. Color Consistency Lock.
  - Gunakan OKLCH. Pure monochrome + satu accent pop.
  - Cek contrast: body ≥ 4.5:1, large text ≥ 3:1 (WCAG AA).
  - Tidak ada pure #000 atau pure #fff.

STEP 4 — TYPOGRAPHY (dari design-taste-frontend Section 4.1 + impeccable Typography)
  - Cap font-family max 3 (display + body + optional mono).
  - Body line length 65-75ch.
  - Pair on contrast axis (serif + sans).
  - Tidak boleh Inter sebagai default sans (kecuali user minta neutral).

STEP 5 — COMPONENT SELECTION (dari shadcn workflow)
  - Cek komponen yang sudah terinstall: ls src/components/ui/
  - Jalankan: npx shadcn@latest docs <component> — baca docs dulu sebelum pakai.
  - Cek base-ui vs radix: components.json → field "base".
  - JANGAN gunakan asChild untuk base-ui (pakai render prop).
  - Customize komponen, JANGAN pakai default theme shadcn (haram).

STEP 6 — ANTI-SLOP CHECK SAAT IMPLEMENTASI (dari design-taste-frontend Section 9 + impeccable Absolute Bans)
  - ❌ Emoji sebagai icon → pakai Lucide SVG
  - ❌ Gradient text (background-clip: text)
  - ❌ Identical card grids (icon + heading + text)
  - ❌ Eyebrow di SETIAP section (max 1 per 3)
  - ❌ Pure black/white
  - ❌ as any, @ts-ignore
  - ❌ Inline style (style={{}})
  - ❌ z-index: 9999
  - ❌ Nested button (button di dalam button)
  - ❌ scale(0) untuk entry animation → pakai scale(0.95) + opacity(0)
  - ❌ ease-in untuk UI → pakai ease-out
  - ❌ transition: all → spesifik: transition: transform 200ms ease-out
  - ❌ border: 1px + shadow dengan blur ≥ 16px di elemen sama
  - ❌ border-radius ≥ 32px untuk card (max 16px)

STEP 7 — ANIMASI & INTERAKSI (dari emil-design-eng)
  - Button :active → scale(0.97)
  - Transform-origin untuk popover → ikut trigger, bukan center
  - Durasi UI: 150-300ms (bukan 400ms+)
  - prefers-reduced-motion: WAJIB di-honor
  - Hover animation: gate dengan @media (hover: hover) and (pointer: fine)

STEP 8 — AUDIT (dari impeccable + emil-design-eng + ui-ux-pro-max)
  - Cek contrast tiap CTA button
  - Cek touch target ≥ 44px
  - Cek heading hierarchy (H1 → H2 → H3)
  - Cek loading state, empty state, error state ada
  - Cek semantic HTML (nav, main, article, section)
  - Cek prefers-reduced-motion
  - Cek skip link keyboard
  - Cek form label (bukan placeholder as label)
```

**VIOLATION:** Jika salah satu step di atas dilewati, itu = AI HALU. Wajib ulang dari STEP 1.

---

## 🔒 Security

- [ ] HTTPS enforced (via Vercel + Cloudflare)
- [ ] CSP header configured
- [ ] CORS whitelist specific origins
- [ ] Rate limiting: auth 5/15min, API 100/1min (Upstash)
- [ ] Input validation server-side (Zod)
- [ ] Auth: Supabase Auth (httpOnly cookie, email + Google OAuth)
- [ ] Secrets in env var only
- [ ] Supabase RLS enabled on all tables
- [ ] Cloudflare Turnstile untuk bot protection

---

## 📊 Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | ≤ 2.5s |
| FCP | ≤ 1.8s |
| CLS | ≤ 0.1 |
| TTFB | ≤ 600ms |
| Initial JS bundle | ≤ 200KB gzipped |
| Initial CSS | ≤ 50KB gzipped |

---

## 🛠 DevOps & Deployment

### Environments
- **Development**: localhost:3000, branch: feat/*
- **Production**: URL (Vercel), branch: main (manual approval)

### Branch Strategy
```
main       → Production (protected, manual approval)
feat/*     → Feature branches (PR ke main)
fix/*      → Bug fix (PR ke main)
chore/*    → Maintenance (PR ke main)
```

### Commit Convention (Conventional Commits)
- `feat:` New feature
- `fix:` Bug fix
- `chore:` Maintenance
- `perf:` Performance improvement
- `a11y:` Accessibility improvement
- `style:` Styling (no code change)

### CI/CD Pipeline
1. Lint (ESLint)
2. Type check (tsc --noEmit)
3. Build (pnpm build)
4. Deploy to Vercel (auto dari main)

---

## 🧪 Testing Strategy

| Layer | Tool | Target |
|---|---|---|
| Unit | Vitest | ≥ 80% coverage |
| Component | Vitest + Testing Library | Critical components |
| E2E | Playwright | 3-5 critical user flows |
| A11y | @axe-core/react | Automated audit |

**Critical user flows untuk E2E:**
1. Baca artikel → lihat komentar → bookmark
2. Login → tulis komentar
3. Admin → buat artikel → publish
4. Search artikel → filter by kategori
5. RSS feed valid

---

## 🏗️ Architecture Overview

```
[User → Cloudflare CDN + Turnstile]
    ↓
[Vercel Edge → Next.js 16 SSR/SSG]
    ├── next/image (Sharp) → optimized images
    ├── next/font → self-hosted (zero CLS)
    ├── next/dynamic → code splitting
    ↓
[Vercel Serverless Functions]
    ├── Rate Limit → @upstash/ratelimit → Upstash Redis
    ├── Cache → @upstash/redis
    ├── Queue → @upstash/qstash
    └── Auth → Supabase Auth
    ↓
[Supabase]
    ├── PostgreSQL (artikel, user, komentar)
    ├── Full-Text Search (built-in)
    ├── Storage (gambar)
    ├── Realtime (komentar)
    └── Auth (email + OAuth)
    ↓
[Monitoring]
    ├── GA4 → traffic analytics
    ├── Clarity → session replay & heatmaps
    ├── Sentry → error tracking
    ├── GTM → tag management
    └── Google Search Console → SEO
```

---

## 🔌 3rd Party Services

| Service | Purpose | Env Var |
|---|---|---|
| Supabase | DB, Auth, Storage, Realtime | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Upstash Redis | Cache + Rate Limit | `UPSTASH_REDIS_URL`, `UPSTASH_REDIS_TOKEN` |
| Upstash QStash | Job Queue | `QSTASH_TOKEN` |
| Sentry | Error tracking | `SENTRY_DSN` |
| GA4 | Web analytics | `NEXT_PUBLIC_GA_ID` |
| Clarity | Session replay | `NEXT_PUBLIC_CLARITY_ID` |
| Cloudflare Turnstile | Bot protection | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |
| Google AdSense | Monetisasi | `NEXT_PUBLIC_ADSENSE_ID` |
| Google Tag Manager | Tag management | `NEXT_PUBLIC_GTM_ID` |

---

## 🚨 Escalation Path

**Kapan tanya user:**
- Keputusan arsitektur irreversible
- Security concern
- Perubahan scope fitur
- Action destruktif di production

**Kapan escalate ke Oracle agent:**
- Hard debugging (memory leak, race condition)
- Arsitektur decision complex
- Security review mendalam

---

## 📝 Changelog

| Date | Author | Change |
|---|---|---|
| 2026-06-21 | Sisyphus | Initial setup — DESIGN.md + AGENTS.md dari template |

---

> **Last updated: 2026-06-21 | Version 1.0 — Initial project context for Website News**
