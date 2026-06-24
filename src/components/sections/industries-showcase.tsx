"use client";

import { useState } from "react";
import { SiteImage } from "@/components/shared/site-image";
import { IndustryRow } from "./industry-row";
import { useMediaQuery } from "@/hooks/use-media-query";
import { resolveIcon } from "@/lib/icons";
import { industries } from "@/content/industries";
import type { Industry } from "@/types";
import { cn } from "@/lib/utils";

const CORNERS = [
  "top-3 left-3 border-l-2 border-t-2",
  "top-3 right-3 border-r-2 border-t-2",
  "bottom-3 left-3 border-l-2 border-b-2",
  "bottom-3 right-3 border-r-2 border-b-2",
];

export function IndustriesShowcase() {
  // The pinned image-and-feed layout needs room, so narrow screens keep the stacked rows.
  const isCompact = useMediaQuery("(max-width: 900px)");

  if (isCompact) {
    return (
      <ol role="list">
        {industries.map((industry, index) => (
          <IndustryRow key={industry.slug} industry={industry} index={index} />
        ))}
      </ol>
    );
  }

  return <Showcase />;
}

function Showcase() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_1fr]">
        {/* The "live feed" stage — every sector image stacked, the active one faded in. */}
        <div className="border-border bg-secondary relative aspect-[4/3] overflow-hidden rounded-2xl border">
          {industries.map((industry, index) => (
            <SiteImage
              key={industry.slug}
              id={industry.imageId ?? "hero-camera"}
              alt={industry.imageAlt ?? industry.name}
              fill
              sizes="(min-width:1024px) 55vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-700",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px, transparent 3px)",
            }}
          />
          {CORNERS.map((corner) => (
            <span key={corner} className={cn("absolute size-5 border-white/70", corner)} aria-hidden />
          ))}
          <div
            aria-hidden
            className="absolute top-3.5 left-12 flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/90 uppercase"
          >
            <span className="size-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
            Live
            <span className="text-white/65">
              · Cam-{String(active + 1).padStart(2, "0")} · {current.name}
            </span>
          </div>
        </div>

        {/* Every sector's copy is in the DOM (SEO); only the active one is shown. */}
        <div className="relative min-h-[24rem]">
          {industries.map((industry, index) => (
            <div
              key={industry.slug}
              aria-hidden={index !== active}
              className={cn(
                "transition-all duration-500",
                index === active
                  ? "opacity-100"
                  : "pointer-events-none absolute inset-0 translate-y-2 opacity-0",
              )}
            >
              <IndustryDetail industry={industry} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {industries.map((industry, index) => {
          const Icon = resolveIcon(industry.icon);
          const on = index === active;
          return (
            <button
              key={industry.slug}
              type="button"
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              aria-pressed={on}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/60",
              )}
            >
              <Icon className={cn("size-4", on ? "text-primary-foreground" : "text-primary")} aria-hidden />
              {industry.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function IndustryDetail({ industry }: { industry: Industry }) {
  return (
    <div>
      <h2 className="font-display text-foreground text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">
        {industry.name}
      </h2>

      <div className="mt-5">
        <p className="font-display text-muted-foreground text-xs font-medium tracking-widest uppercase">
          The challenge
        </p>
        <p className="text-muted-foreground mt-1 text-lg">{industry.challenge}</p>
      </div>

      <div className="mt-4">
        <p className="font-display text-primary text-xs font-medium tracking-widest uppercase">
          Our approach
        </p>
        <p className="text-muted-foreground mt-1 text-lg">{industry.solution}</p>
      </div>

      <div className="border-border mt-6 border-t pt-6">
        <p className="border-primary font-display text-foreground border-l-2 pl-4 text-xl font-semibold tracking-tight md:text-2xl">
          {industry.outcome}
        </p>
      </div>
    </div>
  );
}
