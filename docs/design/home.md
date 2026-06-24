# Homepage — Visual Design Spec

| Field | Value |
|---|---|
| **Page** | Home (`/`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v1 |
| **Date** | 2026-06-17 |
| **Status** | Design approved for build (no code in this doc) |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [PRD](../PRD.md) · [TRD](../TRD.md) · [PROGRESS](../../PROGRESS.md) |

This spec defines *what the homepage looks like and how it behaves*, section by section. It is the build
contract for the home page; implementation follows the skills above. No code here — only layout, typography,
OKLCH token usage, motion, 3D, interaction, and mobile behavior.

---

## Approval status & identity gate

**Approved for build of the SCAFFOLD** — structure, layout, motion, server/client boundaries, and accessibility.
**Final visual sign-off is gated** on real content replacing the placeholders, because premium-vs-template is
decided by content, not chrome — a high-craft frame around stock/placeholder content still reads as a template.

- **Headline** — `homeHero.title` ships the brand tagline **"Security You Can Trust"** (a `SITE.taglines` entry,
  per the brief) and is the single biggest identity lever. If the client prefers an offer-led, more specific line
  (e.g. "Cameras installed right, the first time"), it is one content edit — the H1 is content-driven.
- **Real local imagery, not stock** — hero/segment/work imagery must be **genuine job-site photography** (a real
  installer at a recognizable local building), never stock or studio renders. This is what separates a local
  specialist from a SaaS clone.
- **Place-specific signal** — surface the served area in the hero ("Serving `TODO: city / region`", optionally
  "since `TODO: year`"). Specificity, not polish, earns local trust.
- **Ration the accent** — electric-blue + navy + warm-white is a strong but common trust palette; keep blue a
  disciplined accent (CTAs, eyebrow, one icon, the CTA band, focus ring) and let real photography carry warmth —
  do not spray blue glow on every surface.
- **Gated items (all TODO — see §Open questions / PROGRESS):** confirmed H1 · ≥3 real job photos · real stat
  numbers · ≥3 verified reviews · partner logo SVGs · Cabinet Grotesk `.woff2` · real `camera.glb` (or a real
  install photo if the 3D ships as a primitive placeholder).

---

## 0. Art direction

**Bright, premium, trustworthy.** Warm near-white surfaces, deep-navy headings, electric-blue accents, and a
single 3D moment of depth in the hero. Generous whitespace, soft layered shadows (never heavy black drops), and
one deliberate dark anchor — the footer — to ground the page. The body is light end-to-end; depth comes from
shadow elevation and the hero render, not dark slabs.

- **Mood:** confident local specialist, not a faceless DIY brand. Calm, spacious, engineered.
- **Rhythm:** one idea per section, each a self-contained band with `py-20 md:py-28 lg:py-32` vertical rhythm
  and a centered `max-w-5xl px-6` content column (hero and footer widen to `max-w-7xl`). To avoid a uniform
  10-band stack (the template/AI tell), **at least two sections break the grammar**: Featured work uses
  edge-to-edge image cards (no border/box) and the Segment split uses larger, flatter tactile panels — not every
  surface is the same rounded, shadowed, fade-up tile, and one or two sections vary the reveal direction.
- **The one dark zone:** the footer (deep navy `--foreground` surface, near-white text). The CTA band directly
  above it is electric-blue. Everything between hero and CTA is bright. This is the only sanctioned dark slab —
  it caps the page; it is not a hero/section treatment (honors "bright not dark" in soo-design-system).
- **Contrast anchors:** electric-blue is used sparingly — CTAs, eyebrows, icon glyphs, the CTA band, focus
  rings — so it stays an accent, never wallpaper.

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on home |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | All section backgrounds (warm near-white) |
| Headings / body-strong | `--foreground` | `oklch(0.255 0.045 264)` | H1–H3, footer surface, deep-navy text |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Pillar / segment / work / testimonial cards |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Filled CTA, eyebrows, icon glyphs, CTA band, ring |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on blue CTA / CTA band |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Partners strip, stats band fill |
| Hover wash | `--accent` | `oklch(0.93 0.045 250)` | Card hover wash, segment hover |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Subheads, body copy, captions |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Dividers, card borders, dotted grid |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every interactive `:focus-visible` |

Shadows (token utilities, never invent): `shadow-soft` (quiet lift) · `shadow-card` (resting card) ·
`shadow-elevated` (hover / pulled-forward) · `shadow-glow` (electric-blue accent halo — **reserved for the primary
CTA and the CTA band only**; card hovers lift to `shadow-elevated`, never glow, so the accent stays rare).
Radius: `rounded-lg` (14px) for cards/buttons, `rounded-xl` (18px) for elevated cards & the CTA band,
`rounded-full` for pills/badges.

### Type scale

| Element | Family | Size | Weight / tracking | Color |
|---|---|---|---|---|
| Hero H1 | `font-display` | `clamp(2.75rem, 6vw, 5rem)` | bold, `tracking-tight`, leading-[1.05] | `--foreground` |
| Section H2 | `font-display` | `clamp(1.75rem, 3.5vw, 2.75rem)` | bold, `tracking-tight` | `--foreground` |
| Card H3 | `font-display` | `clamp(1.25rem, 2vw, 1.5rem)` | semibold, `tracking-tight` | `--foreground` (or `--card-foreground`) |
| Eyebrow | `font-display` | `text-sm` | medium, `uppercase`, `tracking-widest` | `--primary` |
| Subhead | `font-sans` | `text-lg → text-xl` | regular | `--muted-foreground` |
| Body | `font-sans` | `text-base → text-lg` | regular, measure 60–75ch (`max-w-[68ch]`) | `--muted-foreground` |
| Stat number | `font-display` | `clamp(2.5rem, 5vw, 3.75rem)` | bold, `tracking-tight` | `--primary` |
| Micro / caption | `font-sans` | `text-sm` | medium | `--muted-foreground` |

**Fonts:** display = Cabinet Grotesk (brand intent) — currently **Space Grotesk** via `next/font` (Fontshare
`.woff2` pending, open question #15); body = **DM Sans**. Never Inter/Arial/Roboto for display. `next/font`
`display:swap` so text paints immediately (protects LCP + CLS).

### Motion language (global — see soo-motion-3d)

- One easing everywhere: **`EASE_OUT = [0.22, 1, 0.36, 1]`** (`lib/motion.ts`).
- **Section reveals:** `RevealOnScroll` — `opacity 0→1`, `y 24→0`, `0.6s`, `whileInView once`, `margin "-80px"`.
  Never re-animate on scroll-back.
- **Stagger:** sibling cards get an incrementing `delay` of `index * 0.08s` (≈0.06–0.1s/item).
- **Counters** use GSAP `ScrollTrigger` **once-play** (count up once on enter — see §6), never `motion/react` and
  never a reversible scrub; only the §5 process-timeline progress line genuinely scrubs.
- App is wrapped in `<MotionConfig reducedMotion="user">`; Lenis smooth-scroll is synced to the GSAP ticker and
  both bail under `prefers-reduced-motion`. **Animate `transform`/`opacity` only — never `backdrop-filter`.**
- **Reduced-motion:** every reveal renders statically, counters jump to final value, the timeline draws
  instantly, card tilt/magnetic disable, and the hero shows the static poster (no WebGL).

### 3D hero contract (see soo-motion-3d)

Reuses the existing `LazyCameraScene → CameraScene → CameraModel` + `SceneFallback`. The Canvas is a
`"use client"` leaf imported via `next/dynamic { ssr:false }` behind a `<Suspense>` poster, so **WebGL never
enters the home first-load bundle**. DPR clamped `[1, 1.5]`; `frameloop` pauses when scrolled off-screen;
low bloom (`intensity 0.35`, `luminanceThreshold 0.85`) on the lens only. Subject = primitive "bullet camera"
(cylinder body + sphere lens + emissive blue IR-ring) until `/models/camera.glb` lands. **Mobile and
reduced-motion render the static poster**, never the Canvas. The Canvas wrapper is `aria-hidden` (decorative;
the H1 carries the meaning).

### Server/client boundaries (see soo-component-patterns)

The page and every section are **Server Components**. `"use client"` lives only at leaves: `RevealOnScroll`,
`Magnetic`, `Counter`, the segment-card tilt wrapper, the testimonials carousel, and the 3D Canvas. All copy is
typed in `src/content` (no hardcoded marketing strings in JSX). NAP comes only from `SITE.contact`.

### Page order (top → bottom)

```
Header (shell, sticky)                  ← already built
1  Hero (60/40 split, 3D right)
2  Partners strip
3  Segment split (Commercial | Residential)
4  Value pillars (4)
5  Process timeline (4 steps, scrub line)
6  Stats band (counters)
7  Featured work (3 cards)
8  Testimonials carousel
9  Trust badges (4)
10 CTA band  →  Footer (deep navy, shell)
```

---

## 1. Hero — 60/40 split

**Goal:** state the promise, earn trust in one glance, and route to a quote or a call. This is the LCP region.

**Layout (desktop ≥1024):** two columns inside `max-w-7xl px-6`, `lg:grid-cols-[60%_40%]`, vertically centered,
`py-20 lg:py-28`. Left 60% = text stack; right 40% = 3D camera.

```
┌───────────────────────────────────────── max-w-7xl ─────────────────────────────────────────┐
│  LOREX · HIKVISION · HILOOK  (eyebrow, blue)            ╭──────────────────────────────╮      │
│                                                         │   revolving 3D camera         │      │
│  Security You Can Trust            (H1, deep navy)      │   on light studio backdrop    │      │
│                                                         │   soft contact shadow         │      │
│  Professional camera installation for                  │   faint blue lens bloom        │      │
│  homes & businesses.              (subhead, muted)      ╰──────────────────────────────╯      │
│                                                              (SceneFallback poster on mobile)  │
│  [ Get a Free Quote ]  [ Call Now ]   (filled + outline)                                       │
│                                                                                                 │
│  ✔ Certified technicians  ·  ✔ Warranty assured  ·  ✔ Local support   (micro-trust row)         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Eyebrow:** `LOREX · HIKVISION · HILOOK` — `font-display text-sm uppercase tracking-widest text-primary`.
  Names from `SITE.partners`. Establishes partner credibility above the fold.
- **H1:** "Security You Can Trust" — the brand tagline (a `SITE.taglines` entry); **`homeHero.title` must be
  updated to this** (it currently holds a placeholder string — this is a content change, not already-present
  copy). Scale `clamp(2.75rem, 6vw, 5rem)` is an **intentional hero-only override** of the standard `h1` token
  (`clamp(2.25rem,5vw,3.75rem)`); the build updates `page.tsx`'s H1 to the hero scale. `font-display` bold,
  `tracking-tight`, `leading-[1.05]`, `text-foreground`. Desktop **LCP element** (server-rendered text, font `swap`).
- **Subhead:** "Professional camera installation for homes & businesses." — `text-lg md:text-xl`,
  `text-muted-foreground`, `mt-6`, `max-w-[48ch]` (a deliberately tighter **lead** measure — not body prose, so
  the 60–75ch body rule does not apply here).
- **Dual CTA (`mt-8`, `gap-4`):**
  - Primary — filled: `bg-primary text-primary-foreground` `size-lg` `rounded-lg` `shadow-soft hover:shadow-glow`,
    wrapped in `Magnetic` (strength 0.25). Label "Get a Free Quote" → `/contact`.
  - Secondary — outline: `border-input bg-background text-foreground hover:bg-accent` `size-lg`. Label "Call Now"
    with a phone glyph → `tel:` `SITE.contact.phoneHref` (currently `TODO: phone number`).
- **Micro-trust row (`mt-8`):** three inline items with a small blue check glyph, kept **distinct from the pillars
  (§4) so trust isn't asserted in the same words** — a place signal "Serving `TODO: city / region`", "Free on-site
  survey", and "`TODO: N`-year warranty". `text-sm text-muted-foreground`, glyphs `text-primary aria-hidden`.
- **Background:** **ONE** quiet treatment — a subtle white→pale-blue radial **mesh** (`--background` →
  `--secondary`, top-right origin), static CSS, decorative, `aria-hidden`, behind content (`-z-10`), never
  animated. (Dropped the earlier mesh-*and*-dotted-grid stack — layering both behind the hero visual reads noisy;
  keep the right side calm so the camera/photo can breathe.)

**3D / hero visual (right 40%):** treat the camera as a **frameless, atmospheric element** — it sits in clean
space and may break the column edge, with a soft contact shadow and a faint blue lens bloom; **no card chrome and
no studio-sweep box** (a boxed object on a sweep reads like an e-commerce product thumbnail, not a brand moment).
Lighting via the Lightformer environment (no CDN fetch). **If the camera ships as the primitive placeholder (no
`/models/camera.glb`), use a real wide-angle install photo instead** — a low-poly grey camera reads cheaper than a
real photo. On mobile + reduced-motion → the static `SceneFallback` / photo poster (no WebGL).

**Motion:** **staggered load reveal** of the left stack on mount (not scroll) — eyebrow → H1 → subhead → CTAs →
micro-trust, each `opacity/y` with `EASE_OUT`, `delay` stepping `0.08s`. The 3D fades in once mounted. Reduced
motion → everything static.

**Interaction:** primary CTA is magnetic + lifts to `shadow-glow` on hover; both CTAs show the `--ring`
focus-visible ring; CTAs are keyboard-first and ≥44px tall.

**Mobile (<1024):** single column. **Static hero poster** (`SceneFallback`) above or below the text — never live
3D. CTAs stack **full-width** (`w-full`), primary first. Eyebrow may wrap; micro-trust row wraps to two lines.
H1 floors at `2.75rem`. No horizontal scroll at 375.

**A11y:** one `<h1>`; CTAs are real `<a>`/`<button>`; 3D wrapper `aria-hidden`; decorative bg `aria-hidden`.

---

## 2. Partners strip

**Goal:** reinforce that we install commercial-grade, name-brand hardware.

**Layout:** full-width band, `bg-secondary` (pale blue-tint, quiet), `py-12`. Centered row of the three partner
wordmarks (Lorex, Hikvision, HiLook) with a short `text-sm text-muted-foreground` lead-in ("Official partners")
left or centered. `max-w-5xl px-6`. Logos evenly spaced (`justify-between` / `gap-12`), wrap on small screens.

- **Typography:** lead-in `text-sm uppercase tracking-widest text-muted-foreground`; wordmarks rendered as
  brand text (real SVG logos are `TODO: brand asset pack` — until then, `font-display font-semibold` wordmarks).
- **Color / interaction:** logos rest **greyscale / muted** (`text-muted-foreground`, or `grayscale opacity-70`
  for image logos) → **full color on hover/focus** (`transition` to `text-foreground` / `grayscale-0 opacity-100`).
  Hover is `transform`/`filter`-cheap; no layout shift.
- **Motion:** the row reveals once with `RevealOnScroll` (self-disables under `prefers-reduced-motion`; no other
  motion). No per-logo animation beyond the hover/focus color.
- **Mobile:** wordmarks wrap to a centered 3-up or stacked row; tap doesn't trigger hover-only color (color is the
  resting state on touch — i.e. show full color on coarse pointers so touch users aren't stuck greyscale).
- **Content:** `SITE.partners[]` (`{ name, tagline }`). **A11y:** if logos become images, `alt` = brand name; the
  band is a `<section aria-label="Official partners">`.

---

## 3. Segment split — Commercial | Residential

**Goal:** let the visitor self-select and route to the right journey (the core PRD flow).

**Layout:** `max-w-5xl px-6`, `py-20 md:py-28`. Section heading (`SectionHeading`: eyebrow "Who we protect" + H2
"Built for your property") then **two big tactile cards** side by side (`grid md:grid-cols-2 gap-6`).

```
┌──────────────── Commercial ───────────────┐  ┌──────────────── Residential ──────────────┐
│  [icon badge: Building]                    │  │  [icon badge: House]                       │
│  Commercial                 (H3)           │  │  Residential                (H3)           │
│  Multi-camera coverage for retail,         │  │  Protect entrances, driveways, and         │
│  warehouse, and office sites.              │  │  family with a system designed for you.    │
│  Explore commercial →                      │  │  Explore residential →                     │
└────────────────────────────────────────────┘  └────────────────────────────────────────────┘
   (lifts + blue glow on hover)                     (lifts + blue glow on hover)
```

- **Cards:** `rounded-xl bg-card text-card-foreground shadow-card p-8`, generous height. Each: `IconBadge`
  (blue glyph on `bg-primary/10`), H3 (`Commercial` / `Residential`), one-line body (`text-muted-foreground`),
  and a "Explore →" affordance. The **whole card is a link** (commercial → `/industries`, residential →
  `/services`, or a segment-set route).
- **Typography:** H3 `clamp(1.25rem,2vw,1.5rem)` `font-display` semibold; body `text-base text-muted-foreground`.
- **Color:** resting `bg-card`. Hover wash toward `--accent` is optional; the lift + glow is the primary signal.
- **Motion / interaction (`"use client"` tilt leaf):** on hover, **lift** (`y: -4`, `transform-gpu`) + subtle
  **card tilt** (pointer-mapped `rotateX/rotateY`, capped ±6°) + **`shadow-glow`**. Spring back on leave.
  Reduced motion → no tilt/lift, hover only swaps to `shadow-elevated`. Reveals with `RevealOnScroll` (stagger 2).
- **Mobile:** stack to one column, full-width cards, comfortable `p-6`; tilt disabled on coarse pointers, tap
  navigates. Targets are the full card (≥44px).
- **A11y:** card link has an accessible name (the H3); icon `aria-hidden`; focus-visible ring on the card.

---

## 4. Value pillars — 4 cards

**Goal:** the four reasons to trust us (the brand pillars), scannable in seconds.

**Layout:** `max-w-5xl px-6`, `py-20 md:py-28`. `SectionHeading` (eyebrow "Why Soo Solutions" + H2 "Security,
done properly"), then a 4-up grid: `grid sm:grid-cols-2 lg:grid-cols-4 gap-6`.

- **Cards:** `rounded-lg border-border bg-card text-card-foreground shadow-card p-6`. Each = `IconBadge` (blue
  glyph), H3 title, one-line description.
  1. **Certified Technicians** — badge glyph `BadgeCheck`/`ShieldCheck`.
  2. **Expert Service** — `Wrench`.
  3. **Warranty Assured** — `ShieldCheck`.
  4. **Reliable Support** — `Headphones`/`LifeBuoy`.
- **Typography:** H3 `clamp(1.25rem,2vw,1.5rem)` `font-display` semibold `text-foreground`; body `text-sm
  text-muted-foreground`.
- **Color:** `IconBadge` = `bg-primary/10 text-primary` (paired, AA-safe); card `bg-card` with hairline border.
- **Motion / interaction:** cards reveal with `RevealOnScroll`, **staggered** `index * 0.08s`. Hover lifts to
  `shadow-elevated` (no tilt needed here — keep pillars calm). Reduced motion → static.
- **Mobile:** 1-col (375) → 2-col (≥640) → 4-col (≥1024). Even spacing, no clipping.
- **Content:** `SITE.pillars[]` (`{ title, description }`) + an icon name per pillar (mapped via an icon
  registry; the `Service`/pillar icon is a `LucideIcon`). **A11y:** decorative glyph `aria-hidden`; the title is
  the heading.

---

## 5. Process timeline — Assess → Recommend → Install → Support

**Goal:** make the engagement feel predictable and professional.

**Layout:** `max-w-5xl px-6`, `py-20 md:py-28`. `SectionHeading` (eyebrow "How it works" + H2 "From first visit
to ongoing support"). Desktop = a **horizontal** 4-step track with a connecting line that fills as you scroll;
each step a node + number + title + one-line body.

```
  ● ───────── ● ───────── ● ───────── ●         ← progress line fills left→right with scroll (scrub)
  01          02          03          04
  Assess      Recommend   Install     Support
  We survey   We design   Certified   Maintenance
  the site…   coverage…   install…    & support…
```

- **Typography:** step number `font-display` `text-sm` `text-primary` (or large ghost numeral); step title H3
  `clamp(1.25rem,2vw,1.5rem)` `font-display` semibold; body `text-sm text-muted-foreground`.
- **Color:** the track line is `--border`; the **filled portion is `--primary`**; active node `bg-primary`,
  upcoming nodes `bg-muted` with `border-border`.
- **Motion (scroll-scrub — the one genuine scrub):** GSAP `ScrollTrigger` with **`scrub`** drives the
  progress-line draw (`scaleX`/clip) and the node fill as the section passes through the viewport — this is a
  *progress indicator*, not a counter, so scrubbing both directions is correct and on-spec. Step titles/bodies
  still reveal once via `RevealOnScroll` (they don't re-animate on scroll-back). Lenis feeds the GSAP ticker.
  **Reduced motion:** the line renders fully drawn and all steps visible — no scrub.
- **Mobile:** switch to a **vertical** timeline (line down the left, nodes stacked); the scrub fills top→bottom.
  Single column, full-width step rows.
- **Content:** typed `processSteps[]` (`{ step, title, body, icon }`) in `src/content/home.ts`. **A11y:** render
  as an ordered list (`<ol>`); the scrub line is `aria-hidden` decoration; step order is conveyed by the list +
  numbers, not color alone.

---

## 6. Stats band — animated counters

**Goal:** quantify credibility (years, installs, response time, satisfaction).

**Layout:** full-width band, `bg-secondary` (quiet pale-blue) OR `bg-foreground` text-on-navy for a mid-page
accent — **default `bg-secondary`** to keep the body bright (the navy is reserved for the footer). `py-16 md:py-20`,
`max-w-5xl px-6`. A 4-up row: `grid grid-cols-2 md:grid-cols-4 gap-8`, each = big number + label.

```
┌──────────────────────────── bg-secondary ────────────────────────────┐
│   500+            12              24h              98%                 │
│   Installs        Years           Response         Satisfaction        │
│   (counter)       (counter)       (counter)        (counter)           │
└───────────────────────────────────────────────────────────────────────┘
```

- **Typography:** number `clamp(2.5rem,5vw,3.75rem)` `font-display` bold **`text-foreground`** (deep navy on the
  pale band ≈ 11:1 — comfortably AA); the **suffix** (`+`/`h`/`%`) renders in `text-primary` as the small blue
  accent. Label `text-sm uppercase tracking-wide text-muted-foreground`.
- **Color:** `bg-secondary`; numbers `--foreground` (navy, ≥11:1), suffix `--primary`, labels `--muted-foreground`
  (4.77:1). **Contrast note:** `--primary` electric-blue on `--secondary` is only **4.25:1** (fails the 4.5:1 body
  threshold) — so blue is *not* used for the full number, only the small bold suffix (AA-large, ≥3:1). A navy
  variant (`bg-foreground`) would need near-white numbers (`--primary-foreground`, 15:1), never blue (blue on navy
  ≈ 3.22:1).
- **Motion — counters animate ONCE:** uses the project `Counter` (`GSAP ScrollTrigger`, **once-play** on enter,
  `power2.out`, ~1.6s) — **not a reversible scrub.** Per soo-motion-3d a counter must animate once and never
  re-animate on scroll-back; this overrides the brief's loose "scrub" wording for *numbers* (true scrub lives in
  §5's progress line). Reduced motion → numbers render at final value immediately. Suffixes (`+`, `h`, `%`) are
  part of the value string.
- **Mobile:** 2×2 grid at 375, 4-up from `md`. Numbers stay legible (clamp floors at 2.5rem).
- **Content:** `stats[]` (`{ value:number, suffix, label }`) in `src/content/home.ts`. The project `Counter`
  renders `value + suffix` (**no prefix**), so placeholder examples are **suffix-only**: `500+`, `12` yrs, `24h`,
  `98%` — **`TODO: real numbers`**, non-prod only, confirm before launch (PROGRESS open questions). If a
  "<24h"-style prefix is ever needed, add an optional `prefix` prop to `Counter`. **A11y:** each stat is a
  labelled figure; the number's final value is its text content from first paint (screen readers read the
  resolved value, not "0").

---

## 7. Featured work — 3 case cards

**Goal:** proof. Three recent projects, link to `/work`.

**Layout:** `max-w-5xl px-6`, `py-20 md:py-28`. `SectionHeading` (eyebrow "Recent work" + H2 "Systems we've
installed") with a top-right "View all work →" link. Grid `grid md:grid-cols-3 gap-6`.

- **Cards (a deliberate rhythm break — edge-to-edge image cards):** the 16:9 project photo bleeds to the card
  edges with **no visible border**, copy below, so this grid doesn't read like the same bordered tile as pillars
  and badges. `rounded-xl bg-card shadow-card overflow-hidden`. Top = 16:9 project image (`next/image`, explicit
  width/height, descriptive `alt`) — **real photos are `TODO: brand asset pack`; until then a branded gradient
  placeholder** (same treatment as `SceneFallback`, `aria-label` describing the project). Body `p-6`: segment/
  industry tag (pill, `bg-accent text-accent-foreground rounded-full text-xs`), H3 project title, one-line
  outcome.
- **Typography:** title H3 `clamp(1.25rem,2vw,1.5rem)` `font-display` semibold; outcome `text-sm
  text-muted-foreground`; tag `text-xs font-medium`.
- **Color:** `bg-card`, tag `--accent`/`--accent-foreground`, image area neutral so it doesn't compete.
- **Motion / interaction:** reveal `RevealOnScroll` staggered; hover lifts to `shadow-elevated` and nudges the
  "→" / image scale `1.02` (`transform`, GPU; image `scale` inside `overflow-hidden`). Whole card links to the
  case study (`/work/[slug]`, Phase-2) or `/work`. Reduced motion → no scale/lift.
- **Mobile:** 1-col stack, full-width cards, image keeps 16:9. "View all work" sits below the grid as a full-width
  outline button.
- **Content:** typed `caseStudies[]` (`{ slug, title, outcome, segment, image, alt }`) — new
  `src/content/case-studies.ts`. **Project specifics + photos `TODO`.** **A11y:** card link named by the title;
  decorative placeholder `alt=""` / `aria-label` as appropriate.

---

## 8. Testimonials carousel

**Goal:** social proof in the customer's voice.

**Layout:** `max-w-5xl px-6`, `py-20 md:py-28`, `bg-background`. `SectionHeading` (eyebrow "In their words" + H2
"Trusted by local owners"). A **carousel** (shadcn/Embla `Carousel`) of quote cards — 1 visible on mobile, 2 on
`md`, with prev/next controls and dot indicators.

```
   ❝ Quote text in the customer's voice, two or three lines, calm and specific. ❞
     — Name, Role · segment
   ◀  ● ○ ○  ▶
```

- **Cards:** `rounded-xl bg-card shadow-card p-8`. Large opening quote glyph in `text-primary/30`; quote in
  `font-sans text-lg text-foreground`; attribution `text-sm text-muted-foreground` (name + role + segment).
- **Typography:** quote `text-lg md:text-xl` regular `text-foreground`, measure ≤60ch; attribution `text-sm`.
- **Color:** `bg-card`, quote glyph `--primary` at low opacity, controls `--primary` on hover.
- **Motion / interaction (`"use client"` Embla leaf):** slide transitions are short and `transform`-based;
  controls are real buttons (prev/next + dots), keyboard-operable (arrow keys, Tab to controls), and **pause/no
  autoplay by default** (no motion the user didn't ask for). The card group reveals once with `RevealOnScroll`.
  Reduced motion → no autoplay, instant slide changes.
- **Mobile:** 1 card visible, swipe + arrow controls, dots; controls ≥44px.
- **Content:** `SITE` / `src/content/testimonials.ts` — **currently clearly-labelled placeholders pending verified
  Google reviews (`TODO: testimonials`)**; real quotes replace them before launch. **A11y:** carousel is a
  labelled region with `aria-roledescription="carousel"`, controls have labels ("Previous / Next testimonial"),
  slides not hidden from AT mid-transition in a way that traps reading; respects reduced motion.

---

## 9. Trust badges — 4

**Goal:** a final reassurance row before the ask.

**Layout:** `max-w-5xl px-6`, `py-16`. A 4-up row of badge chips: `grid grid-cols-2 md:grid-cols-4 gap-4`.

- **Badges (product/coverage claims — deliberately distinct from the team/service pillars in §4, so trust isn't
  repeated in the same words):** `High Quality Products`, `24/7 Protection`, `Tailored Solutions`,
  `Customer Satisfaction`. Each = an icon glyph + label in a clean icon-over-label stack or a `rounded-lg` chip
  (`bg-card border-border shadow-soft`). **Note:** the existing `IconBadge` is a fixed **48px `rounded-lg`
  square** — for `rounded-full` chips, extend `IconBadge` with `size`/`shape` props, don't override ad hoc.
  Consider folding this row into the footer if the page reads trust-heavy (hero micro-trust + pillars + badges).
- **Typography:** label `text-sm font-medium text-foreground`; glyph blue.
- **Color:** `bg-card`, glyph `--primary`, hairline `--border`. Calm — these support, not shout.
- **Motion:** reveal once, staggered (self-disables under `prefers-reduced-motion`; no other motion); no hover
  animation beyond a slight `shadow-soft → shadow-card`.
- **Mobile:** 2×2 grid at 375, 4-up from `md`.
- **Content:** `SITE.badges[]` (4 strings) + an icon per badge. **A11y:** glyph `aria-hidden`; label is the text.

---

## 10. CTA band → Footer

**Goal:** convert, then close the page with the contact anchor.

**CTA band:** the existing `CtaBand` section — `bg-primary text-primary-foreground rounded-xl shadow-glow`,
`max-w-5xl px-6`, `py-20 md:py-28`. H2 "Ready to secure your property?" + one-line description, then dual CTA:
filled-white/secondary "Get a Free Quote" (→ `/contact`) and outline "Call Now" (→ `tel:`). The single bold blue
moment that signals the primary action. **(Recommended: sharpen the generic "Ready to secure your property?" to
something concrete — a free on-site survey, a response timeframe; `homeCta` is content-driven.)**

- **Typography:** H2 `clamp(1.75rem,3.5vw,2.75rem)` `font-display` bold; body `text-primary-foreground` (solid,
  no alpha — AA-verified at 4.71:1); buttons `size-lg`.
- **Color:** electric-blue band; on-blue text `--primary-foreground` (solid, 4.71:1). Primary CTA = the shadcn
  **`secondary` variant** as built (pale blue-tint surface on the blue band) — upgrade to a true near-white
  surface for maximum pop if desired. Secondary "Call Now" = outline with a faint `bg-primary-foreground/10` fill,
  so its **bounds are perceivable from the fill (≥3:1)** rather than relying on the border alpha. (The "solid
  tokens only" rule applies to **text** on colored bands; non-text borders may use alpha when verified ≥3:1.)
- **Motion / interaction:** band reveals with `RevealOnScroll`; primary CTA may be `Magnetic`; focus rings visible
  against blue. Reduced motion → static.
- **Mobile:** CTAs stack full-width, primary first.

**Footer (shell — the one dark anchor):** deep-navy surface (`--foreground` background, near-white text), widening
to `max-w-7xl`. Logo + tagline, Explore nav, Contact NAP (from `SITE.contact`, with `TODO:` phone/city/hours),
Official Partners, socials (when provided), legal nav + copyright. **This is the only dark slab on the page** — it
grounds the bright body. The current shell footer is light `bg-card`; **this spec upgrades the shared `Footer` to
the deep-navy treatment.** **This is a site-wide shell change (every page's footer changes) — review it against
all pages, not as a home-page side effect;** confirm it doesn't darken pages designed for a light footer. AA:
near-white on deep navy ≈ 15:1; footer "muted" text uses a lightened navy-tint (≥4.5:1), never `--muted-foreground`.

- **Typography:** headings `font-display` near-white; body/links `text-sm` lightened-navy → near-white on hover.
- **A11y:** `<footer>` landmark, labelled nav groups, NAP in an `<address>`, link focus rings visible on navy.

---

## Content model (typed in `src/content`)

No marketing copy in JSX — sections take typed props. New/updated content this page needs:

| Collection | File | Shape | Status |
|---|---|---|---|
| Hero + CTA copy | `home.ts` (extend) | `homeHero { eyebrowPartners, title, subhead }`, `homeCta { title, description }`, micro-trust items | title/cta present; extend |
| Segments | `home.ts` | `segments[] { key, title, body, href, icon }` (Commercial, Residential) | new |
| Process steps | `home.ts` | `processSteps[] { step, title, body, icon }` (Assess→Support) | new |
| Stats | `home.ts` | `stats[] { value:number, suffix, label }` | new — **`TODO: real numbers`** |
| Pillars | `SITE.pillars[]` + icon map | `{ title, description }` + `LucideIcon` | exists (SITE) |
| Badges | `SITE.badges[]` + icon map | `string` + `LucideIcon` | exists (SITE) |
| Partners | `SITE.partners[]` | `{ name, tagline }` | exists (SITE) |
| Case studies | `case-studies.ts` (new) | `{ slug, title, outcome, segment, image, alt }` | new — **`TODO` photos/projects** |
| Testimonials | `testimonials.ts` | `{ quote, author, role, segment }` | exists — **`TODO` real reviews** |
| NAP | `SITE.contact` | name/address/phone/email/hours | exists — phone/city/hours `TODO` |

**Components used:** existing — `LazyCameraScene`, `CtaBand`, `RevealOnScroll`, `Magnetic`, `Counter`,
`SectionHeading`, `IconBadge`, `GlassCard`, shadcn `Button`/`Card`/`Carousel`, shell `Header`/`Footer`. To build —
`SegmentCards` (tilt leaf), `ProcessTimeline` (scrub leaf), `StatsBand`, `FeaturedWork`, `Testimonials`
(carousel leaf), `TrustBadges`, `PartnersStrip`, `HeroSection`, plus an icon registry mapping content icon names
to Lucide components.

---

## SEO (see soo-seo-local)

- `export const metadata = buildMetadata({ title: "Security Cameras & CCTV Installation", description: SITE.description, path: "/" })`.
  Title ~50–60 chars, description ~150–160, human-written. `metadataBase` + title template live in the root layout.
- **JSON-LD:** the `(marketing)` layout already injects `localBusinessSchema()` (`@type
  "HomeAndConstructionBusiness"`) site-wide — the home inherits it; `TODO:` NAP is stripped by `resolved()` so no
  placeholder phone/city reaches structured data. No FAQ/Breadcrumb schema on home.
- **OG:** `app/opengraph-image.tsx` (`next/og`, 1200×630) supplies the social image.
- **Image SEO:** every `next/image` (work cards, future photos) has explicit `width`/`height` + meaningful `alt`;
  decorative visuals `alt=""`. AVIF/WebP already configured.

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy comes from `src/content` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- Placeholders ship in **non-prod only**: stats numbers, case-study photos/projects, testimonials, and NAP
  phone/city/hours are `TODO:` and listed in PROGRESS open questions. The `assertContactResolvedForProduction`
  NAP guard throws the production build while contact NAP is still `TODO:` — so placeholder contact can never ship.

### 2. WCAG 2.2 AA
- One `<h1>` (hero); landmarks `<header>/<main>/<footer>` + labelled `<nav>` / `<section>` per band; heading
  order h1→h2→h3 with no skips.
- Every interactive element keyboard-operable with a visible `--ring` focus-visible indicator; carousel/segment
  controls are real buttons; logical tab order; targets ≥44px for primary touch.
- **Contrast (derived from the exact OKLCH tokens — verified, not asserted):**
  - `--primary-foreground` on `--primary` (CTAs / CTA band): **4.71:1** ✓
  - `--foreground` on `--background` / `--card` (headings, body-strong): **15.15:1** ✓
  - `--muted-foreground` on `--background` / `--secondary` (subheads, labels): **≥4.77:1** ✓
  - **eyebrow** `--primary` on `--background` = **4.71:1**, on `--card` = **4.88:1** ✓ — small text passes, but
    little headroom; don't darken `--background` or lighten `--primary`.
  - **stats** `--foreground` (navy) number on `--secondary` ≈ **11:1** ✓; the small bold blue **suffix** is
    AA-large (≥3:1). `--primary` on `--secondary` is only **4.25:1**, so blue is **not** used for the full number.
  - `--accent-foreground` on `--accent`: **10.9:1** ✓ · footer near-white on navy ≈ **15:1** ✓
  - **Rule:** solid tokens for **text** on colored bands (no foreground-alpha fades); non-text borders/UI + focus
    rings ≥3:1 (alpha borders only when the boundary is verified ≥3:1).
- Decorative visuals (`SceneFallback`/Canvas wrapper, dotted-grid bg, timeline line, quote glyph) are
  `aria-hidden`/`alt=""`; informative images get descriptive `alt`.
- **prefers-reduced-motion:** every reveal static, counters jump to final, timeline drawn, tilt/magnetic off,
  hero shows the static poster (no WebGL), Lenis+GSAP ticker disabled.

### 3. Core Web Vitals
- **LCP < 2.5s:** the LCP element is the **hero H1 text** (server-rendered, `next/font swap`) on **both desktop
  and mobile** — the mobile hero poster is the CSS-gradient `SceneFallback` (no `<img>`, so not an image-LCP
  candidate), and the live 3D is `next/dynamic`-deferred. **If a real photo poster later replaces `SceneFallback`,
  it becomes the likely mobile LCP** — then ship it as a small sized AVIF with explicit dimensions and re-check
  (drop `priority` or budget it as the LCP). No render-blocking hero image today.
- **First-load JS < 130KB:** sections are Server Components; only the named leaves are `"use client"`. **3D is
  `next/dynamic { ssr:false }` — never in the home first-load bundle.** Verify with `ANALYZE=true` build.
- **CLS < 0.1:** all images have explicit `width`/`height` (or `fill` + sized parent); fonts via `next/font`; the
  3D frame reserves its `aspect-[4/3]` box; **no `backdrop-filter` animation** (glass is static).
- **INP < 200ms:** minimal client JS; counters/timeline are GPU `transform`/`opacity`; carousel is Embla
  (lightweight); no heavy synchronous work on interaction.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Hero 60/40 → single column <1024 with static poster + full-width stacked CTAs.
- Grids reflow: pillars 1→2→4, segments 2→1, stats 2→4, work 3→1, badges 2→4; carousel 1→2.
- `py-20/md:py-28/lg:py-32` rhythm holds; container gutters keep content off the edge; **no horizontal scroll, no
  clipping** at any checkpoint; hero H1 clamp floors at 2.75rem (375) and caps at 5rem (≥1920).

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — confirm **OKLCH renders** correctly and that
  **mobile/iOS falls back to the static poster** (no WebGL). The hero is content-height (not `100dvh`), so no
  dynamic-viewport handling is needed; if any band is later made viewport-height, add `min-h-dvh` + safe-area.

### 6. Security headers / CSP
- The page adds **no new third-party origins** beyond what `next.config.ts` already allow-lists (Vercel insights,
  Turnstile, Google Maps frame, fonts). 3D, fonts, and analytics are self-hosted/allow-listed. CSP / HSTS /
  X-Frame-Options DENY / nosniff / Referrer-Policy / Permissions-Policy stay intact; the only
  `dangerouslySetInnerHTML` is the JSON-LD `JSON.stringify` from `lib/schema`.

---

## Open questions / TODO (logged in PROGRESS)

- **Confirm the H1** — "Security You Can Trust" (brand tagline) or a more specific offer-led line (biggest identity lever).
- **Real local job-site photography** (installer at a recognizable local building) for hero / segments / work — not stock.
- **Place-specific signal** for the hero — served city / region (+ "since [year]").
- Stats band — **real numbers** (installs, years, response time, satisfaction).
- Featured work — **real projects + photos** (and whether `/work/[slug]` detail ships now or Phase-2).
- Testimonials — **verified Google reviews** to replace placeholders.
- Hero/section **photography & partner logo SVGs** (brand asset pack).
- NAP — **phone, exact city/region/postal, business hours, correct email spelling** (blocks the prod NAP guard).
- Display font — **Cabinet Grotesk `.woff2`** to replace the Space Grotesk substitution (treat the display face as an identity decision, not just a swap).
- Real **`/models/camera.glb`** to replace the primitive bullet-camera hero.

---

**See also:** [PRD](../PRD.md) (home page goals & journeys) · [TRD](../TRD.md) (architecture, budgets) ·
[soo-design-system](../../.skills/soo-design-system.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
