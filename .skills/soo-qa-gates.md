---
name: soo-qa-gates
description: The must-pass pre-merge checklist before any page or PR is "done" — accessibility, performance, responsive, cross-browser, security, and content gates.
---

# SOO Pre-Merge Quality Gates

Nothing merges until every gate below passes. Treat this as a hard gate, not a wishlist. Copy the
checklist into the PR description and tick each box with evidence (screenshot, Lighthouse run, axe
result). A page is "done" when all six gates are green.

Sibling skills: motion/3D reduced-motion behavior lives in **soo-motion-3d**; tokens and surface/foreground
pairs live in **soo-design-system**; SEO + NAP sentinels live in **soo-seo-local**. This file is the final gate
that verifies their output.

## Gate order (fail fast)
1. **Content** — cheapest to check, blocks everything. No Lorem ipsum, no `TODO:` contact in prod.
2. **WCAG 2.2 AA** — keyboard, focus, contrast, landmarks, alt, labels, reduced motion, target size.
3. **Core Web Vitals** — LCP / INP / CLS budgets + first-load JS budget.
4. **Responsive** — six checkpoints.
5. **Cross-browser** — Chrome, Edge, Firefox, Safari (incl. iOS Safari).
6. **Security headers / CSP** — `next.config.ts` intact, nothing the page added breaks them.

---

## 1. Content gate (check first)

- [ ] **No Lorem ipsum** anywhere in shipped copy — all section props come from `src/content`, never hardcoded JSX.
- [ ] **No placeholder/TODO contact** in a production build. `TODO:` sentinels are fine in non-prod only.
- [ ] `SITE.contact.phoneDisplay`, `primaryEmail`, address `city/region/postalCode`, and `hours` resolved (no `TODO:` prefix) before this page can render NAP.
- [ ] Service-area / city pages use **real, confirmed towns only** — never fabricated towns for SEO (see soo-seo-local).
- [ ] Build runs the NAP guard below in CI (`pnpm build` on Vercel = `NODE_ENV=production` → guard throws).

---

## 2. WCAG 2.2 AA gate

- [ ] **Keyboard operability** — every interactive element reachable and operable by keyboard alone; no mouse-only handlers.
- [ ] **Logical tab order** — DOM order matches visual order; no positive `tabIndex`; modals/menus trap and restore focus.
- [ ] **Visible focus** — `:focus-visible` ring uses `--ring` (`oklch(0.55 0.218 256)`); never `outline: none` without a replacement.
- [ ] **Text contrast ≥ 4.5:1**; large text and UI components / focus indicators ≥ 3:1. Verify `bg-primary text-primary-foreground` CTAs and any custom combo.
- [ ] **Semantic landmarks** — exactly one `<main>`; `<header>`, `<nav>`, `<footer>` present; no `<div>` soup for structure.
- [ ] **Heading order** — one `<h1>` per page; no skipped levels (h2 → h4); headings describe sections, not styling.
- [ ] **Meaningful vs decorative alt** — informative `next/image` has descriptive `alt`; purely decorative images use `alt=""`.
- [ ] **Labelled fields + aria errors** — every input has a `<label>`/`aria-label`; errors wired via `aria-describedby` + `aria-invalid` and announced (`role="alert"`).
- [ ] **prefers-reduced-motion honored** across Motion / GSAP / Lenis / 3D — reveals render statically, Lenis+GSAP ticker disabled, WebGL replaced by static poster (see soo-motion-3d).
- [ ] **Target size AA** — interactive targets ≥ 24×24 CSS px (prefer ≥ 44px for primary touch targets) with adequate spacing.

Tooling: run axe DevTools (or `@axe-core/playwright`) with **zero serious/critical** violations, then do a
manual keyboard pass (Tab / Shift+Tab / Enter / Space / Esc / arrow keys).

---

## 3. Core Web Vitals gate

Budgets (per route):

- [ ] **LCP < 2.5s**
- [ ] **INP < 200ms**
- [ ] **CLS < 0.1**
- [ ] **First-load JS < 130KB** per route

How to check:

- [ ] **Lighthouse** (mobile preset, throttled) on the production build — `pnpm build && pnpm start`, then run Lighthouse against the route.
- [ ] **Bundle size** via `@next/bundle-analyzer`: `ANALYZE=true pnpm build` and confirm the route's First Load JS chunk is under budget. **3D never appears in the home first-load bundle** (must be `next/dynamic` `{ ssr: false }`).
- [ ] **Field data** via Vercel Speed Insights + `@vercel/analytics` after deploy — confirm real-user INP/LCP trend within budget.
- [ ] CLS guard: every `next/image` has explicit `width`/`height` (or `fill` + sized parent); fonts use `next/font` (no layout shift); never animate `backdrop-filter` (see soo-motion-3d).

```bash
# First-load JS audit (Tailwind v4 + Turbopack project, pnpm)
ANALYZE=true pnpm build      # opens the analyzer report; check First Load JS per route
pnpm build && pnpm start     # then run Lighthouse (mobile, throttled) on the route
```

---

## 4. Responsive gate

Verify layout, tap targets, and overflow at every checkpoint — no horizontal scroll, no clipped content,
section rhythm (`py-20 / md:py-28 / lg:py-32`) holds:

- [ ] **375** (small phone)
- [ ] **768** (tablet portrait)
- [ ] **1024** (tablet landscape / small laptop)
- [ ] **1280** (laptop)
- [ ] **1440** (desktop)
- [ ] **1920** (large desktop)

---

## 5. Cross-browser gate

Render + interact correctly on:

- [ ] **Chrome**
- [ ] **Edge**
- [ ] **Firefox**
- [ ] **Safari** (desktop)
- [ ] **iOS Safari** — confirm `100dvh`/safe-area handling, OKLCH rendering, and that WebGL falls back to the static poster on mobile.

---

## 6. Security headers / CSP gate

Confirm `next.config.ts` security headers are **intact** and nothing this page added (inline scripts, new
third-party origins, embeds) breaks them:

- [ ] **CSP** present and not loosened; any new origin (Turnstile, Resend, fonts, analytics) is explicitly allow-listed, not `unsafe-inline`/`*`.
- [ ] **HSTS** (`Strict-Transport-Security`) intact.
- [ ] **X-Frame-Options: DENY** intact.
- [ ] **X-Content-Type-Options: nosniff** intact.
- [ ] **Referrer-Policy** intact.
- [ ] **Permissions-Policy** intact.

```bash
# Verify headers on the running build
curl -sI http://localhost:3000/ | findstr /I "content-security-policy strict-transport x-frame x-content referrer permissions"
```

---

## Snippet 1 — Full pre-merge checklist (copy into the PR)

```markdown
## QA Gates — must all pass

### 1. Content
- [ ] No Lorem ipsum in shipped copy
- [ ] No placeholder/TODO contact in production (NAP guard passes in prod build)
- [ ] City/service-area pages use real confirmed towns only

### 2. WCAG 2.2 AA
- [ ] Full keyboard operability + logical tab order
- [ ] Visible :focus-visible ring (--ring)
- [ ] Text contrast >= 4.5:1 (large/UI >= 3:1)
- [ ] Semantic landmarks (header/nav/main/footer) + correct heading order
- [ ] Meaningful alt; decorative images alt=""
- [ ] Labelled fields + aria error messaging
- [ ] prefers-reduced-motion honored across Motion / GSAP / Lenis / 3D
- [ ] Target size AA (>= 24px, prefer 44px touch)
- [ ] axe: zero serious/critical violations

### 3. Core Web Vitals
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] First-load JS < 130KB per route (ANALYZE=true pnpm build)
- [ ] 3D not in home first-load bundle

### 4. Responsive (no h-scroll / clipping)
- [ ] 375  - [ ] 768  - [ ] 1024  - [ ] 1280  - [ ] 1440  - [ ] 1920

### 5. Cross-browser
- [ ] Chrome  - [ ] Edge  - [ ] Firefox  - [ ] Safari  - [ ] iOS Safari

### 6. Security
- [ ] CSP / HSTS / X-Frame-Options DENY / nosniff / Referrer-Policy / Permissions-Policy intact in next.config.ts
```

---

## Snippet 2 — focus-visible ring utility (uses the `--ring` token)

Apply on every interactive element. The ring color is the real token `--ring: oklch(0.55 0.218 256)`
(electric blue) exposed by Tailwind v4's `@theme` as `ring-ring`. Pair with `cn()` from `@/lib/utils`.

```tsx
// src/lib/focus-ring.ts
import { cn } from "@/lib/utils";

/** Shared keyboard-only focus ring; meets AA non-text contrast against the warm near-white background. */
export const focusRing = cn(
  "outline-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
```

```tsx
// Usage on any interactive leaf
import { focusRing } from "@/lib/focus-ring";

<a href="/contact" className={cn("rounded-lg px-4 py-2", focusRing)}>
  Book an assessment
</a>
```

Plain-CSS equivalent (e.g. in `globals.css` for elements you do not class individually):

```css
:where(a, button, [role="button"], input, select, textarea, summary):focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
```

---

## Snippet 3 — NAP placeholder guard (fails the production build)

Single source of truth is `SITE.contact` in `src/lib/site.ts`. This guard throws during a production build
if any NAP field still starts with the `TODO:` sentinel, so placeholder contact details can never ship. The
SEO layer already strips `TODO:` from structured data (see soo-seo-local) — this is the build-time backstop.

```ts
// src/lib/nap-guard.ts
import { SITE } from "@/lib/site";

const TODO_PREFIX = "TODO:";

/** Returns the NAP fields that still carry the TODO sentinel (empty array = all resolved). */
export function findUnresolvedContactFields(): string[] {
  const { contact } = SITE;
  const napFields: Record<string, string | undefined> = {
    phoneDisplay: contact.phoneDisplay,
    phoneHref: contact.phoneHref,
    primaryEmail: contact.primaryEmail,
    city: contact.address.city,
    region: contact.address.region,
    postalCode: contact.address.postalCode,
    hours: contact.hours,
  };

  return Object.entries(napFields)
    .filter(([, value]) => (value ?? "").trim().startsWith(TODO_PREFIX))
    .map(([field]) => field);
}

/** Throws in production builds when contact NAP still holds TODO placeholders; no-op in dev. */
export function assertContactResolvedForProduction(): void {
  if (process.env.NODE_ENV !== "production") return;

  const unresolved = findUnresolvedContactFields();
  if (unresolved.length > 0) {
    throw new Error(
      `Placeholder contact details cannot ship. Resolve SITE.contact: ${unresolved.join(", ")}`,
    );
  }
}
```

Wire it into a build-time module so `pnpm build` (which sets `NODE_ENV=production`) fails fast:

```ts
// src/app/layout.tsx  (runs once at build/render of the root)
import { assertContactResolvedForProduction } from "@/lib/nap-guard";

assertContactResolvedForProduction(); // throws the build if NAP is still TODO in production
```

Optional unit test (Vitest) so the guard itself is covered:

```ts
// src/lib/nap-guard.test.ts
import { describe, expect, it } from "vitest";
import { findUnresolvedContactFields } from "@/lib/nap-guard";

describe("NAP guard", () => {
  it("flags no fields once every contact value is resolved", () => {
    // Fails loudly in CI while phoneDisplay/city/region/postalCode/hours are still 'TODO:'.
    expect(findUnresolvedContactFields()).toEqual([]);
  });
});
```
