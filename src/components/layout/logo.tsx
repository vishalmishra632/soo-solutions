"use client";

import Link from "next/link";
import { useId } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoVariant = "horizontal" | "stacked" | "icon";

// The "Aperture" mark: a solid brand-blue badge with a six-blade camera iris cut into it — instantly
// reads as optics/CCTV and owns its space instead of floating. It's a living mark: the blades spin in to
// "focus" once on load, and tighten (rotate) when the logo is hovered, while the dark lens opening and
// glint stay fixed. Gradient ids are unique per instance so the header and footer logos can coexist.
const APERTURE_BLADES = [
  "M61 50 L81 50 L65.5 76.85 Z",
  "M55.5 59.53 L65.5 76.85 L34.5 76.85 Z",
  "M44.5 59.53 L34.5 76.85 L19 50 Z",
  "M39 50 L19 50 L34.5 23.15 Z",
  "M44.5 40.47 L34.5 23.15 L65.5 23.15 Z",
  "M55.5 40.47 L65.5 23.15 L81 50 Z",
];

export function LogoMark({ className, title = true }: { className?: string; title?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const badgeId = `soo-badge-${uid}`;
  const holeId = `soo-hole-${uid}`;
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "animate-in fade-in zoom-in-95 duration-700 motion-reduce:animate-none",
        className,
      )}
      role="img"
      aria-label={title ? SITE.name : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{SITE.name}</title> : null}
      <defs>
        <linearGradient id={badgeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f7df7" />
          <stop offset="1" stopColor="#1b46c2" />
        </linearGradient>
        <radialGradient id={holeId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0b1736" />
          <stop offset="1" stopColor="#16357f" />
        </radialGradient>
      </defs>

      <rect x="5" y="5" width="90" height="90" rx="24" fill={`url(#${badgeId})`} />
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="24"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" />

      <g className="origin-center [transform-box:fill-box] transition-transform duration-500 ease-out group-hover:rotate-[28deg]">
        <g className="aperture-focus-in" fill="#ffffff" stroke="#1b46c2" strokeWidth="0.6" strokeLinejoin="round">
          {APERTURE_BLADES.map((blade) => (
            <path key={blade} d={blade} />
          ))}
        </g>
      </g>

      <circle cx="50" cy="50" r="9.5" fill={`url(#${holeId})`} />
      <circle cx="45.5" cy="45.5" r="2.2" fill="#ffffff" fillOpacity="0.8" />
    </svg>
  );
}

// A single lens glyph standing in for an "o"/"O" — a brand-blue ring with a pupil, echoing the badge's
// iris. Size + baseline nudge come from the caller so it can sit as a lowercase o or a cap O.
function LensO({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("inline-block", className)}>
      <circle cx="12" cy="12" r="9" fill="none" className="stroke-primary" strokeWidth="3.4" />
      <circle cx="12" cy="12" r="3.2" className="fill-primary" />
    </svg>
  );
}

// The wordmark, built as one family: "Soo" carries real lens glyphs for its o's, and "SOLUTIONS" rhymes
// with it by setting its two O's in the same brand blue (the lens colour) over shared navy — so the badge
// iris, the oo, and the O's all read as one system. nowrap keeps the sub-label on a single line.
// Decorative (the link carries the accessible name), so the whole thing is aria-hidden.
function LensWordmark({ centered = false }: { centered?: boolean }) {
  const soLens = "mx-[0.015em] h-[0.66em] w-[0.66em] [vertical-align:-0.04em]";
  return (
    <span aria-hidden className={cn("font-display leading-[0.95]", centered && "text-center")}>
      <span className="text-foreground block text-[1.3rem] font-bold tracking-tight whitespace-nowrap">
        S<LensO className={soLens} />
        <LensO className={soLens} />
      </span>
      <span className="text-foreground/85 mt-1 block text-[0.66rem] font-semibold tracking-[0.26em] whitespace-nowrap uppercase">
        S<span className="text-primary">O</span>LUTI<span className="text-primary">O</span>NS
      </span>
    </span>
  );
}

const focus =
  "group focus-visible:ring-ring rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";

export function Logo({
  variant = "horizontal",
  className,
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  if (variant === "icon") {
    return (
      <Link href="/" aria-label={`${SITE.name} — home`} className={cn("inline-flex", focus, className)}>
        <LogoMark className="size-9" />
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link
        href="/"
        aria-label={`${SITE.name} — home`}
        className={cn("inline-flex flex-col items-center gap-2.5", focus, className)}
      >
        <LogoMark className="size-12" title={false} />
        <LensWordmark centered />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — home`}
      className={cn("inline-flex items-center gap-2.5", focus, className)}
    >
      <LogoMark className="size-9 shrink-0" title={false} />
      <LensWordmark />
    </Link>
  );
}
