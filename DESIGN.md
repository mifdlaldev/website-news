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

### Warna (Color System) — Medium-inspired

**Base palette:**

```css
/* Brand */
--color-primary: #1A8917;        /* Green — accent utama (Medium-inspired) */
--color-primary-hover: #15803D;
--color-primary-active: #166534;

/* Neutrals */
--color-bg: #FFFFFF;             /* Pure white — Medium-style clean */
--color-bg-muted: #FAFAFA;       /* Hover state, subtle section */
--color-fg: #141516;             /* Near-black text */
--color-fg-muted: #6B6B6B;       /* Secondary text, metadata */
--color-border: #F0F0F0;         /* Hairline border */
--color-border-strong: #E0E0E0;

/* Semantic */
--color-success: #1A8917;
--color-warning: #D97706;
--color-error: #DC2626;
--color-info: #2563EB;
```

**Constraint:**
- Satu accent color: **green** (lock, jangan tambah warna lain)
- ✅ Contrast ratio minimum **4.5:1** untuk body text (WCAG AA)
- ✅ Contrast ratio minimum **3:1** untuk UI components (WCAG AA)
- ❌ No navy, no red, no warm off-white

### Tipografi (Typography)

```css
/* Display + Headings (H1-H4) — Source Serif 4 (Medium-style single serif) */
--font-display: 'Source Serif 4', Georgia, serif;
--font-size-display-1: clamp(2.5rem, 5vw, 3.5rem);
--font-weight-display: 700;
--line-height-display: 1.15;
--letter-spacing-display: -0.01em;

/* Heading (H2, H3, H4) — Source Serif 4 */
--font-heading: 'Source Serif 4', Georgia, serif;
--font-size-h2: clamp(1.75rem, 3.5vw, 2.5rem);
--font-size-h3: clamp(1.35rem, 2.5vw, 1.75rem);
--font-size-h4: clamp(1.15rem, 2vw, 1.35rem);
--font-weight-heading: 600;
--line-height-heading: 1.3;

/* Body — Source Serif 4 (sama dengan headlines) */
--font-body: 'Source Serif 4', Georgia, serif;
--font-size-body: 17px;          /* Medium: 17px untuk readability */
--font-size-body-sm: 15px;
--font-size-body-xs: 13px;
--line-height-body: 1.7;         /* Medium: 1.7 line-height */
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
- ✅ Variable fonts untuk Source Serif 4, Inter, JetBrains Mono

**Font stack rationale:**
| Fungsi | Font | Alasan |
|---|---|---|
| Headlines + Body | **Source Serif 4** | Satu serif untuk semua content — Medium juga pakai 1 serif (Charter) untuk title + body |
| UI / Nav / Cards | **Inter** | Font UI paling terbukti, netral, clean — cocok Medium-style |
| Meta / Code / Data | **JetBrains Mono** | Untuk metadata, code — bersih dan teknis |

**Playfair Display dihapus** karena terlalu high-fashion, tidak cocok untuk news yang kalem (Medium-style).

### Spacing & Sizing

**Spacing rhythm: 8px base (Exaggerated Minimalism)**

```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-10: 5rem;    /* 80px */
--space-12: 6rem;    /* 96px */

/* Section vertical gaps */
--section-gap: clamp(4rem, 8vw, 8rem);

/* Container */
--container-max: 1280px;
--container-padding: 1.5rem;
--container-prose: 70ch;
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

### Shadow (Elevation) — Exaggerated Minimalism

**Max shadow: 0 2px 8px rgba(0,0,0,0.08).** No shadows heavier than this.

```css
--shadow-xs: 0 1px 2px rgba(24,24,27,0.04);
--shadow-sm: 0 1px 3px rgba(24,24,27,0.06);
--shadow-md: 0 2px 8px rgba(24,24,27,0.08);  /* Max — jangan lebih */
```

### Motion (Animation) — Exaggerated Minimalism

**Prinsip:**
- Entry: fade + translateY(16px → 0), ease-out, 420ms, stagger 80ms antar item
- UI feedback: ease-out, 200-300ms. Hanya animasi transform dan opacity.
- Hover: color shift + shadow adjustment, 200ms
- Button active: -1px translateY (BUKAN scale)
- prefers-reduced-motion: semua animasi collapse ke instant

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;

/* Entry animation */
--entry-duration: 420ms;
--entry-stagger: 80ms;
--entry-translate: 16px;
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

## 🎨 Design Direction — Exaggerated Minimalism

**Style/Vibe**: Exaggerated Minimalism — bold contrast, extreme whitespace, typography-first, satu accent color

**Three Dials:**
- **DESIGN_VARIANCE: 2** — Terstruktur, predictable layout
- **MOTION_INTENSITY: 4** — Subtle, ease-out, 420ms entry
- **VISUAL_DENSITY: 3** — Airy, 40-60% whitespace

**Color mood**: Pure white + near-black + green accent (single accent lock)

**Typography mood**: Source Serif 4 (serif) untuk content + Inter (sans) untuk UI

**Layout pattern**: Max-width 1280px, 8px spacing base, section gap clamp(4rem, 8vw, 8rem)

**Key visual decisions:**
1. Satu serif (Source Serif 4) untuk headlines + body
2. Sans (Inter) hanya untuk UI, navigation, metadata
3. **Green accent (#1A8917)** — single accent lock
4. Shadow max: 0 2px 8px rgba(0,0,0,0.08)
5. Entry animation: fade + translateY, 420ms, stagger 80ms
6. Max-width: 1280px container, 70ch article body

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
