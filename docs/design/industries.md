# Industries — Visual Design Spec (intro + alternating Z-pattern rows)

| Field | Value |
|---|---|
| **Page** | Industries (`/industries`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v2 (adversarially reviewed — design-critic + a11y/qa-gates + skills/codebase + factual-honesty; all blockers + majors applied) |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build (no code in this doc) |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home](./home.md) · [about](./about.md) · [services](./services.md) · [solutions](./solutions.md) · [PRD](../PRD.md) · [PROGRESS](../../PROGRESS.md) |

The Industries page answers: **"do you understand a property like mine?"** An intro frames the promise, then a
numbered sequence of **alternating two-column rows** — one per sector — pairs a composed **sector plate** with a
tight **pain → solution → outcome** story. No code — only layout, typography, OKLCH token usage, motion,
interaction, and mobile behavior.

**Voice:** specific and grounded. Home sells the brand, About the people, Services the work, Solutions helps choose —
**Industries proves fit.** Each row makes one sector feel *seen* (its real headache) and then resolved.

**On differentiation (honest framing — from the review):** the alternating two-column flip and the slide-in reveal
are *table stakes*, not differentiators — every agency template does them, and the flip alone is reflection, not
variation. What actually carries this page is (1) the **numbered sector plates (01–08)** giving an editorial
throughline, (2) a **strong, visually distinct outcome zone** that lands each row as a payoff, and (3) **deliberate
anti-uniformity** (a featured first row, no perfect A/B mirror — see §0). The eight rows must not read as eight
copies of one block.

---

## Approval status & identity gate

**Approved for build of the SCAFFOLD** — layout, motion, interaction, server/client boundaries, accessibility.
**Final visual sign-off** is gated on assets + content honesty:

- **No fake media slot.** Per-sector **photography is `TODO`** (no brand set has landed). The image column does
  **not** ship as a faint glyph on a pale gradient — that reads as an unfinished wireframe repeated 8×. Until
  photos arrive, the column renders a **composed "sector plate"** (a designed graphic with real hierarchy: a large
  sector numeral, the full-contrast sector icon, and the sector tag — see §2) that is intentional on its own. When
  `industry.image` lands, `next/image` replaces the plate. The plate is decorative (`aria-hidden`); the intro H1
  stays the LCP element.
- **The industry list is committed** — the 8 sectors already in `src/content/industries.ts` (a content decision,
  not an unknown client fact). They map 1:1 to the brief's suggested list.
- **Outcome copy is authored AND capability-checked.** Each row's one-line outcome is new copy written from the
  existing `challenge`/`solution` and **cross-checked against what `services.ts`/`products.ts` actually support** —
  qualitative only, **no scope-words** (campus-wide / every / anywhere-as-staffed / 24-7), **no privacy or
  compliance guarantees**, **no retention durations**, **no "eyes on" / monitoring** implications. Soo Solutions is
  a **local installer** (per `faqs.ts`: "the local area around our 253 Bruce St location"), not a campus integrator
  or a staffed monitoring service — outcomes must stay inside that. (Three first-draft lines failed this and were
  rewritten; see §2.)
- **Two `industries.ts` copy edits recommended at build** to keep the source honest: Education's `solution` drops
  "Campus-wide … centralized recording and access" → "Coverage across entrances, hallways, and grounds, recorded to
  one system"; logged in §Open questions.
- Carryover TODOs: NAP phone/city/hours (CTA "Call Now"), Cabinet Grotesk `.woff2`, the deep-navy footer
  (site-wide upgrade owned by home.md).

Placeholders render as visible `TODO:` strings in **non-prod only**.

---

## 0. Art direction (page-wide)

Same bright OKLCH system. Industries is **proof-of-fit**, so it leans on clear sector storytelling and generous
whitespace — electric-blue is rationed to the **plate's sector icon, the outcome accent rule, CTAs, and focus
rings** (one blue beat in the plate, one in the text — not a column of marching badges).

- **Rhythm + anti-uniformity guard (AI-tell defense, mirroring the Solutions spec):** the rows are **not** a perfect
  A/B/A/B mirror. **Row 1 is featured** (larger plate, larger sector name, more vertical room) to anchor the
  sequence; the remaining rows alternate. Plate radius/shadow are **not** the same as the CTA band's. The numbered
  plates (01–08) give an editorial spine so the page reads as a designed list, not eight cloned tiles. Standard
  per-row rhythm `py-16 md:py-20 lg:py-24`; the featured row gets `lg:py-28`. Intro + CTA use the page section
  rhythm `py-20 md:py-28 lg:py-32`. Centered `mx-auto w-full max-w-6xl px-6`.
- **Overflow guard:** both the **page wrapper and each row are `overflow-x-clip`** so the directional plate slide can
  never add horizontal page scroll (belt-and-suspenders; `overflow-x-clip` is single-axis and supported on iOS
  Safari 16.4+ — the 375px iOS pass must confirm no horizontal scroll *during* the slide, see Gate 5).
- **The close:** ends on the electric-blue `CtaBand` → the (pending) deep-navy footer, like every page.

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on Industries |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | Page background |
| Headings / body-strong | `--foreground` | `oklch(0.255 0.045 264)` | H1–H2, sector names, outcome text, plate numeral |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Plate base, any inset blocks |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Plate sector icon, outcome accent rule, APPROACH label, CTA, ring |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on the CTA band |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Plate gradient end; eyebrow |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | PAIN label, pain/solution body, captions |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Plate frame, the outcome-zone top divider |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every interactive `:focus-visible` |

Shadows (token utilities only): `shadow-soft` · `shadow-card` (plate resting) · `shadow-elevated` (plate hover) ·
`shadow-glow` (**primary CTA + CTA band only**). Radius — **deliberately not uniform:** plates `rounded-2xl`
(distinct from the CTA band's `rounded-xl`); icon-adjacent blocks `rounded-lg`; eyebrow `rounded-full`.

### Type scale

| Element | Family | Size | Weight / tracking | Color |
|---|---|---|---|---|
| Page H1 (intro) | `font-display` | `clamp(2.25rem, 5vw, 3.75rem)` | bold, `tracking-tight` | `--foreground` |
| Sector name (per row, **H2**) | `font-display` | `clamp(1.5rem, 3vw, 2.25rem)` (featured row +1 step) | semibold, `tracking-tight` | `--foreground` |
| Plate numeral (01–08) | `font-display` | `clamp(3.5rem, 8vw, 6rem)` | bold, `tracking-tight` | `--foreground/10` backdrop |
| PAIN label | `font-display` | `text-xs` | medium, `uppercase`, `tracking-widest` | `--muted-foreground` |
| APPROACH label (the pivot) | `font-display` | `text-xs` | medium, `uppercase`, `tracking-widest` | `--primary` |
| Eyebrow | `font-display` | `text-sm` | medium, `uppercase`, `tracking-widest` | `--primary` |
| Pain / solution body | `font-sans` | `text-base → text-lg` | regular, ≤ `max-w-[58ch]` | `--muted-foreground` |
| **Outcome line (the payoff)** | `font-display` | `text-xl → text-2xl` | semibold, `tracking-tight` | `--foreground`, in a primary-ruled zone |

Fonts: display = Cabinet Grotesk (intent) / **Space Grotesk** (current); body = **DM Sans**. Never
Inter/Arial/Roboto for display. `display:swap`.

### Motion language (see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22, 1, 0.36, 1]`**, imported from **`@/lib/motion`** (the real exported symbol — the
  `soo-motion-3d` skill still shows a local `EASE`; the codebase export is `EASE_OUT`, used by `reveal-on-scroll.tsx`
  et al.).
- **Directional per-row reveal (table-stakes polish, not the differentiator):** as a row scrolls in, the **plate
  slides in from its own side** (plate-left rows `x:-32→0`, plate-right rows `x:+32→0`) + `opacity 0→1`; the text
  fades up (`y:24→0`); the plate **sector icon pops** (`scale:0.8→1`, `opacity 0→1`) with a small delay.
  `whileInView` with `viewport={{ once:true, margin:"-80px" }}`.
- **Reuse, don't fork the reveal.** `soo-component-patterns` mandates exactly ONE `RevealOnScroll`. So **extend the
  existing `RevealOnScroll` with an optional `from: "up" | "left" | "right" | "pop"` prop** (default `"up"` = today's
  `y:24` behavior) — keeping the same `duration:0.6`, `EASE_OUT`, `once`, `margin:"-80px"`. Do **not** add a parallel
  `DirectionalReveal`/`PopIn` component; `"pop"` is the icon's `scale` variant. This keeps the single-canonical-reveal
  invariant true.
- **Reduced motion — per-leaf guard is the guarantee.** `<MotionConfig reducedMotion="user">` neutralizes the
  declarative **transform** keys (x, y, scale) but does **NOT** suppress `opacity` (the Solutions review established
  this). So the extended `RevealOnScroll` must keep its **`useReducedMotion()` early-return** that renders static
  children with no opacity/x/scale keyframes (it already does for `"up"`; the new variants inherit the same guard).
  MotionConfig is backup, not the primary guarantee.
- **Micro:** CTA uses `Magnetic` (which guards its own imperative spring); plate lifts to `shadow-elevated` on hover
  (shadow only). No card tilt, no 3D, no parallax.
- **Animate `transform`/`opacity` only — never `backdrop-filter`.**

### Server/client boundaries (see soo-component-patterns)

The page and every section are **Server Components**. `"use client"` lives only at the **one** reveal leaf (the
extended `RevealOnScroll`) and `Magnetic`. `IndustryRow` (one sector → the grid) and `IndustriesList` (maps the 8,
passes index for flip/featured) stay **Server Components** that slot server-rendered children into the reveal leaf.
**No copy hardcoded in JSX** — all of it comes from `src/content/industries.ts`.

---

## 1. Intro

**Goal:** state the promise in one tight line, set up the rows.

**Layout:** the page root is **`<main id="main-content" tabIndex={-1}>`** (this page drops `PageShell`, so the page
itself must render the single `<main>` landmark and the skip-link target `#main-content`, mirroring `PageShell`).
Intro block: `max-w-3xl px-6`, `py-20 md:py-28`. Left-aligned: eyebrow "Who we serve" + H1 + a one-line lead.

- **H1 (the page's single `<h1>` and LCP element):** "Security built around how your industry actually works" —
  server-rendered text, Page H1 scale. No render-blocking image.
- **Lead:** "Every property type has its own weak points. Here's how we cover the ones that matter for yours."
  `text-lg text-muted-foreground max-w-[60ch]`.
- **Motion:** static (LCP-perfect). **Mobile:** single column; H1 floors at 2.25rem.

---

## 2. Alternating rows (the core — one per sector)

**Goal:** make each sector feel understood, then resolved, in a numbered two-column rhythm that flips each row.

**Structure:** the eight rows are an **`<ol>` of `<li>` rows** (the sectors are an ordered set; no per-row landmark
clutter, clean H2 navigation). **DOM order within each row is always `[plate, text]`** so the order is consistent for
assistive tech and the mobile stack. On `lg+`, even-indexed rows move the plate to the right via `lg:order-last` on
the plate (DOM stays plate-first; only the visual column flips). Because the **plate is `aria-hidden`**, assistive
tech effectively reaches the **H2 sector name first** in every row, so heading navigation is unaffected by the
plate-first DOM order.

**Per-row layout:** `grid items-center gap-8 lg:grid-cols-2 lg:gap-16`, `py-16 md:py-20 lg:py-24` (featured row 1:
`lg:py-28`, larger plate + H2), `overflow-x-clip`.

```
ROW 1 (featured, plate left):                     ROW 2 (plate right):
┌─────────────────────┐  Retail (H2, larger)      Warehousing (H2)   ┌─────────────────────┐
│  01      ▣(icon)    │  PAIN  Shrinkage, dis-    PAIN  Large floors, │   02      ▣(icon)   │
│  (numeral backdrop, │       putes, break-ins    docks, high-value   │  (composed plate,   │
│   full-contrast     │  APPROACH(blue) Entrance, APPROACH(blue) Wide-│   slides from the   │
│   icon, sector tag) │       till, floor cover…  area + dock cover…  │   RIGHT)            │
│  RETAIL             │  ┃ Clear footage when a   ┃ Dock and aisle    │   WAREHOUSING       │
└─────────────────────┘  ┃ loss or dispute needs  ┃ coverage kept for └─────────────────────┘
   (slides from LEFT)     ┃ settling. (OUTCOME)    ┃ the reviews that matter.
```

### The sector plate (composed graphic — intentional without a photo)

- **Frame:** `rounded-2xl border border-border bg-card shadow-card overflow-hidden`, `aspect-[4/3]` (featured row
  `aspect-[5/4]`, larger). Hover → `shadow-elevated` (desktop).
- **Composition (real hierarchy, not a faint floating glyph):**
  - a large **sector numeral** "01"–"08" as a `font-display` backdrop (`text-foreground/10`), bled to an edge;
  - the **sector icon** at **full contrast** (`text-primary`, `size-12 md:size-16`) — the legible focal point, NOT a
    15%-opacity wash; it **pops** in (`RevealOnScroll from="pop"`);
  - the **sector tag** (e.g. "RETAIL") as a small `uppercase tracking-widest text-muted-foreground` label;
  - a subtle `--card → --secondary` diagonal gradient for depth.
  This reads as a designed plate, so the page never shows an empty media box.
- **Real photo path:** when `industry.image` exists → `next/image` (explicit `width`/`height`,
  `alt={industry.imageAlt}` — required non-empty when a photo is set) replaces the entire plate.
- **Motion:** slides in from its side (`RevealOnScroll from={plateOnRight ? "right" : "left"}`); reduced-motion →
  static.

### Text column (pain → solution → outcome)

- **Header:** the **sector name** (`H2`). The sector icon is **not** repeated here as a separate `bg-primary/10`
  badge (it lives in the plate) — this is the blue-rationing reconcile with the Solutions spec, so the text column
  carries no marching blue badge.
- **Pain (the hook):** a `PAIN` micro-label (`text-xs uppercase tracking-widest text-muted-foreground`) + the
  `challenge` line; give it a hair more presence than the solution.
- **Approach (the pivot):** an `APPROACH` micro-label **in `--primary`** (marking the problem→fix turn) + the
  `solution` line.
- **Outcome zone (the payoff — visually distinct, the page's real differentiator):** the `outcome` line set apart
  as its own block — a **`border-l-2 border-primary pl-4`** rule (the single text-column blue beat), `text-xl →
  text-2xl` `font-display` semibold `text-foreground`, with a clear `mt-6` and a hairline `border-t border-border`
  above it so it reads as a separate "result" zone, never as paragraph three.
- **Motion:** text fades up (`RevealOnScroll from="up"`, small delay after the plate).
- **No per-row CTA** (avoids the CTA-density problem flagged in the Solutions review); rows are static content (no
  links), so the visual column flip raises no focus-order concern. Conversion is the single closing `CtaBand`.

### Content (8 sectors)

> **Note:** the **Challenge/Approach text below is abbreviated for layout illustration only** — the literal copy is
> whatever ships in `src/content/industries.ts`. **Only the Outcome column is new normative copy authored here**
> (capability-checked per the identity gate). Icons are the existing `industries.ts` strings.

| # | Sector | Icon | Pain (challenge) | Approach (solution) | **Outcome (authored — distinct & honest)** |
|---|---|---|---|---|---|
| 1 | Retail | `Store` | Shrinkage, disputes, after-hours break-ins | Entrance, till, and floor coverage for incident review | Clear footage when a loss or dispute needs settling. |
| 2 | Warehousing & Logistics | `Warehouse` | Large floors, docks, high-value inventory | Wide-area and dock coverage, retention sized for investigations | Dock and aisle coverage kept for the reviews that matter. |
| 3 | Hospitality | `Hotel` | Guest safety, common areas, liability | Discreet coverage of entrances, lobbies, back-of-house | Discreet coverage across guest and staff areas. |
| 4 | Healthcare & Clinics | `Stethoscope` | Patient safety, restricted areas, privacy | Targeted placement at entrances and restricted areas, planned around private zones | Coverage planned around the areas that need it — not the ones that don't. |
| 5 | Education | `GraduationCap` | Multiple buildings, entrances, grounds | Coverage across entrances, hallways, and grounds, recorded to one system | Entrances and grounds on one recorded system you can review. |
| 6 | Multi-Residential & Condos | `Building` | Shared entries, parking, amenities | Common-area coverage with footage available to property management | Common-area footage your property manager can pull when needed. |
| 7 | Construction Sites | `HardHat` | Theft of tools and materials on open sites | Deterrent coverage of access points and storage | A visible deterrent that makes an open site a harder target. |
| 8 | Offices | `Briefcase` | Access control, after-hours, staff safety | Entrance and interior coverage tied to recording and remote viewing | Entrances and floors recorded, and viewable from your phone anywhere. |

*Honesty fixes baked in (vs first draft): Education no longer claims "one view across every building" / "campus-wide
centralized" (a campus VMS a local installer doesn't offer); Healthcare no longer "respects patient privacy" (a
compliance guarantee that is the clinic's legal responsibility — reframed to placement guidance); Offices no longer
"eyes on …" (implied staffed monitoring — reframed to self-service viewing); Warehousing dropped the "weeks later"
retention duration; Hospitality "protection" → "coverage"; Multi-Residential "rely on" → "pull when needed."*

### Mobile (`< lg`)

- Every row **stacks plate-over-text in the same order** (DOM = plate, then text) regardless of the desktop flip —
  consistent down the page, heading always follows its plate. Single column, full-width plate (`aspect-[16/10]` on
  small screens), ≥44px any tap target. The directional x-slide is contained by the row + page `overflow-x-clip`;
  reduced-motion → static.

---

## 3. CTA band → Footer

The existing `CtaBand` — title "Don't see your exact setup?" + description "If it has doors, docks, or a front desk,
we've covered something like it. Tell us about the property." Dual CTA: "Get a Free Quote" (→ `/contact`) + the
baked-in "Call Now". Reveals once with `RevealOnScroll`. Then the shared footer (deep-navy upgrade owned by home.md,
pending). **Carryover NAP TODO:** the baked-in "Call Now" links to `SITE.contact.phoneHref`, currently a `TODO:`
placeholder; the NAP guard described in soo-qa-gates (to be wired before launch) fails the prod build while
`phoneDisplay` still starts with `TODO:`.

---

## Content model (`src/content/industries.ts` + `src/types`)

The existing `Industry` type is `{ slug, name, challenge, solution, icon }`. Additions:

| Field | Shape | Status |
|---|---|---|
| `slug`, `name`, `challenge`, `solution`, `icon` | (existing) | exists |
| `outcome` | `string` — the one-line payoff | new — authored, capability-checked (table above) |
| `image?` + `imageAlt?` | both optional, **paired** (`imageAlt` required only when `image` is set) | new — **`TODO` photography**; plate until then. Don't force 8 alt strings ahead of the assets. |

- **Icons to ADD to the `lib/icons` registry — critical.** `industries.ts` references `Store`, `Warehouse`,
  `Hotel`, `Stethoscope`, `GraduationCap`, **`Building`**, `HardHat`, `Briefcase`, and **none are in `iconRegistry`
  today** → `resolveIcon` returns the `ShieldCheck` fallback for *all eight*, collapsing the per-sector distinction
  the whole design depends on. Add all eight Lucide glyphs. **Note `Building` is NOT the registry's existing
  `Building2`** — add `Building` itself; do not reuse `Building2` for the Multi-Residential row.
- **Components — reuse:** `SectionHeading` (intro/CTA), `RevealOnScroll` (**extended** with the `from` prop),
  `Magnetic`, `CtaBand`, `next/image`, `resolveIcon`, the seo/schema helpers. **To build:** `IndustryRow` (server),
  `IndustriesList` (server), the `SectorPlate` (server, composed graphic), and the `from`-prop extension on
  `RevealOnScroll` (client).
- **Heading levels (pinned):** intro **H1**; each sector name **H2**; PAIN/APPROACH are styled `<p>` labels, not
  headings — no H3, no skipped levels.

---

## SEO (see soo-seo-local)

- **Metadata:** keep `export const metadata = buildMetadata({ title: "Industries", description: "…", path:
  "/industries" })` — but the **current stub description lists all eight sectors (~190 chars), which breaches the
  ~150–160-char human target and must be REWRITTEN** (not merely "tightened") to a concise human sentence. The
  `title` stays the short form `"Industries"` (the builder appends `| ${SITE.name}`).
- **JSON-LD:** add **`breadcrumbSchema([{ name:"Home", path:"/" }, { name:"Industries", path:"/industries" }])`** via
  one `<script type="application/ld+json">`. **LocalBusiness is already injected by the `(marketing)` layout — do
  NOT double-inject.** No per-sector Service/Product schema (sectors are audiences, not services).
- **Sitemap:** `/industries` is already static — confirm it is in `app/sitemap.ts`'s `staticPaths`.
- **Image SEO:** real photos use `next/image` + explicit `width`/`height` + a meaningful `imageAlt` (a scene
  description, never `alt=""` for a real photo). The plate is a non-`<img>` element → **`aria-hidden` only** (no
  `alt` attribute applies to it).

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy from `src/content/industries.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- **Outcome honesty gate (expanded):** each outcome must be supported by a capability present in
  `services.ts`/`products.ts`; **no scope-words** (campus-wide / every / anywhere-as-staffed / 24-7), **no
  privacy/compliance guarantees**, **no retention durations**, **no "eyes on"/monitoring** wording. (The three
  flagged rows — Education, Healthcare, Offices — and Warehousing's duration were fixed above.)
- Placeholders **non-prod only**: sector photos + NAP phone/city/hours are `TODO:` and listed in PROGRESS;
  `assertContactResolvedForProduction` (NAP guard, wired before launch) throws the prod build while contact is
  `TODO:`.

### 2. WCAG 2.2 AA
- **One `<main>`** — the page root is `<main id="main-content" tabIndex={-1}>` (replaces `PageShell`'s landmark so
  the site-wide skip link still lands). **One `<h1>`** (intro); each sector name **H2**; no skipped levels.
- Landmarks/structure: the rows are an **`<ol>` of `<li>`** (no 8 generic `<section>` regions); DOM order
  plate→text; the desktop flip is visual-only (`lg:order-last`), so **screen-reader and keyboard/tab order never
  reverse** (WCAG 1.3.2 / 2.4.3 hold — no per-row interactive elements, and the `aria-hidden` plate means AT reaches
  the H2 first anyway).
- **Contrast (derived from the exact OKLCH tokens; confirm with axe + a contrast pass at build — figures are
  targets, not asserted precision):**
  - `--foreground` on `--background` ≈ **15.15:1** (H1–H2, sector names, outcome text) ✓; on `--card` ≈ **15.5:1** ✓.
  - `--muted-foreground` on `--background` ≈ **5.28:1**, on `--card` ≈ **5.46:1** (pain/solution body, labels) ✓.
  - **eyebrow / APPROACH label / outcome rule** `--primary` on `--background` ≈ **4.71:1** ✓.
  - **plate sector icon** — `--primary` glyph composited on the plate (`--card`/`--secondary` gradient): a **non-text
    graphical object** (SC 1.4.11), requirement **3:1**, measured **≈4.24:1** over card → **passes**. (The icon is
    not a text-contrast target because the **H2 sector name carries the accessible name**; the icon need not be
    labelled "decorative" — it simply meets the 3:1 graphical-object floor, and clears 4.5:1 if rendered on solid
    `--primary` instead, if challenged.)
  - plate numeral `text-foreground/10` is a **decorative backdrop** (`aria-hidden`) — no contrast requirement.
  - CTA / CTA band `--primary-foreground` on `--primary` ≈ **4.71:1** ✓.
  - **focus ring** = full-opacity `--ring`, ≥3:1 against the surface ✓.
  - **Never** `--primary` as body text on `--secondary` (≈4.25:1, fails) — blue stays icon/rule/CTA.
- **prefers-reduced-motion:** the extended `RevealOnScroll` early-returns static for **all** `from` variants (no
  opacity/x/scale) — the per-leaf guard, not `MotionConfig`, is the guarantee; intro + CTA reveals static; no
  smooth-scroll.
- **Target size AA:** CTAs ≥44px; rows are non-interactive.
- **Image alt:** real photos get a descriptive non-empty `imageAlt`; the plate (a `<div>`) is `aria-hidden`.
- **Tooling:** axe (or `@axe-core/playwright`) **zero serious/critical**, plus a manual keyboard pass (skip link →
  `#main-content`; Tab intro → CTA; confirm no row introduces a reversed/off-screen focus stop).

### 3. Core Web Vitals (per route)
- **LCP < 2.5s** — intro **H1 text** (server-rendered, `next/font swap`, no entrance); the first row's plate/photo is
  **not** `priority`, so it never competes for LCP.
- **INP < 200ms** — minimal client JS (the one extended `RevealOnScroll` + Magnetic); IntersectionObserver via
  `whileInView`, no scroll listeners.
- **CLS < 0.1** — every plate/photo has a fixed `aspect-[*]` box; real photos carry `width`/`height`; fonts via
  `next/font`; the x-slide is `transform` inside `overflow-x-clip` (no layout shift).
- **First-load JS < 130KB** — Server Components by default; **no 3D**; only the reveal leaf ships. Verify with
  `ANALYZE=true` build + Lighthouse (mobile, throttled) + Speed Insights.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Intro single-column; rows two-column `lg+` with the flip (row 1 featured); **stack plate-over-text in consistent
  order `< lg`**; the x-slide is contained by row + page `overflow-x-clip` (**no horizontal scroll** at any width).
  `py` rhythm holds; no clipped content.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — confirm **OKLCH renders**, the grid flip
  (`lg:order-last`) + reveals behave, `aspect-*` boxes hold, reduced-motion renders static, and — because
  `overflow-x-clip` single-axis support is only solid on **iOS Safari 16.4+** — the 375px iOS pass specifically
  confirms **no horizontal scroll during the plate slide** (not just at rest).

### 6. Security headers / CSP
- **No new third-party origins** (images self-hosted via `next/image`). One JSON-LD block (BreadcrumbList) is the
  only added `dangerouslySetInnerHTML` (a `JSON.stringify` of a builder output). CSP / HSTS / X-Frame-Options DENY /
  nosniff / Referrer-Policy / Permissions-Policy stay intact.

---

## Open questions / TODO (logged in PROGRESS)

- **Sector photography** — eight real images (retail floor, warehouse dock, hotel lobby, clinic corridor, campus,
  condo entry, construction site, office) with descriptive alt; composed sector plates until then.
- **`industries.ts` honesty edit** — soften Education's `solution` ("Campus-wide … centralized recording and access"
  → "Coverage across entrances, hallways, and grounds, recorded to one system") at build, per the factual review.
- **Sector order** — the 8 ship in `industries.ts` order (row 1 featured); confirm the marketing-preferred sequence.
- **Outcome copy** — authored + capability-checked; confirm wording with the client (no metrics/durations/scope
  guarantees added without proof).
- Carryover: NAP phone/city/hours (tap-to-call); Cabinet Grotesk `.woff2`; deep-navy footer (home.md).

---

**Review note (v2):** adversarially reviewed by four parallel lenses. Applied — replaced the empty faint-icon
placeholder with a composed numbered **sector plate** (the page no longer ships a fake media slot); pinned the page
root to `<main id="main-content">` (the dropped-`PageShell` skip-link blocker); strengthened the **outcome zone**
into a distinct primary-ruled payoff and **rewrote all 8 outcome lines** to be distinct *and* honest (Education /
Healthcare / Offices over-claims, Warehousing duration, Hospitality verb all fixed); reconciled blue-rationing with
the Solutions decision (no marching badge column); added the anti-uniformity guard + featured first row; **extended
the single `RevealOnScroll`** rather than forking a second leaf, with the per-leaf `useReducedMotion()` gate as the
reduced-motion guarantee (MotionConfig doesn't cover opacity); corrected the icon contrast to ≈4.24:1 under the 3:1
graphical-object rule; committed the rows to an `<ol>`; and fixed the metadata-length, `Building`-vs-`Building2`,
abbreviated-copy, and `CtaBand` phone-source notes.

**See also:** [home design](./home.md) · [about design](./about.md) · [services design](./services.md) ·
[solutions design](./solutions.md) · [soo-design-system](../../.skills/soo-design-system.md) ·
[soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md).
