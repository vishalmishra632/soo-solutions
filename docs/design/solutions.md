# Solutions — Visual Design Spec (segment switch + comparison table)

| Field | Value |
|---|---|
| **Page** | Solutions (`/solutions`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v2 (adversarially reviewed — design-critic + a11y/qa-gates + skills/codebase + factual-honesty; all blockers + majors applied) |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build (no code in this doc) |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home](./home.md) · [about](./about.md) · [services](./services.md) · [PRD](../PRD.md) · [TRD](../TRD.md) · [PROGRESS](../../PROGRESS.md) |

The Solutions page answers one question: **"what does a system for *my kind of property* actually look like?"**
A segment switch (**Commercial | Residential**) swaps two solution stacks with a smooth cross-fade, and a calm
comparison table positions the three brands (Lorex / Hikvision / HiLook) so a visitor can self-select a tier.
No code — only layout, typography, OKLCH token usage, motion, interaction, and mobile behavior.

**Voice:** consultative and plain. Home sells the brand, About sells the people, Services lists the work — **Solutions
helps you choose.** It is the most *decision-support* surface on the site, so clarity and honest comparison beat
spectacle.

**Break-the-grammar note (from the About review):** Services is a card grid; the homepage is a scroll narrative.
Solutions must not read as a third card grid. Its two signature devices are intentionally distinct: a **segmented
switch over a layered "system spine"** (a continuous vertical rail the numbered layers sit *on*, like a transit
line — not stacked cards) and a **flat, edge-led comparison table** (full-bleed header band, no outer card radius).
Neither appears anywhere else on the site.

---

## Approval status & identity gate

**Approved for build of the SCAFFOLD** — layout, motion, interaction, server/client boundaries, accessibility.
**Final visual sign-off** is gated on content + factual confirmation (this is the page's highest-risk area):

- **New content file required.** No `src/content/solutions.ts` exists yet; §"Content model" defines it. Author it.
- **The comparison table must be true before it ships.** Cells are **conservatively cross-checked against the real
  `products.ts` feature strings** — a `✓` is only shown where a brand *literally lists* that feature; `Partial`
  only where a weaker-but-real feature exists; a brand with **no listed feature for a row shows `—` (Not listed)**.
  **We never invent a `Partial`.** The honest default is therefore safe even if shipped as-is. Upgrading any `—`
  to `✓`/`Partial` requires confirmed distributor spec sheets — flagged **`TODO: confirm brand-capability claims
  with the client / distributor`**. False comparison claims about third-party brands are a trust/legal problem, not
  a copy nit (see soo-seo-local: no fabricated claims).
- **Two commercial layers describe offerings not yet in the catalog** — **Video Analytics** and **Access Control**
  appear in neither `services.ts` nor `products.ts`. They are kept as design slots but flagged
  **`TODO: confirm Soo Solutions actually delivers these`**, with honest fallback copy specified in §2. The old
  "24/7 Monitoring" wording (which implied a staffed monitoring centre the company does not run) is **reworded** to
  "24/7 Recording & Remote Viewing" — a capability the catalog *does* support.
- Carryover TODOs: NAP phone/city/hours (CTA "Call Now" currently resolves to the placeholder `tel:+10000000000`),
  Cabinet Grotesk `.woff2`, the deep-navy footer (site-wide upgrade owned by home.md).

Placeholders render as visible `TODO:` strings in **non-prod only**.

---

## 0. Art direction (page-wide)

Same bright OKLCH system as the rest of the site. Solutions is **decision-support**, so it leans on hierarchy,
honest comparison, and calm whitespace — electric-blue is rationed to the **active segment pill, the layer-spine
nodes, plain check glyphs, CTAs, and focus rings**. Surfaces are `bg-card` / `bg-background`; blue never becomes a
panel fill except the active segment pill and the closing CTA band. **The `bg-primary/10` tint is used for nothing
on this page** (it was a 21-cell "blue-splatter" risk) — solid nodes and plain glyphs carry the blue instead.

- **Rhythm:** `py-20 md:py-28 lg:py-32` section rhythm — including §2, so the switch (the page's signature device)
  breathes. Centered `mx-auto w-full max-w-5xl px-6`; the comparison table widens to `max-w-6xl`.
- **The close:** ends on the electric-blue `CtaBand` → the (pending) deep-navy footer, like every page.

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on Solutions |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | Page background (warm near-white) |
| Headings / body-strong | `--foreground` | `oklch(0.255 0.045 264)` | H1–H3, layer titles, table cells, layer descriptions-strong |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Mobile brand cards, the comparison body, CTA-adjacent surfaces |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Active segment pill, layer-spine nodes, check glyphs, CTA, ring |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on the active segment pill, solid nodes, CTA band |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Segment-switch track, comparison header band |
| Quiet-surface text | `--secondary-foreground` | `oklch(0.305 0.05 264)` | Header band text, brand names on the band |
| Hover wash | `--accent` | `oklch(0.93 0.045 250)` | Row hover |
| Hover-wash text | `--accent-foreground` | `oklch(0.305 0.05 264)` | Text during row hover |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Inactive segment label, layer descriptions, "—" cells, captions |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Table grid lines, the layer spine, card borders |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every interactive `:focus-visible` |

Shadows (token utilities only): `shadow-soft` · `shadow-card` (resting) · `shadow-elevated` (hover) · `shadow-glow`
(**primary CTA + CTA band only**). Radius — **deliberately not uniform** (an AI-tell guard): `rounded-full` segment
pill + nodes; `rounded-lg` mobile brand cards; `rounded-xl` CTA band; **the comparison table is edge-led with no
outer radius** so it does not read as a bigger tile.

### Type scale

| Element | Family | Size | Weight / tracking | Color |
|---|---|---|---|---|
| Page H1 (hero) | `font-display` | `clamp(2.25rem, 5vw, 3.75rem)` | bold, `tracking-tight` | `--foreground` |
| Section H2 | `font-display` | `clamp(1.75rem, 3.5vw, 2.75rem)` | bold, `tracking-tight` | `--foreground` |
| Stack headline (per segment, **H2**) | `font-display` | `clamp(1.5rem, 2.5vw, 2rem)` | semibold, `tracking-tight` | `--foreground` |
| Layer title / brand name (**H3**) | `font-display` | `text-lg → text-xl` | semibold, `tracking-tight` | `--foreground` |
| Eyebrow | `font-display` | `text-sm` | medium, `uppercase`, `tracking-widest` | `--primary` |
| Lead / layer body | `font-sans` | `text-base → text-lg` | regular, ≤ `max-w-[68ch]` | `--muted-foreground` |
| Segment label | `font-sans` | `text-sm → text-base` | medium | active `--primary-foreground` · inactive `--muted-foreground` |
| Table cell text | `font-sans` | `text-sm → text-base` | regular | `--foreground` (notes `--muted-foreground`) |

Fonts: display = Cabinet Grotesk (intent) / **Space Grotesk** (current); body = **DM Sans**. Never
Inter/Arial/Roboto for display. `display:swap`.

### Motion language (see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22, 1, 0.36, 1]`**, imported from **`@/lib/motion`** (the real exported symbol the
  rest of the site uses — `reveal-on-scroll.tsx`, `hero-content.tsx`, `about-hero-content.tsx`). There is **no**
  `EASE` export; do not invent one.
- **Segment cross-fade + height animate (signature):** switching Commercial⇄Residential **cross-fades** the panels
  (outgoing `opacity 1→0`, incoming `0→1`, ~0.25–0.3s) while the panel **container tweens its height**
  (`auto`→measured). This is a **one-shot, user-initiated** change, not a continuous per-frame animation, so it is
  acceptable; the cross-fade is opacity-only and the height tween is contained.
  - **Reduced motion — explicit gate required.** `<MotionConfig reducedMotion="user">` only suppresses
    **positional/transform** keys (width/height/top/left/transforms); it does **NOT** suppress `opacity`. So the
    cross-fade would still animate. **`SegmentSolutions` MUST call `useReducedMotion()`** and, when true, render the
    incoming panel at its final opacity with **no** `0→1` keyframe **and** no height tween — mirroring
    `RevealOnScroll`'s early-return (`reveal-on-scroll.tsx`). Do not rely on `MotionConfig` alone for the fade.
- **Layer reveal:** within the active stack, layers reveal once with `RevealOnScroll` (`opacity 0→1`, `y 24→0`,
  `whileInView once`, `margin "-80px"`), staggered `index * 0.08s`. On *segment switch* the incoming layers are
  already in view, so they ride the cross-fade rather than re-revealing.
- **Comparison rows reveal:** table body rows reveal once on scroll-in, staggered `index * 0.05s`. **Reduced
  motion → static.**
- **Micro:** CTA uses `Magnetic`; row hover = `bg-accent`/`text-accent-foreground` wash (color only, GPU-cheap).
  No card tilt, no 3D on this page.
- **Animate `transform`/`opacity` (+ the one-shot panel height) only — never `backdrop-filter`.**

### Server/client boundaries (see soo-component-patterns)

The page and all sections are **Server Components**. `"use client"` lives only at leaves:

- **`SegmentSolutions`** — the one substantive client leaf: Radix `Tabs` (segment switch) + Motion (gated
  cross-fade / height) + `useSearchParams()` to honor an incoming `?segment=` (see §2). It receives both stacks as
  **typed props from `src/content/solutions.ts`**; it renders content, it does not own it.
- `RevealOnScroll` (layers + table rows) and `Magnetic` (CTA) — existing client leaves.

Everything else (hero, stack markup, comparison table, CTA band) is server-rendered. **No copy is hardcoded in
JSX** — all of it comes from `src/content/solutions.ts` + `SITE`.

---

## 1. Hero / intro (a label for the switch)

**Goal:** name the page's promise in one tight line, then make the **switch the first real thing** on the page.

**Layout:** `max-w-5xl px-6`, **`pt-20 md:pt-28 pb-8`** (deliberately short bottom padding so the hero reads as a
*label* for the switch directly beneath it, not a detached section — the switch is the star, §2 carries the full
rhythm).

- **H1 (the page's single `<h1>` and LCP element):** "Security solutions matched to your property" — server-rendered
  text, Page H1 scale, `text-foreground`. No render-blocking hero image (LCP stays text).
- **Lead:** one line, `text-lg text-muted-foreground max-w-[60ch]` — and it **acknowledges the handoff** from the
  homepage segment split: e.g. "Pick up where you left off — choose a side and we'll show you the exact system, then
  help you pick the right tier of hardware."
- **Motion:** static (LCP-perfect).
- **Mobile:** single column; H1 floors at 2.25rem.

---

## 2. Segment switch + solution stacks (signature)

**Goal:** one control, two genuinely different artifacts — and it must *earn* its place rather than re-ask the
home page's Commercial/Residential question. It earns it two ways: (a) it reveals a **built-up system + tier
guidance** (not a route), and (b) it **honors the incoming segment** so a visitor who clicked "Commercial" on the
home split lands on the Commercial stack already active.

**Layout:** `max-w-5xl px-6`, **`py-12 md:py-16` *visually folded into* the hero** — i.e. the switch sits right
under the hero lead with no competing section header, so the segmented control is the first interactive element.
The active stack follows.

```
            ┌───────────────────────────────────────┐
            │ ●  Commercial   │     Residential      │   ← segmented control (Radix Tabs, blue active pill)
            └───────────────────────────────────────┘
   Commercial surveillance, built for liability and uptime      (H2 stack headline + one-line lead)

     ┃ ╭──╮                                                     ← continuous --border SPINE the nodes sit on
     ┃ │01│  Multi-Camera Coverage                       (H3)
     ┃ ╰──╯  Full interior + exterior coverage, sized to the site
     ┃ ╭──╮
     ┃ │02│  Video Analytics            (TODO: confirm offering)
     ┃ ╰──╯  Smart detection that flags what matters   ← fallback: "Retention & incident review"
     ┃ ╭──╮
     ┃ │03│  Access Control             (TODO: confirm offering)
     ┃ ╰──╯  Decide exactly who gets through which door
     ┃ ╭──╮
     ┃ │04│  24/7 Recording & Remote Viewing
     ┃ ╰──╯  Continuous capture you can check from anywhere, any time
     ┃
     [ Get a commercial quote ]                                 ← single per-stack CTA
        (switching segment → gated cross-fade + height animate to the other stack)
```

### Segmented control (Radix Tabs)

- **Structure:** Radix `Tabs` → `TabsList` (the track) → two `TabsTrigger`s ("Commercial", "Residential") → two
  `TabsContent` panels (the stacks).
- **Default + handoff:** `SegmentSolutions` reads **`?segment=commercial|residential`** via `useSearchParams()` and
  sets that as the initial active tab; **fallback default = Commercial**. The home page's `SegmentSplit` cards
  should link to `/solutions?segment=commercial` / `?segment=residential` so the choice carries over. Reading the
  param happens **client-side in the leaf** — it does **not** make the route dynamic (the page stays statically
  prerendered; the param only picks the initial tab post-hydration, with Commercial as the SSR default).
- **`activationMode="manual"`** — arrow keys move *focus* between segments without firing the switch; `Enter`/`Space`
  activates. This avoids firing the cross-fade + height tween on every arrow step (which `automatic` mode would do).
- **Visuals (call-site `className` overrides — see "vendored Tabs" below):** the track is a `rounded-full bg-secondary
  p-1` pill; each trigger is a `rounded-full` segment, **`min-h-[44px]`** (the primitive defaults to `h-9`/36px, so
  padding/min-height is added for the AA touch target). The **active** trigger =
  `data-[state=active]:bg-primary data-[state=active]:text-primary-foreground` (a single blue pill in the pale
  track) with `shadow-soft`; **inactive** = `text-muted-foreground hover:text-foreground`. Active is conveyed by
  **fill + weight + `aria-selected`**, never color alone.
- **Required edits to the vendored `ui/tabs.tsx` before use** — two are genuine in-file *contrast* fixes (same class
  of issue already fixed in `button.tsx` / `accordion.tsx`); the pill look is achieved by *call-site overrides*:
  - **In-file fix 1 — focus ring:** the trigger's 3px ring is `focus-visible:ring-ring/50` (computes to **~1.65:1**
    against the track — **fails** the 3:1 focus-indicator gate; the file also already carries full-opacity
    `focus-visible:border-ring` + `focus-visible:outline-ring`, so a passing indicator exists, but the *dominant*
    3px ring must independently clear 3:1). Change to **`focus-visible:ring-ring`** (full-opacity electric blue).
  - **In-file fix 2 — inactive label:** the default inactive label is `text-foreground/60` (navy at 60% alpha ≈
    **2.25:1** on the track — **fails AA** for the page's primary control). Use **`text-muted-foreground`**
    (4.77:1 on the secondary track — AA).
  - **Call-site overrides (not in-file):** the vendored active state is `data-[state=active]:bg-background
    text-foreground` (a *white* pill) and the track is `bg-muted rounded-lg`. The approved design's **blue active
    pill is the load-bearing change** — override the active state to `bg-primary text-primary-foreground`, the track
    to `bg-secondary rounded-full`, triggers to `rounded-full min-h-[44px]`, and `w-full` with `flex-1` triggers on
    mobile. (The §QA contrast claim "active tab 4.71:1" is only true *with* this blue-fill override.)
- **Motion:** see Motion language — gated cross-fade + one-shot height tween on switch; **reduced motion → instant
  swap.**
- **Keyboard (Radix, built-in):** `role="tablist"`/`tab`/`tabpanel`; **arrow keys** move focus (manual activation),
  `Home`/`End` jump to first/last, `Enter`/`Space` activate, `Tab` moves into the active panel (Radix makes it
  focusable); `aria-selected`/`aria-controls` wired; visible focus ring on the focused trigger. No mouse-only
  handlers.
- **Mobile:** the control becomes a **full-width segmented control** (`w-full`, `flex-1` triggers, ≥44px tall),
  thumb-reachable; labels stay on one line.

### The solution stack (per segment) — a system *spine*, not cards

Each panel renders one `SolutionStack`: an **H2 headline + one-line lead**, then **4 layers threaded on a continuous
vertical spine**, then a **single per-stack CTA**.

- **The spine (mandated, not optional):** a continuous `--border` vertical rail runs the height of the stack; each
  layer's **solid node** sits *on* the rail (like a transit line). This is the differentiator from the Services card
  grid — there are **no per-layer cards**, no per-layer borders, no `bg-card` tiles. Layers are borderless rows
  hung off the spine.
- **Layer node + emphasis gradient:** a **solid `bg-primary text-primary-foreground` node** (`rounded-full`, the
  number `01`–`04` + the layer's Lucide glyph beside or above it). To read as a system *building up* rather than
  four equal rows, give the stack a deliberate vertical emphasis step: **layer 01 is anchored** (slightly larger
  node / heavier title) and the spine **thickens or deepens in tint toward the top**, so 04 reads as the apex of the
  stack. Equal-weight rows = a card list; the emphasis step is what makes it a stack.
- **Layer title (H3) + one-line description** (`text-muted-foreground`).
- **Per-stack CTA:** "Get a commercial quote" / "Get a residential quote" → `/contact`, `Magnetic`, ≥44px. (This is
  the page's *only* mid-page ask — see CTA cadence below.)
- **Content (the two stacks) — copy authored in `solutions.ts`, with honesty flags:**
  - **Commercial:** ① **Multi-Camera Coverage** (backed by `commercial-security-systems` highlights) · ② **Video
    Analytics** *(`TODO: confirm offering`; honest fallback copy = "Retention & incident review", which `services.ts`
    does back)* · ③ **Access Control** *(`TODO: confirm offering`)* · ④ **24/7 Recording & Remote Viewing**
    (reworded from "Monitoring"; backed by Remote Viewing + product "Mobile app"/"Remote playback").
  - **Residential:** ① **Smart Doorbell** · ② **Perimeter Cameras** (backed by `residential-security-systems`) · ③
    **Indoor Cameras** · ④ **Remote Viewing** (backed by "Mobile viewing setup"). *Residential layer offerings are
    `TODO: confirm against the real catalog` before publish.*
- **Motion:** layers reveal once (stagger) on first view; on switch they ride the gated cross-fade.
- **A11y:** the layer list is an `<ol>` (order is meaningful); number nodes + titles convey sequence, not color;
  glyphs `aria-hidden`. Each panel is the Radix `tabpanel` for its trigger. The stack **headline is custom `<h2>`
  markup inside the tabpanel** — it is **not** routed through `SectionHeading` (which hard-codes its own `<h2>` and
  is reserved for §3).

---

## 3. Comparison table — Lorex / Hikvision / HiLook tiers (calm = subtraction)

**Goal:** let a visitor self-select a brand tier from an **honest, conservative** comparison. "Calm" here means one
cell language, hairlines only, and blue used sparingly.

**Layout:** `max-w-6xl px-6`, `py-20 md:py-28`. `SectionHeading` (eyebrow "Compare the tiers" + **H2** "Which brand
fits your build?" + a one-line lead) over a **flat, edge-led table** (full-bleed `bg-secondary` header band, **no
outer card radius**, hairline grid — so it does not read as a bigger tile than the page's cards).

```
┌───────────────────────┬──────────────────┬──────────────────┬──────────────────┐  ← full-bleed bg-secondary band
│                       │  Lorex           │  Hikvision       │  HiLook          │  (brand name = H3)
│                       │  4K and smart-   │  Commercial-grade│  Reliable everyday│  (tagline FROM SITE.partners)
│                       │  home cameras.   │  cameras & rec.  │  surveillance hw.│
│                       │  Best for: homes │  Best for:       │  Best for:        │  (bestFor = authored copy)
│                       │  & small business│  commercial /    │  everyday, budget │
│                       │                  │  multi-site      │  -conscious       │
├───────────────────────┼──────────────────┼──────────────────┼──────────────────┤  ← hairlines only, no zebra
│ 4K resolution         │       ✓          │       —          │       —          │  ✓ = plain blue check + s-r "Yes"
│ Colour night vision   │       ✓          │       —          │       —          │
│ Multi-camera channels │    Partial       │       ✓          │       —          │
│ Expandable / RAID     │       ✓          │       ✓          │       —          │
│ Central multi-site mgmt│      —          │       ✓          │       —          │
│ Weather-resistant     │       —          │       ✓          │       —          │
│ All-in-one kit        │       ✓          │       —          │       ✓          │
│ Simple / quick install│       —          │       —          │       ✓          │
│ Budget-friendly       │       —          │       —          │       ✓          │
└───────────────────────┴──────────────────┴──────────────────┴──────────────────┘
                          (rows reveal on scroll · row hover = soft accent wash)
```

- **Table semantics:** a real `<table>` — capability labels in the first column as `<th scope="row">`, the three
  brand columns headed by `<th scope="col">`. A `<caption>` names the table (visible or visually-hidden). Header
  band `bg-secondary text-secondary-foreground`; body rows `bg-card` with `--border` hairlines. **No zebra**
  (hairlines OR zebra, never both → calmer).
- **Cell language — exactly ONE differentiator, blue used sparingly:**
  - **yes** = a **plain `--primary` `Check` glyph** (NO circle, no tint) **+ a visually-hidden "Yes"**. (Dropping
    the `bg-primary/10` circle removes the 21-chip blue-splatter and the wrong-basis contrast claim.)
  - **partial** = the **visible word "Partial"** in `--muted-foreground` (optionally a tiny `aria-hidden` glyph).
  - **no** = an em-dash "—" `aria-hidden` **+ a visually-hidden "Not available"** (so a screen reader never hears a
    bare dash, and color/dash is never the only signal).
- **Header detail:** each column shows the **brand name** (`H3`), its **tagline derived verbatim from
  `SITE.partners`** (single source of truth — not re-typed into `solutions.ts`), and a **"Best for"** line
  (authored copy in `solutions.ts`, in the same `TODO: confirm` set as the cells). **No per-column "Talk to us"
  link** — it competed with the page's real CTAs and added blue.
- **Honesty (the load-bearing rule):** a `✓` is shown **only where the brand literally lists that feature in
  `products.ts`**; `Partial` only for a weaker-but-real feature (e.g. Lorex "Multi-channel" → Partial on
  "Multi-camera channels"); **everything else is `—` (Not listed)**. We do **not** invent `Partial` ratings, and
  there is **no "Smart detection" row** (no brand lists analytics in `products.ts`). This conservative default is
  truthful even if shipped. Upgrading any `—` requires confirmed distributor data (`TODO: confirm`). Optionally,
  add an `assertComparisonClaimsConfirmedForProduction()` build guard (mirroring the NAP guard) so any cell marked
  `unconfirmed` cannot reach a production build.
- **Motion:** body rows reveal once (stagger `index * 0.05s`); row hover = `bg-accent` wash. **Reduced motion →
  static.**
- **Mobile (`< md`): the table becomes stacked cards** — one `rounded-lg border bg-card shadow-card` card per brand,
  each showing brand name + tagline + "Best for", then the capabilities as a **definition list** (`<dl>`: capability
  `<dt>` + value `<dd>`). **Every `<dd>` carries an explicit accessible value** — "Yes" / "Partial" /
  "Not available" — never a bare glyph or bare "—". No horizontal table scroll on phones.
- **A11y:** real table on desktop (row/col headers, `scope`, caption); the mobile `<dl>` keeps the same semantic
  pairs; no cell communicates by color/glyph alone.

---

## 4. CTA band → Footer

The existing `CtaBand` — title "Still weighing the options?" + description "Tell us about the property and we'll
recommend the exact stack and tier." Dual CTA: "Get a Free Quote" (→ `/contact`) + the **baked-in, non-configurable
"Call Now"** (hardwired to `SITE.contact.phoneHref`). Reveals once with `RevealOnScroll`. Then the shared footer
(deep-navy upgrade owned by home.md, pending).

**CTA cadence:** the page makes exactly **two** asks — the active stack's per-segment CTA (mid-page) and this
closing band — so the closing blue band stays the page's single bold moment. **Carryover NAP TODO:** until
`SITE.contact.phoneHref` is confirmed, "Call Now" links to the placeholder `tel:+10000000000`; the NAP guard
described in soo-qa-gates (to be wired before launch) will fail the production build while it is still `TODO:`.

---

## Content model (new file: `src/content/solutions.ts` + `src/types`)

A new typed content module drives the whole page. Proposed shapes:

| Type | Fields | Notes |
|---|---|---|
| `SolutionLayer` | `title: string` · `description: string` · `icon: string` | one layer; `icon` is a **string** resolved via `resolveIcon(name)` → `LucideIcon` before it reaches `IconBadge` (which takes a `LucideIcon`), mirroring how `Service`/`Industry` icons render |
| `SolutionStack` | `segment: "commercial" \| "residential"` · `label: string` · `headline: string` · `lead: string` · `layers: SolutionLayer[]` (4) · `cta: { label; href }` | one panel; the narrow segment union (no `"both"`) matches the existing `HeroSegment.key` pattern in `types/index.ts` |
| `ComparisonCell` | `level: "yes" \| "partial" \| "no"` · `source?: string` (the `products.ts` feature string it maps to) · `confirmed?: boolean` | `source` documents the grounding; `confirmed:false` = blocks prod via the optional guard |
| `ComparisonRow` | `capability: string` · `lorex/hikvision/hilook: ComparisonCell` | one capability row |
| `ComparisonTier` | `brand: ProductBrand` · `bestFor: string` | column header; **`tagline` is NOT stored here** — derive it from `SITE.partners` at render to avoid drift (one source of truth). `ProductBrand` already exists in `types/index.ts` |

Exports: `solutionStacks: SolutionStack[]` (commercial, residential), `comparisonTiers: ComparisonTier[]`,
`comparisonRows: ComparisonRow[]`.

- **Icons to add to `lib/icons` registry** (`resolveIcon` resolves string→Lucide; the `ShieldCheck` fallback covers
  gaps but add the real glyphs): Commercial — `Cctv` (present), `ScanSearch`, `KeyRound`, `MonitorPlay`;
  Residential — `Bell`, `ScanLine`, `House` (present), `Smartphone` (present).
- **Components — reuse:** `SectionHeading` (§3 only, fixed `<h2>`), `IconBadge` (fed `resolveIcon(layer.icon)`),
  `RevealOnScroll`, `Magnetic`, `CtaBand`, shadcn `Tabs` (with the two in-file fixes + call-site overrides),
  `lib/icons`, the schema/seo helpers. **To build:** `SegmentSolutions` (client leaf: Tabs + `useReducedMotion`
  gated cross-fade/height + `useSearchParams`), `SolutionStack` (server), `SolutionLayer` row (server),
  `ComparisonTable` (server, desktop table + mobile `<dl>` cards).
- **Heading levels (pinned):** hero **H1**; per-stack headline **H2** (custom markup in the tabpanel); layer titles
  **H3**; comparison section **H2** via `SectionHeading`. No skipped levels.

---

## SEO (see soo-seo-local)

- **Metadata:** keep the stub's `export const metadata = buildMetadata({ title: "Solutions", description: "…",
  path: "/solutions" })` (already present; description ~150–160 chars for humans).
- **JSON-LD:** add **`breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }])`**
  via one `<script type="application/ld+json">`. **LocalBusiness is already injected by the `(marketing)` layout
  (`localBusinessSchema()` in `layout.tsx`) — do NOT double-inject.** No Service/Product schema for third-party
  brands (avoids implying we are the manufacturer).
- **Sitemap:** `/solutions` is already a static route — confirm it is in `app/sitemap.ts`'s `staticPaths`.
- **Images:** none required for v1 (type/diagram-led). Any future imagery uses `next/image` with explicit
  `width`/`height` + meaningful `alt`.

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy from `src/content/solutions.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- **Honesty default is shippable-safe:** comparison `—` for any unsourced cell, no invented `Partial`, no analytics
  row; the two unbacked commercial layers carry `TODO: confirm offering` with honest fallback copy.
- Placeholders **non-prod only**: NAP phone/city/hours; `assertContactResolvedForProduction` (NAP guard, wired
  before launch) throws the prod build while contact is `TODO:`; optional `assertComparisonClaimsConfirmedForProduction`
  blocks unconfirmed cells.

### 2. WCAG 2.2 AA
- **One `<h1>`** (hero); H2 stack headlines + comparison; H3 layer titles + brand names — no skipped levels.
- Landmarks: one `<main>`, labelled sections; the segment switch is a proper Radix **tablist** (manual activation,
  arrow-key focus, `aria-selected`/`aria-controls`, focus ring); the comparison is a semantic **table**
  (row/col headers + caption).
- **Active segment is NOT color-only** — `bg-primary` fill **+** weight **+** `aria-selected`. Inactive labels use
  `text-muted-foreground` (AA), not `text-foreground/60` (~2.25:1, fails).
- **Comparison cells are not color/icon-only** — "✓" pairs with a visually-hidden **"Yes"**, "Partial" is a word,
  "—" pairs with a visually-hidden **"Not available"**; the mobile `<dl>` repeats the same explicit values.
- **Contrast (derived from the exact OKLCH tokens — bases stated, verified):**
  - `--foreground` on `--background` = **15.15:1**, on `--card` ≈ **15.5:1** (H1–H3, layer titles, table cells) ✓
  - `--muted-foreground` on `--background` = **5.28:1**, on `--card` = **5.46:1** (layer body, "—", captions);
    on the `--secondary` track = **4.77:1** (inactive segment label) — all ✓ (AA).
  - **eyebrow** `--primary` on `--background` = **4.71:1** ✓ (small text passes).
  - **comparison check** = plain `--primary` `Check` glyph on `--card` cell = **4.88:1** (and ≥3:1 as a non-text
    graphical object) ✓.
  - **active segment** = `--primary-foreground` on `--primary` = **4.71:1** ✓ (requires the blue-fill override).
  - **layer-spine node** = `--primary-foreground` on solid `--primary` = **4.71:1** ✓ (solid node, not a tint — the
    earlier `bg-primary/10` badge computed to only ~4.49:1, so it was replaced).
  - CTA / CTA band `--primary-foreground` on `--primary` = **4.71:1** ✓.
  - header band `--secondary-foreground` on `--secondary`: high-contrast navy-on-pale (**≫4.5:1**) ✓.
  - row hover `--accent-foreground` on `--accent` = **10.9:1** ✓.
  - **focus ring** = full-opacity `--ring` (electric blue), ≥3:1 against the surface ✓ — the corrected
    `focus-visible:ring-ring` (the vendored `ring-ring/50` ≈ 1.65:1 was the defect).
  - hairline `--border` is a **decorative divider**, not a control boundary (3:1 N/A).
  - **Never** `--primary` as body text on `--secondary` (4.25:1, fails) — blue stays fill/glyph/CTA.
- **prefers-reduced-motion:** segment switch = instant swap — **`useReducedMotion()` gate** disables BOTH the
  opacity cross-fade (MotionConfig alone does **not**) and the height tween; layer + row reveals static; no
  smooth-scroll.
- **Target size AA:** segment triggers `min-h-[44px]`; CTAs ≥44px; table non-interactive (hover only).
- **Tooling:** axe (or `@axe-core/playwright`) **zero serious/critical**, plus a manual keyboard pass (Tab into the
  tablist, ←/→ to move focus, Enter to switch segment, Tab into the panel, Tab through CTAs).

### 3. Core Web Vitals (per route)
- **LCP < 2.5s** — hero **H1 text** (server-rendered, `next/font swap`, no entrance, never `opacity:0`); no
  render-blocking image.
- **INP < 200ms** — minimal client JS (only `SegmentSolutions`'s Tabs + gated cross-fade, reveals, Magnetic).
- **CLS < 0.1** — the height tween is **user-initiated**, so it falls inside the 500ms input-exclusion window and
  does **not** count toward CLS; the **initial (Commercial) panel renders at its natural server height with no
  post-hydration measurement-driven resize**, so first paint contributes zero shift. No un-sized images; fonts via
  `next/font`; no `backdrop-filter`.
- **First-load JS < 130KB** — Server Components by default; **no 3D**; only the named client leaves ship. Verify
  with `ANALYZE=true` build + Lighthouse (mobile, throttled) + Speed Insights.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Hero single-column; **segment switch → full-width segmented control** (`min-h-[44px]`) on mobile; stacks
  single-column with the spine intact; **comparison table → stacked brand `<dl>` cards `< md`** (no horizontal table
  scroll). `py` rhythm holds; **no horizontal scroll**; no clipped cells at any checkpoint.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — confirm **OKLCH renders**, the Radix Tabs + gated
  cross-fade/height behave, the comparison table and mobile card form lay out correctly, and reduced-motion paths
  hold.

### 6. Security headers / CSP
- **No new third-party origins** (no maps/3D/embeds). One JSON-LD block (BreadcrumbList) is the only
  `dangerouslySetInnerHTML` added (a `JSON.stringify` of a builder output). CSP / HSTS / X-Frame-Options DENY /
  nosniff / Referrer-Policy / Permissions-Policy stay intact.

---

## Open questions / TODO (logged in PROGRESS)

- **Comparison cells** — confirm with the client/distributor before upgrading any `—` to `✓`/`Partial`; the
  conservative `products.ts`-traceable default ships safely until then (honesty/legal gate).
- **Commercial offerings** — confirm Soo Solutions actually delivers **Video Analytics** and **Access Control**
  (neither is in `services.ts`/`products.ts`); reword or remove if not. "24/7 Recording & Remote Viewing" already
  reworded away from the staffed-"monitoring" over-claim.
- **Residential layer offerings** — confirm Smart Doorbell / Indoor Cameras against the real catalog.
- **"Best for" copy** — authored in `solutions.ts`; confirm the positioning lines with the client.
- **Default segment + handoff** — Commercial is the SSR default; confirm the marketing preference, and wire the home
  `SegmentSplit` cards to `/solutions?segment=…`.
- Carryover: NAP phone/city/hours (tap-to-call); Cabinet Grotesk `.woff2`; deep-navy footer (home.md).

---

**Review note (v2):** this spec was adversarially reviewed by four parallel lenses (design-critic + a11y/qa-gates +
skills/codebase + factual-honesty). Applied: rebuilt the comparison table to be `products.ts`-traceable (dropped the
fabricated "Smart detection" row + invented "partial" cells), reworded "24/7 Monitoring" → "24/7 Recording", flagged
Video Analytics/Access Control as confirm-before-publish, made the layered stack a mandated spine with an emphasis
gradient, cut the table to one calm cell-language (plain blue check, no circle, no zebra, no per-column links),
corrected the `EASE`→`EASE_OUT` constant, expanded the Tabs fixes (blue-fill active override is load-bearing; manual
activation), added the explicit `useReducedMotion()` gate for the opacity cross-fade, and corrected every contrast
figure to its real surface. See [services design](./services.md) for the sibling pattern.

**See also:** [home design](./home.md) · [about design](./about.md) · [services design](./services.md) ·
[soo-design-system](../../.skills/soo-design-system.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
