---
name: soo-seo-local
description: when adding pages — metadata, JSON-LD, sitemap/robots, NAP, local/city SEO, OG.
---

Every page ships per-page metadata and (where relevant) structured data. Do not hand-roll
`<title>`, `<meta>`, or JSON-LD strings — go through the project helpers in `@/lib/seo` and
`@/lib/schema` so the canonical URL, OG/Twitter cards, and `TODO:` stripping all happen for free.
NAP comes from one source only. See **soo-component-patterns** for typed copy from `src/content`, and
**soo-qa-gates** for the QA gates a page must clear before it is "done".

## Rules

1. **One metadata builder.** Every page calls `buildMetadata({ title, description, path })` from
   `@/lib/seo`. Never write a raw `metadata` object by hand; the builder sets
   `alternates.canonical`, `openGraph`, and `twitter` consistently.
2. **`title` and `description` are the short forms.** Pass the bare page title (e.g. `"Services"`);
   the builder appends `| ${SITE.name}` for OG/Twitter. Keep titles ~50–60 chars, descriptions
   ~150–160 chars, written for humans, no keyword stuffing.
3. **`path` is the route, always leading-slash, no domain.** `"/services"`, `"/services/cctv-installation"`,
   `"/"` for home. `absoluteUrl(path)` turns it into the canonical URL — do not pass a full URL.
4. **Static page → `export const metadata`.** Dynamic/parameterized page → `export async function
   generateMetadata({ params })` that **awaits `params`** first (Next 16 params are a Promise), resolves
   the content, then returns `buildMetadata({...})`. Both snippets below.
5. **`metadataBase` + the title template live in the root layout** (`src/app/layout.tsx`), not per page.
   Do not redeclare them on a page.
6. **JSON-LD only via `@/lib/schema` builders.** Use `localBusinessSchema()`, `serviceSchema(service)`,
   `faqPageSchema(faqs)`, `breadcrumbSchema(items)`. They return plain objects.
7. **`localBusinessSchema()` emits `@type: "HomeAndConstructionBusiness"`** — a `LocalBusiness`
   subtype, the correct type for a CCTV supply-and-install company. Do not change it to `"Organization"`
   or plain `"LocalBusiness"`.
8. **`TODO:` sentinels never reach structured data.** The `resolved()` helper drops any value starting
   with `"TODO:"`, and `areaServed`/`address` fields are filtered. So a missing phone/city simply omits
   that property from the JSON-LD instead of emitting garbage. Never "fill in" a placeholder to make
   schema look complete — leave the `TODO:` and let `resolved()` strip it.
9. **Inject JSON-LD with a script tag**, in the page (or a server section), once per schema:
   `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`.
   This is the one sanctioned `dangerouslySetInnerHTML` — only for `JSON.stringify` of a builder output,
   never user input. Add `localBusinessSchema()` to home/contact; `serviceSchema` to each service page;
   `faqPageSchema` where FAQs render; `breadcrumbSchema` on nested pages.
10. **`app/sitemap.ts` and `app/robots.ts` are `MetadataRoute`.** When you add a route, add its `path`
    to the `staticPaths` list in `sitemap.ts` (service and city paths are already derived from content).
    Do not create `sitemap.xml`/`robots.txt` by hand — Next generates them.
11. **OG image is `app/opengraph-image.tsx`** using `ImageResponse` from `next/og`. It exports `alt`,
    `size` (`1200×630`), and `contentType`. Reuse `SITE` values inside it; do not import app components or
    Tailwind classes — `next/og` only supports inline styles and a flexbox subset.
12. **NAP = one source of truth: `SITE.contact` in `src/lib/site.ts`.** Name, address, phone must be
    byte-identical everywhere they appear (footer, contact page, schema). Read from `SITE`; never retype
    an address or phone number into JSX.
13. **Phone and city are `TODO:` placeholders right now** (`phoneDisplay: "TODO: phone number"`,
    `address.city: "TODO: city"`, region/postalCode/hours likewise). Render them as-is in non-prod; never
    invent a number or town. Replace the literal `TODO:` strings in `site.ts` once the client confirms —
    that single edit propagates to schema, footer, and contact page.
14. **Service-area / city SEO uses REAL areas only.** `SITE.serviceAreas` currently holds
    `"TODO: primary service area"` / `"TODO: secondary service area"`. Do **not** fabricate towns to chase
    rankings — fake service areas are a trust/legal problem and Google penalizes them. Publish a city page
    only after the slug+name are confirmed real.
15. **One city per page, with genuine local copy.** A city page targets a single confirmed town: unique
    intro mentioning the area, local landmarks/neighbourhoods only if real, and
    `localBusinessSchema()` whose `areaServed` already lists confirmed areas. No spun "We serve [City]!"
    doorway pages cloned across towns.
16. **Image SEO: always `next/image`** with explicit `width`/`height` (prevents CLS — see CWV budget
    `CLS < 0.1`) and a meaningful `alt` that describes the image, not the keyword. Decorative images get
    `alt=""`. AVIF/WebP are already configured; do not hand-convert or inline base64.
17. **`primaryEmail` is `soosoultioninc@outlook.com`** — flagged as likely misspelled ("soosoultion").
    Do not "correct" it silently; verify with the client. `secondaryEmail` is `hello@fonebazaar.ca`.

## Snippet 1 — per-page metadata

Static page (most pages):

```tsx
// src/app/services/page.tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security Camera & CCTV Services",
  description:
    "Professional security camera supply and installation for commercial and residential properties — site survey, certified install, and warranty-backed support.",
  path: "/services",
});

export default function ServicesPage() {
  return <main>{/* ... */}</main>;
}
```

Dynamic page — `generateMetadata` awaiting `params` (Next 16 params are a Promise):

```tsx
// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) return buildMetadata({ title: "Service not found", description: "", path: "/services" });

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();

  return <main>{/* ... */}</main>;
}
```

## Snippet 2 — `HomeAndConstructionBusiness` JSON-LD (the shape `localBusinessSchema()` builds)

This is what `localBusinessSchema()` returns once `resolved()` runs. The `TODO:` placeholders below show
what is in `SITE.contact` today; because they start with `"TODO:"`, `resolved()` returns `undefined` and
`omitEmpty()` drops the key — so `telephone`, `addressLocality`, etc. never appear in the emitted JSON-LD.
Never hardcode this object on a page; call the builder. Shown only so you know the output.

```jsonc
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Soo Solutions Inc",
  "description": "Soo Solutions Inc supplies and professionally installs security cameras and CCTV systems...",
  "url": "https://soo-solutions.vercel.app",
  "email": "soosoultioninc@outlook.com",
  "telephone": "TODO: phone number",   // stripped by resolved() → omitted from output
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "253 Bruce St, Unit 2",
    "addressLocality": "TODO: city",   // stripped by resolved() → omitted from output
    "addressRegion": "TODO: province", // stripped by resolved() → omitted from output
    "postalCode": "TODO: postal code", // stripped by resolved() → omitted from output
    "addressCountry": "Canada"
  },
  "areaServed": [],                     // all towns are TODO → filtered empty → omitEmpty() drops this key
  "brand": ["Lorex", "Hikvision", "HiLook"]
}
```

## Snippet 3 — injecting JSON-LD

Build with the helper, stringify, inject. This runs in a Server Component (page or section) — no
`"use client"` needed.

```tsx
// src/app/page.tsx  (or any server page/section)
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schema";

export default function HomePage() {
  const localBusiness = localBusinessSchema();
  const breadcrumbs = breadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* page content */}
    </main>
  );
}
```

## Snippet 4 — image SEO

```tsx
import Image from "next/image";

<Image
  src="/work/storefront-cctv-install.jpg"
  alt="Technician mounting a dome security camera above a retail storefront entrance"
  width={1280}
  height={720}
  className="rounded-lg shadow-card"
/>
```

## Pre-ship checklist (this page is not done until)

- [ ] Page exports `metadata` (static) or `generateMetadata` awaiting `params` (dynamic).
- [ ] `title`/`description` are real human copy — no Lorem ipsum, correct length.
- [ ] New route's `path` added to `staticPaths` in `app/sitemap.ts`.
- [ ] Relevant JSON-LD injected via `<script type="application/ld+json">` (business / service / FAQ / breadcrumb).
- [ ] No invented phone, city, or service area — `TODO:` sentinels left literal, stripped by `resolved()`.
- [ ] Every `next/image` has `width`, `height`, and a meaningful (or intentionally empty) `alt`.
- [ ] A production build flags/fails if `SITE.contact.phoneDisplay` still starts with `"TODO:"`.
