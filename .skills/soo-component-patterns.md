---
name: soo-component-patterns
description: when creating components/sections — RSC boundaries, tiers, content-driven sections.
---

# Component Patterns

How components are structured in this project: React Server Components by default, three tiers under `src/components/`, and sections that render typed content from `src/content` instead of hardcoded copy. Stack: Next.js 16.2.9 App Router, React 19.2.4, TypeScript strict, Tailwind v4. Cross-references: see soo-motion-3d for animation/3D leaves, soo-design-system for the token utilities.

## RSC boundaries

1. **Server Components are the DEFAULT.** Every file is a Server Component unless it opens with `"use client"`. Pages and sections stay server unless they call a React hook or a browser API.
2. **`"use client"` ONLY at interaction / animation / 3D leaves.** Push the boundary as deep as possible. The concrete list of files that get `"use client"`:
   - Forms and inputs with `react-hook-form` / `zod` state (contact form, Turnstile widget).
   - Toggles, accordions, tabs, menus — anything with local UI state or event handlers.
   - Motion wrappers (`RevealOnScroll`, any `motion.*` usage from `motion/react`).
   - The GSAP / Lenis smooth-scroll provider, and the `<MotionConfig reducedMotion="user">` shell.
   - R3F canvases and every component rendered inside `<Canvas>` (`@react-three/fiber`).
3. **A section that only maps data into markup stays a Server Component.** If one child needs interactivity, make that child the client leaf — do not flip the whole section to client.
4. **3D never ships in the home first-load bundle.** Client 3D leaves are imported via `next/dynamic` with `{ ssr: false }` behind a `<Suspense>` poster (see soo-motion-3d).

## Three tiers (dependency direction)

All under `src/components/`. Dependencies flow **down** only: sections may use shared + ui; shared may use ui; **never the reverse**. ui never imports shared or sections; shared never imports sections.

```
src/components/
  ui/        # shadcn primitives — button, card, accordion, input, label, ...
  shared/    # cross-section reusables — PageShell, RevealOnScroll, Container, Eyebrow
  sections/  # content-driven page blocks — hero, pillars, partner-strip, services, ...
```

1. **`ui/`** — shadcn primitives on the unified `radix-ui` package. Styled only through semantic tokens (paired surface + foreground, e.g. `bg-primary text-primary-foreground`). No business logic, no content.
2. **`shared/`** — reusables used across more than one section. `PageShell` already exists; `RevealOnScroll`, `Container`, `Eyebrow` live here too. May compose `ui/` primitives.
3. **`sections/`** — page blocks (Hero, Pillars, PartnerStrip, Services). They take **typed props sourced from `src/content`** and compose `shared/` + `ui/`. This is the only tier allowed to know about content shape.

## Content-driven sections

1. Section components take **typed props**; the type comes from `@/types`, the data from `@/content/*`.
2. **Never hardcode marketing copy in JSX.** Headings, body, labels, lists — all come from content. The page passes content down; the section renders it.
3. Keep the section a Server Component when it only maps data → markup. Wrap reveal animation around it with the shared `RevealOnScroll` client leaf.

## Polymorphic primitives (asChild)

Use Radix `Slot` via the `asChild` prop so a primitive can render as another element (e.g. a `<Button>` that is really a `<Link>`) while keeping its styles and tokens. The shadcn `Button` already wires `Slot` internally.

## RevealOnScroll

There is exactly **ONE** shared `<RevealOnScroll>`. It lives in `src/components/shared/` and is a `"use client"` leaf. The canonical snippet is detailed in **soo-motion-3d**; reuse it, do not re-declare a second variant.

## Naming / folder conventions

- **PascalCase** component names (`HeroSection`, `RevealOnScroll`).
- **kebab-case** file names (`hero-section.tsx`, `reveal-on-scroll.tsx`).
- **One component per file.** The exported component matches the file's purpose.
- Tokens only for color — pair every surface with its foreground (`bg-card text-card-foreground`). Never hand-pick a hex.

---

## Snippets

### 1. Typed content — the `Service` type + a `services.ts` entry

`src/types/service.ts`:

```ts
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};
```

`src/content/services.ts`:

```ts
import { Cctv, ShieldCheck, Network } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "cctv-installation",
    title: "CCTV Installation",
    summary:
      "Professionally placed cameras with clean cable runs and full-coverage angles for your property.",
    icon: Cctv,
  },
  {
    slug: "access-control",
    title: "Access Control",
    summary:
      "Keypad, fob, and mobile entry systems that decide exactly who gets through which door.",
    icon: ShieldCheck,
  },
  {
    slug: "network-cabling",
    title: "Structured Cabling",
    summary:
      "Tidy, labelled, future-proof network and PoE cabling that the next technician will thank you for.",
    icon: Network,
  },
];
```

### 2. Canonical content-driven Section template (SERVER component)

`src/components/sections/services-grid.tsx` — maps a typed content array into cards. No `"use client"`; copy comes entirely from `@/content`.

```tsx
import type { Service } from "@/types";
import { services } from "@/content/services";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="bg-card text-card-foreground shadow-card">
      <CardHeader>
        <Icon className="size-6 text-primary" aria-hidden />
        <CardTitle className="font-display tracking-tight">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="max-w-[68ch] text-muted-foreground">{service.summary}</p>
      </CardContent>
    </Card>
  );
}

export function ServicesGrid({ items = services }: { items?: Service[] }) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="font-display text-sm uppercase tracking-tight text-primary">
          What we install
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight">
          Security systems, done properly
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 3. asChild — Button rendering as a Next.js Link

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BookCallCta() {
  return (
    <Button asChild className="bg-primary text-primary-foreground shadow-glow">
      <Link href="/contact">Book a free site survey</Link>
    </Button>
  );
}
```

### 4. RevealOnScroll wrapping a section

`RevealOnScroll` is the shared client leaf (snippet detailed in soo-motion-3d). The page stays a Server Component and only the reveal wrapper crosses into the client.

```tsx
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ServicesGrid } from "@/components/sections/services-grid";

export default function HomePage() {
  return (
    <main>
      <RevealOnScroll>
        <ServicesGrid />
      </RevealOnScroll>
    </main>
  );
}
```
