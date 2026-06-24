"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Boxes, Layers } from "lucide-react";
import { SiteImage } from "@/components/shared/site-image";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ExplodedCameraScene = dynamic(
  () => import("@/components/three/exploded-camera-scene").then((module) => module.ExplodedCameraScene),
  { ssr: false, loading: () => null },
);

const PARTS_INFO = [
  { name: "Lens", blurb: "Wide or telephoto glass, matched to the shot." },
  { name: "IR ring", blurb: "Infrared LEDs for clear footage after dark." },
  { name: "Sun shade", blurb: "Cuts glare and keeps rain off the glass." },
  { name: "Housing", blurb: "Weather-sealed metal body, built for outdoors." },
  { name: "Image sensor", blurb: "The chip that turns light into 4K footage." },
  { name: "Mount", blurb: "Solid bracket for a steady, aimed install." },
];

export function CameraAnatomy() {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const prefersReducedMotion = useReducedMotion();

  if (isMobile || prefersReducedMotion) return <AnatomyStatic />;
  return <AnatomyLive />;
}

function AnatomyLive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [exploded, setExploded] = useState(false);

  // Auto-explode the first time it scrolls into view; the toggle takes over after that.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setExploded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          What we install
        </p>
        <h2 className="font-display text-foreground mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
          What&rsquo;s inside the gear.
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          We fit professional cameras, not throwaway boxes. Here&rsquo;s every part that goes into one —
          flown apart, then back together.
        </p>
      </div>

      <div className="relative mt-8 aspect-[16/10] w-full">
        <ExplodedCameraScene exploded={exploded} />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setExploded((value) => !value)}
            className="bg-card/80 backdrop-blur"
          >
            {exploded ? <Boxes className="size-4" aria-hidden /> : <Layers className="size-4" aria-hidden />}
            {exploded ? "Reassemble" : "Explode view"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function AnatomyStatic() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
            What we install
          </p>
          <h2 className="font-display text-foreground mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
            What&rsquo;s inside the gear.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            We fit professional cameras, not throwaway boxes. Every part is built to last and matched to
            your property.
          </p>
          <dl className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {PARTS_INFO.map((part) => (
              <div key={part.name}>
                <dt className="font-display text-foreground text-sm font-semibold">{part.name}</dt>
                <dd className="text-muted-foreground mt-0.5 text-sm">{part.blurb}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="border-border bg-secondary shadow-card relative aspect-[4/3] overflow-hidden rounded-2xl border">
          <SiteImage
            id="hero-camera"
            alt="A professional security camera"
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </section>
  );
}
