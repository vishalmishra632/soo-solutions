# Contact / Get a Quote — Visual Design Spec (two-column form + contact card)

| Field | Value |
|---|---|
| **Page** | Contact / Get a Quote (`/contact`) — route group `(marketing)` |
| **Project** | Soo Solutions Inc — security cameras & CCTV |
| **Version** | v2 (adversarially reviewed — design-critic + a11y/qa-gates + skills/codebase + factual-honesty; all blockers + majors applied) |
| **Date** | 2026-06-18 |
| **Status** | Design approved for build — **but NOT shippable to production until the fail-closed NAP guard + a real `/privacy` page exist (see gate)** |
| **Skills** | [soo-design-system](../../.skills/soo-design-system.md) · [soo-component-patterns](../../.skills/soo-component-patterns.md) · [soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) · [soo-qa-gates](../../.skills/soo-qa-gates.md) |
| **Related** | [home](./home.md) · [services](./services.md) · [faq](./faq.md) · [about](./about.md) · [PRD](../PRD.md) · [TRD](../TRD.md) · [PROGRESS](../../PROGRESS.md) |

The conversion page: a **bright, reassuring, zero-friction quote form** on the left and a **direct-contact card** on
the right. The form ships as a **Server Action + Resend** pipeline with **Turnstile + a honeypot**, full keyboard
operability, inline validation, an `aria-live` status, and a satisfying success state. No code — only layout,
typography, OKLCH token usage, motion, interaction, the form architecture/data model, security, and mobile behavior.

**Voice:** warm, low-pressure, competent. "Tell us about your property and we'll come back with options." No required
fields beyond the four that actually matter.

---

## Approval status & identity gate (production is fail-CLOSED, not fail-open)

This page surfaces the most unresolved client facts + the most new infrastructure. The first draft was **fail-open**
(render raw `TODO:` strings, trust a not-yet-built guard to block prod). The review caught two ways that leaks placeholder
contact details to a live site. **Corrected to fail-closed:**

- **Never render a raw sentinel or a fake contact action.** The contact card / phone row / mobile "Call Now" bar /
  success-panel fallback must render through a **`resolvedForDisplay()`** helper: an unresolved NAP field shows a
  **neutral fallback** ("Phone — coming soon" / the row is omitted), **never** the literal `"TODO: phone number"` and
  **never** a `tel:` link to the placeholder number. So even a misconfigured prod build cannot surface a sentinel or
  dial a fake number.
- **`phoneHref` is a FAKE number, not a `TODO:` placeholder.** `SITE.contact.phoneHref` is `"tel:+10000000000"` — it
  does **not** start with `"TODO:"`, so a string-prefix guard would pass it and ship a live tap-to-call dialing
  +1 000-000-0000. So: (a) the **tap-to-call link renders only when the phone is genuinely resolved** (display is
  non-`TODO:` **and** the href is not the all-zeros placeholder), else the phone row / Call-Now bar fall back to
  "Message us" → the form/email; (b) the **NAP guard must reject the placeholder href explicitly** (any `tel:` with
  no real digits), not just `TODO:`-prefixed values.
- **The NAP guard is a hard PREREQUISITE.** `assertContactResolvedForProduction` (per soo-qa-gates) **does not exist**
  (no `src/lib/nap-guard.ts`, no wiring). It must be **built, wired into a build-time module, extended to reject the
  fake `phoneHref` + an unconfirmed `primaryEmail`, and covered by a CI test** before this page is marked shippable.
  The fail-closed rendering above is the belt; the guard is the suspenders.
- **Email is flagged.** `primaryEmail: soosoultioninc@outlook.com` is likely misspelled ("soosoultion") and a
  prefix-guard won't catch a *misspelled-but-non-`TODO:`* address. **Do not silently correct** — but **block prod on
  an unconfirmed `primaryEmail`** (don't render the `mailto:` or set `CONTACT_TO_EMAIL` until the spelling is
  confirmed), exactly like NAP.
- **`/privacy` is a STUB.** The page links to `/privacy`, which exists but renders "Placeholder — the final privacy
  policy will be added before launch." A form collecting name/email/phone/free-text and emailing it via Resend
  **cannot launch pointing at a placeholder policy** — a real `/privacy` (what's collected, that it's emailed to the
  business via Resend, reply-to, retention, deletion contact) is a **launch blocker**.
- **Form infra is `TODO` env (the build must pass without it).** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
  `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a **verified sender domain**), `CONTACT_TO_EMAIL`.
  **Non-prod fallback:** Cloudflare **Turnstile test keys** are applied **on both the client `siteKey` and the server
  secret** (site `1x00000000000000000000AA` / secret `1x0000000000000000000000000000000AA`) so the widget always has
  a valid key, the page renders, and the build is green; **production requires the real keys** (the action returns a
  graceful error if a required server key is missing).
- **Response-time stays soft + unquantified.** Use "We'll get back to you quickly" / "usually within a business day
  or two" — not a single repeated "one business day" promise the client hasn't confirmed.
- **CSP is already form-ready** (`next.config.ts`); this page adds **no new origin** (see Security).
- Carryover: Cabinet Grotesk `.woff2`, the deep-navy footer (home.md).

---

## 0. Art direction (page-wide)

Bright and calm — a form should feel *easy*, not interrogated. Lots of whitespace, soft cards, one clear primary
action. Electric-blue is rationed to **the field-focus ring, the active toggle/chip, the submit button, the success
state, and (underlined) links**. Errors use a dedicated darker red, **never** as the only signal.

- **Rhythm:** `py-16 md:py-20 lg:py-24`; centered `mx-auto w-full max-w-6xl px-6`; body grid
  `lg:grid-cols-[1.4fr_1fr]` (form wider than card).
- **Surfaces:** the form on `bg-background` (open, airy); the contact card an elevated `bg-card` (`shadow-card`)
  panel. No `CtaBand` (the page *is* the CTA); the footer follows.

### Token palette (exact OKLCH — from `globals.css`, quote these) + **two new form tokens**

| Role | Token | OKLCH | Use on Contact |
|---|---|---|---|
| Page surface | `--background` | `oklch(0.985 0.006 95)` | Page + form background |
| Headings / input text | `--foreground` | `oklch(0.255 0.045 264)` | H1–H2, input values, labels |
| Card surface | `--card` | `oklch(0.997 0.004 95)` | Contact card, chips |
| Brand action | `--primary` | `oklch(0.55 0.218 256)` | Focus ring, active toggle/chip, submit, success, links (underlined) |
| On-primary | `--primary-foreground` | `oklch(0.985 0.01 256)` | Submit text, active-toggle/chip text (4.71:1) |
| Quiet surface | `--secondary` | `oklch(0.95 0.018 256)` | Inactive chip/toggle track |
| Quiet-surface text | `--secondary-foreground` | `oklch(0.305 0.05 264)` | **Inactive chip/toggle label** (≈11.6:1 on `--secondary`) |
| De-emphasized text | `--muted-foreground` | `oklch(0.52 0.03 262)` | Labels' helper text, card body, helper copy |
| **Field border (NEW)** | `--form-border` | **≈ `oklch(0.68 0.02 256)`** | **Input/textarea/select borders at rest — ≈3.2:1, clears the 3:1 non-text rule (the default `--input` hairline is ~1.25:1 and FAILS)** |
| Hairlines | `--border` | `oklch(0.91 0.01 256)` | Card border, dividers (decorative, not control boundaries) |
| Error icon / invalid border | `--destructive` | `oklch(0.58 0.22 27)` | Error icon + invalid field border (4.58:1 / ≥3:1 — fine for non-text) |
| **Error TEXT (NEW)** | `--destructive-text` | **≈ `oklch(0.50 0.20 27)`** | **Error copy — ≈6.4:1 (the 0.58 token is only 4.58:1, a thin pass; use the darker shade for text headroom)** |
| Focus ring | `--ring` | `oklch(0.55 0.218 256)` | Every `:focus-visible` |

> **Add `--form-border` and `--destructive-text` to `globals.css`** as part of the build. Shadows: `shadow-soft`
> (inputs optional) · `shadow-card` (contact card) · `shadow-glow` (**submit + focus glow**). Radius: inputs/textarea
> `rounded-md`; chips/toggle/pills `rounded-full`; card + submit `rounded-lg`/`rounded-xl`.

### Type scale

| Element | Family | Size | Weight / tracking | Color |
|---|---|---|---|---|
| Page H1 | `font-display` | `clamp(2.25rem, 5vw, 3.25rem)` | bold, `tracking-tight` | `--foreground` |
| Form / card **H2** | `font-display` | **`clamp(1.5rem, 3vw, 2rem)`** (a confident head, not H3 scale) | semibold, `tracking-tight` | `--foreground` |
| **Field label (static, top-aligned)** | `font-sans` | `text-sm` | medium | `--foreground` |
| Input value / textarea | `font-sans` | `text-base` (**≥16px** — no iOS zoom-on-focus) | regular | `--foreground` |
| Helper / placeholder | `font-sans` | `text-sm` / placeholder | regular | `--muted-foreground` |
| Error text | `font-sans` | `text-sm` | medium | `--destructive-text` |
| Card label (Phone/Email/…) | `font-display` | `text-sm` | medium, uppercase, `tracking-widest` | `--muted-foreground` |
| Eyebrow | `font-display` | `text-sm` | medium, uppercase, `tracking-widest` | `--primary` |

Fonts: display = Cabinet Grotesk (intent) / **Space Grotesk** (current); body = **DM Sans**. Inputs **≥16px**.

### Motion language (see soo-motion-3d)

- One easing: **`EASE_OUT = [0.22, 1, 0.36, 1]`** from **`@/lib/motion`** (the real export — not `EASE`).
- **Field focus glow:** on `:focus-visible`, the field shows the **static `--ring`** (2px) — the AA focus indicator,
  always present — plus an optional one-shot `shadow-glow` halo (`transition-shadow`). The ring is **not** an
  animation. Reduced motion: ring shows; no glow pulse.
- **Error indication (reduced-motion-safe):** an invalid field shows the **error icon + `--destructive-text` message
  + `aria-invalid` + `aria-describedby`** — that is the indication (not colour or motion alone). An optional 1-cycle
  shake is **supplementary + `motion-reduce:animate-none`**.
- **Submit loading → success:** "Send request" → (pending) spinner + "Sending…" (`aria-busy="true"`, kept focusable —
  see Interaction) → success swap. **Reduced motion → label/state change only (no morph tween); the spinner is a
  simple rotate, replaced by static "Sending…" under reduced motion.**
- **Success checkmark draw:** the success panel's circle + checkmark **draws** via SVG `stroke-dashoffset` (~0.5s).
  **Reduced motion → static checkmark (no draw).** *(This morph + draw is a tasteful baseline, NOT the page's
  signature — the real premium is the success-panel COPY: what happens next, roughly when, and the direct phone/email.)*
- **Reduced motion (exhaustive):** label position static (top labels don't animate); no error shake; static-ring
  focus; submit is a state/label swap; checkmark static; **the form→success-panel swap is an instant content
  replacement (no fade/slide)**; **textarea auto-grow height changes are instant (no transition)**. Each via the
  leaf's `useReducedMotion()` / `motion-reduce:` guards.
- **Animate `transform`/`opacity`/`shadow` only — never `backdrop-filter`** (the mobile bar's blur is static).

### Server/client boundaries (see soo-component-patterns)

The **page is a Server Component** (`<main id="main-content">` + H1 + contact card + map + sticky bar shell). Client
leaves, all enumerated: **`QuoteForm`** (RHF + zodResolver + `useActionState`, with the **Turnstile widget rendered
inside it**, the honeypot, validation, the `aria-live` regions, the success panel, the auto-grow textarea),
**`Magnetic`** (the desktop submit wrapper), and **`RevealOnScroll`** (optional load reveal). **`submitQuote`** is the
**Server Action** (`"use server"`). The contact card, `LocationMap` iframe, and the sticky-bar markup are server. All
copy + the schema come from **`src/content/contact.ts`**.

---

## 1. Header

`<main id="main-content" tabIndex={-1}>` (drops `PageShell` → owns the single `<main>` + skip target). Compact band:
eyebrow "Get a quote" + H1 "Tell us about your property" + a one-line lead ("A few details and **we'll come back with
options for your property** — no obligation, no pressure."). *(Not "the right system" — fit is determined by a site
survey, not the form; don't promise a correct recommendation sight-unseen.)* **H1** is the single `<h1>` + LCP text.

---

## 2. Left column — the quote form

**Goal:** the lowest-friction path to a qualified lead. Four required fields; the rest optional. **Static, top-aligned
labels** (see below).

```
┌──────────────────────────────────────────────────────────┐
│  Property type *                                          │  fieldset/legend, NATIVE radios as a segmented toggle
│  ╭───────────────────────────────────────────────────╮   │
│  │  ●  Commercial        ○  Residential                │   │  (defaults to Commercial → always valid)
│  ╰────────────────────────────────────────────────────╯   │
│  Name *                     Email *                       │  static top labels, inputs below (2-up on lg)
│  ┌──────────────────┐       ┌──────────────────────────┐  │
│  │ Jordan Lee       │       │ jordan@…                 │  │
│  └──────────────────┘       └──────────────────────────┘  │
│  Phone (optional)                                         │
│  ┌──────────────────┐                                    │
│  └──────────────────┘                                    │
│  What are you interested in?  (optional)                 │  NATIVE checkboxes styled as chips (fieldset/legend)
│  [ Cameras & CCTV ✓ ] [ Commercial ] [ Residential ✓ ] … │
│  Project details *                                       │
│  ┌───────────────────────────────────────────────────────┐│  textarea (auto-grow), top label
│  └───────────────────────────────────────────────────────┘│
│  [ Turnstile widget ]   (honeypot field is off-screen)    │
│  We'll get back to you quickly. · Privacy (underlined) →   │  reassurance + UNDERLINED privacy link
│  ┌──────────────────────────────────────────────────────┐ │
│  │            Send request            →                  │ │  primary submit (full-width on mobile)
│  └──────────────────────────────────────────────────────┘ │
│  · role=status (polite) progress · role=alert (assertive) errors ·
└──────────────────────────────────────────────────────────┘
```

### Labels — static, top-aligned (the accessible, scannable baseline)

**Decision (deviates from the brief, transparently):** the brief asked for *floating labels*; the review (two
independent lenses) made the grounded case that floating labels **hurt** a zero-friction conversion form — they shrink
to `text-xs` so you can't scan required fields once filled, they're a known autofill/`:has()`/200%-reflow failure
surface, and the resting label doubles as a de-facto placeholder. So the spec's **baseline is plain top-aligned
labels** (`text-sm font-medium --foreground`, always visible above each field, never overlapping the value or an
adjacent field at 400% reflow). This keeps every a11y property *and* makes the form more scannable — the better
"zero-friction" choice. A float treatment may be layered **as optional visual enhancement on top of the already
top-aligned label** (single-line inputs only, never the textarea), but the static top label is load-bearing and the
form is fully usable without the float CSS. *(If the client insists on float, it's an easy enhancement on this base.)*

### Fields (the data model)

| Field | Control | Required | Notes |
|---|---|---|---|
| Property type | **native `type="radio"`** in a `fieldset`/`legend`, restyled as a segmented toggle | **yes** | **defaults to `commercial`** (one radio checked → Tab lands selected → zod always valid); native arrow-key select; active = `bg-primary text-primary-foreground` (fill + native `checked`, **no `aria-checked`** — native exposes it) |
| Name | text (`autocomplete="name"`) | **yes** | min 2 |
| Email | email (`autocomplete="email"`, `inputmode="email"`) | **yes** | valid |
| Phone | tel (`autocomplete="tel"`, `inputmode="tel"`) | no | lenient |
| Services | **native `type="checkbox"`** chips in a `fieldset`/`legend` | no | from `services.ts`; pill style; native `checked` + Space toggle (**no `aria-checked`**); selected = fill + check glyph (not colour alone) |
| Project details | textarea (auto-grow) | **yes** | min 10, max 2000 |
| (honeypot) | text | — | **off-screen** (not `display:none`), `tabIndex={-1}`, `aria-hidden`, a **nonsense field name not in the autofill vocabulary** + `autoComplete="off"` (so password managers don't false-fill it for AT users); if filled → action returns success **without** sending |
| (turnstileToken) | hidden | — | set by the Turnstile widget on solve |

### Inline validation + error announcement (one assertive region, no per-field `role="alert"`)

- **RHF owns the submit** (see Form architecture): `zodResolver(quoteSchema)` gates on submit + on blur; on a failed
  submit RHF **moves focus to the first invalid field**.
- An invalid field: `aria-invalid="true"`, a `--destructive` border, an **error icon** (`aria-hidden`) + a message in
  **plain `<p id="{field}-error">`** (`--destructive-text`) wired via `aria-describedby` — **NOT `role="alert"`** (a
  per-field alert + focus-move + the status region would fire competing assertive announcements and double-read the
  first field). The per-field message is announced naturally when focus lands on the field.
- **Two persistent live regions** (don't mutate politeness on one node): a **`role="status"` (polite)** for progress/
  success ("Sending…", "Request sent"), and a separate **`role="alert"` (assertive)** for failures / the invalid-field
  count ("3 fields need attention"). Both always in the DOM.

### Turnstile + honeypot

- **`<Turnstile siteKey={siteKey} options={{ theme: "light", appearance: "always" }} onSuccess={(t) => setToken(t)} />`**
  (`@marsidev/react-turnstile` 1.5 — `theme`/`appearance` live under `options`; **there is no `appearance="managed"`** —
  valid values are `"always" | "execute" | "interaction-only"`). The widget **self-injects** `api.js` from
  `challenges.cloudflare.com` (`injectScript` default `true`) — already in `script-src`; **leave `injectScript`
  default; do not add a separate `<Script>` to a non-allow-listed host.** `siteKey` falls back to the **test site
  key** in non-prod. The action verifies the token server-side; if a managed challenge appears, that iframe is
  third-party (see axe scope).
- **Honeypot:** an off-screen nonsense field; if the action receives it filled → return **success** without sending
  (silent drop).

### Submit + status

- Primary submit: `bg-primary text-primary-foreground shadow-soft hover:shadow-glow`, full-width on mobile, `Magnetic`
  on desktop, ≥44px. During pending it shows the spinner + "Sending…" but stays **focusable** — use **`aria-disabled`
  (+ ignore re-activation), not the native `disabled` attribute** (a native-disabled button drops keyboard focus to
  `<body>`); the `aria-live` status announces progress.
- **Success panel** (replaces the form, instant under reduced motion): the (drawn) checkmark + "Request sent" + a
  **specific** line ("We've got your details and we'll come back with options for your property — usually within a
  business day or two. For anything urgent, call us.") + the **resolved** phone/email as fallbacks. Focus moves to the
  success heading (`tabIndex={-1}`).

---

## 3. Right column — the contact card (phone-led, one job: "prefer to talk → call")

An elevated `bg-card` panel (`rounded-xl border border-border shadow-card p-6 md:p-8`). The card's **one job** is the
call path (it's the no-JS fallback and the mobile sticky-bar target), so it **leads with the phone** and demotes the
rest — it does not stack five mostly-`TODO` rows as a generic checklist.

- **H2** "Prefer to talk?" + one line.
- **Phone (dominant)** — a large `tel:` link, **rendered only when the phone is resolved** (display non-`TODO:` AND
  href not the all-zeros placeholder); until then a neutral "Phone — coming soon" (or omitted) via `resolvedForDisplay()`.
- **Email** — `mailto:` **rendered only when `primaryEmail` is confirmed** (block on the flagged spelling).
- **Address** — `street` (real) + city/region/postal via `resolvedForDisplay()` (neutral fallback while `TODO:`), in
  an `<address>`.
- **Hours** — via `resolvedForDisplay()` (neutral until confirmed).
- One soft reassurance line ("We'll get back to you quickly") — **printed once on the page** (here OR under the
  submit, not both).
- **Map:** a **new shared `LocationMap` leaf** — extracted from `ServiceAreaMap`'s iframe→tap-card *sub-block* only
  (lazy `<iframe>` `md:block` + the `md:hidden` "Open in Maps" card), **not** the whole `ServiceAreaMap` section
  (which carries a "Serving {TODO city}" heading + the `TODO:` service-area chips the card doesn't want). Query = the
  street (city appended once confirmed); `title="Map of our location"`. **Gate the map behind resolved NAP** — a pin
  on a city-less street reads broken; until the city resolves, show the address block without the embed (or a
  neutral "map coming soon" card). `www.google.com` is already CSP-allowed.
- NAP here reads from `SITE.contact` (one source) via `resolvedForDisplay()`.

---

## 4. Mobile (form first, card below, sticky bar)

- Single column: **form first**, **contact card below**, then footer. The sticky bar is **last in DOM** (after the
  form/card), so reading + tab order are sane.
- A **sticky bottom bar** (`fixed inset-x-0 bottom-0`, `bg-background/95 backdrop-blur border-t`,
  `pb-[env(safe-area-inset-bottom)]`): when the phone is resolved it's a big **"Call Now"** `tel:` button; **until
  the phone resolves it falls back to "Message us"** (scrolls to the form) — **never a fake-number dial**. The page
  reserves bottom space **≥ the bar's full height + the safe-area inset** so a focused input/submit is **never
  obscured** (WCAG 2.2 **SC 2.4.11 Focus Not Obscured**). The bar is not a focus trap.
- Inputs ≥16px (no iOS zoom); all targets ≥44px; toggle/chips wrap; Turnstile scales to the column.

---

## Form architecture, security & data (the contract)

- **Shared schema:** `quoteSchema` (zod) lives in **`src/content/contact.ts`** (with the typed copy + property-type
  options + success/error messages), imported by **both** the client (`zodResolver`) and the Server Action — one
  validation source. **zod 4 API:** email uses top-level **`z.email()`** (not the deprecated `z.string().email()`);
  shape: `name` (min 2), `email` (`z.email()`), `phone` (optional), `propertyType` (`z.enum`), `services` (`z.array`
  optional), `message` (min 10, max 2000).
- **RHF ↔ Server Action (the coherent pattern — not "both gate at once"):** keep `useActionState(submitQuote, …)`
  for the pending/result state, but **submit through RHF** so the client gate actually runs:
  `onSubmit={handleSubmit(() => startTransition(() => formAction(new FormData(formEl))))}`. This way `zodResolver`
  gates the submit, **RHF focuses the first invalid field**, and the Server Action re-validates as the **real** gate.
  *(Do not bind a bare `action={formAction}` and also expect RHF/zod to gate it — a native action bypasses RHF's
  `handleSubmit`.)* **Submission requires JS** (Server Actions + Turnstile both need it) — the **contact card /
  `tel:` / `mailto:` is the documented no-JS path**; don't imply the form degrades without JS.
- **Server Action `submitQuote(prevState, formData)`** (`"use server"`), in order:
  1. **Honeypot** filled → return `success` (silent drop).
  2. **Turnstile** — POST token + `TURNSTILE_SECRET_KEY` to
     `https://challenges.cloudflare.com/turnstile/v0/siteverify`; on failure → error.
  3. **zod parse** with `quoteSchema`; on failure → `{ status: "error", fieldErrors }` where `fieldErrors` is derived
     via **`z.flattenError(parsed.error)`** (or `z.treeifyError`) — **not** the deprecated `error.flatten()`.
  4. **Resend** — `const { data, error } = await resend.emails.send({ from: RESEND_FROM_EMAIL, to: CONTACT_TO_EMAIL,
     replyTo: submitterEmail, subject, text })`. **`send()` does not throw on an API error** (bad/unverified domain,
     rate limit) — it returns a populated `error` — so **branch on `error`** (graceful "Couldn't send — please call
     us.") **in addition to** a `try/catch` for network throws.
  5. Success → `{ status: "success" }`.
  - **Missing-key safety:** absent required server key in prod → graceful error (never an unhandled throw); non-prod
    uses the test secret + may log instead of sending if Resend isn't configured.
- **Abuse:** Turnstile + honeypot are the baseline; a per-IP throttle is future hardening (`TODO`, not v1).

---

## SEO (see soo-seo-local)

- **Metadata:** keep `export const metadata = buildMetadata({ title: "Contact", description: "…", path: "/contact" })`
  (static page → `export const metadata`).
- **JSON-LD:** **`breadcrumbSchema`** (Home › Contact). **LocalBusiness is already injected by the `(marketing)`
  layout — do NOT double-inject.** NAP one-source from `SITE.contact`.
- **Sitemap:** `/contact` is already a static route.

---

## QA gates compliance (soo-qa-gates — must pass before "done")

### 1. Content
- All copy + schema from `src/content/contact.ts` / `SITE` — no Lorem ipsum, no hardcoded marketing JSX.
- **Fail-closed NAP:** unresolved phone/city/region/postal/hours + the flagged email + the fake `phoneHref` render a
  **neutral fallback**, never a raw `TODO:` or a placeholder dial. The **NAP guard (build + wire + extend to reject
  the fake href/email + CI test)** fails the prod build while unresolved. A **real `/privacy`** page is a launch
  blocker. Turnstile/Resend keys are `TODO` env (test-key fallback; prod requires real).
- Response-time stays soft + unquantified; "options for your property", not "the right system".

### 2. WCAG 2.2 AA (the heavy gate)
- **One `<main>` + one `<h1>`**; H2 form/card heads; no skipped levels.
- **Labels:** every field has a **real, associated, top-aligned `<label>`** (no placeholder-as-label); toggle =
  `fieldset`/`legend` of **native radios**; chips = `fieldset`/`legend` of **native checkboxes** (native `checked`,
  no `aria-checked`).
- **Errors:** per-field `<p id>` via `aria-describedby` (**no `role="alert"`**) + `aria-invalid`; **one assertive
  `role="alert"`** summary + **one polite `role="status"`**; focus → first invalid on failed submit.
- **Keyboard:** full operability, native arrow/Space on toggle/chips, Turnstile reachable, Enter submits, submit
  stays focusable during pending (`aria-disabled`, not `disabled`); visible `:focus-visible` `--ring` everywhere; no
  positive `tabIndex`; success panel moves focus to its heading.
- **Target size:** inputs `h-12`+, toggle/chips/submit/Call-Now ≥44px.
- **Contrast (derived from the exact OKLCH tokens — reconciled; verify with axe):**
  - `--foreground` on `--background`/`--card` ≈ **15.1 / 15.5:1** ✓.
  - `--muted-foreground` on `--background` ≈ **5.28:1**, on `--card` ≈ **5.46:1**, on `--secondary` ≈ **4.77:1** ✓
    *(this is the reconciled set; the home spec quotes ≈4.77 for the secondary pair — same numbers, different
    surfaces)*.
  - **field border `--form-border`** (NEW, ≈0.68L) on `--background` ≈ **3.2:1** ✓ (the default `--input` hairline
    ≈1.25:1 **fails** the 3:1 non-text rule — replaced).
  - **error text `--destructive-text`** (NEW, ≈0.50L) on `--background` ≈ **6.4:1** ✓ (the `--destructive` 0.58L
    token is only **4.58:1** — a thin pass; kept for icon/border ≥3:1, darker shade for copy).
  - focus ring `--ring` ≥3:1 ✓; active toggle/chip + submit `--primary-foreground` on `--primary` ≈ **4.71:1** ✓
    (thin — re-verify composited); inactive chip `--secondary-foreground` on `--secondary` ≈ **11.6:1** ✓.
  - **links are underlined** (don't rely on the ≈4.71:1 blue alone to read as a link in body copy).
- **prefers-reduced-motion:** labels static, no error shake, static-ring focus, submit state-swap, static checkmark,
  **instant success-panel swap (no fade/slide)**, **instant textarea auto-grow** — exhaustive.
- **Tooling:** **axe zero serious/critical on first-party DOM** (the embedded third-party **Turnstile iframe** is
  out of our control and excluded from the claim); full manual keyboard pass (submit empty → errors announced +
  focus moves; submit valid → status announced + success focus).

### 3. Core Web Vitals (per route)
- **LCP < 2.5s** — the H1 **text**; no hero image. The Turnstile widget + map iframe load after (iframe `loading="lazy"`).
- **INP < 200ms** — the form leaf is the only first-party client JS; Turnstile's script is async, below the fold.
- **CLS < 0.1** — the **Turnstile widget + map iframe reserve fixed-size boxes** (no shift on load); inputs fixed
  height; the success swap + auto-grow are user-initiated (500ms-excluded); fonts via `next/font`; static blur only.
- **First-load JS < 130KB** — Server page; form leaf + `Magnetic` + Turnstile loader; **no 3D**; Turnstile api.js is
  third-party (async, not in the route bundle). Verify with `ANALYZE=true`.

### 4. Responsive (375 · 768 · 1024 · 1280 · 1440 · 1920)
- Two-column `lg+` (1.4fr + 1fr) → single column **form-first, card below, sticky bar last** `<lg`; name/email 2-up
  on `lg`, stacked mobile; toggle/chips wrap; inputs ≥16px; the sticky bar respects the safe-area inset and **never
  obscures the focused submit/textarea** (SC 2.4.11). No horizontal scroll; no clipped fields.

### 5. Cross-browser
- Chrome / Edge / Firefox / Safari desktop + **iOS Safari** — OKLCH renders; the toggle/chips + autofill behave; the
  Turnstile widget + Google Maps iframe load under the CSP; the sticky bar + `dvh`/safe-area work on iOS;
  reduced-motion paths hold.

### 6. Security headers / CSP
- **No new origin.** The existing CSP already allows Turnstile (`script-src`/`connect-src`/`frame-src`
  `challenges.cloudflare.com` — it covers the **widget-self-injected** `api.js`) and the map (`frame-src
  www.google.com`); **`form-action 'self'`** covers the Server Action; Resend is **server-side only**. The page's
  only inline script is the breadcrumb JSON-LD. Secrets (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`) are **server-only
  env**; only `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is public. CSP / HSTS / X-Frame-Options DENY / nosniff / Referrer-
  Policy / Permissions-Policy stay intact.

---

## Open questions / TODO (logged in PROGRESS)

- **NAP guard (launch blocker)** — build `src/lib/nap-guard.ts` (`assertContactResolvedForProduction`), **extend it
  to reject the fake `phoneHref` (`tel:+10000000000`) and an unconfirmed `primaryEmail`**, wire it into a build-time
  module, add a CI test; until then the fail-closed neutral fallbacks are the guarantee.
- **Real `/privacy` page (launch blocker)** — the form collects PII + emails it via Resend; the placeholder policy
  must become a real one (what's collected, Resend, reply-to, retention, deletion) before the form goes live.
- **NAP + email** — confirm phone, city/region/postal, hours, the flagged `primaryEmail` spelling, `CONTACT_TO_EMAIL`,
  and a **verified Resend sender domain** (`RESEND_FROM_EMAIL`).
- **Turnstile keys + `RESEND_API_KEY`** — provision real keys (test keys in non-prod, on both client + server).
- **New tokens** — add `--form-border` (≈0.68L) and `--destructive-text` (≈0.50L) to `globals.css`.
- **Response-time SLA** — confirm a real window or keep it unquantified.
- **Floating labels** — the build uses accessible **static top labels**; if the client wants the float aesthetic, add
  it as a visual enhancement over the top label (single-line inputs only).
- **Rate-limiting** — per-IP throttle as future hardening.
- Carryover: Cabinet Grotesk `.woff2`; deep-navy footer (home.md).

---

**Review note (v2):** four-lens adversarial review. Applied — made NAP rendering **fail-closed** (neutral fallback,
never a raw `TODO:` or a fake-number dial; corrected that `phoneHref` is a fake number the prefix-guard misses);
made the **NAP guard + a real `/privacy`** explicit **launch blockers**; pinned the **RHF-owns-submit** pattern
(native `action={}` bypasses RHF's gate/focus); corrected the **zod 4** (`z.email()` / `z.flattenError`),
**Turnstile 1.5** (`options={{theme,appearance:'always'}}`, self-injected script, client test-key fallback), and
**Resend 6** (`{error}` branch) APIs; switched to **accessible static top labels** (transparently over the brief's
floating-label ask); fixed the **error double-announcement** (no per-field `role="alert"`; two live regions);
committed the **`--form-border`** (the 1.25:1 input border failed 3:1) and **`--destructive-text`** tokens; pinned
**native radio/checkbox** semantics; extracted a shared **`LocationMap`** (not the whole `ServiceAreaMap`); made the
card **phone-led**; corrected the **no-JS** story; softened **copy** ("options"/unquantified SLA, underlined links);
and made the reduced-motion + axe-scope claims exhaustive/honest.

**See also:** [home design](./home.md) · [services design](./services.md) · [faq design](./faq.md) ·
[about design](./about.md) (the map pattern) · [soo-design-system](../../.skills/soo-design-system.md) ·
[soo-motion-3d](../../.skills/soo-motion-3d.md) · [soo-seo-local](../../.skills/soo-seo-local.md) ·
[soo-qa-gates](../../.skills/soo-qa-gates.md).
