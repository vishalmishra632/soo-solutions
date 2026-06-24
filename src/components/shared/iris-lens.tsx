"use client";

import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

// A camera lens that builds itself from parts when it scrolls into view: the housing bezel draws on,
// mounting bolts pop in around the rim, the lens ring forms, the six iris blades fly in one-by-one,
// the aperture core locks, and the focus ring settles. Exploded → assembled, then it holds. Movement
// is suppressed under prefers-reduced-motion, so it degrades to a clean static lens.
const BLADES = 6;
const CENTER = 60;
const BEZEL = 56;
const BOLT_RADIUS = 56;
const LENS_RING = 48;
const FOCUS_RING = 40;
const BLADE_OUTER = 37;
const BLADE_INNER = 12;
const BLADE_SWEEP = 24;
const EXPLODE = 24; // how far each blade starts pushed out along its radial before flying in

function polar(radius: number, degrees: number): [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [CENTER + radius * Math.cos(radians), CENTER + radius * Math.sin(radians)];
}

const bolts = Array.from({ length: BLADES }, (_, index) => polar(BOLT_RADIUS, index * 60));
const innerVertices = Array.from({ length: BLADES }, (_, index) => polar(BLADE_INNER, index * 60 + 30));
const hexagonPoints = innerVertices.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
const blades = innerVertices.map(([x1, y1], index) => {
  const angleDeg = index * 60 + 30;
  const [x2, y2] = polar(BLADE_OUTER, angleDeg - BLADE_SWEEP);
  const radians = (angleDeg * Math.PI) / 180;
  return { x1, y1, x2, y2, ox: Math.cos(radians) * EXPLODE, oy: Math.sin(radians) * EXPLODE };
});

type RingCustom = { delay: number; duration: number };
type BladeCustom = { ox: number; oy: number; index: number; delay: number };

const drawRing: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (custom: RingCustom) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: custom.duration, ease: EASE_OUT, delay: custom.delay },
      opacity: { duration: 0.25, delay: custom.delay },
    },
  }),
};

const popIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: EASE_OUT, delay },
  }),
};

const flyInBlade: Variants = {
  hidden: (custom: BladeCustom) => ({ x: custom.ox, y: custom.oy, rotate: 38, scale: 0.4, opacity: 0 }),
  show: (custom: BladeCustom) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT, delay: custom.delay + 0.45 + custom.index * 0.065 },
  }),
};

export function IrisLens({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={cn("text-primary", className)}
      aria-hidden
      focusable="false"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Housing bezel */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={BEZEL}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        custom={{ delay, duration: 0.55 } satisfies RingCustom}
        variants={drawRing}
      />

      {/* Mounting bolts around the rim */}
      {bolts.map(([cx, cy], index) => (
        <motion.circle
          key={`bolt-${index}`}
          cx={cx}
          cy={cy}
          r={2.6}
          fill="currentColor"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          custom={delay + 0.12 + index * 0.045}
          variants={popIn}
        />
      ))}

      {/* Lens ring */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={LENS_RING}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        custom={{ delay: delay + 0.3, duration: 0.5 } satisfies RingCustom}
        variants={drawRing}
      />

      {/* Iris blades fly in */}
      {blades.map((blade, index) => (
        <motion.g
          key={`blade-${index}`}
          style={{ transformOrigin: "60px 60px" }}
          custom={{ ox: blade.ox, oy: blade.oy, index, delay } satisfies BladeCustom}
          variants={flyInBlade}
        >
          <line
            x1={blade.x1}
            y1={blade.y1}
            x2={blade.x2}
            y2={blade.y2}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* Aperture core locks in */}
      <motion.polygon
        points={hexagonPoints}
        fill="currentColor"
        fillOpacity={0.08}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
        style={{ transformOrigin: "60px 60px" }}
        custom={delay + 0.45 + BLADES * 0.065}
        variants={popIn}
      />

      {/* Focus ring settles */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={FOCUS_RING}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={0.4}
        custom={{ delay: delay + 0.9, duration: 0.4 } satisfies RingCustom}
        variants={drawRing}
      />
    </motion.svg>
  );
}
