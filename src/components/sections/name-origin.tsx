"use client";

import { motion, type Variants } from "motion/react";
import { IrisLens } from "@/components/shared/iris-lens";
import { EASE_OUT } from "@/lib/motion";
import { nameOrigin } from "@/content/about";

// Staggered reveal; the lenses "focus in" (scale) then keep their aperture spin/pulse. All transforms
// are suppressed under prefers-reduced-motion by the global MotionConfig, so it degrades to a clean
// static lockup.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function NameOrigin() {
  return (
    <section aria-labelledby="name-origin-heading" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 16%, transparent), transparent 68%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={rise}
          className="font-display text-primary text-sm font-medium tracking-widest uppercase"
        >
          {nameOrigin.eyebrow}
        </motion.p>
        <motion.p variants={rise} className="text-muted-foreground mt-5 text-lg">
          {nameOrigin.intro}
        </motion.p>

        <div className="mt-7 flex items-center justify-center gap-1 sm:gap-2">
          <motion.span
            variants={rise}
            id="name-origin-heading"
            className="font-display text-foreground text-[clamp(4rem,12vw,9rem)] leading-none font-bold"
          >
            S
          </motion.span>
          <span className="inline-block size-[clamp(3.4rem,9vw,7rem)]">
            <IrisLens className="h-full w-full" />
          </span>
          <span className="inline-block size-[clamp(3.4rem,9vw,7rem)]">
            <IrisLens className="h-full w-full" delay={0.18} />
          </span>
        </div>

        <motion.p
          variants={rise}
          className="font-display text-muted-foreground mt-3 text-[clamp(1rem,2.4vw,1.5rem)] font-semibold tracking-[0.45em] uppercase"
        >
          Solutions
        </motion.p>

        <motion.p variants={rise} className="text-foreground/80 mt-9 max-w-md text-base">
          {nameOrigin.caption}
        </motion.p>
      </motion.div>
    </section>
  );
}
