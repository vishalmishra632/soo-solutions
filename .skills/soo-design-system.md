---
name: soo-design-system
description: when building any UI — tokens, color, type, spacing, shadows.
---

# SOO Design System

The visual foundation for the SOO Solutions site. Light-mode-first, bright, warm near-white surfaces with deep-navy text and electric-blue accents. Tailwind v4 CSS-first: every color is an OKLCH token in `@theme` (in `src/app/globals.css`), exposed as `bg-*` / `text-*` / `shadow-*` / `font-*` utilities. Never hand-pick a hex. Pair every surface with its foreground token (shadcn convention). For animation see `soo-motion-3d`; for component structure see `soo-component-patterns`.

## CORE RULES (non-negotiable)

1. **BRIGHT NOT DARK.** Default theme is light, warm, and airy. No dark hero slabs. Generous whitespace. Soft, light, layered shadows — never heavy black drops.
2. **Never pure `#000` / `#fff`.** Background is `oklch(0.985 0.006 95)` (warm near-white); text is `oklch(0.255 0.045 264)` (deep navy). Pure black/white looks cheap and crushes contrast tuning.
3. **Never Inter / Arial / Roboto for display.** Display headings use `font-display`. Body uses `font-sans`. (Current display face is Space Grotesk; intent is Cabinet Grotesk — see Typography.)
4. **Always use token utilities, never raw hex.** `bg-primary text-primary-foreground`, not `bg-[#2563eb] text-white`.
5. **shadcn pair convention.** A surface token always travels with its matching foreground token. Never mix a surface with a non-paired foreground.
6. **Blue-on-white CTA must be ≥ 4.5:1.** The `bg-primary` / `text-primary-foreground` pair satisfies this. Any custom combo must be verified: ≥ 4.5:1 for text, ≥ 3:1 for large text / UI.

## OKLCH TOKEN TABLE (light `:root` — quote exactly)

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `oklch(0.985 0.006 95)` | Page surface — warm near-white |
| `--foreground` | `oklch(0.255 0.045 264)` | Primary text — deep navy |
| `--card` | `oklch(0.997 0.004 95)` | Card surface — lifted off background |
| `--card-foreground` | `oklch(0.255 0.045 264)` | Text on cards — deep navy |
| `--popover` | `oklch(0.997 0.004 95)` | Popover / menu surface |
| `--popover-foreground` | `oklch(0.255 0.045 264)` | Text on popovers — deep navy |
| `--primary` | `oklch(0.55 0.218 256)` | Brand action — electric blue |
| `--primary-foreground` | `oklch(0.985 0.01 256)` | Text/icon on primary — near-white |
| `--secondary` | `oklch(0.95 0.018 256)` | Quiet surface — pale blue-tint |
| `--secondary-foreground` | `oklch(0.305 0.05 264)` | Text on secondary — navy |
| `--muted` | `oklch(0.96 0.008 95)` | Subtle fill / disabled zones |
| `--muted-foreground` | `oklch(0.52 0.03 262)` | De-emphasized text — slate |
| `--accent` | `oklch(0.93 0.045 250)` | Hover / highlight wash — soft blue |
| `--accent-foreground` | `oklch(0.305 0.05 264)` | Text on accent — navy |
| `--destructive` | `oklch(0.58 0.22 27)` | Error / delete — red |
| `--destructive-foreground` | `oklch(0.985 0.01 95)` | Text on destructive — near-white |
| `--border` | `oklch(0.91 0.01 256)` | Hairline borders / dividers |
| `--input` | `oklch(0.91 0.01 256)` | Form field borders |
| `--ring` | `oklch(0.55 0.218 256)` | Focus ring — electric blue |

A `.dark` set exists (Phase-2) under `@custom-variant dark (&:is(.dark *));`. **Light is the default and the priority** — design and verify light first.

## shadcn PAIR CONVENTION

Always pair a surface with its foreground:

| Surface utility | Foreground utility |
| --- | --- |
| `bg-background` | `text-foreground` |
| `bg-card` | `text-card-foreground` |
| `bg-popover` | `text-popover-foreground` |
| `bg-primary` | `text-primary-foreground` |
| `bg-secondary` | `text-secondary-foreground` |
| `bg-muted` | `text-muted-foreground` |
| `bg-accent` | `text-accent-foreground` |
| `bg-destructive` | `text-destructive-foreground` |

Never hand-pick a hex. Never mix a surface with a non-paired foreground (e.g. `bg-primary text-foreground` is wrong).

## SPACING — 4px base

Tailwind's default scale is a 4px unit (`p-1` = 4px, `p-2` = 8px, `p-6` = 24px, etc.). Stay on the scale.

- **Section vertical rhythm:** `py-20 md:py-28 lg:py-32` between page sections.
- **Content container:** `mx-auto w-full max-w-5xl px-6` (centered, gutter on small screens).
- **Card padding:** `p-6`.
- **Stack gaps:** prefer `gap-*` / `space-y-*` over ad-hoc margins.

## RADIUS

`--radius: 0.875rem;` (14px base). Mapped utilities:

| Utility | Size |
| --- | --- |
| `rounded-sm` | 10px |
| `rounded-md` | 12px |
| `rounded-lg` | 14px (base) |
| `rounded-xl` | 18px |

Cards and buttons use `rounded-lg` or `rounded-xl`; inputs `rounded-md`; pills/badges `rounded-full`.

## SHADOWS — soft, layered, light

Four levels, all built from low-alpha navy (`oklch(0.255 0.045 264 / …)`) — never opaque black. Use `shadow-soft` → `shadow-elevated` to signal lift; `shadow-glow` only for the brand accent (hero CTA, focus halo on primary surfaces).

| Utility | Use |
| --- | --- |
| `shadow-soft` | Default lift — quiet cards, inputs, low surfaces |
| `shadow-card` | Standard content card resting state |
| `shadow-elevated` | Hover / popover / modal / pulled-forward card |
| `shadow-glow` | Electric-blue accent glow on primary CTAs / hero |

Exact `@theme` values (do not invent new shadows):

```css
--shadow-soft: 0 1px 2px oklch(0.255 0.045 264 / 0.04), 0 2px 8px oklch(0.255 0.045 264 / 0.05);
--shadow-card: 0 1px 3px oklch(0.255 0.045 264 / 0.05), 0 8px 24px -12px oklch(0.255 0.045 264 / 0.12);
--shadow-elevated: 0 4px 12px oklch(0.255 0.045 264 / 0.08), 0 18px 48px -16px oklch(0.255 0.045 264 / 0.18);
--shadow-glow: 0 8px 30px -8px oklch(0.55 0.218 256 / 0.35);
```

## TYPOGRAPHY

- **Display** (`font-display`): brand intent is **Cabinet Grotesk** (fallback **General Sans**). **Current implementation: Space Grotesk** via `next/font/google`, bound to `--font-display` — Cabinet Grotesk and General Sans are Fontshare faces with no `.woff2` available yet. Swap to `next/font/local` Cabinet Grotesk once the files land. **Never use Inter / Arial / Roboto for display.**
- **Body** (`font-sans`): **DM Sans** via `next/font/google`, bound to `--font-sans`.
- **Fluid headings** with `clamp()` on `font-display`, `tracking-tight`:
  - h1 → `text-[clamp(2.25rem,5vw,3.75rem)]`
  - h2 → `text-[clamp(1.75rem,3.5vw,2.75rem)]`
- **Measure:** body prose stays 60–75ch. Use `max-w-prose` (≈ 65ch) or `max-w-[68ch]`. Never run body text full-bleed.

```tsx
<h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight text-foreground">
  Security you can see
</h1>
<p className="mt-4 max-w-[68ch] font-sans text-lg text-muted-foreground">
  Professional CCTV installation across the region.
</p>
```

## BUTTON VARIANTS

| Variant | Token classes |
| --- | --- |
| primary | `bg-primary text-primary-foreground shadow-soft hover:shadow-glow` |
| secondary | `bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground` |
| outline | `border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground` |
| ghost | `text-foreground hover:bg-accent hover:text-accent-foreground` |

Focus on every variant: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.

## CARD VARIANTS

| Variant | Token classes |
| --- | --- |
| default | `rounded-lg border border-border bg-card text-card-foreground shadow-card` |
| elevated | `rounded-xl bg-card text-card-foreground shadow-elevated` (borderless, floats higher) |

Card padding is `p-6`.

## THE `@theme` TOKEN BLOCK (copy-paste)

Condensed from `src/app/globals.css` — token names and values match exactly. The real file additionally imports `tw-animate-css`, defines the `.dark` overrides, and declares the accordion keyframes. Tailwind v4 generates every `bg-*` / `text-*` / `shadow-*` / `font-*` utility from these tokens.

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.985 0.006 95);
  --foreground: oklch(0.255 0.045 264);
  --card: oklch(0.997 0.004 95);
  --card-foreground: oklch(0.255 0.045 264);
  --popover: oklch(0.997 0.004 95);
  --popover-foreground: oklch(0.255 0.045 264);
  --primary: oklch(0.55 0.218 256);
  --primary-foreground: oklch(0.985 0.01 256);
  --secondary: oklch(0.95 0.018 256);
  --secondary-foreground: oklch(0.305 0.05 264);
  --muted: oklch(0.96 0.008 95);
  --muted-foreground: oklch(0.52 0.03 262);
  --accent: oklch(0.93 0.045 250);
  --accent-foreground: oklch(0.305 0.05 264);
  --destructive: oklch(0.58 0.22 27);
  --destructive-foreground: oklch(0.985 0.01 95);
  --border: oklch(0.91 0.01 256);
  --input: oklch(0.91 0.01 256);
  --ring: oklch(0.55 0.218 256);
  --radius: 0.875rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: 0.625rem; /* 10px */
  --radius-md: 0.75rem;  /* 12px */
  --radius-lg: 0.875rem; /* 14px */
  --radius-xl: 1.125rem; /* 18px */

  --font-sans: var(--font-dm-sans);
  --font-display: var(--font-space-grotesk);

  --shadow-soft: 0 1px 2px oklch(0.255 0.045 264 / 0.04), 0 2px 8px oklch(0.255 0.045 264 / 0.05);
  --shadow-card: 0 1px 3px oklch(0.255 0.045 264 / 0.05), 0 8px 24px -12px oklch(0.255 0.045 264 / 0.12);
  --shadow-elevated: 0 4px 12px oklch(0.255 0.045 264 / 0.08), 0 18px 48px -16px oklch(0.255 0.045 264 / 0.18);
  --shadow-glow: 0 8px 30px -8px oklch(0.55 0.218 256 / 0.35);
}
```

## `cn()` USAGE

`cn()` lives in `@/lib/utils` (it is `twMerge(clsx(...))` — conditional classes plus Tailwind conflict resolution). Use it anywhere you compose or override classes.

```tsx
import { cn } from "@/lib/utils";

cn("bg-card text-card-foreground", isActive && "shadow-elevated", className);
```

## COPY-PASTE: Button + Card with `cn()`, clamp() heading, shadow-card

```tsx
import { cn } from "@/lib/utils";

function PrimaryButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-6 py-3",
        "bg-primary text-primary-foreground font-sans font-medium",
        "shadow-soft transition-shadow hover:shadow-glow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </button>
  );
}

function FeatureCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-card text-card-foreground p-6 shadow-card">
      <h3 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-3 max-w-[68ch] font-sans text-muted-foreground">{body}</p>
      <PrimaryButton className="mt-6">Get a quote</PrimaryButton>
    </article>
  );
}
```
