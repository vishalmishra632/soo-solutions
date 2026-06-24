# Product Requirements Document — Soo Solutions Inc Marketing Site

| Field            | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| **Title**        | Product Requirements Document (PRD)                            |
| **Project**      | Soo Solutions Inc — marketing website                          |
| **Version**      | Draft v1                                                       |
| **Date**         | 2026-06-17                                                     |
| **Status**       | Draft — client sign-off pending                                |
| **Doc owner**    | Engineering (placeholder)                                      |
| **Related docs** | [BRD](./BRD.md) · [TRD](./TRD.md) · [PROGRESS](../PROGRESS.md) |

---

## 0. Header

This PRD defines _what_ the Soo Solutions Inc marketing site must do and _which_ pages ship in which phase. Business rationale, market positioning, and commercial goals live in [BRD](./BRD.md). Engineering decisions, stack versions, architecture, and performance budgets live in [TRD](./TRD.md). Status and open-question tracking live in [PROGRESS](../PROGRESS.md). The repo is currently empty; this document is a requirement set, not an implementation.

---

## 1. Overview & objectives

Soo Solutions Inc supplies and professionally installs security cameras and CCTV systems for Commercial and Residential customers. The marketing site exists to convert local search and referral traffic into quote requests and phone calls — its primary measure of success is qualified leads, not page views. Business goals, target market, and positioning are owned by [BRD](./BRD.md); this PRD covers the product surface that delivers them.

Primary objectives:

- Drive **quote/contact form submissions** and **tap-to-call** phone leads.
- Let visitors self-identify as **Commercial** or **Residential** and route to relevant content fast.
- Establish trust through partner brands (Lorex, Hikvision, HiLook), service pillars, and trust badges.
- Rank for **local-search** intent across the service area.

---

## 2. Sitemap & page inventory

Canonical sitemap (identical wording in PRD and TRD). All MVP marketing routes render as static (SSG); dynamic slug routes are statically generated at build via `generateStaticParams`.

| Page                      | Route                   | Render      | Page goal                                     | Primary CTA                             | Priority                                      |
| ------------------------- | ----------------------- | ----------- | --------------------------------------------- | --------------------------------------- | --------------------------------------------- |
| Home                      | `/`                     | SSG         | Convert and segment-route the visitor         | Request a Free Quote                    | MVP                                           |
| About                     | `/about`                | SSG         | Build trust in the company and team           | Request a Quote / Call                  | MVP                                           |
| Services (hub)            | `/services`             | SSG         | Show the full service offering                | Request a Quote                         | MVP                                           |
| Service detail            | `/services/[slug]`      | dynamic-SSG | Sell one specific service                     | Request a Quote for this service        | MVP                                           |
| Industries                | `/industries`           | SSG         | Map visitor's vertical to a solution          | Find Your Solution                      | MVP                                           |
| Solutions                 | `/solutions`            | SSG         | Present packaged solution approaches          | Request a Quote                         | MVP                                           |
| Work / Case Studies (hub) | `/work`                 | SSG         | Prove results with real projects              | Start Your Project                      | MVP                                           |
| Products                  | `/products`             | SSG         | Showcase partner-brand hardware (no commerce) | Ask About This Product                  | MVP                                           |
| Service Areas (hub)       | `/service-areas`        | SSG         | Establish local coverage                      | Check Your Area / Get a Quote           | MVP                                           |
| City page                 | `/service-areas/[city]` | dynamic-SSG | Win local-search intent per city              | Get a Quote in {City}                   | MVP                                           |
| FAQ                       | `/faq`                  | SSG         | Remove pre-purchase objections                | Still have questions? Contact us        | MVP                                           |
| Contact / Quote           | `/contact`              | SSG         | Capture the lead                              | Submit Quote Request (also tap-to-call) | MVP                                           |
| Careers                   | `/careers`              | —           | Recruiting                                    | —                                       | **Phase-2 (DEFERRED)**                        |
| Case-study detail         | `/work/[slug]`          | dynamic-SSG | Deep-dive one project                         | Start Your Project                      | **Phase-2** (hub ships MVP with 1–2 featured) |

**Utility / system routes (MVP):** `/privacy`, `/terms`, `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, OG image route.

---

## 3. Per-page requirements

Each subsection states the page goal, content blocks, CTAs, must-have components, SEO intent, and notable interactions. All motion is tasteful and respects `prefers-reduced-motion`. All copy/data comes from `src/content` (see §6), never hardcoded in JSX.

### 3.1 Home — `/`

- **Goal:** Convert high-intent visitors and route everyone else into the correct segment.
- **Content blocks (in order):**
  1. **Hero** — rotating tagline cycling the four brand taglines ("Smart Solutions. Safer Futures.", "Security You Can Trust.", "Solutions You Can Rely On.", "Your Property. Our Priority."), a primary **Request a Free Quote** CTA, and a secondary tap-to-call. Optional **R3F hero accent** (see interactions).
  2. **Segment self-select** — two large entry points, **Commercial** vs **Residential**, that set segment context and deep-link into relevant content.
  3. **Service pillars** — Certified Technicians, Expert Service, Warranty Assured, Reliable Support.
  4. **Partner / brand strip** — Lorex, Hikvision, HiLook logos.
  5. **Trust badges** — High Quality Products, 24/7 Protection, Tailored Solutions, Customer Satisfaction.
  6. **Featured services** — 3–4 cards linking to service detail pages.
  7. **Social proof** — testimonials. `TODO: testimonials / Google reviews`.
  8. **Service-area teaser + map** — short coverage statement, map embed, link to `/service-areas`.
  9. **Final CTA band** — repeat the primary quote CTA with tap-to-call.
- **Primary CTA:** Request a Free Quote. **Secondary CTA:** Tap-to-call (`TODO: phone number`).
- **Must-have components:** rotating tagline, segment toggle/cards, pillar grid, brand strip, badge row, service cards, testimonial carousel, map embed, CTA band.
- **SEO intent:** brand + core service ("security camera installation", "CCTV installation") + local modifier (`TODO: exact city`).
- **Interactions / animation:** rotating tagline (crossfade; static first line under reduced-motion). Optional **R3F hero accent** — dynamically imported, `ssr: false`, with a static reduced-motion / no-WebGL fallback. Subtle scroll reveals on pillars and cards, disabled under reduced-motion.

### 3.2 About — `/about`

- **Goal:** Build trust in the company, technicians, and process.
- **Content blocks:** company story, the four pillars restated, certifications/partner relationships, simple process overview (survey → design → install → support), service-area note.
- **Primary CTA:** Request a Quote / Call. **Secondary CTA:** View Services.
- **Must-have components:** narrative sections, pillar grid, brand strip, process steps, CTA band.
- **SEO intent:** brand + "about" + trust signals; supports E-E-A-T.
- **Interactions:** scroll reveals only; reduced-motion safe.

### 3.3 Services (hub) — `/services`

- **Goal:** Present the complete service offering and route to detail pages.
- **Content blocks:** intro, service card grid (one card per service), segment relevance hints (Commercial / Residential), CTA band.
- **Primary CTA:** Request a Quote. **Secondary CTA:** Industries / Solutions cross-links.
- **Must-have components:** service card grid, segment hint chips, CTA band.
- **SEO intent:** "security camera services", "CCTV services" + local modifier.
- **Content note:** service list is provisional — `TODO-CONFIRM exact service list & whether 24/7 monitoring is offered`.

### 3.4 Service detail — `/services/[slug]`

- **Goal:** Sell one specific service and capture a service-scoped quote.
- **Content blocks:** service hero (name + one-line value), what's included, who it's for (segment), process, relevant brands/products, related FAQs, related case study (if any).
- **Primary CTA:** Request a Quote for this service (pre-selects this service in the form). **Secondary CTA:** Tap-to-call.
- **Must-have components:** service hero, inclusion list, process steps, related-content blocks, CTA band.
- **SEO intent:** long-tail per service (e.g. "system design & site survey", "CCTV maintenance"); each slug targets one query cluster.
- **Build note:** slugs sourced from the `services` content collection via `generateStaticParams`.

### 3.5 Industries — `/industries`

- **Goal:** Let a visitor recognize their vertical and find the matching solution.
- **Content blocks:** industry grid (Retail, Warehousing & Logistics, Hospitality, Healthcare/Clinics, Education, Multi-Residential/Condos, Construction Sites, Offices — `TODO-CONFIRM`), per-industry pain → solution snippet, link to Solutions/Services.
- **Primary CTA:** Find Your Solution. **Secondary CTA:** Request a Quote.
- **Must-have components:** industry card grid, CTA band.
- **SEO intent:** "security cameras for {industry}" patterns.
- **Interactions:** card hover/reveal; reduced-motion safe.

### 3.6 Solutions — `/solutions`

- **Goal:** Present packaged solution approaches above individual services.
- **Content blocks:** solution cards (outcome-oriented), how a solution combines services/products, segment relevance, CTA band.
- **Primary CTA:** Request a Quote. **Secondary CTA:** Explore Services.
- **Must-have components:** solution card grid, CTA band.
- **SEO intent:** outcome queries ("commercial security solution", "home security solution").

### 3.7 Work / Case Studies (hub) — `/work`

- **Goal:** Prove results with real projects.
- **Content blocks:** intro, case-study card grid (MVP ships 1–2 featured), per-card outcome/metric, segment/industry tags.
- **Primary CTA:** Start Your Project. **Secondary CTA:** Request a Quote.
- **Must-have components:** case-study cards, CTA band.
- **SEO intent:** "{industry} security camera project / case study".
- **Phase-2:** dedicated detail pages at `/work/[slug]`. Hub ships MVP with cards only.
- **Content note:** `TODO: real photos / imagery & brand asset pack`, project specifics.

### 3.8 Products — `/products`

- **Goal:** Showcase partner-brand hardware. **No e-commerce — no cart, no prices.**
- **Content blocks:** brand sections (Lorex, Hikvision, HiLook), product/brand cards (camera / NVR / kit lines), spec highlights, "Ask About This Product" CTA per card.
- **Primary CTA:** Ask About This Product (routes to contact with product context). **Secondary CTA:** Request a Quote.
- **Must-have components:** brand grouping, product/brand cards, CTA band.
- **SEO intent:** "{brand} cameras", "{brand} NVR installation".
- **Content note:** `TODO-CONFIRM model list` per brand.

### 3.9 Service Areas (hub) — `/service-areas`

- **Goal:** Establish local coverage and route to city pages.
- **Content blocks:** coverage intro, city list/lookup, map embed, CTA band.
- **Primary CTA:** Check Your Area / Get a Quote. **Secondary CTA:** Tap-to-call.
- **Must-have components:** service-area list/lookup, map embed, CTA band.
- **SEO intent:** "security camera installation near me" + region.
- **Content note:** `TODO: service-area towns/cities`; province inferred Ontario-region `TODO-CONFIRM`.

### 3.10 City page — `/service-areas/[city]`

- **Goal:** Win local-search intent for one city.
- **Content blocks:** city-specific hero ("Security Camera Installation in {City}"), local relevance, services available, nearby case study if any, map, CTA band.
- **Primary CTA:** Get a Quote in {City}. **Secondary CTA:** Tap-to-call.
- **Must-have components:** localized hero, service summary, map embed, CTA band.
- **SEO intent:** one city × core service per page; strong local-SEO surface.
- **Build note:** city slugs from the `serviceAreas` content collection via `generateStaticParams`. `TODO: service-area towns/cities`.

### 3.11 FAQ — `/faq`

- **Goal:** Remove pre-purchase objections.
- **Content blocks:** grouped FAQ accordion (general, commercial, residential, products, support), inline CTA.
- **Primary CTA:** Still have questions? Contact us. **Secondary CTA:** Request a Quote.
- **Must-have components:** accordion (Radix/shadcn), CTA band.
- **SEO intent:** question-shaped long-tail; eligible for FAQ rich results (structured data — see [TRD](./TRD.md)).
- **Interactions:** accordion expand/collapse; reduced-motion safe.

### 3.12 Contact / Quote — `/contact`

- **Goal:** Capture the lead.
- **Content blocks:** quote/contact form (full field list in §5, FR-1), tap-to-call and click-to-email, business address (253 Bruce St, Unit 2; `TODO: exact city / province / postal code`), map embed, business hours (`TODO: business hours`).
- **Primary CTA:** Submit Quote Request. **Secondary CTA:** Tap-to-call (`TODO: phone number`).
- **Must-have components:** form (React Hook Form + Zod), Turnstile widget, honeypot, success state, contact details block, map embed.
- **SEO intent:** "contact" + brand + "free quote".
- **Interactions:** inline validation, submit pending/success/error states; reduced-motion safe.

### 3.13 Careers — `/careers` — **DEFERRED (Phase-2)**

- Not built in MVP. No route shipped. Tracked in [PROGRESS](../PROGRESS.md).

---

## 4. User journeys & flows

The **Commercial / Residential segment switch** is a lightweight client-side context. Selecting a segment (on the Home self-select, or a header toggle) tailors copy emphasis, default form `segment` value, and which featured services/industries surface first. It changes presentation and defaults only — it never gates content, and every page is reachable in either segment. The choice persists for the session; the default state shows neutral (both-segment) content.

### (a) Residential visitor → self-segment → service detail → quote submit

1. Lands on `/` from local search.
2. Reads rotating-tagline hero; taps **Residential** in segment self-select.
3. Featured services reorder toward residential; taps a service card → `/services/[slug]`.
4. Reads what's-included and process; clicks **Request a Quote for this service**.
5. Arrives at `/contact` with `segment = Residential` and the service pre-selected.
6. Fills required fields, passes Turnstile, submits → success state. (`segment_select`, `service_view`, `quote_submit` events fire.)

### (b) Commercial facility manager → industries/solutions → case study → quote/call

1. Lands on `/` or `/industries`; selects **Commercial**.
2. On `/industries`, recognizes their vertical (e.g. Warehousing & Logistics) → follows to `/solutions`.
3. Reviews a packaged solution → clicks through to `/work` and a featured case study.
4. Converts via **Request a Quote** (`segment = Commercial`) **or** taps **tap-to-call** for a direct conversation. (`segment_select`, `quote_submit` or `call_click` fire.)

### (c) High-intent mobile visitor → tap-to-call

1. Lands on any page from mobile local search.
2. Persistent header / hero **tap-to-call** button (`tel:` link, `TODO: phone number`).
3. One tap dials. (`call_click` fires.) No form required — fastest path to a lead.

---

## 5. Functional requirements

### FR-1 — Quote / contact form

Submitted via a Next.js **Server Action** using **Resend**; client uses **React Hook Form + Zod**. Field list and validation:

| Field                    | Type                             | Required      | Validation (Zod)                          |
| ------------------------ | -------------------------------- | ------------- | ----------------------------------------- |
| Name                     | text                             | Required      | non-empty, 2–80 chars                     |
| Phone                    | tel                              | Required      | valid phone format; digits normalized     |
| Email                    | email                            | Required      | valid email                               |
| Segment                  | radio (Commercial / Residential) | Required      | one of the two enum values                |
| Property type            | select                           | Required      | one of allowed enum values                |
| Services interested in   | **multi-select**                 | Required (≥1) | each value from the `services` collection |
| Preferred contact method | radio (phone / email)            | Required      | enum                                      |
| Preferred time           | select                           | Optional      | enum (e.g. morning / afternoon / evening) |
| Message                  | textarea                         | Optional      | ≤ 1000 chars                              |
| Address / City           | text                             | Optional      | ≤ 120 chars                               |
| How did you hear         | select                           | Optional      | enum                                      |
| Consent                  | checkbox                         | Required      | must be `true`                            |
| Honeypot                 | hidden text                      | —             | must stay empty (bots fail)               |
| Turnstile token          | hidden                           | Required      | non-empty; **server-verified**            |

- **Required vs optional:** required = name, phone, email, segment, property type, services (≥1), preferred contact method, consent, Turnstile token. Optional = preferred time, message, address/city, how-did-you-hear.
- **Inline error UX:** validate on blur and on submit; per-field message below the field; first invalid field receives focus on submit; errors announced to assistive tech.
- **Success state:** form replaced by a confirmation message with next-steps and tap-to-call; submit button shows a pending state during the action.
- **Server-side handling (summary):** re-validate with Zod, verify Turnstile token, check honeypot, apply rate limiting, then send via Resend. Implementation detail (action wiring, env, DNS) is deferred to [TRD](./TRD.md). `TODO: correct email spelling`, `TODO: Resend API key + verified sending domain DNS`.

### FR-2 — Spam protection

Three layers: **Cloudflare Turnstile** (widget client-side, token verified server-side), a **honeypot** hidden field, and **server-side rate limiting**. `TODO: Cloudflare Turnstile site key + secret key`.

### FR-3 — Tap-to-call & click-to-email

`tel:` links on hero, header, CTA bands, and contact page (`TODO: phone number`). `mailto:` click-to-email on the contact page (`TODO: correct email spelling` — verify `soosoultioninc@outlook.com` vs `hello@fonebazaar.ca` and which is primary).

### FR-4 — Map embed

Google Maps embed on Home teaser, Service Areas hub, city pages, and Contact. Address: **253 Bruce St, Unit 2** (`TODO: exact city / province / postal code`).

### FR-5 — Partner / brand showcase

Brand strip (Home, About) and grouped product cards (Products) for **Lorex, Hikvision, HiLook**. Marketing showcase only — no commerce.

### FR-6 — Segment toggle

Commercial / Residential context (see §4): sets default form segment, reorders featured content, persists for the session, never gates content.

### FR-7 — FAQ accordion

Accessible accordion (Radix/shadcn) on `/faq`; keyboard-operable, reduced-motion safe.

### FR-8 — Service-area lookup / list

City list (and optional lookup) on `/service-areas`, linking to city pages. `TODO: service-area towns/cities`.

### FR-9 — Case-study cards

Cards on `/work` (1–2 featured at MVP) with outcome and industry/segment tags. Detail pages are Phase-2.

### FR-10 — Product / brand cards

Cards grouped by partner brand on `/products`. **No cart, no prices.** Each card CTAs into contact with product context.

### FR-11 — Analytics events

Capture: `quote_submit`, `call_click`, `directions_click`, `segment_select`, `service_view`. Wired through Vercel Analytics; instrumentation detail in [TRD](./TRD.md).

---

## 6. Content requirements

All copy and data are **typed in `src/content` (TypeScript)** and imported into components — never hardcoded in JSX. Content collections:

| Collection       | Holds                                                       | Status                                                                                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `services`       | service name, slug, summary, inclusions, process, segment   | `TODO-CONFIRM exact service list & whether 24/7 monitoring is offered`                                                                                                                                                                          |
| `industries`     | industry name, slug, pain → solution snippet                | `TODO-CONFIRM` (Retail, Warehousing & Logistics, Hospitality, Healthcare/Clinics, Education, Multi-Residential/Condos, Construction Sites, Offices)                                                                                             |
| `solutions`      | solution name, outcome, composed services/products, segment | provisional                                                                                                                                                                                                                                     |
| `products`       | brand, line, spec highlights                                | `TODO-CONFIRM model list` per brand (Lorex / Hikvision / HiLook)                                                                                                                                                                                |
| `caseStudies`    | title, slug, industry, segment, outcome, imagery            | `TODO: real photos / imagery & brand asset pack`, project specifics                                                                                                                                                                             |
| `serviceAreas`   | city, slug, local copy                                      | `TODO: service-area towns/cities`; province `TODO-CONFIRM`                                                                                                                                                                                      |
| `faqs`           | question, answer, group                                     | provisional                                                                                                                                                                                                                                     |
| `testimonials`   | quote, author, segment                                      | `TODO: testimonials / Google reviews`                                                                                                                                                                                                           |
| `site` / `brand` | name, taglines, pillars, badges, partners, address, contact | name + taglines + pillars + badges + partners confirmed; `TODO: phone number`, `TODO: exact city / province / postal code`, `TODO: correct email spelling`, `TODO: business hours`, `TODO: social handles`, `TODO: Google Business Profile URL` |

**Flagged content TODOs:** imagery / brand asset pack, testimonials, exact service list (and whether monitoring is offered) are all unresolved. Email spelling must be verified, not silently corrected: `soosoultioninc@outlook.com` is likely misspelled ("soultion") and `hello@fonebazaar.ca` uses a different domain than the brand — `TODO-VERIFY` both and which is primary.

---

## 7. Non-functional summary

One-liners; budgets and detail in [TRD](./TRD.md).

- **Performance:** Core Web Vitals "Good" — LCP < 2.5 s, INP < 200 ms, CLS < 0.1, TTFB < 600 ms; first-load JS < 130 KB gzip per route. Budgets owned by [TRD](./TRD.md).
- **Accessibility:** WCAG 2.2 AA; all motion respects `prefers-reduced-motion`.
- **SEO:** SSG everywhere, per-page metadata, sitemap/robots, structured data (FAQ, LocalBusiness), local-SEO city pages.
- **Security:** Turnstile + honeypot + rate limiting on the form; server-side token verification; no secrets in client.

---

## 8. MVP vs Phase-2

| Feature                                        | MVP | Phase-2 | Notes                                          |
| ---------------------------------------------- | --- | ------- | ---------------------------------------------- |
| Home, About, Services hub + detail             | ✅  | —       | Core conversion surface                        |
| Industries, Solutions                          | ✅  | —       | Segment routing                                |
| Work / Case Studies hub                        | ✅  | —       | 1–2 featured cards                             |
| Case-study **detail** pages `/work/[slug]`     | —   | ✅      | Hub ships MVP; details deferred                |
| Products (showcase, no commerce)               | ✅  | —       | `TODO-CONFIRM model list`                      |
| Service Areas hub + city pages                 | ✅  | —       | `TODO: towns/cities`                           |
| FAQ, Contact / Quote                           | ✅  | —       | Form is the primary conversion                 |
| Quote form + Turnstile + honeypot + rate limit | ✅  | —       | React Hook Form + Zod + Server Action + Resend |
| Tap-to-call / click-to-email                   | ✅  | —       | `TODO: phone number`, email verify             |
| Map embed                                      | ✅  | —       | `TODO: exact city`                             |
| Analytics events                               | ✅  | —       | Vercel Analytics + Speed Insights              |
| **Careers** `/careers`                         | —   | ✅      | Deferred                                       |
| **Dark mode**                                  | —   | ✅      | `next-themes` wired; light is default          |
| **Blog**                                       | —   | ✅      | Not in MVP scope                               |

---

## 9. Acceptance criteria

The MVP ships when all of the following hold:

- [ ] All 12 MVP routes render statically (SSG); dynamic slugs generated via `generateStaticParams`.
- [ ] Home includes: rotating-tagline hero + primary quote CTA, segment self-select, pillars, partner strip, trust badges, featured services, social-proof slot, service-area teaser + map, final CTA band.
- [ ] Quote form submits via Server Action + Resend, validates with Zod, and is protected by Turnstile + honeypot + rate limiting; success and error states work.
- [ ] Tap-to-call and click-to-email work on all required surfaces (pending real values; `TODO:` placeholders render literally until provided).
- [ ] Commercial / Residential segment switch sets form default and reorders featured content without gating any page.
- [ ] All content is read from `src/content`; nothing is hardcoded in JSX.
- [ ] Analytics events (`quote_submit`, `call_click`, `directions_click`, `segment_select`, `service_view`) fire correctly.
- [ ] WCAG 2.2 AA passes; all animation has a `prefers-reduced-motion` fallback (including the R3F hero accent).
- [ ] Core Web Vitals are "Good" and per-route first-load JS is within budget (see [TRD](./TRD.md)).
- [ ] `/privacy`, `/terms`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, and the OG image route exist.
- [ ] Every unknown renders as a literal `TODO:` placeholder — nothing invented.

---

## 10. Open questions

All unresolved items (phone, exact city/province/postal, correct/primary email, service-area towns, exact service list and monitoring, business hours, production domain, Google Business Profile URL, social handles, legal footer details, imagery, testimonials, Resend DNS, Turnstile keys) are tracked in [PROGRESS](../PROGRESS.md). This PRD does not restate them as decisions.

---

**Cross-references:** [BRD](./BRD.md) (business goals & positioning) · [TRD](./TRD.md) (architecture, stack versions, budgets) · [PROGRESS](../PROGRESS.md) (status & open questions).
