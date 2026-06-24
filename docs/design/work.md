# Work / Recent Installs — Visual Design Spec (gallery + case detail, behind a site-wide honesty gate)

| Field | Value |
|---|---|
| **Pages** | Work overview (`/work`) + Case-study detail (`/work/[slug]`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v2 (adversarially reviewed — design-critic + a11y/qa-gates + skills/codebase + factual-honesty; all blockers + majors applied) |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build — **ships the honest empty state + a SITE-WIDE content gate now; the gallery/lightbox/case-detail/before-after activate when real content lands** |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home](./home.md) · [about](./about.md) · [services](./services.md) · [solutions](./solutions.md) · [industries](./industries.md) · [PROGRESS](../../PROGRESS.md) |

This is the **proof** page — and proof you don't have cannot be faked. The review surfaced that the danger here is
not the gallery design; it is **fabricated proof leaking across the site**. So this spec does two things:

1. **Fully designs the target** — a filterable "Recent Installs" masonry, a keyboard lightbox, and a case-study read
   (challenge → solution → install gallery → **verified** result quote → before/after where real pairs exist). This
   is what the page becomes when content lands.
2. **Ships an honest gate now** — a **single `isPublished` predicate** that, while no project is publishable,
   (a) renders a real, linkable **"Recent Installs — coming soon"** state at `/work`, (b) **hides `/work` from nav +
   sitemap and sets `robots: noindex`**, and **(c) also de-fakes the two homepage surfaces that currently leak
   placeholder content** — `FeaturedWork` (renders the `TODO:` titles + links to `/work`) and `Testimonials`
   (renders the `"Pending Review"` placeholders). The gate is **site-wide**, not `/work`-only, or it is theatre.

**Voice:** confident, concrete, modest. Show only what is real.

**Break-the-grammar note:** Services is a card grid, Solutions tabs+table, Industries alternating rows. Work is a
**masonry image wall** + an immersive **case read** — image-led where every other page is type-led.

---

## Build scope (decided — resolves "are we building the page or designing the future?")

The review correctly flagged that lavishing build effort on a gallery/lightbox/slider that renders for nobody is
shipping an empty shell. So the **build is staged**:

- **Ships now (this build):** the **site-wide honesty gate** (the `isPublished` predicate + `visibleNav` +
  sitemap filter + `robots: noindex` + the `buildMetadata` `robots` extension + the homepage `FeaturedWork` /
  `Testimonials` de-faking + the build guard) **and** the **designed empty state** (§A5) — a genuinely useful,
  linkable "what we do / proof coming" moment. This is the only reachable live state today, so it gets real design.
- **Activates when content lands (wired now, renders when `isPublished` is true for ≥1 entry):** `WorkGallery` +
  `Lightbox` + the case-detail template. These are built so flipping content turns them on — but they render **only
  published entries**, never placeholders.
- **Fast-follow (only when a real before/after pair exists in content):** `BeforeAfterSlider`. Per the review, it is
  the highest-complexity / least-likely-asset component; do **not** build speculative interaction for content that
  may never exist. The case-detail template leaves a slot; the slider is added when `beforeAfter` is populated.

The rest of this doc specs the full target so the staged build has one source of truth.

---

## Approval status & identity gate (the honesty gate is the centerpiece)

Today's content is entirely placeholder: `case-studies.ts` has three `title: "TODO: …"` entries with **no image**,
and `testimonials.ts` is **all `"Pending Review"`**.

- **Single predicate — `isPublished(cs)`.** `cs.cover && !cs.title.startsWith("TODO:") && cs.outcomeConfirmed`
  — a project has a real cover image, a real title, **and a human-confirmed caption/outcome** (see "outcome is not
  free proof" below). **`hasPublishableWork = caseStudies.some(isPublished)`** — **false today**. Everything derives
  from these two in **one place** (`src/lib/work.ts`), so the four consumers can't drift:
  1. **Nav** — `visibleNav` drops `/work` from header / mobile / footer while `!hasPublishableWork`.
  2. **Sitemap** — `/work` + published `/work/[slug]` excluded from `app/sitemap.ts` while `!hasPublishableWork`.
  3. **`/work` page** — branches to the honest **empty state** (§A5) while `!hasPublishableWork`; otherwise the
     gallery, which renders **`caseStudies.filter(isPublished)` only** (never the raw array, never placeholder
     tiles).
  4. **Homepage surfaces** — `FeaturedWork` renders **only `filter(isPublished)`** (and drops its `/work` links)
     and falls back to a non-proof teaser when empty; `Testimonials` renders **only `verified` reviews** and is
     **omitted entirely** when none. *(These two are live leaks today; the build must fix them as part of this gate
     — gating `/work` while the homepage advertises `TODO:` projects and fake reviews is internally inconsistent.)*
- **`robots: noindex` is MANDATORY while gated, not optional.** Sitemap omission is only a hint; `robots.ts` allows
  `/`, and `FeaturedWork`/external links can still expose `/work`. So the gated `/work` (and the empty state)
  **must emit `robots: { index: false, follow: false }`**. The project's `buildMetadata` has **no `robots` param
  today** — it must be **extended** (add `robots?: Metadata["robots"]`) so this is expressible through the one
  builder (per soo-seo-local rule 1).
- **`outcome` is not free proof.** The existing `outcome` lines ("Coverage across every entrance and till…") are
  **authored result claims tied to projects that don't exist**, and the first draft piped `outcome` straight into
  the `<meta description>`. That leaks an unsubstantiated claim into Google. So: **(a)** add a per-entry
  `outcomeConfirmed: boolean` to `isPublished`; **(b)** the case-detail meta description derives from a **neutral
  `summary`** (what was installed, where) — **never** `outcome`; **(c)** treat every authored caption as `TODO:`
  until a human confirms it describes a real install, and run visible/structured strings through the same
  `resolved()` TODO-sentinel discipline `src/lib/schema.ts` already uses.
- **Never fake testimonials / never fabricate proof schema.** The case-detail result quote (§B4) renders only from a
  per-case `quote` with `verified: true`. **No `Review`/`AggregateRating` JSON-LD** anywhere (we have no verified
  reviews — rating schema would be a Google-policy/trust violation). Add `verified: true` to the `Testimonial` type
  so the homepage carousel can enforce the same rule.
- **Build guard (net-new — the real backstop).** Neither this guard nor the referenced NAP guard exists in code yet
  (the NAP guard is a `soo-qa-gates` snippet, logged "not wired"). Build **both**:
  `assertWorkContentResolvedForProduction()` throws the prod build if **any surface that imports `caseStudies`**
  (homepage `FeaturedWork` + `/work`) would render an entry with a `TODO:` title, a missing cover, or an
  unconfirmed outcome. It is the guarantee; nav/sitemap/page/robots derive from the same predicate.
- Carryover TODOs: NAP phone/city/hours (CTA "Call Now"), Cabinet Grotesk `.woff2`, the deep-navy footer (home.md).

`TODO:` strings show in **non-prod only** (team preview); the gate + guard keep them out of production.

---

## 0. Art direction (page-wide)

Bright OKLCH system; Work is the **most image-forward** page, so surfaces step back and photography carries it.
Electric-blue is rationed to **the active filter pill, the result-quote accent rule, the before/after handle, CTAs,
and focus rings**. Blue never tints the imagery.

- **One noun: "Recent installs."** Use it consistently across the eyebrow, the populated H1, and the empty-state H1
  so the two states read as one page at two moments — not three near-synonyms ("Recent work" / "Installs we're proud
  of" / "Recent installs"). **Count-aware copy:** the populated H1/lead are driven by the *resolved published count*
  (singular vs plural; don't claim "installs across commercial and residential properties" until ≥1 of each
  segment is published — the content layer resolves what's true, the view presents it).
- **Rhythm:** `py-20 md:py-28 lg:py-32` at intro/CTA; gallery `gap-4 md:gap-6`. `mx-auto w-full max-w-6xl px-6`;
  gallery widens to `max-w-7xl`; case-read column `max-w-[68ch]`.
- **The close:** electric-blue `CtaBand` → the (pending) deep-navy footer.

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on Work |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | Page background |
| Headings / body-strong | `--foreground` | `oklch(0.255 0.045 264)` | H1–H3, captions, quote |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Tile frame, **lightbox control chips**, detail blocks |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Active pill, quote rule, before/after handle, CTA, ring |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on active pill + CTA |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Inactive pill, segment tag |
| Quiet-surface text | `--secondary-foreground` | `oklch(0.305 0.05 264)` | Tag text, inactive pill label |
| Hover wash | `--accent` | `oklch(0.93 0.045 250)` | Tile hover scrim, pill hover |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Lead, captions, lightbox counter |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Borders |
| Lightbox dimmer | navy `/ alpha` | `oklch(0.21 0.03 264 / 0.86)` | The viewer scrim — a **deliberate brand exception** (a "dimmer," not generic black); raised alpha for legibility; **controls do NOT rely on it for contrast** (see below) |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Focus on **light surfaces**; on the scrim, controls use their own chip surface (below) |

Shadows: `shadow-soft` · `shadow-card` · `shadow-elevated` · `shadow-glow` (**primary CTA only**). Radius: tiles
`rounded-xl`; lightbox panel/control chips `rounded-2xl`/`rounded-full`; pills `rounded-full`.

### Type scale (with the contrast fix)

| Element | Family | Size | Weight | Color |
|---|---|---|---|---|
| Page H1 (overview + detail hero) | `font-display` | `clamp(2.25rem,5vw,3.75rem)` | bold | `--foreground` |
| Section H2 | `font-display` | `clamp(1.75rem,3.5vw,2.75rem)` | bold | `--foreground` |
| Tile caption / H3 | `font-display` | `text-base → text-lg` | semibold | `--foreground` |
| Result pull-quote | `font-display` | `clamp(1.5rem,3vw,2.25rem)` | medium | `--foreground` |
| Eyebrow / segment tag | `font-display` | `text-xs → text-sm` | medium, uppercase, `tracking-widest` | `--primary` / `--secondary-foreground` |
| Body / caption / lead | `font-sans` | `text-base → text-lg` | regular, ≤`max-w-[68ch]` | `--muted-foreground` |
| **Active filter pill label** | `font-sans` | **`text-base`, `font-semibold`** | — | `--primary-foreground` on `--primary` |

> **Pill contrast fix:** `--primary-foreground` on `--primary` derives to ≈**4.71:1** — a thin 0.21 margin for
> *small* text that may not survive cross-browser OKLCH→sRGB gamut mapping. So the active pill label is **`text-base
> font-semibold`** (nearer large-text tolerance), and the pass must be **re-measured composited at build**, not
> asserted. Fallback if axe fails: a lighter active wash with **dark `--foreground` text** instead of blue-on-blue.

### Motion language (see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22,1,0.36,1]`** from **`@/lib/motion`** (the real export — not `EASE`).
- **Masonry stagger (load):** published tiles reveal via the shared `RevealOnScroll`, stagger `index*0.05s`.
- **Filter re-layout (signature):** Commercial/Residential filter re-packs via Motion's **`layout`** prop +
  `AnimatePresence` (enter/exit fade-scale). **User-initiated → inside the 500ms input window → not counted in CLS.**
  *(Note: `layout`/`layoutId`/`AnimatePresence` are first-time-in-codebase; validate.)*
- **Lightbox:** zoom-open from the tile (`layoutId`); **photo-to-photo cross-fade**; scrim fades in.
- **Before/after drag:** `transform`-based reveal; keyboard steps (no layout thrash).
- **Reduced motion — per-leaf `useReducedMotion()` is the guarantee** (`<MotionConfig reducedMotion="user">` does
  **NOT** suppress `opacity`). Under reduced motion: tiles render in place (no stagger); filter **snaps** (no
  `layout` tween); lightbox **opens instant AND the photo-to-photo cross-fade is suppressed** (instant swap); the
  before/after is direct (no auto-sweep — never auto-demo it). Lenis/GSAP already bail.
- **Animate `transform`/`opacity` only — never `backdrop-filter`.** The scrim is solid translucent navy, not blur.

### Server/client boundaries + component tiers (see soo-component-patterns)

Pages + static sections are **Server Components**. `"use client"` leaves only:
- **`sections/work-gallery.tsx`** (filter state + `layout` reflow) — sections tier.
- **`shared/lightbox.tsx`** + **`shared/before-after-slider.tsx`** — shared client leaves (reused by overview §A4
  and detail §B3/§B5), so they live in `shared/`, not `sections/`.
- existing `RevealOnScroll` / `Magnetic`.
- **`src/lib/work.ts`** holds `isPublished` / `hasPublishableWork`; **`src/lib/nav.ts`** holds `visibleNav` — both
  **pure, serializable, hookless** so the client `Header`/`MobileNav` *and* the server `Footer` (the existing
  `src/components/layout/` tier) can all import them. No copy hardcoded in JSX — all from `case-studies.ts` + `SITE`.

---

# Part A — Work overview (`/work`) — "Recent Installs"

## A1. Hero / intro

Page root is **`<main id="main-content" tabIndex={-1}>`** (this page drops `PageShell`, so it owns the single
`<main>` landmark + skip-link target). Intro `max-w-3xl px-6`, `py-20 md:py-28`: eyebrow "Recent installs" + H1 +
count-aware lead.

- **H1** = the single `<h1>` + **LCP text** (never `opacity:0`). Populated copy is **count-aware** ("A recent
  install" vs "Recent installs"); do not over-claim breadth before it's published. **Mobile:** single column.

## A2. Filter pills (Commercial / Residential)

A `role="group" aria-label="Filter installs"` of three `<button aria-pressed>`: "All" · "Commercial" ·
"Residential" (client, part of `WorkGallery`).

- **Single-active invariant:** exactly **one** `aria-pressed="true"` at a time; selecting one un-presses the others
  (a toggle-button group used as a filter, per APG — deliberate over radiogroup). Active = `bg-primary
  text-primary-foreground` (fill + state, not colour only) with the `text-base font-semibold` label; inactive =
  `bg-secondary text-secondary-foreground hover:bg-accent`. ≥44px, visible focus ring, keyboard-operable.
- **Live count:** a **persistently-rendered** (empty-but-present) `aria-live="polite"` element reads "N installs",
  updated on filter. Filtering never hides content from crawlers (the published set is server-rendered; filter only
  toggles client visibility).

## A3. Masonry gallery + stagger + filter re-layout

- **Renders `caseStudies.filter(isPublished)` ONLY** — never the raw array. **No placeholder/empty tiles on any
  reachable state.** (A half-filled content set must never put a `TODO:`/cover-less tile under the populated H1; if
  nothing is published, the page is the §A5 empty state, full stop.)
- **Layout:** **grid masonry** (1→2→3 cols), each tile carrying an **explicit `aspect-*` box** derived from its
  `cover` dims (a tile with no resolvable aspect falls back to `aspect-[4/3]` — heights are reserved up-front, so no
  CLS). Grid (not CSS `columns`, which can't animate reflow and breaks `layout`). `gap-4 md:gap-6`.
- **Tile:** `rounded-xl overflow-hidden border border-border bg-card shadow-card`; the `cover` photo (`next/image`,
  explicit `width`/`height`, descriptive `alt`); hover scrim (decorative, `aria-hidden`) revealing a short caption +
  segment tag. The whole tile is a **link to `/work/[slug]`** when the entry is a published case study (has a
  narrative), else a **button** opening the lightbox. One affordance per tile.
- **Motion:** stagger on load; **filter → `layout` reflow**; reduced-motion → snap.
- **A11y:** tiles are real buttons/links in source order with accessible names; images have meaningful `alt`. An
  `sr-only` H2 "Recent installs" anchors the gallery region under the H1.

## A4. Lightbox (keyboard-accessible) — the a11y-critical widget

- **Use the platform where possible:** render the dialog via **native `<dialog>` + `showModal()`** (top-layer +
  inert background for free) **or**, if hand-rolled, **portal to `document.body`** AND mark the rest of the page
  **`inert`** (with `aria-hidden` fallback) while open. `role="dialog" aria-modal="true"` + `aria-label` (the photo
  caption).
- **Controls do NOT rely on the scrim for contrast.** Each control (prev / next / close) is a **solid `bg-card`
  chip** (`rounded-full`, ≥44px) with a `--foreground`/`--primary` glyph — so the control text **and its focus
  ring** are evaluated against a **known light surface** (`primary-fg`-on-`card` ≈4.71:1, `ring`-on-`card` ≈4.88:1,
  both verified), **not** against the variable composited scrim (where a blue ring fails 3:1 over bright photos).
  The control focus style uses **`ring-offset` = the chip surface**, not `ring-offset-background`.
- **Keyboard (full):** **initial focus → the Close button** on open; focus **traps** in the dialog; **Esc** closes;
  **← / →** navigate; **Tab** cycles controls; **focus returns to the originating tile** on close. Labelled controls
  ("Previous photo" / "Next photo" / "Close").
- **Body-scroll-lock is library-independent:** lock via **`overflow:hidden` (+ scrollbar-gutter compensation) on
  `<body>`**, restored on close — **not** `lenis.stop()` (Lenis doesn't exist under reduced motion, so a
  Lenis-only lock silently no-ops and the background scrolls).
- **Mobile swipe:** touch left/right = prev/next, **but the swipe handler must not `preventDefault` during an active
  screen-reader session** (so VoiceOver swipe-nav + the visible prev/next buttons both keep working). Counter "3 /
  12" in `aria-live="polite"`.
- **Motion:** zoom-open (`layoutId`) + cross-fade; **reduced-motion → instant open, no zoom, no cross-fade.**

## A5. The empty state — "Recent installs, coming soon" (the actual ship, designed for real)

While `!hasPublishableWork`, `/work` renders this **inside the same single `<main id="main-content" tabIndex={-1}>`,
owning the sole `<h1>`** (it must not also render PageShell's `<main>`). It is a real, useful moment — not a sad
dead-end:

- `max-w-3xl px-6`, `py-20 md:py-28`. Eyebrow "Recent installs" + **H1 "Recent installs, coming soon"** + an honest
  line ("We're photographing recent local installs for this gallery. In the meantime — here's exactly what we do and
  where."). Then a **compact, real "what we do" strip**: 3–4 service links (reusing service content) as quiet cards,
  and the dual CTA ("Explore services" → `/services`, "Get a free quote" → `/contact`).
- **No testimonials, no project cards, no numbers, no segment-tagged placeholder plates.** Truthful and thin by
  design — which is *why* it is also `robots: noindex` + out of the sitemap.

## A6. CTA band → Footer

`CtaBand` — "Want results like these on your property?" + dual CTA ("Get a Free Quote" + the baked-in "Call Now",
which resolves to **`SITE.contact.phoneHref`** — currently the NAP `TODO:` placeholder; the NAP guard, **once built
and wired** (it isn't today), will fail the prod build while unresolved). *(On the §A5 empty state, that state's
inline CTAs replace the band — one ask.)*

---

# Part B — Case-study detail template (`/work/[slug]`)

`generateStaticParams` runs **only over `isPublished` entries**; `dynamicParams = false`. No published entries → no
detail pages. One template per entry.

## B1. Hero

`<main id="main-content">` root. Eyebrow breadcrumb "Work / {title}" ("Work" links to `/work`); H1 = title (the
page's `<h1>` + LCP text); a one-line **`summary`** + segment tag; a contained cover image (explicit dims; `priority`
**only** if confirmed LCP). CTA "Start a project like this" → `/contact`. **`generateMetadata` description derives
from `summary`, never `outcome`.**

## B2. Challenge → Solution

Two blocks in the `max-w-[68ch]` column: H2 "The challenge" + `challenge`; H2 "What we did" + `solution`. Honest,
specific, no invented metrics. Reveals once.

## B3. Install gallery (lightbox)

A grid of the project's `gallery` photos, each a `next/image` (dims + alt) opening the **same `shared/lightbox.tsx`**
(scoped to this project). Keyboard + reduced-motion identical to §A4.

## B4. Result pull-quote (verified only)

Renders **only if** `cs.quote?.verified === true`. A `font-display` pull-quote with a `border-l-2 border-primary
pl-6` accent rule + "— {author}, {role}". **No verified quote → the section does not render** (nothing substituted;
the global placeholder `testimonials.ts` is never used here).

## B5. Before / after slider (fast-follow — only when a real pair exists)

The template leaves a slot; the slider is built when an entry actually has `beforeAfter.before` + `beforeAfter.after`
(per Build scope — no speculative interaction for absent content). When built:

- **Visual:** two images in a fixed `aspect-[16/10]` frame; the "after" clipped by a draggable divider; a
  `rounded-full` ≥44px handle; "Before"/"After" labels. Pointer drag / track-click move the reveal via `transform`.
- **Keyboard (full):** handle is **`role="slider"`** with `aria-valuemin="0" aria-valuemax="100" aria-valuenow` **and
  `aria-valuetext`** that conveys *meaning*, e.g. "60% of the after image shown" (a bare percentage is meaningless
  for an image reveal). `aria-label="Reveal the install — before and after"`, `tabindex="0"`; ←/→ ±2%, Home/End
  0/100, PageUp/Down ±10%; visible focus ring.
- **SR comprehension:** **both `<img>` are real, in-DOM, with fully descriptive alts** ("Before installation: …" /
  "After installation: …") so the delta is inferable without sight; a short prose line near the slider states *what
  changed*. Don't rely on the bare slider value.
- **Reduced motion:** no auto-sweep; the control is direct.

## B6. Related / back

Up to 3 other **published** installs (tile, link form) + "← All work" → `CtaBand`.

---

## Content model (`src/content/case-studies.ts` + `src/types`)

Existing `CaseStudy` = `{ slug, title, outcome, segment, image?, alt }`. Precise changes (the review flagged
`cover` as an undefined rename):

| Field | Shape | Decision |
|---|---|---|
| `slug`, `title`, `segment` | (existing) | `title` is `TODO:`-gated |
| `cover?` | **new** `CaseStudyImage` = `{ src; alt; width; height }` (define this type in `src/types`) | the tile + hero image; **presence drives the gate.** `cover.alt` is the image alt |
| `image?`, `alt` | (existing) | **keep for back-compat** (homepage `FeaturedWork` reads `.alt`/`.title`/`.segment`/`.outcome`, never `.image`); new work uses `cover`. Don't break the rename — `cover` is **additive**, `image`/`alt` stay until `FeaturedWork` migrates |
| `summary?` | **new** `string` | neutral install description → meta description + hero line (**replaces `outcome` in machine-readable surfaces**) |
| `outcome` | (existing) | demoted to an **optional human-facing caption**, gated by `outcomeConfirmed`; **never** the meta description |
| `outcomeConfirmed?` | **new** `boolean` | part of `isPublished`; false until a human confirms the caption is true |
| `challenge?`, `solution?` | **new** `string` | detail narrative |
| `gallery?` | **new** `CaseStudyImage[]` | §B3 |
| `beforeAfter?` | **new** `{ before: CaseStudyImage; after: CaseStudyImage }` | §B5 (fast-follow) |
| `quote?` | **new** `{ text; author; role; verified: true }` | §B4 — verified only |

Also add **`verified?: true`** to the existing `Testimonial` type so the homepage carousel can filter to verified
reviews (and omit the section when none).

- **Components — tiers pinned:** `sections/` → `WorkGallery`, `WorkTile`, `CaseStudyHero`/blocks, `WorkEmptyState`;
  `shared/` → `Lightbox`, `BeforeAfterSlider`; `lib/` → `work.ts` (`isPublished`/`hasPublishableWork`), `nav.ts`
  (`visibleNav`). Reuse `SectionHeading`, `RevealOnScroll` (already has the `from` prop — reuse, don't fork),
  `Magnetic`, `CtaBand`, `next/image`, seo/schema helpers.
- **Heading levels:** overview H1 + `sr-only` H2 "Recent installs" + tile captions H3; detail H1 → H2 (challenge /
  what we did / results) → H3 (gallery/related). No skips. The empty state owns the sole H1.

---

## SEO (see soo-seo-local)

- **`buildMetadata` must gain a `robots?: Metadata["robots"]` param** (it has none today). Gated `/work` (and the
  empty state) emit **`robots: { index: false, follow: false }`** — **mandatory while gated** (sitemap omission
  alone does not prevent indexing; the root layout sets index:true globally, and `FeaturedWork` links to `/work`).
- **Metadata:** overview `export const metadata` (or `generateMetadata` to branch robots on the gate); detail
  `generateMetadata` awaiting `params`, **description from `summary`** (not `outcome`).
- **JSON-LD:** `breadcrumbSchema` only. **No `Review`/`AggregateRating`.** Any future case-study `ImageObject`/
  `CreativeWork` must pass strings through the `resolved()` TODO-sentinel discipline (`schema.ts`) and **must never
  serialize `outcome` as a result claim.** **LocalBusiness inherited from the `(marketing)` layout — do NOT
  double-inject.**
- **Image SEO:** every `next/image` has explicit `width`/`height` (CLS) + descriptive `alt`. AVIF/WebP configured.

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy from `case-studies.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- **No fabricated proof, site-wide:** `/work` gallery renders `filter(isPublished)` only; homepage `FeaturedWork`
  renders `filter(isPublished)` only (honest teaser if empty); homepage `Testimonials` renders `verified` only
  (omitted if none); `outcome` never reaches `<meta>`/JSON-LD; no rating schema. The build guard fails prod if any
  rendered case-study title is `TODO:` / cover-less / outcome-unconfirmed on **any** surface. `robots: noindex`
  while gated. NAP guard (net-new) applies to the CTA.

### 2. WCAG 2.2 AA
- **One `<main>` + one `<h1>`** in **both** the full and empty states (the empty state renders inside the same
  `<main id="main-content">` and owns the sole H1; no doubled `<main>`).
- **Filter pills:** `role="group"`, single `aria-pressed="true"`, keyboard-operable, ≥44px, persistent `aria-live`
  count.
- **Lightbox:** native `<dialog>`/portal + **`inert` background**, focus-trap, **initial focus = Close**, Esc, arrow
  nav, focus restore, **solid `bg-card` control chips** (so text + focus ring meet AA against a known surface, not
  the scrim), `ring-offset` = chip surface, body-scroll-lock via `<body> overflow:hidden` (not Lenis), swipe that
  doesn't block SR gestures.
- **Before/after:** `role="slider"` + `aria-valuemin/max/now` + **`aria-valuetext`** + label; arrow/Home/End/Page
  keys; both images real in-DOM with full alts + a prose "what changed"; visible focus ring.
- **Contrast (derived from exact tokens; re-measure composited at build):**
  - `--foreground` on `--background`/`--card` ≈ **15.15 / 15.5:1** ✓.
  - `--muted-foreground` on `--background` ≈ **5.28:1**, `--card` ≈ **5.46:1**, `--secondary` ≈ **4.77:1** ✓.
  - **active pill** `--primary-foreground` on `--primary` ≈ **4.71:1** — **thin; label is `text-base font-semibold`
    and must re-pass axe** (fallback: dark text on a lighter active wash).
  - **CTA** `--primary-foreground` on `--primary` ≈ **4.71:1** ✓.
  - **lightbox controls** `--primary-foreground`/`--foreground` on the **`bg-card` chip** ≈ **4.71 / 15.5:1** ✓, and
    the **focus ring on the chip** ≈ **4.88:1 ✓** — controls are NOT evaluated against the scrim (the blue ring fails
    3:1 over bright photos behind a translucent scrim, so the scrim never carries a control's contrast).
  - eyebrow / quote rule / before-after handle `--primary` on `--background` ≈ **4.71:1** ✓ (handle also ≥3:1 as a
    non-text object).
  - **Never** `--primary` body text on `--secondary` (≈4.25:1, fails).
- **prefers-reduced-motion:** tiles static, filter snaps, lightbox instant-open **and cross-fade suppressed**, no
  before/after auto-sweep, no smooth-scroll — each via the leaf's own `useReducedMotion()`.
- **Target size AA:** pills, tiles, all lightbox chips, the before/after handle ≥44px.
- **Tooling:** axe **zero serious/critical**; manual keyboard pass per widget (tile→Enter→lightbox→arrows/Esc→focus
  restores; Tab to handle→arrows move + `aria-valuetext` announces).

### 3. Core Web Vitals (per route)
- **LCP < 2.5s** — H1 **text** is LCP; only the first 1–2 above-fold tiles `priority`, rest lazy; lightbox image
  loads on open; the empty state ships near-zero images.
- **INP < 200ms** — client JS limited to `WorkGallery` + `Lightbox` (+ later `BeforeAfterSlider`); events +
  IntersectionObserver; pointer drag is `transform` only.
- **CLS < 0.1** — **every tile carries an explicit `aspect-*` box** (from cover dims, else `aspect-[4/3]`); the
  filter `layout` reflow is input-triggered (500ms-excluded); fonts via `next/font`; no `backdrop-filter` animation.
- **First-load JS < 130KB** — Server Components by default; no 3D; image weight deferred (lazy + AVIF/WebP). Verify
  with `ANALYZE=true` build + Lighthouse + Speed Insights.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Gallery 1→2→3 cols; **mobile single column**; **lightbox swipeable**; before/after handle ≥44px and draggable on
  touch; filter pills wrap without overflow. `py` rhythm holds; **no horizontal scroll**; no clipped tiles.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — OKLCH renders; grid masonry + Motion `layout` reflow;
  **native `<dialog>`/portal + `inert` + body-scroll-lock + VoiceOver swipe** on iOS; before/after pointer +
  keyboard; reduced-motion paths render static.

### 6. Security headers / CSP
- Self-hosted images via `next/image` (no new origin). JSON-LD (breadcrumb) is the only added
  `dangerouslySetInnerHTML`. CSP / HSTS / X-Frame-Options DENY / nosniff / Referrer-Policy / Permissions-Policy
  intact.

---

## Open questions / TODO (logged in PROGRESS)

- **Real install photography + project facts** — ≥1 project with `cover` + `gallery` photos, a true
  challenge/solution `summary`, a **confirmed** `outcome` caption (`outcomeConfirmed`), and ideally a **verified**
  quote → flips `hasPublishableWork`, un-hides `/work` from nav + sitemap, drops `robots: noindex`, and lights up
  `FeaturedWork`.
- **Site-wide leak fixes (this build):** gate homepage `FeaturedWork` (publish-only / honest teaser) and
  `Testimonials` (verified-only / omit) — these render placeholder content today.
- **Before/after pairs** — capture matched shots; slider is a fast-follow gated on real pairs.
- **Verified reviews** — attributable, consented reviews only (add `verified` to `Testimonial`).
- **`buildMetadata` `robots` extension + the two build guards** (NAP + Work) are net-new — build them.
- Carryover: NAP phone/city/hours; Cabinet Grotesk `.woff2`; deep-navy footer (home.md).

---

**Review note (v2):** four-lens adversarial review. Applied — made the honesty gate **site-wide** (homepage
`FeaturedWork` + `Testimonials` are live leaks of `TODO:` titles + placeholder reviews and must be gated, not just
`/work`); **`isPublished` renders the gallery filtered** (one real entry no longer exposes a wall of placeholders);
**gated `outcome`** (it was leaking into `<meta>` — now `summary` drives machine-readable text + `outcomeConfirmed`
gates publish); made **`robots: noindex` mandatory** and noted `buildMetadata` needs a `robots` param; fixed the
**lightbox focus-ring-on-scrim blocker** (solid `bg-card` control chips + scrim-context ring-offset), added **portal/
`inert` background isolation + named initial focus**, **library-independent body-scroll-lock**, and the
**cross-fade** to the reduced-motion list; added **`aria-valuetext` + full alts + prose** to the before/after and
**deferred it to a fast-follow**; bumped the **active pill to `text-base font-semibold`** (the 4.71:1 margin is thin);
removed **placeholder tiles from every reachable state** (no wireframe wall) and designed the **empty state as the
real ship**; unified the page **noun ("Recent installs") + count-aware copy**; pinned **component tiers + a pure
`visibleNav`/`work.ts`**; and corrected the **`cover` vs `image` rename** to be additive/back-compatible.

**See also:** [home design](./home.md) · [about design](./about.md) · [services design](./services.md) ·
[solutions design](./solutions.md) · [industries design](./industries.md) ·
[soo-design-system](../../.skills/soo-design-system.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
