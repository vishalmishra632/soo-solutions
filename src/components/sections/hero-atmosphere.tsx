"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const BASE_GLOW = "radial-gradient(60% 55% at 85% 12%, var(--secondary), transparent 65%)";
const SPOTLIGHT =
  "radial-gradient(circle, color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)";
const SPOTLIGHT_SIZE = 520;

// The hero's decorative layer: a brand glow that drifts slightly on scroll (parallax depth) plus a
// desktop-only cursor spotlight. Both are pointer-events-free and collapse to a static glow under
// prefers-reduced-motion. Rendered inside the hero <section>, which is the parallax/scroll target.
export function HeroAtmosphere() {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const spotX = useMotionValue(-SPOTLIGHT_SIZE);
  const spotY = useMotionValue(-SPOTLIGHT_SIZE);
  const spotOpacity = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = rootRef.current?.parentElement;
    if (!section) return;

    function handleMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = section!.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      spotOpacity.set(inside ? 1 : 0);
      if (inside) {
        spotX.set(event.clientX - rect.left - SPOTLIGHT_SIZE / 2);
        spotY.set(event.clientY - rect.top - SPOTLIGHT_SIZE / 2);
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [prefersReducedMotion, spotX, spotY, spotOpacity]);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={prefersReducedMotion ? { background: BASE_GLOW } : { background: BASE_GLOW, y: parallaxY }}
      />
      {prefersReducedMotion ? null : (
        <motion.div
          className="absolute hidden rounded-full lg:block"
          style={{
            x: spotX,
            y: spotY,
            opacity: spotOpacity,
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            background: SPOTLIGHT,
          }}
        />
      )}
    </div>
  );
}
