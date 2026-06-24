"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useRef, useState } from "react";
import { SceneFallback } from "./scene-fallback";
import { HeroCameraPoster } from "./hero-camera-poster";
import { HeroCameraControls } from "./hero-camera-controls";
import { heroCameras } from "./hero-cameras";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

// ssr:false keeps WebGL off the server and out of the first-load bundle.
const CameraScene = dynamic(() => import("./camera-scene").then((module) => module.CameraScene), {
  ssr: false,
  loading: () => <SceneFallback />,
});

// Roughly matches the morph (exit + enter) so rapid clicks can't overlap a transition.
const SWAP_LOCK_MS = 700;

export function LazyCameraScene({ className }: { className?: string }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lockRef = useRef(false);

  // Mobile keeps the existing static hero poster (no interaction). Desktop gets the controls — a live
  // morph when motion is allowed, or instant product-image swaps under prefers-reduced-motion.
  const live = !isMobile && !prefersReducedMotion;
  const interactive = !isMobile;

  const lockIfAnimating = useCallback(() => {
    if (!live) return;
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, SWAP_LOCK_MS);
  }, [live]);

  const next = useCallback(() => {
    if (lockRef.current) return;
    setHasInteracted(true);
    setActiveIndex((current) => (current + 1) % heroCameras.length);
    lockIfAnimating();
  }, [lockIfAnimating]);

  const select = useCallback(
    (nextIndex: number) => {
      if (lockRef.current) return;
      setHasInteracted(true);
      setActiveIndex(nextIndex);
      lockIfAnimating();
    },
    [lockIfAnimating],
  );

  return (
    <div className="w-full">
      <div
        className={cn(
          "shadow-elevated relative aspect-[4/3] w-full overflow-hidden rounded-xl",
          className,
        )}
      >
        {isMobile ? (
          <SceneFallback />
        ) : live ? (
          <Suspense fallback={<SceneFallback />}>
            <CameraScene index={activeIndex} onAdvance={next} />
          </Suspense>
        ) : (
          <HeroCameraPoster index={activeIndex} />
        )}

        {live && !hasInteracted ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <span className="border-border bg-card/85 text-muted-foreground animate-in fade-in slide-in-from-bottom-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-soft backdrop-blur-sm duration-500 motion-reduce:animate-none">
              Click the camera to explore types
            </span>
          </div>
        ) : null}
      </div>

      {interactive ? (
        <HeroCameraControls
          items={heroCameras}
          activeIndex={activeIndex}
          onNext={next}
          onSelect={select}
        />
      ) : null}
    </div>
  );
}
