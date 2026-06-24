"use client";

import { useEffect, useState } from "react";
import { CameraAperture } from "./camera-aperture";
import { cn } from "@/lib/utils";

// The signature first-paint loader. It is rendered in the static HTML so it shows instantly, then fades
// the moment hydration is done plus a short tasteful minimum — never an artificial multi-second hold.
// Under prefers-reduced-motion the aperture is static (see globals.css) and only the opacity fade remains.
const MIN_VISIBLE_MS = 500;

export function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), MIN_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (removed) return null;

  return (
    <div
      data-site-loader
      role="status"
      aria-live="polite"
      aria-busy={!leaving}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && leaving) setRemoved(true);
      }}
      className={cn(
        "bg-background fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ease-out",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <CameraAperture size={108} />
        <div className="flex items-center gap-2">
          <span className="bg-destructive size-2 rounded-full motion-safe:animate-rec-blink" aria-hidden />
          <span className="font-display text-muted-foreground text-xs font-medium tracking-[0.35em] uppercase">
            Focusing
          </span>
        </div>
        <span className="sr-only">Loading Soo Solutions</span>
      </div>
    </div>
  );
}
