# Services — Visual Design Spec (overview + detail template)

| Field | Value |
|---|---|
| **Pages** | Services overview (`/services`) + Service detail template (`/services/[slug]`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v1 |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build (no code in this doc) |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home design](./home.md) · [about design](./about.md) · [PRD](../PRD.md) · [TRD](../TRD.md) · [PROGRESS](../../PROGRESS.md) |

This spec defines two things: the **Services overview** (a clean card grid) and the **Service detail template**
(one layout that renders every `/services/[slug]`). No code — only layout, typography, OKLCH token usage, motion,
interaction, and mobile behavior. Both pages are content-driven from `src/content/services.ts`.

**Voice:** clear, capable, reassuring. The homepage sells the brand; About sells the people; **Services sells
clarity** — "here is exactly what we do, what's included, and how it works." Functional and scannable over
editorial, but on the same bright system.

---

## Approval status & identity gate

**Approved for build of the SCAFFOLD** — structure, layout, motion, server/client boundaries, accessibility.
**Final visual sign-off** is gated on real content per service:

- **The service list is committed** (see §0) — 7 services already exist in `src/content/services.ts` and prerender
  as `/services/[slug]`. This is a **content decision, not an unknown client fact**; the build may extend it (e.g.
  add "NVR/DVR Setup") — that is a content edit, not a blocker.
- **Per-service detail content** — the 4-step process is universal (shared), but each service needs its
  **"what's included" checklist** (exists today as `highlights`), and ideally **per-service FAQs** (today filtered
  from the global `faqs.ts`; `TODO: dedicated per-service FAQs`) and a **per-service photo** (`TODO: brand asset
  pack`).
- Carryover TODOs: NAP phone/city/hours (CTA tap-to-call), Cabinet Grotesk `.woff2`, the deep-navy footer
  (site-wide upgrade owned by home.md).

Placeholders render as visible `TODO:` strings in **non-prod only**.

---

## 0. Art direction (shared by both pages)

**Bright, clean, scannable.** Same OKLCH light-first system, same components as the rest of the site. Services is
the most *functional* surface — a grid of cards and a structured detail page — so it leans on **clarity and
hierarchy**, not editorial flourish. Electric-blue is the single accent and stays disciplined.

- **Rhythm:** standard `py-20 md:py-28 lg:py-32` section rhythm; centered `max-w-5xl px-6` (overview grid widens to
  `max-w-6xl`; the detail content column is narrower for readability — see Part B).
- **Restraint / blue placement:** blue is rationed to **the service icon badges, CTAs, the card hover accent, the
  scroll-spy active state, checklist checkmarks, and focus rings**. Card surfaces are `bg-card`, text is deep
  navy/muted — blue never becomes the background.
- **The close:** every page ends on the electric-blue `CtaBand` → the (pending) deep-navy footer, like the rest of
  the site.

### The committed service list (`src/content/services.ts` — 7, canonical)

| Slug | Title | Icon | Segment |
|---|---|---|---|
| `cctv-installation` | Security Camera & CCTV Installation | `Cctv` | both |
| `commercial-security-systems` | Commercial Security Systems | `Building2` | commercial |
| `residential-security-systems` | Residential Security Systems | `House` | residential |
| `system-design-and-site-survey` | System Design & Site Survey | `ClipboardCheck` | both |
| `maintenance-and-support` | Maintenance & Support | `Wrench` | both |
| `upgrades-and-retrofits` | Upgrades & Retrofits | `RefreshCw` | both |
| `remote-viewing-and-mobile-setup` | Remote Viewing & Mobile Setup | `Smartphone` | both |

These map closely to the brief's suggested list (Commercial Surveillance ≈ Commercial Security Systems; Remote
Monitoring ≈ Remote Viewing). The build may add **NVR/DVR Setup** (icon `HardDrive`/`Server`, segment `both`) to
reach 8 — a content edit only. Both pages are **list-agnostic** (driven by content), so the list can change without
touching layout. Icons resolve via the `lib/icons` registry (extend it for any new icon).

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on Services |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | Both pages' backgrounds (warm near-white) |
| Headings / body-strong | `--foreground` | `oklch(0.255 0.045 264)` | H1–H3, card titles, deep-navy text |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Service cards, checklist, FAQ, related |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Icon badges, CTA, card hover accent, scroll-spy active, checkmarks, ring |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on the blue CTA band |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Process strip fill, segment chips |
| Hover wash | `--accent` | `oklch(0.93 0.045 250)` | Tag pills, subtle hover wash |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Card values, body copy, captions |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Card borders, dividers, side-nav rule |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every interactive `:focus-visible` |

Shadows (token utilities only): `shadow-soft` · `shadow-card` (card resting) · `shadow-elevated` (card hover) ·
`shadow-glow` (**primary CTA + CTA band only**). Radius: `rounded-lg` (14px) cards, `rounded-xl` (18px) the CTA
band, `rounded-md` icon badges, `rounded-full` pills.

### Type scale

| Element | Family | Size | Weight / tracking | Color |
|---|---|---|---|---|
| Page H1 (overview + detail hero) | `font-display` | `clamp(2.25rem, 5vw, 3.75rem)` | bold, `tracking-tight` | `--foreground` |
| Section H2 | `font-display` | `clamp(1.75rem, 3.5vw, 2.75rem)` | bold, `tracking-tight` | `--foreground` |
| Card / section-content H3 | `font-display` | `clamp(1.25rem, 2vw, 1.5rem)` | semibold, `tracking-tight` | `--foreground` |
| Eyebrow | `font-display` | `text-sm` | medium, `uppercase`, `tracking-widest` | `--primary` |
| Card value / lead | `font-sans` | `text-base → text-lg` | regular | `--muted-foreground` |
| Body | `font-sans` | `text-base → text-lg` | regular, 60–75ch (`max-w-[68ch]`) | `--muted-foreground` |
| Side-nav / pill | `font-sans` | `text-sm` | medium | `--muted-foreground` (active `--primary`) |

Fonts: display = Cabinet Grotesk (intent) / **Space Grotesk** (current); body = **DM Sans**. Never
Inter/Arial/Roboto for display. `display:swap` (protects LCP + CLS).

### Motion language (see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22, 1, 0.36, 1]`** (`lib/motion.ts`).
- **Card hover (overview):** lift to `shadow-elevated` + the card's `border` transitions to `--primary`, and a
  **2px accent rule "draws" across the top edge** (`transform: scaleX(0→1)`, `origin-left`, ~0.25s) — the "draws
  accent border" effect, GPU-cheap. **Reduced motion → border-color shifts instantly, no draw, no lift.**
- **Section reveals:** shared `RevealOnScroll` (`opacity 0→1`, `y 24→0`, `whileInView once`, `margin "-80px"`),
  staggered cards `index * 0.08s`.
- **Scroll-spy highlight (detail):** the active side-nav item updates as the matching section enters the viewport
  (IntersectionObserver). Active = `--primary` text + **a 2px `--primary` indicator bar** beside it (not
  color-only) + `aria-current`. In-page clicks scroll smoothly via Lenis. **Reduced motion → instant jump (no
  smooth scroll), indicator updates without transition.**
- **Accordion expand (detail FAQ):** Radix/shadcn `Accordion` height animation via the `accordion-down`/`-up`
  keyframes already in `globals.css`. **Reduced motion → instant open/close (height keyframes suppressed under
  `prefers-reduced-motion`).** Chevron rotates (`transform`).
- App is wrapped in `<MotionConfig reducedMotion="user">`; Lenis is synced to the GSAP ticker; both bail under
  `prefers-reduced-motion`. **Animate `transform`/`opacity`/`color` only — never `backdrop-filter`.**

### Server/client boundaries (see soo-component-patterns)

Both pages and every section are **Server Components**. `"use client"` lives only at leaves: the overview card
hover (a small client wrapper, or pure CSS hover with no client at all — prefer CSS), `RevealOnScroll`, the
detail **scroll-spy nav** (IntersectionObserver + active state), the **Accordion** (shadcn/Radix), and `Magnetic`
on CTAs. All copy is typed in `src/content/services.ts`; the per-service detail reads one `Service` by slug.

---

# Part A — Services overview (`/services`)

## A1. Hero / intro

**Goal:** frame the offering in one line, then get out of the way of the grid.

**Layout:** `max-w-6xl px-6`, `py-20 md:py-28`. Left-aligned `SectionHeading`: eyebrow "What we do" + H1 "Security
camera services, end to end" + a one-line lead ("From the first site survey to ongoing support — every part of a
camera system, installed and backed by a local team.").

- **Typography:** H1 = Page H1; lead = `text-lg text-muted-foreground max-w-[60ch]`.
- **Optional segment filter (Phase-2, client leaf):** "All · Commercial · Residential" chips that filter the grid
  by `service.segment`. Default OFF for v1 (a static grid is fine); if added it is a `"use client"` leaf, the chips
  are real buttons (keyboard, `aria-pressed`), and "All" is the default. **Do not** hide content from crawlers — the
  full grid is server-rendered; the filter only toggles visibility.
- **Mobile:** single column; H1 floors at 2.25rem.

## A2. Service card grid

**Goal:** a clean, scannable grid — the spec's core ask.

**Layout:** `max-w-6xl px-6`, `pb-20 md:pb-28`. `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`. One card per service.

```
┌───────────────────────────┐   ┌───────────────────────────┐   ┌───────────────────────────┐
│ ╭───╮                      │   │ ╭───╮                      │   │ ╭───╮                      │
│ │ ▣ │ (blue icon badge)    │   │ │ ▣ │                      │   │ │ ▣ │                      │
│ ╰───╯                      │   │ ╰───╯                      │   │ ╰───╯                      │
│ Security Camera & CCTV     │   │ Commercial Security        │   │ Residential Security       │
│ Installation        (H3)   │   │ Systems                    │   │ Systems                    │
│ Professional supply and    │   │ Commercial-grade surveil…  │   │ Reliable home camera…      │
│ installation… (value)      │   │                            │   │                            │
│ Learn more →               │   │ Learn more →               │   │ Learn more →               │
└───────────────────────────┘   └───────────────────────────┘   └───────────────────────────┘
   (hover: lift + accent rule draws across top, border → blue)
```

- **Card:** the **whole card is a link** to `/services/[slug]` — `rounded-lg border border-border bg-card
  text-card-foreground p-6 shadow-card`, `h-full` (equal heights). Contents: **icon badge** (`IconBadge` =
  `bg-primary/10 text-primary`, Lucide glyph from `service.icon` via `lib/icons`), **title** (Card H3),
  **one-line value** (`service.summary`, `text-muted-foreground`), and a "Learn more →" affordance.
- **Typography:** title Card H3; value `text-sm text-muted-foreground`.
- **Color:** `bg-card`; icon badge `bg-primary/10 text-primary`; resting border `--border`.
- **Motion / interaction:** on hover/focus, **lift** (`shadow-elevated`), **border → `--primary`**, and a **2px
  `--primary` accent rule draws across the top** (`scaleX`, `origin-left`); the "→" nudges right. Keyboard focus
  shows the `--ring` and triggers the same accent (focus-within / focus-visible). **Reduced motion → instant
  border-color change, no draw/lift.** Cards reveal once with `RevealOnScroll`, staggered.
- **Mobile:** 1-col (375) → 2-col (≥640) → 3-col (≥1024); full-width tappable cards (≥44px), comfortable padding.
- **Content:** `services[]` (`{ slug, title, summary, icon, segment, ... }`). **A11y:** card link named by the
  title; icon `aria-hidden`; the accent rule is decorative.

## A3. CTA band

The existing `CtaBand` — "Not sure which service you need?" + description ("Tell us about your property and we'll
recommend the right system."). Dual CTA: "Get a Free Quote" (→ `/contact`) + the baked-in "Call Now". Reveals with
`RevealOnScroll`. (See home/about for the band's verified contrast + reduced-motion behavior.)

---

# Part B — Service detail template (`/services/[slug]`)

One template renders every service from its `Service` record + shared process content.

## B0. Page shell

**Layout:** a **focused hero** (full-width) over the page, then a **two-column body**: a **sticky scroll-spy
side-nav** (left, ~`240px`) + a **content column** (`max-w-[68ch]` for readable measure). On `<lg`, the side-nav
becomes a **top sticky pill bar** and the content goes full-width.

```
┌──────────────────────────────────── focused hero ───────────────────────────────────────┐
│  SERVICES / Security Camera & CCTV Installation   (breadcrumb eyebrow)                      │
│  Security Camera & CCTV Installation        (H1)                                            │
│  Professional supply and installation of cameras and CCTV for any property.  (lead)         │
│  [ Request a Quote for this service ]   [ Call Now ]                                         │
└──────────────────────────────────────────────────────────────────────────────────────────┘
┌───────────────┐ ┌───────────────────────────────────────────────────────────────────────┐
│ ON THIS PAGE  │ │  ## Overview          (#overview)                                         │
│ │ Overview    │ │  longer description prose…                                                 │
│   What's incl.│ │                                                                            │
│   How it works│ │  ## What's included   (#included)   ✓ checklist                            │
│   FAQ         │ │  ## How it works      (#process)    01→02→03→04 strip                       │
│   Related     │ │  ## FAQ               (#faq)        accordion                               │
│ (sticky,      │ │  ## Related services  (#related)    2–3 cards                               │
│  scroll-spy)  │ │                                                                            │
└───────────────┘ └───────────────────────────────────────────────────────────────────────┘
                  →  CtaBand → Footer
```

## B1. Focused hero

- **Eyebrow / breadcrumb:** "Services / `{title}`" (`--primary` eyebrow); the visible trail mirrors the
  BreadcrumbList JSON-LD (Home › Services › `{title}`).
- **H1:** `service.title` — Page H1 scale, `text-foreground`. **The page's single `<h1>` and LCP element**
  (server-rendered text; no render-blocking hero image — a per-service photo, when it lands, is below the hero or
  lazy).
- **Lead:** `service.summary` (or the first line of `description`), `text-lg text-muted-foreground max-w-[60ch]`.
- **CTAs:** primary "**Request a Quote for this service**" → `/contact` (pre-selecting this service is a Phase-2
  query param), wrapped in `Magnetic`; secondary "Call Now" → `tel:` (`TODO: phone`). ≥44px, focus rings.
- **Background:** a quiet soft gradient (`--background` → `--secondary`) like the home/about openers — ONE
  treatment, `aria-hidden`. Optional segment chip ("Commercial" / "Residential" / "Both") from `service.segment`.
- **Motion:** a small staggered mount reveal (H1 transform-only → LCP-safe), like the home hero. Reduced motion →
  static.
- **Mobile:** single column; CTAs stack full-width, primary first.

## B2. Sticky scroll-spy side-nav

**Goal:** orient the reader in a longer page; jump to any section.

- **Desktop (`lg+`):** a `position: sticky; top: <header+gap>` nav in the left rail — `<nav aria-label="On this
  page">` with **real in-page anchor links** (`<a href="#overview">` …). Sections present: **Overview · What's
  included · How it works · FAQ · Related**.
- **Scroll-spy:** the link whose section is in view gets the **active** treatment — `--primary` text + a **2px
  `--primary` left indicator bar** (a visible bar, **not color alone**) + `aria-current="true"`. Driven by an
  IntersectionObserver (`"use client"` leaf) watching the section `id`s.
- **Smooth scroll + offset:** clicking a link scrolls smoothly (Lenis); each section has `scroll-margin-top` equal
  to the sticky header height so it isn't hidden under the header. **Reduced motion → instant jump (no smooth
  scroll).**
- **Mobile (`<lg`):** the side-nav becomes a **top sticky pill bar** — a horizontally scrollable row of pills
  (`rounded-full`, `bg-secondary` / active `bg-primary text-primary-foreground`), `position: sticky; top:
  <header>`, `overflow-x-auto`, with the active pill scrolled into view. Same anchors, same scroll-spy, same
  `aria-current`.
- **A11y:** keyboard-reachable links in DOM order; the active state is conveyed by the bar + weight +
  `aria-current`, never color alone; the nav has an accessible label; focus-visible rings on every link/pill.

## B3. Overview

The longer `service.description` as readable prose — `max-w-[68ch]`, `text-lg text-muted-foreground`. Section
`id="overview"`, H2 "Overview". Reveals once.

## B4. What's included — checklist

**Goal:** concrete proof of scope.

- **Layout:** section `id="included"`, H2 "What's included", then a **checklist** of `service.highlights` (3–5
  items) — `grid sm:grid-cols-2 gap-3`, each item = a **blue check glyph** (`Check` in a small `bg-primary/10
  text-primary` circle or inline `--primary`) + the item text (`text-foreground`).
- **Typography:** item `text-base`.
- **Color:** check glyph `--primary`; text `--foreground`.
- **Motion:** items reveal once, light stagger. No per-item animation otherwise.
- **A11y:** render as a `<ul>`; the check glyph is `aria-hidden` (the list semantics convey "included"); not
  color-only (the checkmark + list item carry meaning).

## B5. How it works — 4-step process strip

**Goal:** the universal engagement process (same for every service).

- **Content:** the **shared** 4 steps — **Assess → Recommend → Install → Support** (reuse the home `processSteps`
  content; the process is universal, so it is *not* per-service). Section `id="process"`, H2 "How it works".
- **Layout:** a horizontal 4-step strip on `md+` (numbered node + title + one line), vertical stacked on mobile —
  a **calm, static** version of the home timeline (numbered nodes + a static connecting rule). **No scroll-scrub
  here** (the home page owns the signature scrub; the detail page stays calm). `bg-secondary` band optional to set
  it apart.
- **Color:** node `bg-primary text-primary-foreground` (or outlined `--primary`); connector `--border`.
- **Motion:** reveals once; the connector/line is **static** (no draw). Reduced motion → static.
- **A11y:** ordered list (`<ol>`); numbers + titles convey order, not color.

## B6. FAQ — accordion

**Goal:** remove last-mile objections, and earn FAQ rich results.

- **Layout:** section `id="faq"`, H2 "Frequently asked questions", then a **shadcn/Radix `Accordion`** (single or
  multiple expand). `bg-card` items, `border-border` dividers, chevron rotates on open.
- **Content:** **per-service FAQs** — until dedicated ones land, show a **relevant subset of the global
  `faqs.ts`** filtered by group matching the service's segment (commercial/residential) **plus** the `general` and
  `support` groups. `TODO: dedicated per-service FAQs`.
- **Motion:** Radix height animation via the `accordion-down`/`-up` keyframes (already in `globals.css`); chevron
  `transform`. **Reduced motion → instant open/close.**
- **A11y:** Radix Accordion gives correct `button` triggers, `aria-expanded`, `aria-controls`, keyboard
  (Enter/Space/arrows). The FAQ content also feeds the **FAQPage JSON-LD** (see SEO).

## B7. Related services

**Goal:** keep the visitor moving through the catalog.

- **Layout:** section `id="related"`, H2 "Related services", a row of **2–3 related service cards** (the same
  overview card component) — **computed**: other services sharing the current `service.segment` (fall back to a
  curated `related[]` if present, else the next services in the list). `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`.
- **Motion/interaction:** identical to the overview cards (lift + accent draw). Reveals once.
- **A11y:** each card link named by the related service's title.

## B8. Per-service CTA → Footer

The `CtaBand` with a **service-scoped** title — e.g. "Ready to get started with `{title}`?" / "Request a quote for
`{title}`." + description, dual CTA (→ `/contact`, "Call Now"). Reveals once. Then the shared footer (the
deep-navy upgrade is owned by home.md and pending).

---

## Content model (typed in `src/content/services.ts` / `src/types`)

The existing `Service` type already carries the overview + most of the detail. Additions for the detail template:

| Field | Shape | Status |
|---|---|---|
| `slug`, `title`, `summary`, `description`, `segment`, `icon` | (existing) | exists |
| `highlights[]` | `string[]` → the **"What's included" checklist** | exists (reused) |
| `related?` | `string[]` (curated related slugs) | new — optional; default = same-segment services |
| `faqs?` | `Faq[]` | new — **`TODO` per-service FAQs**; until then filter global `faqs.ts` by group |
| `heroImage?` / `imageAlt?` | `string` | new — **`TODO` per-service photo**; until then a quiet gradient hero |
| Shared process | `processSteps` (home) — Assess→Recommend→Install→Support | exists (reused, universal) |

**Components — reuse:** `SectionHeading`, `IconBadge`, `RevealOnScroll`, `Magnetic`, `CtaBand`, shadcn
`Accordion`, shell `Header`/`Footer`, `lib/icons`, the schema builders. **To build:** `ServiceCard` (shared by
overview + related), `ServicesGrid`, the detail `ServiceHero`, `ScrollSpyNav` (client leaf — desktop rail + mobile
pill bar), `ServiceIncludes`, `ServiceProcess` (static strip), `ServiceFaq` (Accordion + FAQPage JSON-LD),
`RelatedServices`.

---

## SEO (see soo-seo-local)

- **Overview** `/services`: `export const metadata = buildMetadata({ title: "Services", description: "…",
  path: "/services" })`.
- **Detail** `/services/[slug]`: `generateStaticParams` (already present) + `generateMetadata` awaiting `params`
  → `buildMetadata({ title: service.title, description: service.summary, path: "/services/{slug}" })` (already
  present). `dynamicParams = false` (unknown slugs 404).
- **JSON-LD on the detail page:**
  - **`serviceSchema(service)`** (`@type "Service"`) — already injected on the stub; keep it.
  - **`breadcrumbSchema`** — Home › Services › `{title}` (add it).
  - **`faqPageSchema(faqs)`** — for the FAQ accordion content (add it on the detail page). Inject each via one
    `<script type="application/ld+json">JSON.stringify(...)</script>`.
  - **LocalBusiness** is inherited from the `(marketing)` layout — do **not** double-inject.
- **Image SEO:** per-service photos use `next/image` with explicit `width`/`height` + descriptive `alt`; decorative
  gradients `alt=""`/`aria-hidden`. AVIF/WebP already configured.

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy from `src/content/services.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- Placeholders **non-prod only**: per-service photos, dedicated per-service FAQs, NAP phone/city/hours are `TODO:`
  and listed in PROGRESS. `assertContactResolvedForProduction` (NAP guard, wired before launch) throws the prod
  build while contact is `TODO:`.

### 2. WCAG 2.2 AA
- **One `<h1>` per page** — overview hero H1, detail hero H1; sections use H2, cards use H3; no skipped levels.
- Landmarks: `<main>`, `<nav aria-label="On this page">` (detail), labelled sections; the scroll-spy nav and the
  Accordion are keyboard-operable (links / Radix triggers), logical tab order, ≥44px targets.
- **Scroll-spy active state is NOT color-only** — `--primary` text **plus** a 2px indicator bar **plus**
  `aria-current`. Smooth scroll respects `prefers-reduced-motion` (instant jump).
- **Accordion** (Radix) ships correct `aria-expanded`/`aria-controls`/keyboard; reduced motion → instant.
- **Contrast (derived from the exact OKLCH tokens — verified):**
  - `--foreground` on `--background` / `--card` (H1–H3, body-strong): **15.15:1** ✓
  - `--muted-foreground` on `--background` / `--card` (card values, body): **≥4.77:1** ✓
  - **eyebrow** `--primary` on `--background` = **4.71:1**, on `--card` = **4.88:1** ✓ (small text — passes).
  - icon badge / checkmark `--primary` on `--card` (`bg-primary/10`): glyph **≥4.71:1** ✓.
  - CTA `--primary-foreground` on `--primary`: **4.71:1** ✓ (solid, no alpha fade).
  - process node `--primary-foreground` on `--primary`: **4.71:1** ✓.
  - **Card hover accent** = `--primary` 2px rule/border on `--card` — a non-text UI element; `--primary` vs
    `--card` luminance contrast (~4.7:1) ≥ 3:1 ✓. Hairline `--border` (~1.25:1) is a **decorative divider, not a
    control boundary**, so the 3:1 rule doesn't apply to it.
  - **Never** `--primary` as body text on `--secondary` (4.25:1, fails) — blue stays glyph/CTA/accent.
- Decorative (icon glyphs, hero gradient, the card accent rule, process connector) are `aria-hidden`/`alt=""`;
  informative images get descriptive `alt`.
- **prefers-reduced-motion:** card lift/border-draw off (instant color), scroll-spy smooth-scroll off (instant),
  accordion instant, all reveals static.
- **No form on these pages** → labelled-field / aria-error gate N/A.
- **Tooling:** axe DevTools / `@axe-core/playwright` returns **zero serious/critical** violations + a manual
  keyboard pass (Tab / Enter / Space / arrows through the side-nav and accordion).

### 3. Core Web Vitals (budgets per route)
- **LCP < 2.5s** — the hero **H1 text** (server-rendered, `next/font swap`, transform-only entrance, never
  `opacity:0`). No render-blocking hero image (per-service photos lazy / below the hero).
- **INP < 200ms** — minimal client JS (only the scroll-spy observer + accordion + reveals + Magnetic); the
  scroll-spy uses IntersectionObserver, not scroll-event thrash.
- **CLS < 0.1** — any image has explicit `width`/`height`; the sticky side-nav/pill bar reserves its space; fonts
  via `next/font`; no `backdrop-filter` animation.
- **First-load JS < 130KB per route** — Server Components by default; no 3D on Services; only the named client
  leaves ship. Verify with `ANALYZE=true` build + Lighthouse (mobile, throttled) + Vercel Speed Insights.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Overview grid 1→2→3; detail two-column (`lg+`) → single column with the **side-nav becoming the top sticky pill
  bar** below `lg`. Process strip horizontal `md+` → vertical stack on mobile.
- `py-20/md:py-28/lg:py-32` rhythm holds; the detail content stays at `max-w-[68ch]` for readability; **no
  horizontal scroll** (the mobile pill bar scrolls *inside* its own row, not the page); no clipping at any
  checkpoint.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — confirm **OKLCH renders**, `position: sticky` for
  the side-nav / pill bar works (incl. iOS), the accordion + scroll-spy behave, and reduced-motion paths hold.

### 6. Security headers / CSP
- **No new third-party origins** (no maps/3D on these pages). 3 JSON-LD blocks (Service, BreadcrumbList, FAQPage)
  are the only `dangerouslySetInnerHTML`, each `JSON.stringify` of a builder output. CSP / HSTS / X-Frame-Options
  DENY / nosniff / Referrer-Policy / Permissions-Policy stay intact.

---

## Open questions / TODO (logged in PROGRESS)

- **Final service list** — confirm the 7 (and whether to add **NVR/DVR Setup** to reach 8). Content decision.
- **Per-service photos** for the detail hero / cards (brand asset pack).
- **Per-service FAQs** — dedicated questions per service (until then, filtered from the global `faqs.ts`).
- **Whether the overview segment filter ships** in v1 (default: no — static grid) or Phase-2.
- **Quote pre-selection** — passing the service into the contact form (Phase-2 query param).
- Carryover: NAP phone/city/hours (tap-to-call); Cabinet Grotesk `.woff2`; deep-navy footer (home.md).

---

**See also:** [home design](./home.md) · [about design](./about.md) · [PRD](../PRD.md) (Services goals) ·
[soo-design-system](../../.skills/soo-design-system.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
