"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { IrisLens } from "@/components/shared/iris-lens";
import { ServicesGrid } from "./services-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import { resolveIcon } from "@/lib/icons";
import { EASE_OUT } from "@/lib/motion";
import { services } from "@/content/services";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

// Short node labels so the constellation stays legible — the full title lives in the detail card.
const SHORT_LABELS: Record<string, string> = {
  "cctv-installation": "Installation",
  "commercial-security-systems": "Commercial",
  "residential-security-systems": "Residential",
  "system-design-and-site-survey": "Site Survey",
  "maintenance-and-support": "Maintenance",
  "upgrades-and-retrofits": "Upgrades",
  "remote-viewing-and-mobile-setup": "Remote Viewing",
};

const RADIUS = 38; // percent of the square, from the hub at the centre to each node

export function ServicesConstellation() {
  // Below this width the constellation gets cramped, so fall back to the plain service grid.
  const isCompact = useMediaQuery("(max-width: 880px)");
  if (isCompact) return <ServicesGrid items={services} />;
  return <Constellation />;
}

function Constellation() {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const active = services.find((service) => service.slug === activeSlug) ?? services[0];

  const nodes = services.map((service, index) => {
    const angle = ((-90 + (360 / services.length) * index) * Math.PI) / 180;
    return {
      service,
      index,
      x: 50 + Math.cos(angle) * RADIUS,
      y: 50 + Math.sin(angle) * RADIUS,
    };
  });

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative aspect-square w-full max-w-[560px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {nodes.map(({ service, x, y, index }) => {
            const on = service.slug === activeSlug;
            return (
              <motion.line
                key={service.slug}
                x1={50}
                y1={50}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth={on ? 0.5 : 0.25}
                className={cn("transition-colors", on ? "text-primary" : "text-border")}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 + index * 0.07 }}
              />
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 flex w-[33%] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <IrisLens className="w-full" />
          <span className="font-display text-foreground mt-1 text-xs font-semibold tracking-wide">
            End&nbsp;to&nbsp;end
          </span>
        </div>

        {nodes.map(({ service, x, y, index }) => {
          const Icon = resolveIcon(service.icon);
          const on = service.slug === activeSlug;
          return (
            <motion.div
              key={service.slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.35 + index * 0.07 }}
            >
              <Link
                href={`/services/${service.slug}`}
                aria-label={service.title}
                onMouseEnter={() => setActiveSlug(service.slug)}
                onFocus={() => setActiveSlug(service.slug)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-sm transition-colors",
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/60",
                )}
              >
                <Icon
                  className={cn("size-4 shrink-0", on ? "text-primary-foreground" : "text-primary")}
                  aria-hidden
                />
                {SHORT_LABELS[service.slug] ?? service.title}
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="w-full max-w-xl" aria-live="polite">
        <ActiveDetail service={active} />
      </div>
    </div>
  );
}

function ActiveDetail({ service }: { service: Service }) {
  const Icon = resolveIcon(service.icon);
  return (
    <motion.div
      key={service.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="border-border bg-card shadow-card rounded-2xl border p-7"
    >
      <div className="flex items-center gap-3">
        <span className="bg-secondary text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="font-display text-foreground text-xl font-semibold tracking-tight">
          {service.title}
        </h3>
      </div>
      <p className="text-muted-foreground mt-4">{service.summary}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {service.highlights.map((highlight) => (
          <li key={highlight} className="text-foreground flex items-start gap-2 text-sm">
            <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
            {highlight}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        className="text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
      >
        View {SHORT_LABELS[service.slug] ?? "service"}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </motion.div>
  );
}
