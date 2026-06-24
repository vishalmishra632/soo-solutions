---
Title: Technical Requirements Document — Soo Solutions Inc Marketing Site
Project: Soo Solutions Inc
Version: Draft v1
Date: 2026-06-17
Status: Draft — client sign-off pending
Related docs: [BRD](./BRD.md) · [PRD](./PRD.md) · [PROGRESS](../PROGRESS.md)
---

# Technical Requirements Document — Soo Solutions Inc

> Scope of this document: how the site is built. The _what_ and _why_ live in the [BRD](./BRD.md) (business goals) and [PRD](./PRD.md) (product/UX). This TRD is the engineering contract for the build phase. No code exists yet; the repo is empty.

---

## 1. Architecture overview

The site is a **Next.js 16 App Router** application, statically generated and served from Vercel's CDN.

- **Server Components by default.** A component opts into `"use client"` only at interaction, animation, and 3D leaves — form fields, the segment toggle, scroll/animation wrappers, the Turnstile widget, and the 3D canvas. Everything else (layout, content sections, SEO, navigation shells) renders on the server and ships zero client JS.
- **Route groups** organize the tree without affecting URLs: `(marketing)` holds the public funnel (home, services, industries, work, products, service-areas, FAQ, contact); `(legal)` holds `/privacy` and `/terms`. Groups let each cluster carry its own `layout.tsx` (e.g. a stripped legal chrome) while keeping flat, clean paths.
- **SSG for every marketing route.** Dynamic segments are enumerated at build time: `generateStaticParams` produces the full set of `services/[slug]` and `service-areas/[city]` pages from `src/content`. No route is rendered on demand; the entire marketing surface is pre-rendered HTML.
- **3D is a deferred leaf.** Three.js / React Three Fiber scenes load through `next/dynamic` with `ssr: false`, wrapped in `<Suspense>`, and gated behind a `prefers-reduced-motion` check. The fallback is a static poster image, so the first paint never waits on WebGL and users who opt out of motion never download it.
- **Scroll and motion.** Lenis drives smooth scroll but is **disabled under `prefers-reduced-motion`**. GSAP + ScrollTrigger handle scroll-linked sequences; Motion (imported from `motion/react`) handles component-level enter/exit and micro-interactions. All motion has a reduced-motion path.

The result: HTML-first pages, animation and 3D layered on top as progressive enhancement, and a client bundle that stays inside the budget in section 9.

---

## 2. Confirmed stack & versions

Versions below were verified via `npm view` on **2026-06-17** — use these exact numbers. **Node 20.x LTS (>=20.9) is required** for Next 16. The local dev machine runs **Node 16.20.2 / npm 8.19.4**, which is a **BLOCKER** — the toolchain must be upgraded before `npm install`.

### Runtime

| Package | Version           | Notes                                        |
| ------- | ----------------- | -------------------------------------------- |
| Node.js | 20.x LTS (>=20.9) | Required by Next 16. Local 16.20.2 = blocker |
| npm     | 10+               | Local 8.19.4 must be upgraded                |

### Core

| Package    | Version | Notes                           |
| ---------- | ------- | ------------------------------- |
| next       | 16.2.9  | App Router, React 19, Turbopack |
| react      | 19.2.7  |                                 |
| react-dom  | 19.2.7  |                                 |
| typescript | 6.0.3   | strict mode                     |

### Styling / UI

| Package                  | Version | Notes                                            |
| ------------------------ | ------- | ------------------------------------------------ |
| tailwindcss              | 4.3.1   | v4 engine, CSS-first config                      |
| @tailwindcss/postcss     | 4.3.1   | PostCSS plugin                                   |
| postcss                  | 8.5.15  |                                                  |
| tw-animate-css           | 1.4.0   | v4 replacement for tailwindcss-animate           |
| clsx                     | 2.1.1   |                                                  |
| tailwind-merge           | 3.6.0   |                                                  |
| class-variance-authority | 0.7.1   | variant styling                                  |
| shadcn                   | 4.11.0  | CLI; components vendored into repo (Radix-based) |
| @radix-ui/react-slot     | 1.3.0   | plus other Radix primitives per component        |
| lucide-react             | 1.20.0  | icons                                            |
| next-themes              | 0.4.6   | theme provider (light default)                   |

### Animation / 3D

| Package            | Version | Notes                                   |
| ------------------ | ------- | --------------------------------------- |
| motion             | 12.40.0 | **import from `motion/react`**          |
| gsap               | 3.15.0  | + ScrollTrigger                         |
| @gsap/react        | 2.1.2   | `useGSAP`                               |
| lenis              | 1.3.23  | smooth scroll; off under reduced-motion |
| three              | 0.184.0 |                                         |
| @react-three/fiber | 9.6.1   |                                         |
| @react-three/drei  | 10.7.7  |                                         |

### Forms / email / anti-spam

| Package                   | Version | Notes                                     |
| ------------------------- | ------- | ----------------------------------------- |
| react-hook-form           | 7.79.0  |                                           |
| zod                       | 4.4.3   | shared client + server schema             |
| @hookform/resolvers       | 5.4.0   |                                           |
| resend                    | 6.12.4  | transactional email                       |
| @marsidev/react-turnstile | 1.5.3   | Cloudflare Turnstile; server-verify token |

### Analytics

| Package                | Version | Notes           |
| ---------------------- | ------- | --------------- |
| @vercel/analytics      | 2.0.1   |                 |
| @vercel/speed-insights | 2.0.0   | Core Web Vitals |

### Tooling

| Package            | Version | Notes |
| ------------------ | ------- | ----- |
| eslint             | 10.5.0  |       |
| eslint-config-next | 16.2.9  |       |

---

## 3. Folder structure

```
soo-solutions/
├─ docs/                         BRD.md · PRD.md · TRD.md
├─ PROGRESS.md
├─ public/                       static assets, OG fallback, 3D posters, brand pack (TODO)
└─ src/
   ├─ app/
   │  ├─ (marketing)/
   │  │  ├─ layout.tsx           marketing chrome (nav, footer)
   │  │  ├─ page.tsx             /
   │  │  ├─ about/page.tsx
   │  │  ├─ services/
   │  │  │  ├─ page.tsx          /services
   │  │  │  └─ [slug]/page.tsx   /services/[slug]  (generateStaticParams)
   │  │  ├─ industries/page.tsx
   │  │  ├─ solutions/page.tsx
   │  │  ├─ work/page.tsx        /work/[slug] deferred to Phase-2
   │  │  ├─ products/page.tsx
   │  │  ├─ service-areas/
   │  │  │  ├─ page.tsx          /service-areas
   │  │  │  └─ [city]/page.tsx   /service-areas/[city]  (generateStaticParams)
   │  │  ├─ faq/page.tsx
   │  │  └─ contact/page.tsx
   │  ├─ (legal)/
   │  │  ├─ layout.tsx           minimal legal chrome
   │  │  ├─ privacy/page.tsx
   │  │  └─ terms/page.tsx
   │  ├─ sitemap.ts
   │  ├─ robots.ts
   │  ├─ not-found.tsx
   │  └─ opengraph-image/        dynamic OG image route
   ├─ actions/                   Server Actions (submitQuoteRequest, ...)
   ├─ components/
   │  ├─ ui/                     vendored shadcn primitives
   │  ├─ sections/               page sections (hero, pillars, trust badges, ...)
   │  └─ layout/                 nav, footer, theme provider, motion/scroll wrappers
   ├─ content/                   services.ts · industries.ts · products.ts · cities.ts · faq.ts · copy.ts
   ├─ lib/
   │  ├─ seo/                    metadata builders, JSON-LD helpers
   │  ├─ validation/             shared Zod schemas
   │  ├─ email/                  Resend client + templates
   │  └─ utils/                  cn(), formatters
   └─ styles/                    globals.css (@theme tokens), keyframes
```

Content lives in `src/content` as typed TypeScript — never hardcoded in JSX — so copy and taxonomies change in one place and the type system catches gaps.

---

## 4. Design-token approach

Tokens are defined in CSS via **Tailwind v4 `@theme`** in `src/styles/globals.css`. No `tailwind.config.js` color block; the theme is the source of truth.

- **OKLCH color tokens.** Brand mapping: **primary = electric blue**, **foreground = deep navy**, **background = warm near-white**. OKLCH keeps lightness perceptually even across the palette, which matters for the contrast targets in section 10.
- **Semantic shadcn pairs.** Tokens are exposed as the standard pairs so vendored components inherit the brand automatically: `background`/`foreground`, `primary`/`primary-foreground`, `secondary`, `muted`/`muted-foreground`, `accent`/`accent-foreground`, `card`, `popover`, `destructive`, `border`, `input`, `ring`. Components reference semantics, never raw hues.
- **Fonts via `next/font`.** Display = **Cabinet Grotesk** self-hosted through `next/font/local` (fallback **General Sans**). Body = **DM Sans** through `next/font/google`. Both use `display: 'swap'` with preconnect, so text paints immediately with no layout shift (CLS budget in section 9). Font families bind to `--font-display` / `--font-sans` CSS variables consumed by `@theme`.
- **Light-first theming.** `next-themes` is wired, **light is the default**, and dark mode is **Phase-2** — the dark token set is scaffolded but not shipped in MVP.
- **Keyframes.** `tw-animate-css` supplies utility keyframes for Tailwind v4 (the `tailwindcss-animate` successor).
- **Class composition.** `cn()` = `clsx` + `tailwind-merge`, the single helper for conditional and conflicting class resolution.

---

## 5. State strategy

Deliberately minimal. There is **no global store — no Redux, no Zustand.** A marketing site has no cross-cutting client state worth the bundle cost or indirection.

| Concern                          | Mechanism                       | Why                                                                                              |
| -------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Commercial / Residential segment | URL `searchParams`              | Shareable, SSR-friendly, survives reload, indexable — a real app state, so it belongs in the URL |
| Contact / quote form             | React Hook Form                 | Local, ephemeral, validation-bound; lives and dies with the form                                 |
| Theme (Phase-2 dark)             | React context via `next-themes` | The one genuinely global, low-frequency toggle                                                   |

Everything else is server-rendered content with no client state. Adding a store would mean shipping JS to manage state that the URL and a form library already own.

---

## 6. Forms & email path

The contact/quote form is the primary conversion. It runs through a Server Action; the browser never holds a secret or talks to Resend directly.

**End-to-end flow:**

1. **Client validate** — React Hook Form + `@hookform/resolvers` run the **Zod** schema on submit; inline errors, no round-trip for obvious mistakes.
2. **Submit to Server Action** — validated payload + Turnstile token posted to `submitQuoteRequest`.
3. **Server re-validate** — the action re-parses with the **same Zod schema** from `src/lib/validation`. The client check is UX; the server check is the gate. Never trust the client.
4. **Verify Turnstile** — the action POSTs the token to Cloudflare's `siteverify` with `TURNSTILE_SECRET_KEY`. Fail = reject.
5. **Honeypot** — a hidden field that real users leave empty; any value = silent drop.
6. **Rate-limit** — per-IP throttle to blunt abuse beyond the captcha.
7. **Send via Resend** — on all checks passing, send the lead to the contact inbox (`TODO: correct email spelling — verify soosoultioninc@outlook.com vs hello@fonebazaar.ca, and which is primary`).
8. **Return typed result** — a discriminated union (`{ ok: true }` | `{ ok: false; error }`) drives success vs error UI. RHF renders field and form-level messages.

**Environment variables:** `RESEND_API_KEY`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_TO_EMAIL`. The site key is public; the rest are server-only.

**No PII is logged.** Errors log status and reason, never the submitter's name, email, phone, or message.

---

## 7. SEO architecture

- **Metadata API.** Each route exports static `metadata` or async `generateMetadata` (for `[slug]` / `[city]`), producing title, description, canonical, and social tags from `src/content`. Builders live in `src/lib/seo`.
- **JSON-LD structured data:**
  | Schema | Where | Notes |
  |---|---|---|
  | `LocalBusiness` | Org-wide + each city page | City pages add `areaServed` for the local footprint |
  | `Service` | Each `services/[slug]` | One per service offering |
  | `FAQPage` | `/faq` | Mirrors on-page Q&A |
  | `BreadcrumbList` | Nested routes | Reinforces hierarchy in results |
- **Sitemap & robots.** `app/sitemap.ts` enumerates every static route (including generated `[slug]`/`[city]`); `app/robots.ts` allows crawl and points to the sitemap.
- **Canonical URLs** on every page to prevent duplicate-content splits across segment/query variants.
- **OpenGraph / Twitter + dynamic OG image** via the `opengraph-image` route, branded per page.
- **Per-city local SEO.** Each `service-areas/[city]` page is a distinct, indexable URL with city-specific copy, `LocalBusiness` + `areaServed` JSON-LD, and local-intent metadata — the backbone of the local-search strategy. City list: `TODO: service-area towns/cities` (province inferred Ontario-region, `TODO: confirm`).

---

## 8. Security

**Headers / CSP** (set via `next.config` headers or middleware):

| Header                            | Policy                                                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Security-Policy           | `default-src 'self'`; allow Vercel Analytics, Turnstile (`challenges.cloudflare.com`), Google Maps embed, and font origins; **scripts run under a per-request nonce / strict-dynamic** — no blanket `unsafe-inline` for scripts |
| Strict-Transport-Security         | `max-age=63072000; includeSubDomains; preload`                                                                                                                                                                                  |
| X-Content-Type-Options            | `nosniff`                                                                                                                                                                                                                       |
| X-Frame-Options / frame-ancestors | `DENY` / `frame-ancestors 'none'` (clickjacking)                                                                                                                                                                                |
| Referrer-Policy                   | `strict-origin-when-cross-origin`                                                                                                                                                                                               |
| Permissions-Policy                | deny camera, microphone, geolocation, and other unused capabilities                                                                                                                                                             |

**Application security:**

- Secrets live in **env vars only**; nothing sensitive reaches the client. The Turnstile site key is the only public key.
- **Server-side input validation** with the shared Zod schema on every Server Action — the authoritative gate.
- **Turnstile + honeypot + rate limiting** layered on the form (see section 6).
- No secret is ever embedded in a client component or bundle.

---

## 9. Performance budgets

Budgets are hard targets; CI fails or flags regressions. All Core Web Vitals must be **Good**.

| Metric        | Budget                | Strategy                                                                                   |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| First-load JS | < 130 KB gzip / route | RSC by default; `"use client"` only at leaves; code-split 3D via `next/dynamic ssr:false`  |
| LCP           | < 2.5 s               | Static HTML from CDN; `next/image` with sized assets; font preload + `swap`                |
| INP           | < 200 ms              | Minimal client JS; no global store; hydrate only interactive leaves                        |
| CLS           | < 0.1                 | Sized images and media; `next/font` with `swap` (no FOUT shift); reserved space for embeds |
| TTFB          | < 600 ms              | Fully static output served from Vercel edge / CDN — no per-request render                  |

---

## 10. Accessibility

Target: **WCAG 2.2 AA**.

- **Semantic landmarks** — `header`, `nav`, `main`, `footer`, and section headings in document order.
- **Keyboard navigation** — every interactive element reachable and operable by keyboard, logical tab order, no traps.
- **Visible focus** — a clear focus indicator on all controls (driven by the `ring` token).
- **Form accessibility** — every field has a `<label>`; errors are programmatically associated and announced via `aria-describedby` / `aria-invalid` / `aria-live`.
- **Color contrast** — the OKLCH palette is tuned so text and UI meet AA contrast in light mode; pairs are checked against the background/foreground tokens.
- **`prefers-reduced-motion`** respected across **Motion, GSAP/ScrollTrigger, Lenis, and 3D** — reduced-motion users get static content, no smooth-scroll, and the 3D poster fallback.
- **Target sizes** meet the 2.2 AA minimum for tap targets.
- **Verification** — automated **axe** scans plus manual keyboard and screen-reader checks (section 13).

---

## 11. Analytics & monitoring

- **Vercel Analytics** (`@vercel/analytics`) for traffic and the conversion funnel; **Vercel Speed Insights** (`@vercel/speed-insights`) for field Core Web Vitals — both mounted once in the root layout.
- **Custom events mirror [PRD](./PRD.md) section 5** — quote-form submit, tap-to-call, and Google Business Profile actions are tracked as the primary conversions, with secondary engagement events (scroll depth on service pages, service-area reach) per the PRD event map.

---

## 12. Deployment & CI

- **Host: Vercel.** Every PR gets a **preview deploy**; **production deploys on merge to `main`.** Output is fully static.
- **Required env vars** (Vercel project + GitHub secrets): `RESEND_API_KEY`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_TO_EMAIL`. (Resend key + verified sending domain DNS, and the Turnstile keys, are `TODO`.)
- **GitHub Actions** on every PR, running on **Node 20**:
  1. `tsc --noEmit` (typecheck)
  2. `eslint`
  3. `next build`
  4. _(optional)_ Lighthouse CI against the performance budgets and an axe pass
- The Node 20 requirement applies to CI and local dev alike (local 16.20.2 blocker, section 2).

---

## 13. Testing strategy

| Layer            | Tool                          | Gate                                                                        |
| ---------------- | ----------------------------- | --------------------------------------------------------------------------- |
| Types            | `tsc --noEmit`                | CI blocking                                                                 |
| Lint             | `eslint` (eslint-config-next) | CI blocking                                                                 |
| Smoke (optional) | Playwright                    | Renders key routes, exercises the form happy path                           |
| A11y (optional)  | axe-core                      | Catches contrast, label, and landmark regressions                           |
| Manual           | a11y + CWV checklist          | Keyboard + screen-reader pass; verify LCP/INP/CLS against section 9 budgets |

Automated gates keep the build honest; the manual a11y/CWV checklist is the final sign-off before production.

---

## Cross-references

- [BRD](./BRD.md) — business goals, brand, success metrics
- [PRD](./PRD.md) — product scope, sitemap, UX, analytics event map (section 5)
- [PROGRESS](../PROGRESS.md) — build tracker
