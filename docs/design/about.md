# About — Visual Design Spec

| Field | Value |
|---|---|
| **Page** | About (`/about`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v1 |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build (no code in this doc) |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home design](./home.md) · [PRD](../PRD.md) · [TRD](../TRD.md) · [PROGRESS](../../PROGRESS.md) |

This spec defines *what the About page looks like and how it behaves*, section by section. It is the build
contract; implementation reuses the components already built for the shell + homepage. No code here — only layout,
typography, OKLCH token usage, motion, 3D, interaction, and mobile behavior.

**Voice:** warm, human, credible. Where the homepage sells the *offer*, About sells the *people*. It must read
**editorial** — text-forward, asymmetric, calm, with real faces at scale — not the homepage's band-of-cards
grammar with more padding.

---

## Approval status & identity gate

**Approved for build of the SCAFFOLD** — structure, layout, motion, server/client boundaries, accessibility.
**Final visual sign-off is gated** on real content, because an About page lives or dies on real faces, a real
story, and verifiable proof:

- **A real story headline** (place + people + time), not a reused brand tagline — the single biggest identity
  lever (see §1). `TODO: confirmed story line` (served city/region + "since [year]").
- **Real crew photography + names + roles + a human one-liner each** — actual technicians, art-directed, never
  stock. The team section is the page; with stock faces it's worse than nothing. Currently `TODO`.
- **Real, verifiable certifications / authorizations** — manufacturer "Authorized Installer" status (Lorex /
  Hikvision / HiLook), licensing, insurance must be *true* before the badge ships. Partner names come from
  `SITE.partners`; the credential wording is `TODO: confirm certifications & authorizations` — claiming an
  authorization the business doesn't hold is a legal/trust problem.
- **Served area + address** for the map + "serving" copy (`SITE.contact.address`, currently `TODO`).
- **No decorative 3D and no scroll gimmickry** — About earns trust through restraint; chrome (rotating brand-mark,
  parallax sway, badge draw-ons) is deliberately *out* (see §0). Display font is Space Grotesk (Cabinet Grotesk
  substitution, open question #15).

Placeholders render as visible `TODO:` strings in **non-prod only**; the production NAP guard blocks shipping
unresolved contact, and no unverified credential ships.

---

## 0. Art direction

**Warm, human, credible — bright.** Same OKLCH light-first system as the rest of the site (no new palette), but
About is **earned editorial**, not asserted: oversized but calm headings, long-measure running prose, asymmetric
text-forward layouts, real photography at scale, and almost no decorative motion. Warmth comes from the faces and
the plain-spoken copy — **not** from more blue or more cards.

- **Mood:** a real local crew, unhurried and plainspoken. Trustworthy because it's specific.
- **Rhythm:** **generous** — section vertical rhythm `py-24 md:py-32`; centered `max-w-5xl px-6` text column, the
  mission + team + map widening toward `max-w-6xl`. One idea per band; lots of negative space.

### Break the grammar (mandatory — mirrors home.md)

About must **not** be four `eyebrow → H2 → grid-of-cards → fade-up` bands with bigger padding. At least **two
sections are structurally distinct** from the homepage grammar:

1. **§1 Mission = a text-forward editorial opener** — a long-measure story headline + running prose / pull-quote,
   **no card chrome, no grid**. Asymmetric, left-weighted, lots of air.
2. **§2 Team = an asymmetric featured-portrait layout** — one anchor portrait at scale with a human quote, then a
   calmer secondary row — **not** N equal avatar tiles.

The §5 values use a **borderless, number-led editorial** treatment (distinct from the homepage's bordered pillar
cards). Vary the reveal: the mission rises on mount; section reveals are quiet fades — the page is deliberately
**low-motion**, which is itself the editorial signal.

### Restraint & blue placement

Blue is rationed by **placement**, not just volume: it is concentrated on **action + focus surfaces** — the CTA
band, CTA buttons, the small cert glyphs, and every `:focus-visible` ring. The **editorial sections (mission,
team, values) carry NO blue** (eyebrows there are `--muted-foreground`, not `--primary`) so the cool accent
doesn't wash the whole page. Warmth then comes from the photography and the copy.

> **Placeholder-state honesty:** with photos still `TODO`, these sections read as calm navy-on-near-white. That is
> acceptable for build, but the page only becomes *warm* once real portraits land — flag this at visual sign-off
> (an optional warm neutral accent could carry the editorial sections if photography slips).

### Token palette (exact OKLCH — from `globals.css`, quote these)

| Role | Token | OKLCH | Use on About |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | All section backgrounds (warm near-white) |
| Headings / body-strong | `--foreground` | `oklch(0.255 0.045 264)` | H1–H3, names, story prose, value numerals |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | The few surfaces that lift (map frame, quote block) |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | CTA, cert glyph, focus ring (action surfaces only) |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Text on the blue CTA band |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Mission gradient end-stop, cert row fill |
| Hover wash | `--accent` | `oklch(0.93 0.045 250)` | IconBadge fill, image placeholders |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Editorial eyebrows, lead, body, roles, captions |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Decorative dividers / card borders (not control boundaries) |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every interactive `:focus-visible` |

Shadows (token utilities only): `shadow-soft` · `shadow-card` · `shadow-elevated` · `shadow-glow` (**reserved for
the primary CTA + CTA band only**). Radius: `rounded-lg` (14px), `rounded-xl` (18px) for the CTA band + feature
media, `rounded-full` avatars/pills.

### Type scale (editorial-leaning)

| Element | Family | Size | Weight / tracking / leading | Color |
|---|---|---|---|---|
| Mission H1 (story) | `font-display` | `clamp(2.5rem, 5.5vw, 4.5rem)` | bold, `tracking-tight`, `leading-[1.05]` | `--foreground` |
| Section H2 | `font-display` | `clamp(1.75rem, 3.5vw, 2.75rem)` | bold, `tracking-tight` | `--foreground` |
| Pull-quote / featured | `font-display` | `clamp(1.5rem, 2.5vw, 2rem)` | medium, `leading-snug` | `--foreground` |
| Card H3 / name | `font-display` | `clamp(1.25rem, 2vw, 1.5rem)` | semibold, `tracking-tight` | `--foreground` |
| Value numeral | `font-display` | `clamp(2.5rem, 4vw, 3.5rem)` | bold | `--foreground` (ghosted at low opacity) |
| Eyebrow (editorial) | `font-display` | `text-sm` | medium, `uppercase`, `tracking-widest` | `--muted-foreground` |
| Mission lead / prose | `font-sans` | `text-xl md:text-2xl` | regular, `leading-relaxed`, `max-w-[60ch]` | `--muted-foreground` |
| Body | `font-sans` | `text-base → text-lg` | regular, 60–75ch (`max-w-[68ch]`) | `--muted-foreground` |
| Role / detail | `font-sans` | `text-sm` | medium | `--muted-foreground` |

**Mission H1** is an **intentional editorial override** of the standard `h1` token (`clamp(2.25rem,5vw,3.75rem)`)
— bigger, looser leading, magazine-opener feel. Display = Cabinet Grotesk (intent) / **Space Grotesk** (current);
body = **DM Sans**. Never Inter/Arial/Roboto for display. `display:swap` (protects LCP + CLS).

### Motion language (deliberately minimal — see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22, 1, 0.36, 1]`** (`lib/motion.ts`).
- **Mission entrance (the page's one signature moment):** a staggered text reveal on mount (eyebrow → H1 → lead →
  CTA). The **H1 stays opacity:1 / transform-only** (subtle rise) so it never delays LCP; the others fade-up.
- **Section reveals:** shared `RevealOnScroll` — `opacity 0→1`, `y 24→0`, `whileInView once`, `margin "-80px"`.
- **No parallax. No badge draw-on. No 3D.** Team portraits are still; certifications render fully-drawn and static;
  the optional rotating shield is cut (chrome that fights the human/editorial thesis). At most, photos do a slight
  grayscale→color on hover.
- App is wrapped in `<MotionConfig reducedMotion="user">`; Lenis is synced to the GSAP ticker; both bail under
  `prefers-reduced-motion`. **Animate `transform`/`opacity` only — never `backdrop-filter`.**
- **Reduced-motion:** mission stagger static, all reveals static, no hover color-shift, Lenis+GSAP ticker off.
  (There is no parallax/draw/3D to disable — the page is calm by design.)

### Server/client boundaries (see soo-component-patterns)

The page and every section are **Server Components**. `"use client"` lives only at leaves: the mission entrance
stagger, `RevealOnScroll`, and `Magnetic` on the CTA. **No client parallax leaf, no badge-draw leaf, no 3D
Canvas** — About removes those entirely (less client JS than the homepage). The map is a lazy `<iframe>` (no JS of
ours). All copy is typed in `src/content/about.ts`; NAP/partner names come only from `SITE`.

### Page order (top → bottom)

```
Header (shell, sticky)                       ← already built
1  Mission — editorial story opener (text-forward, soft white→pale-blue gradient)
2  Crew / team — asymmetric featured portrait + secondary row (still photos)
3  Certifications & partner authorizations — quiet static trust-mark row
4  Service-area map (embed desktop · tappable card mobile)
5  Values — 3 borderless, number-led editorial blocks
6  CTA band ("Book a free site assessment.")  →  Footer (deep navy — see §6 note)
```

---

## 1. Mission — editorial story opener

**Goal:** open with a *specific* story — who we are, where, since when — in the page's biggest type. LCP region.

**Layout:** full-width band over a **soft white→pale-blue gradient** (`--background` → `--secondary`, gentle
top-right wash), `py-24 md:py-32`, content in `max-w-6xl px-6`. **Text-forward and asymmetric** — a left-weighted
column (~70%) with airy right margin. **No card, no grid, no decorative object** — just type and air.

```
┌──────────────────────────── soft white → pale-blue gradient ───────────────────────────┐
│  ABOUT SOO SOLUTIONS · SMART SOLUTIONS. SAFER FUTURES.   (eyebrow, muted)                 │
│                                                                                            │
│  TODO: [City]'s local camera crew,         (H1 — story headline, editorial, deep navy)     │
│  on the tools since TODO: [year].                                                          │
│                                                                                            │
│  We design and install security camera systems we'd be glad to put on our                  │
│  own homes — certified, warrantied, and here when you need us. No call                      │
│  centres, no subcontractors: the people who quote your job are the people                   │
│  who do it.                                  (mission lead / running prose, muted, ≤60ch)    │
│                                                                                            │
│  [ Book a free site assessment ]   (filled-blue CTA, Magnetic)                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Eyebrow (muted, not blue):** "About Soo Solutions · Smart Solutions. Safer Futures." — the brand tagline is
  **demoted to the eyebrow / a supporting kicker**, `font-display text-sm uppercase tracking-widest
  text-muted-foreground`.
- **H1 — story headline (the identity lever):** a **specific** line anchored to place + people + time, e.g.
  *"`TODO: [City]`'s local camera crew, on the tools since `TODO: [year]`."* — `clamp(2.5rem,5.5vw,4.5rem)`,
  `font-display` bold, `leading-[1.05]`, `text-foreground`. **Content decision (flagged):** the H1 is a
  placeholder pending the confirmed story line (served city/region + founding year) — *not* a reused tagline. The
  page's single `<h1>` and **LCP element** (server-rendered, transform-only entrance, never `opacity:0`).
- **Mission lead / prose:** one warm running paragraph (`text-xl md:text-2xl`, `text-muted-foreground`,
  `max-w-[60ch]`, `leading-relaxed`) — plainspoken specifics ("the people who quote your job are the people who do
  it"). May carry a one-line **pull-quote** treatment (`font-display`, no quotes-as-decoration) for editorial feel.
- **CTA:** filled-blue "Book a free site assessment" → `/contact`, `Magnetic`, `shadow-soft hover:shadow-glow`,
  ≥44px. (The only blue in this section.)
- **Background:** ONE soft gradient, static CSS, decorative, `aria-hidden`. The top-right is **editorial negative
  space** — intentionally empty (no rotating shield).
- **Motion:** staggered mount reveal; H1 transform-only (LCP-safe). Reduced motion → static.
- **Mobile:** single column; H1 floors at `2.5rem`; CTA full-width. No horizontal scroll at 375.
- **A11y:** one `<h1>`; CTA is a real link; gradient `aria-hidden`; navy-on-near-white ≈ 15:1 (and ≥11:1 on the
  palest blue end-stop).

---

## 2. Crew / team — asymmetric featured layout

**Goal:** the emotional core — real faces at human scale, with a real detail each. **Not** an avatar grid.

**Layout:** `max-w-6xl px-6`, `py-24 md:py-32`. `SectionHeading` (eyebrow "The crew" *(muted)* + H2 "Meet the team
behind the cameras"), then a **two-part asymmetric block**:

```
┌─────────────────────────────┐   ┌──────────────────────────────────────────┐
│                             │   │  "I survey every commercial job myself —    │
│      FEATURED PORTRAIT      │   │   it's how I sleep at night."   (quote)      │
│      (anchor, large)        │   │                                             │
│      aspect-[3/4]           │   │   TODO: Founder Name          (name, H3)      │
│                             │   │   Founder & Lead Technician   (role)          │
└─────────────────────────────┘   │   TODO: 12 years on the tools (detail)        │
                                  └──────────────────────────────────────────┘

  ┌──────────┐   ┌──────────┐   ┌──────────┐    ← secondary row (smaller, still, centered if incomplete)
  │  photo   │   │  photo   │   │  photo   │
  └──────────┘   └──────────┘   └──────────┘
   Name · Role     Name · Role     Name · Role
   one-line detail one-line detail one-line detail
```

- **Featured (anchor) member:** a large left portrait (`aspect-[3/4]`, `rounded-xl`) beside (right) a **1–2
  sentence human quote** + name (H3) + role + a one-line detail. This gives the page a face at scale and a voice.
  On `<md` it stacks (portrait over text).
- **Secondary row:** the remaining crew at a smaller size, `grid sm:grid-cols-2 lg:grid-cols-3 gap-8`, each =
  portrait + `Name · Role` + a one-line human detail. **Last-row handling:** an incomplete final row is
  **centered** (`justify-center`) so it's never orphaned — works for a crew of 3, 4, or 5 (1 featured + 2–4
  secondary).
- **Typography:** quote = pull-quote (`font-display clamp(1.5rem,2.5vw,2rem)` medium); name = Card H3; role +
  detail = `text-sm text-muted-foreground`.
- **Color / placeholder:** photos on `--background`; until real photos land, a **warm gradient placeholder**
  (`from-accent via-card to-secondary`, `role="img"` + `aria-label` "Portrait of `TODO: name`"). **No blue in this
  section.**
- **Motion:** the block reveals once with `RevealOnScroll`. **No parallax.** At most a subtle **grayscale→color on
  hover** for real photos (CSS `filter`, GPU; reduced-motion / coarse-pointer → already full color). The warmth is
  in the photo + the detail line, not in motion.
- **Mobile:** featured stacks (portrait → quote/name); secondary 1-col (375) → 2-col (≥640). Portraits keep their
  aspect box (reserved → no CLS).
- **Content:** typed `team[]` (`{ name, role, detail, quote?, photo, alt, featured? }`) in `about.ts` — **all
  `TODO`** (names, roles, details, quote, photos). **A11y:** real photos get descriptive `alt` (person + role);
  placeholders use `role="img"` + `aria-label`. `next/image` with explicit `width`/`height` when real; lazy
  (below the fold).

---

## 3. Certifications & partner authorizations — quiet static row

**Goal:** quiet, credible proof. A **trust-mark row that simply *is* there** — no animation.

**Layout:** `max-w-5xl px-6`, `py-24 md:py-32`. `SectionHeading` (eyebrow "Credentials" *(muted)* + H2 "Certified,
licensed, authorized"), then a **single calm row** — centered flex-wrap or `grid grid-cols-2 sm:grid-cols-3
lg:grid-cols-5 gap-6`. Two kinds: **partner authorizations** (Lorex / Hikvision / HiLook) and **credentials**
(licensed, insured).

```
   ╭───╮     ╭───╮     ╭───╮     ╭───╮     ╭───╮
   │ ✓ │     │ ✓ │     │ ✓ │     │ ✓ │     │ ✓ │     ← static, fully drawn. No draw-on animation.
   ╰───╯     ╰───╯     ╰───╯     ╰───╯     ╰───╯
   Lorex     Hikvision HiLook    Licensed  Insured
   Auth.     Auth.     Auth.     & bonded  TODO
```

- **Badges (static):** a `rounded-full` / shield chip (`bg-card border-border` or borderless on `bg-background`)
  with a small `--primary` glyph (`ShieldCheck` / `BadgeCheck`) + a 1–2 word label and a sub-label. **Rendered
  fully-drawn from first paint — no `stroke-dashoffset` line-draw.** (The line-draw was cut: it fought the "quiet
  supporting row" intent, was the busiest interaction on the page, and added a client GSAP leaf + a reduced-motion
  branch for no warmth gain.)
- **Typography:** label `text-sm font-medium text-foreground`; sub-label `text-xs text-muted-foreground`.
- **Color:** glyph `--primary` (a small accent); chip `bg-card border-border`. Blue stays a glyph-sized accent.
- **Motion:** the row reveals once with `RevealOnScroll`; the badges themselves don't animate.
- **Mobile:** 2-up (375) → 3-up (≥640); wraps cleanly.
- **Content:** typed `certifications[]` (`{ label, sublabel, kind, icon }`). **Partner entries derive from
  `SITE.partners`:** `label = partner.name`, `sublabel = "Authorized installer"`, `icon = "ShieldCheck"`,
  `kind = "partner"`. **Credential** entries (Licensed & bonded / Insured) are **`TODO: confirm`** — do not claim
  unverified credentials. **A11y:** glyph `aria-hidden`; the **label text carries the meaning**; the row is a
  `<section aria-label="Certifications and authorizations">`.

---

## 4. Service-area map

**Goal:** show where we work, anchored to the real address.

**Layout:** `max-w-6xl px-6`, `py-24 md:py-32`. `SectionHeading` (eyebrow "Where we work" *(muted)* + H2 "Serving
`TODO: city / region`"), then a **two-column** block: left = short coverage copy + a served-area list + the
address; right = the **map** (`rounded-xl overflow-hidden border border-border shadow-soft`, `aspect-[4/3]`
reserved).

- **Desktop map:** a lazy Google Maps **`<iframe>`** — `loading="lazy"`, `title="Map of the Soo Solutions service
  area"`, `referrerpolicy="strict-origin-when-cross-origin"` — centered on `253 Bruce St, Unit 2` (full query
  `TODO` until city/postal confirm). The iframe origin (`https://www.google.com`) is **already allow-listed in the
  CSP `frame-src`** — **no CSP change**. Reserved `aspect-[4/3]` box → no CLS.
- **Mobile → tappable card:** **never an interactive iframe on touch.** Render a **static map card** (styled
  placeholder or a static map image when available, with a `--primary` pin glyph) that is **one large tappable
  link** to the maps deep-link / address. Avoids the perf + scroll-trap cost of an embedded map on phones.
- **Typography:** coverage copy = Body; served-area list = `text-sm`; address in an `<address>` (`not-italic`).
- **Color:** map frame `border-border rounded-xl shadow-soft`; the static card uses the warm gradient placeholder
  + a `--primary` pin (the only blue here).
- **Motion:** the block reveals once with `RevealOnScroll`; the map doesn't animate. Reduced motion → static.
- **Content:** served areas from `SITE.serviceAreas` (**`TODO` towns — real areas only, never fabricate for SEO**,
  per soo-seo-local); address from `SITE.contact.address`. **A11y:** the iframe has a `title`; the mobile card link
  has an accessible name ("Open Soo Solutions location in Google Maps"); the pin is `aria-hidden`.

---

## 5. Values — 3 borderless, number-led editorial blocks

**Goal:** the three things we promise, in plain language — treated differently from the homepage pillar cards.

**Layout:** `max-w-5xl px-6`, `py-24 md:py-32`. `SectionHeading` (eyebrow "What we stand for" *(muted)* + H2 **a
plain heading "What you can hold us to"** — *not* a tagline) and a one-line lead, then **3 borderless number-led
blocks** — `grid md:grid-cols-3 gap-10` (or stacked with hairline dividers), **no card border / no shadow / no
IconBadge** (deliberately unlike the homepage's bordered pillar cards).

```
  01                        02                        03
  Local & accountable       No shortcuts              Plain-spoken advice
  A real local team you     Clean cable runs and      We recommend what you
  can reach — the same      certified installs we'd   need, not the biggest
  people, start to finish.  put on our own homes.     bill.
  ──────────                ──────────                ──────────
```

- **Treatment:** each value = a large ghosted **numeral** (`01`/`02`/`03`, `font-display`, `text-foreground/15`),
  value **title** (Card H3), and a one-line body — separated by whitespace + an optional short `--border` rule. No
  card chrome, no blue. Text-forward and calm.
- **Typography:** numeral `clamp(2.5rem,4vw,3.5rem)` ghosted; title = Card H3; body = `text-muted-foreground`.
- **Motion / interaction:** reveal once, `RevealOnScroll` staggered (`index * 0.08s`). No hover lift (no card).
  Reduced motion → static.
- **Mobile:** 1-col stack, generous spacing, divider between values.
- **Content:** typed `values[]` (`{ title, body }`) in `about.ts` — three defaults (`Local & accountable` / `No
  shortcuts` / `Plain-spoken advice`); brand-voice defaults, client-confirmable. **A11y:** the numerals are
  decorative (`aria-hidden`); the title is the heading.

---

## 6. CTA band → Footer

**Goal:** a warm, low-pressure ask, then the page close.

**CTA band:** the existing **`CtaBand`** — `bg-primary text-primary-foreground rounded-xl shadow-glow`, `max-w-5xl
px-6`, `py-24 md:py-28`. About passes `title` = **"Book a free site assessment."** and `description` = one warm
line ("We'll walk your property, map the blind spots, and recommend a system — no obligation."). **Note:** the
`CtaBand` component **bakes in the "Call Now" outline button + `SITE.contact.phoneHref`** — About only configures
`title` / `description` (and optionally the `primary` link); the Call-Now CTA and `tel:` are already inside the
component, not passed in.

- **Typography:** H2 `clamp(1.75rem,3.5vw,2.75rem)` `font-display` bold; body **solid** `text-primary-foreground`
  (4.71:1 — no alpha fade); buttons `size-lg`.
- **Color:** electric-blue band; on-blue text `--primary-foreground`; primary CTA = shadcn `secondary` variant;
  Call-Now outline has a faint `bg-primary-foreground/10` fill (perceivable ≥3:1 from the fill).
- **Motion:** reveals with `RevealOnScroll`; primary CTA may be `Magnetic`; focus rings visible on blue.
- **Mobile:** CTAs stack full-width, primary first.

**Footer (shell):** the shared footer. **It is currently the LIGHT shell footer (`bg-card text-card-foreground`).
The deep-navy footer is a PENDING site-wide shell upgrade owned by [home.md](./home.md) §10 — it is NOT yet built
and About does not own it.** About inherits whatever the shell footer is at build time; the navy conversion will
apply to every page when home's shell upgrade lands (and must be AA-verified then: near-white on navy ≈ 15:1,
"muted" footer text lightened to ≥4.5:1). About adds nothing new to the footer.

---

## Content model (typed in `src/content/about.ts`)

No marketing copy in JSX — sections take typed props. New content + new types in `src/types`:

| Collection | Shape | Status |
|---|---|---|
| Mission | `mission { eyebrow, headline (story line), lead }` | new — **`TODO` story headline** (place + year) |
| Team | `team[] { name, role, detail, quote?, photo, alt, featured? }` | new — **`TODO` names / roles / details / quote / photos** |
| Certifications | `certifications[] { label, sublabel, kind, icon }` | new — partners via `SITE` (`label=name`, `sublabel="Authorized installer"`, `icon="ShieldCheck"`); **`TODO` credentials** |
| Values | `values[] { title, body }` (3) | new — brand-voice defaults |
| CTA | `aboutCta { title, description }` | new — "Book a free site assessment." (Call-Now is baked into `CtaBand`) |
| Served areas | `SITE.serviceAreas[]` | exists — **`TODO` real towns** |
| NAP / partners | `SITE.contact` / `SITE.partners` | exists — phone/city/hours `TODO` |

**Components — reuse:** `SectionHeading`, `RevealOnScroll`, `IconBadge` (cert glyph chip), `Magnetic`, `CtaBand`,
shell `Header`/`Footer`, the `lib/icons` registry. **To build:** `MissionBand` (+ a small client entrance leaf),
`TeamGrid` (server — featured + secondary, no client leaf needed beyond CSS hover), `CertificationRow` (server,
static), `ServiceAreaMap` (server + lazy iframe / mobile card), `ValuesBand` (server). **No 3D, no parallax leaf,
no badge-draw leaf.**

---

## SEO (see soo-seo-local)

- `export const metadata = buildMetadata({ title: "About", description: "...", path: "/about" })` — keep the
  existing About title/description (human-written, ~150–160 chars). `metadataBase` + title template live in the
  root layout.
- **JSON-LD:** the `(marketing)` layout already injects `localBusinessSchema()` (`@type
  "HomeAndConstructionBusiness"`) site-wide — About inherits it; `TODO:` NAP is stripped by `resolved()`. **Do not
  double-inject.** *Optional later:* an `AboutPage` / `Organization` node with `foundingDate` / `founder` once
  those facts are confirmed — not now (no invented data).
- **OG:** the shared `app/opengraph-image.tsx` covers About; a route-specific OG image is optional once a real crew
  image exists.
- **Image SEO:** crew portraits use `next/image` with explicit `width`/`height` + descriptive `alt` (person +
  role); decorative gradients `alt=""`/`aria-hidden`. AVIF/WebP already configured.

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy from `src/content/about.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- Placeholders **non-prod only**: story headline, team names/roles/details/photos, credential wording, served
  towns, NAP phone/city/hours are `TODO:` and listed in PROGRESS. `assertContactResolvedForProduction` (the NAP
  guard, wired before launch) throws the prod build while NAP is `TODO:`. **No unverified
  certification/authorization claim ships.**

### 2. WCAG 2.2 AA
- One `<h1>` (mission story headline); landmarks (`<main>`, headed/`aria-label`'d sections, `<footer>`); heading
  order h1→h2→h3, no skips.
- **Interactive targets are only:** the mission CTA, the CTA-band buttons, the secondary nav links (if any), and
  the **mobile map card link** — all real `<a>`/`<button>` with a visible `--ring` focus-visible ring, ≥44px. The
  desktop map `<iframe>` is focusable and `title`-labelled. **Cert glyphs, value numerals, and decorative gradients
  are non-interactive.** **No form on About → the labelled-field / aria-error gate is N/A.**
- **Contrast (derived from the exact OKLCH tokens — verified):**
  - `--foreground` on `--background` / on the mission gradient (`--background`→`--secondary`): **≥11:1** ✓.
  - `--muted-foreground` on `--background` / `--secondary`: **≥4.77:1** ✓ (editorial eyebrows, lead, body, roles).
  - CTA `--primary-foreground` on `--primary`: **4.71:1** ✓ (solid, no alpha fade).
  - cert glyph `--primary` on `--card`: **4.88:1** ✓ (small accent).
  - **Never** `--primary` as body text on `--secondary` (4.25:1, fails) — blue is glyph/CTA only.
  - **Hairlines:** `--border` on `--background`/`--card` is ~1.25:1 — this is **decorative dividers / card edges,
    not the meaningful boundary of any control**, so the 3:1 UI-contrast rule does not apply to it. The meaningful
    UI strokes (cert glyph, focus ring) are `--primary` (≥4.71:1) and pass ≥3:1.
- Decorative visuals (mission gradient, value numerals, team gradient placeholders, map pin) are
  `aria-hidden`/`alt=""`; informative images (real portraits, static map) get descriptive `alt`.
- **prefers-reduced-motion:** mission stagger static, all reveals static, no hover color-shift. (No
  parallax/draw/3D exists to disable.)
- **Tooling:** **axe DevTools (or `@axe-core/playwright`) returns zero serious/critical violations**, then a manual
  keyboard pass (Tab / Shift+Tab / Enter / Esc).

### 3. Core Web Vitals (budgets per route)
- **LCP < 2.5s** — the **mission H1 text** (server-rendered, `next/font swap`, transform-only entrance so it is
  never `opacity:0` at first paint). No render-blocking hero image; the desktop map iframe is `loading="lazy"`;
  crew portraits lazy (below fold).
- **INP < 200ms** — minimal client JS (only the mission entrance + reveals + Magnetic); no heavy interaction work.
- **CLS < 0.1** — every portrait/map has a reserved aspect box (`aspect-[3/4]` / `[4/3]`) or explicit
  `width`/`height`; fonts via `next/font`; no `backdrop-filter` animation.
- **First-load JS < 130KB per route** — sections are Server Components; **no 3D and no parallax/draw leaves** on
  About (lighter than the homepage); the map is an iframe (no JS of ours).
- **Verify:** `ANALYZE=true` build for the First-Load-JS figure; **Lighthouse** (mobile preset, throttled) on
  `next build && next start`; **Vercel Speed Insights** field data after deploy.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Mission: editorial single column at all widths; H1 floors 2.5rem (375) → caps 4.5rem (≥1920).
- Team: featured stacks <md; secondary 1→2→3; incomplete final row centered (no orphan). Certifications 2→3→5;
  values 3→1; map two-col → **stacked, becomes the tappable card on mobile**.
- `py-24/md:py-32` rhythm holds; gutters keep content off the edge; **no horizontal scroll, no clipping**.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — confirm **OKLCH renders**, the gradient band looks
  right, and the **map falls back to the tappable card on mobile** (no embedded iframe). Mission is content-height
  (not `100dvh`).

### 6. Security headers / CSP
- **No new third-party origins.** The Google Maps **iframe origin (`https://www.google.com`) is already in
  `frame-src`** — no CSP loosening; the iframe sets `referrerpolicy="strict-origin-when-cross-origin"`. 3D is not
  used; fonts/analytics are self-hosted/allow-listed. CSP / HSTS / X-Frame-Options DENY / nosniff / Referrer-Policy
  / Permissions-Policy stay intact; the only `dangerouslySetInnerHTML` on the route is the inherited JSON-LD.

---

## Open questions / TODO (logged in PROGRESS)

- **Story headline** — confirmed place (served city/region) + founding year for the mission H1 (the identity
  lever; currently a `TODO` placeholder line, not the brand tagline).
- **Real crew photos + names + roles + a one-line human detail each** (the centerpiece — never stock).
- **Verified certifications & authorizations** wording (manufacturer "Authorized Installer", licensing, insurance)
  — must be true before shipping the badge.
- **Served area + address** — confirmed `city / region / postal` for the map query + "serving" copy.
- **Static map image** (if avoiding the live iframe) and the maps deep-link.
- **Founder quote** for the featured team block.
- Carryover: Cabinet Grotesk `.woff2` (open question #15); NAP phone/email/hours; real service-area towns; the
  **deep-navy footer** site-wide upgrade (owned by home.md).

---

**See also:** [home design](./home.md) · [PRD](../PRD.md) (About page goals) · [TRD](../TRD.md) ·
[soo-design-system](../../.skills/soo-design-system.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
