# DESIGN.md — Design System Reference v2.0

> **File ini source of truth untuk semua keputusan visual project Website News.**
> Dibuat berdasarkan riset + diskusi dengan user. Berlaku untuk seluruh fase build.

---

## 📖 Research Log

**Kategori website:** News / Editorial / Portal Berita

**Jumlah referensi yang diriset:** 5 website

**Daftar referensi:**

| # | Website | Kategori | Warna Dominan | Font | Layout Khas | Catatan |
|---|---|---|---|---|---|---|
| 1 | **The New York Times** | News | Off-white bg, black ink | NYT Cheltenham (headline), Georgia (body) | Single column artikel, hierarchical headlines | Otoritas berita global, tipografi serif klasik |
| 2 | **Financial Times (FT)** | Financial News | Salmon #fff1e5, near-black #33302e, claret #990f3d | Financier Display (serif), Metric 2 VF (sans) | Pink-salmon background, teal link underline | Warna kertas koran sebagai brand identity |
| 3 | **The Economist** | News/Opinion | White canvas, red #e3120b, navy #1f2e7a | Economist Serif, Economist Sans | Red accent hanya untuk rules, clean typography | Disiplin satu accent color (red) |
| 4 | **Vox** | Explanatory News | Hazard yellow #fff200, near-black #131313 | Balto (sans display), Harriet (serif), Roboto Mono | Yellow masthead band, ink-on-paper | Typography three-family stack |
| 5 | **The Atlantic** | Long-form | Pure white, red #e7131a | AGaramondPro, Atlantic Serif, Logic Monospace | Print magazine look, dua serif berbeda | Foto-centric, metadata monospace |

**Insight utama:**
- ✅ **Serif + Sans pairing** adalah standar industri untuk news (serif untuk headlines/body, sans untuk UI/nav)
- ✅ **Satu accent color** cukup — jangan lebih (The Economist: red, FT: claret, Vox: yellow)
- ✅ **Off-white background** (bukan pure white) memberikan "koran feel" dan mengurangi eye strain
- ✅ **Near-black text** lebih nyaman dibaca daripada pure black
- ✅ **Rounded corner minimal** — max 4px untuk card (FT), sebagian besar pakai square corners

---

## 🔍 Sintesis Riset

### Warna (Color System)

**Base palette:**

```css
/* Brand */
--color-primary: #1E3A5F;        /* Dark navy — autoritatif, terpercaya */
--color-primary-hover: #2B4C7E;
--color-primary-active: #15294A;
--color-accent: #B91C1C;         /* Red untuk breaking news, CTAs */

/* Neutrals */
--color-bg: #FAFAF8;             /* Warm off-white — newsprint feel */
--color-bg-elevated: #FFFFFF;    /* Card, modal */
--color-fg: #18181B;             /* Near-black text */
--color-fg-muted: #71717A;       /* Secondary text, metadata */
--color-border: #E4E4E7;         /* Border ringan */
--color-border-strong: #D4D4D8;

/* Semantic */
--color-success: #16A34A;
--color-warning: #D97706;
--color-error: #DC2626;
--color-info: #2563EB;
```

**Constraint:**
- Maximum 3 warna utama (navy + neutral + red accent)
- ✅ Pure black (#000) → **OFF-LIMITS** (pakai #18181B)
- ✅ Pure white (#fff) → **OFF-LIMITS** (pakai #FAFAF8)
- Contrast ratio minimum **4.5:1** untuk body text (WCAG AA)
- Contrast ratio minimum **3:1** untuk UI components (WCAG AA)

### Tipografi (Typography)

```css
/* Display (Hero, H1) — Playfair Display */
--font-display: 'Playfair Display', Georgia, serif;
--font-size-display-1: clamp(2.5rem, 5vw, 4rem);
--font-weight-display: 700;
--line-height-display: 1.1;
--letter-spacing-display: -0.02em;

/* Heading (H2, H3, H4) — Playfair Display */
--font-heading: 'Playfair Display', Georgia, serif;
--font-size-h2: clamp(2rem, 4vw, 3rem);
--font-size-h3: clamp(1.5rem, 3vw, 2rem);
--font-size-h4: clamp(1.25rem, 2vw, 1.5rem);
--font-weight-heading: 600;
--line-height-heading: 1.25;

/* Body — Source Serif 4 */
--font-body: 'Source Serif 4', Georgia, serif;
--font-size-body: 17px;          /* Body besar untuk readability */
--font-size-body-sm: 15px;
--font-size-body-xs: 13px;
--line-height-body: 1.7;         /* Loose untuk long-form reading */
--line-height-body-tight: 1.4;

/* UI / Navigation — Inter */
--font-ui: 'Inter', system-ui, sans-serif;
--font-size-ui-sm: 13px;
--font-size-ui: 14px;
--font-size-ui-lg: 16px;
--font-weight-ui: 500;

/* Mono / Metadata — JetBrains Mono */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-size-mono: 13px;
```

**Font loading strategy:**
- ✅ `next/font` — self-hosted Google Fonts (zero CLS, zero external request)
- ✅ `font-display: swap` via next/font (built-in)
- ✅ Subset Latin (cukup untuk Bahasa Indonesia + English)
- ✅ Variable fonts untuk Playfair Display, Source Serif 4, Inter, JetBrains Mono

**Font stack rationale:**
| Fungsi | Font | Alasan |
|---|---|---|
| Headlines (H1-H4) | **Playfair Display** | High-contrast serif, premium editorial feel setara NYT/Economist |
| Body artikel | **Source Serif 4** | Optikal sizing untuk screen, nyaman dibaca ribuan kata |
| UI / Nav / Cards | **Inter** | Font UI paling terbukti, x-height tinggi, legible di semua ukuran |
| Meta / Code / Data | **JetBrains Mono** | Untuk byline, tanggal, metadata, code — bersih dan teknis |

### Spacing & Sizing

```css
/* Spacing scale (4px base) */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */

/* Container */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
--container-prose: 70ch;  /* Lebar untuk readability artikel */
```

### Radius (Border Radius)

```css
--radius-none: 0;
--radius-sm: 2px;       /* Tag minimalis */
--radius-md: 4px;       /* Button, card — ikut FT style */
--radius-lg: 8px;       /* Card elevated */
--radius-xl: 12px;      /* Modal */
--radius-full: 9999px;  /* Pill, avatar */
```

*Prinsip: News website = minimal rounded. 4px max untuk card. Square look = kredibel.*

### Shadow (Elevation)

```css
--shadow-xs: 0 1px 2px rgba(24,24,27,0.04);
--shadow-sm: 0 1px 3px rgba(24,24,27,0.06);
--shadow-md: 0 4px 6px rgba(24,24,27,0.06);
--shadow-lg: 0 10px 15px rgba(24,24,27,0.08);
--shadow-xl: 0 20px 25px rgba(24,24,27,0.1);
```

### Motion (Animation)

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Z-Index Scale

```css
--z-hide: -1;
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-popover: 60;
--z-tooltip: 70;
--z-toast: 80;
```

### Breakpoints (Responsive)

```css
/* Mobile-first */
--bp-sm: 375px;   /* Mobile */
--bp-md: 768px;   /* Tablet portrait */
--bp-lg: 1024px;  /* Tablet landscape */
--bp-xl: 1280px;  /* Desktop */
--bp-2xl: 1536px; /* Large desktop */
```

---

## 🎨 Design Direction (Ringkasan)

**Style/Vibe**: Editorial Premium — clean, typography-first, authoritative

**Color mood**: Neutral warm + navy + red accent

**Typography mood**: Editorial (serif headlines) + Clean modern (sans UI)

**Layout pattern**: Magazine grid — hierarchical cards, single-column artikel, sidebar untuk trending/related

**Key visual decisions:**
1. Serif untuk semua content text (headlines + body) — kredibilitas
2. Sans hanya untuk UI, navigation, metadata — fungsi
3. Red accent hanya untuk breaking news badge, CTA, link hover — hemat
4. Off-white background — newsprint feel, kurangi eye strain
5. Minimal rounded corners — serius, tidak "main-main"

---

## 🚫 Anti-Patterns (AI Tells) — WAJIB DIHINDARI

❌ **Emoji sebagai icon** — pakai Lucide icons (SVG)
❌ **Gradient text** — `background-clip: text` — HARAM
❌ **Pure black/white** — off-black/off-white WAJIB
❌ **Magic number CSS** — pakai token spacing/radius/shadow
❌ **Z-index 9999** — pakai scale predefined
❌ **Inline style** — `style={{}}` — HARAM
❌ **3 identical cards repeated** — variasi layout per row
❌ **Eyebrow di SETIAP section** — max 1 per 3 section
❌ **Exaggerated border-radius** — news = minimal rounded

---

## ♿ Accessibility (WAJIB)

- [ ] Color contrast 4.5:1 minimum text, 3:1 UI
- [ ] Keyboard navigation — semua reachable via Tab
- [ ] Focus visible ring (jangan `outline: none`)
- [ ] Semantic HTML (`<nav>`, `<main>`, `<article>`, `<h1>-<h6>`)
- [ ] Alt text deskriptif untuk semua gambar
- [ ] Form labels (bukan placeholder as label)
- [ ] Heading hierarchy (H1 → H2 → H3, no skip)
- [ ] Touch target ≥ 44x44px mobile
- [ ] `prefers-reduced-motion: reduce` honored
- [ ] Skip link "Skip to main content"
- [ ] `<html lang="id">`

---

## ⚡ Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| Initial JS bundle | ≤ 200KB gzipped |
| Font loading | Self-host via next/font |

---

## 🔗 Cross-References

- [AGENTS.md](./AGENTS.md) — project context & tech stack
- [SOS/00-MINDSET.md](../SOS/00-MINDSET.md) — senior mindset
- [DOMAINS/security.md](../DOMAINS/security.md) — OWASP, a11y

---

> **Last updated: 2026-06-21 | Version 1.0 — Initial design system for Website News**
