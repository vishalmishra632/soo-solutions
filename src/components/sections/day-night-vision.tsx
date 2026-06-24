"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { SiteImage } from "@/components/shared/site-image";
import type { SiteImageId } from "@/content/site-images";
import { cn } from "@/lib/utils";

// Tuned to read as infrared night vision: drained of colour, pushed green, lifted midtones.
const NIGHT_FILTER =
  "grayscale(1) sepia(1) hue-rotate(65deg) saturate(2.4) brightness(1.18) contrast(1.05)";
const SCANLINES =
  "repeating-linear-gradient(to bottom, rgba(0,0,0,0.28) 0, rgba(0,0,0,0.28) 1px, transparent 1px, transparent 3px)";
const VIGNETTE = "radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)";

export function DayNightVision() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          Day &amp; night
        </p>
        <h2 className="font-display text-foreground mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
          Your cameras don&rsquo;t sleep.
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Drag the slider — the same scene flips to infrared night vision, so footage stays clear long
          after dark.
        </p>
      </div>

      <div className="mt-10">
        <DayNightSlider
          imageId="res-yard"
          alt="An outdoor security camera covering a residential back yard in daylight"
        />
      </div>
    </section>
  );
}

function DayNightSlider({ imageId, alt }: { imageId: SiteImageId; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(55);
  const [hasInteracted, setHasInteracted] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const element = containerRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, percent)));
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (dragging.current) setFromClientX(event.clientX);
    };
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
  }, [setFromClientX]);

  function startDrag(event: React.PointerEvent) {
    event.preventDefault();
    dragging.current = true;
    setHasInteracted(true);
    setFromClientX(event.clientX);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") setPosition((value) => Math.max(2, value - step));
    else if (event.key === "ArrowRight") setPosition((value) => Math.min(98, value + step));
    else if (event.key === "Home") setPosition(2);
    else if (event.key === "End") setPosition(98);
    else return;
    event.preventDefault();
    setHasInteracted(true);
  }

  return (
    <div
      ref={containerRef}
      className="border-border/60 shadow-elevated relative aspect-[16/10] w-full touch-pan-y overflow-hidden rounded-2xl border select-none"
      onClick={(event) => setFromClientX(event.clientX)}
    >
      {/* Daytime base */}
      <SiteImage id={imageId} alt={alt} fill sizes="(min-width:1024px) 1152px, 100vw" className="object-cover" />
      <span className="bg-background/80 text-foreground absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-wider uppercase backdrop-blur">
        Daylight
      </span>

      {/* Night-vision overlay, clipped to the right of the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <div className="absolute inset-0" style={{ filter: NIGHT_FILTER }}>
          <SiteImage id={imageId} alt="" fill sizes="(min-width:1024px) 1152px, 100vw" className="object-cover" />
        </div>
        <div aria-hidden className="absolute inset-0 opacity-40" style={{ backgroundImage: SCANLINES }} />
        <div aria-hidden className="grain absolute inset-0 opacity-20" />
        <div aria-hidden className="absolute inset-0" style={{ background: VIGNETTE }} />
        <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-950/70 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-emerald-300 uppercase backdrop-blur">
          <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          Night vision
        </span>
      </div>

      {/* Divider + handle */}
      <div aria-hidden className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/85" style={{ left: `${position}%` }} />
      <button
        type="button"
        role="slider"
        aria-label="Reveal night vision"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onPointerDown={startDrag}
        onKeyDown={onKeyDown}
        style={{ left: `${position}%` }}
        className="border-primary text-primary absolute top-1/2 size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none rounded-full border-2 bg-white shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <MoveHorizontal className="mx-auto size-5" aria-hidden />
      </button>

      {!hasInteracted ? (
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          Drag to compare
        </span>
      ) : null}
    </div>
  );
}
