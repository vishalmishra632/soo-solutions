# FAQ — Visual Design Spec (grouped accordion + category anchors)

| Field | Value |
|---|---|
| **Page** | FAQ (`/faq`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v2 (adversarially reviewed — design-critic + a11y/qa-gates + skills/codebase + factual-honesty; all blockers + majors applied) |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build (no code in this doc) |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home](./home.md) · [services](./services.md) · [solutions](./solutions.md) · [industries](./industries.md) · [work](./work.md) · [PROGRESS](../../PROGRESS.md) |

The FAQ page removes last-mile objections in one calm, scannable read: a **grouped accordion** on a bright surface,
with **category anchors** (Installation · Pricing · Warranty · Brands · Support), a blue active indicator, smooth
expand, generous whitespace, and snippet-friendly markup (FAQPage JSON-LD + real `<h3>` questions). No code — only
layout, typography, OKLCH token usage, motion, interaction, and mobile behavior.

**Voice:** plain, direct, reassuring. Answer the real question in the first sentence; no marketing fluff.

**Composition, with two small honest edits:** the page reuses the **`ScrollSpyNav`** (Services — sticky category
rail → mobile pill bar, blue active indicator + `aria-current`) and the shadcn/Radix **`Accordion`**. Reuse is real
but **not zero-edit**, and the review corrected three claims the first draft got wrong:
- The Radix **`Accordion.Header` already renders a real `<h3>`** (Radix 1.6.0 `Primitive.h3`), so questions are
  *already* `<h3>` — heading order H1→H2→H3 needs **no** change. **Do NOT wrap the trigger in another `<h3>`** (that
  would nest `<h3><h3>` — an a11y regression).
- **`ScrollSpyNav` needs one small prop:** it hardcodes `aria-label="On this page"` and the visible rail heading
  "On this page"; FAQ needs "Categories". So add an optional **`label?: string`** prop (default `"On this page"`, so
  the existing Services usage is unchanged). This is the one genuine component edit.
- The accordion trigger is styled `text-sm font-medium hover:underline` by default; the calm reading surface needs
  **call-site `className` overrides** (size/family + `no-underline`). No component edit — usage-level only.

---

## Approval status & identity gate

**Approved for build.** Content is authored here. Honesty constraints (tightened by the review):

- **Pricing carries no fabricated numbers AND no price-structure commitments.** Soo Solutions publishes no prices,
  so Pricing answers are **quote-based**: cost depends on the property; the assessment + quote are **free** (backed
  by the site-wide "Get a Free Quote" CTA). **No invented figures, no "fixed quote", no "no surprises later", no
  discounts/financing** — the business has only confirmed the quote is *free*, not that it is *fixed-price*.
- **Warranty stays general where terms are unconfirmed.** "Workmanship + manufacturer hardware warranty, support
  after install" is grounded; **no specific duration**, and the camera-failure answer avoids committing to a
  specific remedy ("repaired or replaced") until coverage terms are confirmed. Logged as `TODO` in PROGRESS.
- **Overlapping answers are byte-matched to the existing `faqs.ts`** (brands, warranty, supply-cameras, coverage
  area) so the FAQPage JSON-LD on `/faq` never contradicts the FAQPage JSON-LD that the service-detail pages emit
  from the same questions. (The review found a live day-one drift — fixed below.)
- **No `TODO:` sentinel in any answer** → the FAQPage JSON-LD is clean (the area answer uses the real "253 Bruce
  St" street, never the `TODO:` city). *Caveat: this covers the **answer copy only** — the CTA's baked-in "Call
  Now" still resolves to `SITE.contact.phoneHref` = the NAP `TODO:` placeholder, which the NAP guard (once wired)
  fails the prod build on.*
- Carryover TODOs: NAP phone/city/hours, Cabinet Grotesk `.woff2`, the deep-navy footer (home.md).

---

## 0. Art direction (page-wide)

Bright, airy, text-led — the FAQ is a reading surface, so whitespace and hierarchy do the work. Electric-blue is
rationed to **one persistent meaning per surface**: the active category indicator (rail), the chevron, the CTA, and
focus rings. Rows sit on `bg-card`; blue never fills a row, and there is **no extra blue open-row left-rule** (the
chevron rotation + `aria-expanded` carry the open state — keeps blue as signal, not decoration).

- **Rhythm:** intro/CTA `py-20 md:py-28 lg:py-32`; category sections `py-12 md:py-16` with generous row spacing.
  Centered `mx-auto w-full max-w-5xl px-6`; two-column body `lg:grid-cols-[220px_1fr]` (rail + accordion).
- **The close:** the electric-blue `CtaBand` → the (pending) deep-navy footer.

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on FAQ |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | Page background |
| Headings / question text | `--foreground` | `oklch(0.255 0.045 264)` | H1–H3, accordion trigger (question) |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Accordion item surface |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Active category text + 2px bar, open chevron rotation target, CTA, ring |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on the mobile active pill + CTA band |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Mobile category pill track (inactive) |
| Quiet-surface text | `--secondary-foreground` | `oklch(0.305 0.05 264)` | **Inactive mobile pill label** (the component uses this, not muted) |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Answers, lead, inactive rail label, chevron rest |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Row dividers, the rail border |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every interactive `:focus-visible` |

Shadows: `shadow-soft` (optional on item blocks) · `shadow-glow` (**CTA band only**). Radius: mobile pills
`rounded-full`; CTA band `rounded-xl`; the accordion uses the shadcn default (flat divided rows, `border-b`).

### Type scale

| Element | Family | Size | Weight / tracking | Color |
|---|---|---|---|---|
| Page H1 (intro) | `font-display` | `clamp(2.25rem, 5vw, 3.75rem)` | bold, `tracking-tight` | `--foreground` |
| Category heading (**H2**) | `font-display` | `clamp(1.5rem, 3vw, 2rem)` | semibold, `tracking-tight` | `--foreground` |
| Question (the Radix-`<h3>` trigger) | `font-display` | `text-base md:text-lg` (override default `text-sm`) | medium, `no-underline hover:no-underline` (override default `hover:underline`) | `--foreground` |
| Answer | `font-sans` | `text-base` | regular, ≤ `max-w-[68ch]` | `--muted-foreground` |
| Eyebrow | `font-display` | `text-sm` | medium, `uppercase`, `tracking-widest` | `--primary` |
| Category nav / pill label | `font-sans` | `text-sm` | medium | active rail `--primary` / mobile pill `--primary-foreground` · inactive rail `--muted-foreground` / inactive pill `--secondary-foreground` |

Fonts: display = Cabinet Grotesk (intent) / **Space Grotesk** (current); body = **DM Sans**. Never
Inter/Arial/Roboto for display. `display:swap`.

### Motion language (see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22, 1, 0.36, 1]`** from **`@/lib/motion`** (the real export — not `EASE`).
- **Accordion expand (signature):** Radix height animation via the `accordion-down` / `accordion-up` keyframes
  (present in `globals.css`); the **chevron rotates 180°** on open (`transform`, already in the shadcn
  `AccordionTrigger`: `[&[data-state=open]>svg]:rotate-180`). **Reduced motion → instant open/close** — the rule
  `@media (prefers-reduced-motion: reduce) { [data-slot="accordion-content"] { animation: none !important; } }` is
  already in `globals.css` (lines ~175–179); the chevron still toggles, just without the tween.
- **Category scroll-spy:** the active category in the rail updates as its section enters view (the `ScrollSpyNav`
  IntersectionObserver); active = `--primary` text **+ a 2px `--primary` indicator bar** + `aria-current` (not
  colour-only). With **single-open accordion** (below) the reflow on toggle is bounded, so the active state stays
  stable. In-page anchor clicks are plain `<a href="#id">` → instant jump (see reduced-motion).
- **Reduced motion:** the accordion is instant (the `globals.css` rule); the anchor jump is already instant because
  there is **no global `scroll-behavior:smooth`** and **Lenis self-disables under `prefers-reduced-motion`**
  (`smooth-scroll.tsx`) — *not* because of any guard inside `ScrollSpyNav` (it does no scrolling). Any future global
  smooth-scroll must be reduced-motion-guarded.
- **Animate `transform`/`opacity` (+ the contained accordion height) only — never `backdrop-filter`.**

### Server/client boundaries (see soo-component-patterns)

The page and category sections are **Server Components**. `"use client"` lives only at the reused leaves: the
**`ScrollSpyNav`** (IntersectionObserver) and the shadcn **`Accordion`** (Radix). All copy comes from
`src/content/faqs.ts`; the page maps `faqCategories` → sections. No copy hardcoded in JSX.

---

## 1. Intro

Page root is **`<main id="main-content" tabIndex={-1}>`** (this page drops `PageShell`, so it owns the single
`<main>` landmark + skip-link target). Intro: `max-w-3xl px-6`, `py-20 md:py-28`. Eyebrow "Good to know" + H1
"Frequently asked questions" + a one-line lead ("Straight answers on installation, pricing, warranty, brands, and
support. Can't find yours? We're a message away.").

- **H1** is the single `<h1>` and **LCP element** (server text, no render-blocking image). **Mobile:** single column.

## 2. Category anchors + grouped accordion (the core)

**Layout:** `mx-auto max-w-5xl px-6`, `pb-20`. Two-column body: a **sticky category rail** (`ScrollSpyNav`, left,
~`220px`) + the **accordion content** (right). On `<lg` the rail becomes a **top sticky horizontal pill bar** (the
`ScrollSpyNav` mobile form); content goes full-width. The rail earns its place here: 5 categories × ~4 Q&A ≈ 20 rows
is ~2–3 viewports, so jump-to-category navigation is genuinely useful (not ceremony).

```
┌────────────────┐ ┌───────────────────────────────────────────────────────────────┐
│ CATEGORIES     │ │  Installation                                          (H2, #installation)
│ │ Installation │ │  What happens during a typical installation?           ⌄  (H3 trigger)
│   Pricing      │ │  ───────────────────────────────────────────────────────────── │
│   Warranty     │ │  How long does an install take?                        ⌄        │
│   Brands       │ │                                                                 │
│   Support      │ │  Pricing                                               (H2, #pricing)
│ (sticky,       │ │  How much does a security camera system cost?          ⌄        │
│  scroll-spy,   │ │  ───────────────────────────────────────────────────────────── │
│  blue active)  │ │  Is the site assessment and quote really free?         ⌄        │
└────────────────┘ └───────────────────────────────────────────────────────────────┘
```

### Category rail (`ScrollSpyNav` + the new `label` prop)

- Reuse `ScrollSpyNav` with `sections = faqCategories.map((c) => ({ id: c.id, label: c.title }))` and the **new
  `label="Categories"` prop** (the one real component edit — adds an optional `label?: string`, default
  `"On this page"`, used for the `aria-label` and the visible rail heading; Services usage unchanged).
- Real in-page anchor links to `#installation`, `#pricing`, `#warranty`, `#brands`, `#support`. Active = `--primary`
  text + a 2px `--primary` indicator bar + `aria-current` (already in the component — **not** colour-only).
  Keyboard-reachable; visible focus ring. Each category `<section>` has the matching `id` + **`scroll-mt-28`** so the
  sticky header doesn't cover the heading on jump.
- **Mobile:** collapses to a sticky horizontal pill bar (`overflow-x-auto`, `rounded-full` pills, active =
  `bg-primary text-primary-foreground`, inactive = `bg-secondary text-secondary-foreground`). **Target size:** the
  rail anchors (~36px) and mobile pills (~32px) clear the **WCAG 2.2 SC 2.5.8 AA minimum (24px)** — they are not 44px
  (the 44px target applies to the accordion triggers, below).

### Grouped accordion (shadcn/Radix `Accordion`)

- One **`<section id={category.id}>`** per category, each opening with the **category H2**, then a Radix `Accordion`
  **`type="single" collapsible`** over that category's Q&A. *(Single-open keeps the page a tight scannable index and
  bounds the scroll-spy reflow on toggle — the review flagged `multiple` as producing a "wall of open text" and
  jittering the scroll-spy.)*
- **Row (`AccordionItem`):** the shadcn default flat divided row (`border-b`, `bg` inherits the page) — calm density,
  no card chrome needed. The **trigger is the question** and is **already inside a Radix `<h3>`** (no wrapper to add);
  pass `className="font-display text-base md:text-lg no-underline hover:no-underline"` to override the default
  `text-sm` + `hover:underline`. The chevron sits at the end and **rotates 180° on open** (the open signal — no
  colour change needed). The **answer (`AccordionContent`)** is `text-muted-foreground`, `max-w-[68ch]`.
- **Big tap targets:** the trigger is full-width with the default `py-4` (≈56px) — comfortably **≥44px**.
- **A11y (Radix, built-in):** correct `button` triggers inside real `<h3>` headers, `aria-expanded` /
  `aria-controls`, keyboard (Enter/Space to toggle, Up/Down/Home/End between triggers), focus ring =
  `focus-visible:ring-ring focus-visible:ring-[3px]` (full-opacity, no offset — `--primary` on `--card` ≈ 4.88:1,
  clears the 3:1 non-text floor). The questions feed the **FAQPage JSON-LD**.

### Content — the 5 categories (authored, honest; overlaps byte-matched to `faqs.ts`)

> Normative copy for `src/content/faqs.ts` (`faqCategories`). Answers that share a question with the existing flat
> `faqs` are **byte-identical** to avoid two different machine-readable answers for one question.

**Installation** (`#installation`)
- *What happens during a typical installation?* — We start with a free site survey to map coverage, then run cabling
  cleanly, mount the cameras for full angles, and configure recording and remote access before we hand it over.
- *How long does an install take?* — Most homes are completed in a single day; we confirm the exact timeline after
  the free site survey, since larger or commercial sites depend on camera count and cabling.
- *Will the cabling be visible or messy?* — No. We run cabling cleanly and discreetly and tidy up after — the next
  technician (and you) will thank us.
- *Do I need to be home for the install?* — Someone should be on site to give access and confirm camera positions,
  but you don't need to hover — we handle the rest.
- *Can you work around an occupied home or business?* — Yes. We schedule around your day and keep disruption to a
  minimum.

**Pricing** (`#pricing`)
- *How much does a security camera system cost?* — It depends on the property, the number of cameras, and your
  recording needs, so we quote per property. The site assessment and quote are free and come with no obligation.
- *Is the site assessment and quote really free?* — Yes. We assess the property and quote at no cost or obligation.
- *What affects the price?* — Camera count and quality, cabling runs, recording and storage, and any extras like
  remote viewing or access control.
- *Do you supply the cameras, or do I buy them myself?* — We supply and install the hardware as one package, using
  trusted brands like Lorex, Hikvision, and HiLook so the system is matched to your property. *(byte-matched to the
  existing `faqs.ts`)*

**Warranty** (`#warranty`)
- *Is the work and the hardware under warranty?* — Yes. Both the installation work and the hardware are backed, and
  our local team is available for support after install. *(byte-matched to the existing `faqs.ts`)*
- *What does the warranty cover?* — Workmanship on the install plus the manufacturer's warranty on the cameras and
  recorder. We walk you through exactly what's covered before you sign off.
- *What if a camera fails after the install?* — Reach our local support line and we'll diagnose it — if it's covered,
  we'll sort it out under warranty and walk you through what that means.

**Brands** (`#brands`)
- *Which camera brands do you install?* — We work with Lorex, Hikvision, and HiLook, and recommend the right line for
  your property and budget. *(byte-matched to the existing `faqs.ts`)*
- *Why those brands?* — They cover the range we need: Lorex for sharp 4K home and small-business systems, Hikvision
  for commercial-grade multi-camera coverage, and HiLook for reliable, budget-friendly everyday setups.
- *Can you upgrade or match my existing system?* — Often, yes. We assess what's in place, reuse what still performs,
  and upgrade the rest to current standards.
- *Will you push the most expensive option?* — No. We recommend the tier that fits the job — sometimes that's the
  budget line. The goal is the right coverage, not the biggest invoice.

**Support** (`#support`)
- *What support do I get after the install?* — A local team you can actually reach — for questions, checkups, and
  help if something needs attention after install.
- *Can you help me set up remote viewing on my phone?* — Yes. We configure and test secure remote viewing during the
  install, so you can check live and recorded footage from anywhere — and we're here if you need a hand later.
- *Do you offer maintenance or checkups?* — Yes. We offer scheduled maintenance to keep cameras aligned, firmware
  current, and footage there when you need it.
- *What areas do you cover?* — We serve the local area around our 253 Bruce St location. Contact us with your address
  and we will confirm coverage. *(byte-matched to the existing `faqs.ts`)*

## 3. CTA band → Footer

The existing `CtaBand` — title **"Still have questions?"** + description ("Tell us about your property and we'll get
you a straight answer."). Primary CTA **"Talk to us"** → `/contact`, plus the baked-in "Call Now" (resolves to
`SITE.contact.phoneHref`, currently the NAP `TODO:` placeholder; the NAP guard, once wired, fails the prod build
while unresolved). Reveals once with `RevealOnScroll`. Then the shared footer.

---

## Content model (`src/content/faqs.ts` + `src/types/index.ts` barrel)

Add a topic-grouped structure for the page (the existing flat `faqs` + `FaqGroup` stay for the service-detail FAQ
filtering — see Open questions for the consolidation note). **Add the new types to the existing
`src/types/index.ts` barrel** (alongside `Faq`/`FaqGroup`), matching the project's single-barrel convention:

| Type | Shape | Notes |
|---|---|---|
| `FaqItem` | `{ question: string; answer: string }` | one Q&A (no `group` needed here) |
| `FaqCategory` | `{ id: string; title: string; items: FaqItem[] }` | `id` is the anchor slug (`"installation"`…); `title` the H2 |

Export `faqCategories: FaqCategory[]` (the five above). The **FAQPage JSON-LD** is built from
`faqCategories.flatMap((c) => c.items)` — **widen `faqPageSchema`'s parameter to
`Pick<Faq, "question" | "answer">[]`** (it only reads `question`/`answer`; widening is **non-breaking** for the
existing `services/[slug]` caller, which passes full `Faq[]` and still satisfies the narrower shape). The
`ScrollSpyNav` `sections` come from `faqCategories.map((c) => ({ id: c.id, label: c.title }))`.

- **Components — reuse + the edits:** `ScrollSpyNav` (**add the `label?` prop** — the one component edit; default
  preserves Services), shadcn `Accordion` (no component edit — call-site `className` overrides on the trigger +
  `type="single"`), `RevealOnScroll`, `CtaBand`, the seo/schema helpers. **To build:** a thin `FaqCategorySection`
  (server — maps one category to its H2 + `Accordion`), the content addition, and the `faqPageSchema` param widen.
- **Heading levels (already correct, no change):** intro **H1**; category titles **H2**; question triggers are the
  Radix-rendered **`<h3>`** — H1→H2→H3, no skipped levels, **no extra heading wrapper**.

---

## SEO (see soo-seo-local)

- **Metadata:** keep `export const metadata = buildMetadata({ title: "FAQ", description: "…", path: "/faq" })`
  (already present).
- **JSON-LD:** **`faqPageSchema(faqCategories.flatMap((c) => c.items))`** (the stub already injects FAQPage from the
  flat `faqs`; switch it to the flattened categories so the rich-result content matches what's on the page) **+
  `breadcrumbSchema`** (Home › FAQ). **LocalBusiness is inherited from the `(marketing)` layout — do NOT
  double-inject.** One `<script type="application/ld+json">` per schema (the sanctioned `dangerouslySetInnerHTML`).
- **Snippet-friendliness:** real `<h3>` questions (Radix default) + plain-text answers + valid FAQPage schema is what
  earns the rich result; the first sentence of each answer answers the question.
- **Sitemap:** `/faq` is already in `app/sitemap.ts`'s `staticPaths` (confirmed).

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy from `src/content/faqs.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- **No fabricated facts:** Pricing is quote-based (no prices, **no "fixed"/"no surprises"**, no financing), warranty
  stays general (no duration, no committed repair/replace remedy), overlapping answers **byte-match** the existing
  `faqs.ts`, and **no `TODO:` sentinel appears in any answer**. NAP guard still applies to the CTA's Call-Now href
  (the only `TODO:` on the page).

### 2. WCAG 2.2 AA
- **One `<main>`** (page root) and **one `<h1>`**; category **H2**; question triggers are Radix **`<h3>`** — no
  skipped levels, **no double-heading**.
- Landmarks: `<main>`; the rail is the `ScrollSpyNav` `<nav>` with **`aria-label="Categories"`** (via the new prop —
  not the hardcoded "On this page"); category `<section id>`s. Scroll-spy active = primary text + 2px bar +
  `aria-current` (not colour-only). *(Only one of the two `ScrollSpyNav` `<nav>`s is in the a11y tree per breakpoint
  — the other is `display:none`.)*
- **Accordion (Radix):** `button` triggers in real `<h3>`, `aria-expanded`/`aria-controls`, keyboard
  (Enter/Space/arrows/Home/End), focus ring `ring-ring` `ring-[3px]` (no offset; `--primary`/`--card` ≈ 4.88:1 ≥3:1),
  reduced-motion instant open (the `globals.css` rule); chevron state = rotation + `aria-expanded`, not colour alone.
- **Contrast (derived from the exact OKLCH tokens; confirm with axe at build):**
  - `--foreground` on `--background`/`--card` (H1–H3, questions) ≈ **15.15 / 15.68:1** ✓.
  - `--muted-foreground` on `--background` ≈ **5.28:1**, on `--card` ≈ **5.46:1** (answers, lead, inactive rail) ✓.
  - **inactive mobile pill** = `--secondary-foreground` on `--secondary` (the component's real pair) — high-contrast
    navy-on-pale (≫4.5:1) ✓.
  - eyebrow / active category `--primary` on `--background` ≈ **4.71:1** ✓.
  - **mobile active pill / CTA band** `--primary-foreground` on `--primary` ≈ **4.71:1** ✓ — the **page's narrowest
    AA pass** (0.21 over 4.5:1); **must re-verify composited with axe at build** (any token drift breaks it).
  - **focus ring** = full-opacity `--ring`, ≥3:1 on the surfaces ✓.
  - **Never** `--primary` as body text on `--secondary` (≈4.25:1, fails).
- **prefers-reduced-motion:** accordion instant (the `globals.css` rule); anchor jump instant (no global
  smooth-scroll + Lenis disabled under reduced motion); reveals static.
- **Target size AA:** accordion triggers `py-4` (≈56px, ≥44px); rail anchors (~36px) and mobile pills (~32px) clear
  the **24px SC 2.5.8 minimum** (not 44px — corrected).
- **Tooling:** axe **zero serious/critical**; manual keyboard pass — Tab to a trigger → Enter toggles → arrows move
  between questions; Tab the rail/pills → Enter jumps to the section.

### 3. Core Web Vitals (per route)
- **LCP < 2.5s** — the H1 **text**; **no images on this page**.
- **INP < 200ms** — minimal client JS (the `ScrollSpyNav` IO + the Radix `Accordion`); no scroll thrash.
- **CLS < 0.1** — accordion expand is **user-initiated** (500ms-excluded); fonts via `next/font`; the sticky
  rail/pill bar reserves its space; no `backdrop-filter` animation.
- **First-load JS < 130KB** — Server Components by default; **no 3D, no images**; only the two client leaves ship.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Intro single-column; two-column body `lg+` (rail + accordion) → single column with the **rail becoming a top
  sticky pill bar** `<lg`; **full-width accordion rows, ≥44px triggers** on mobile; the pill bar scrolls inside its
  own row (no page horizontal scroll). `py` rhythm holds; no clipped content; `scroll-mt-28` anchor offsets land.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — confirm OKLCH renders, the Radix `Accordion` +
  `ScrollSpyNav` (sticky + IO) behave, reduced-motion paths hold, `scroll-mt` offsets land.

### 6. Security headers / CSP
- **No new third-party origins** (no maps/3D/images/embeds). Two JSON-LD blocks (FAQPage + BreadcrumbList) are the
  only `dangerouslySetInnerHTML` (each `JSON.stringify` of a builder output). CSP / HSTS / X-Frame-Options DENY /
  nosniff / Referrer-Policy / Permissions-Policy stay intact.

---

## Open questions / TODO (logged in PROGRESS)

- **Warranty terms** — confirm the actual warranty length and exactly what's covered (workmanship period,
  manufacturer hardware terms, repair-vs-replace) so the general answers can become specific.
- **Pricing detail** — if the client wants to publish a starting price, fixed-price quoting, or financing, add it
  honestly; until then, quote-based answers only (no "fixed").
- **FAQ source consolidation** — the page uses topic-grouped `faqCategories`; the service-detail pages still filter
  the audience-grouped flat `faqs`. Overlapping answers are **byte-matched today**; consider deriving both from one
  source later (e.g. one array tagged with both an audience `group` and a topic `category`) to remove the drift risk
  structurally.
- Carryover: NAP phone/city/hours (tap-to-call); Cabinet Grotesk `.woff2`; deep-navy footer (home.md).

---

**Review note (v2):** four-lens adversarial review. Applied — corrected the **heading-order blocker** (Radix
`Accordion.Header` already renders a real `<h3>`, so H1→H2→H3 is automatic; removed the bogus "wrap in h3" tweak that
would have nested `<h3><h3>`); made the **`ScrollSpyNav` `label` prop** an explicit, honest component edit (it
hardcodes "On this page"); switched the accordion to **`type="single"`** and dropped the extra blue open-row rule
(rationing + less scroll-spy reflow); noted the trigger's **`text-sm`/`hover:underline`** defaults need call-site
overrides; corrected the **target-size** claim (rail/pills meet the 24px AA min, not 44px), the **inactive-pill
contrast token** (`secondary-foreground`, not `muted`), and the **reduced-motion attribution** (no global
smooth-scroll + Lenis guard); and tightened **honesty** — dropped Pricing "fixed/no surprises", softened the
warranty remedy, and **byte-matched** the brands/warranty/supply/area answers to the existing `faqs.ts` (the review
found a live day-one drift).

**See also:** [home design](./home.md) · [services design](./services.md) (the `ScrollSpyNav` + `Accordion`
patterns) · [solutions design](./solutions.md) · [work design](./work.md) ·
[soo-design-system](../../.skills/soo-design-system.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
