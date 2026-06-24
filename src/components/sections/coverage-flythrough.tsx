"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { coverageIntro, coverageZones, type CoverageZone } from "@/content/coverage";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CoverageStatic } from "./coverage-static";

// WebGL stays off the server and out of the first-load bundle; null while it streams in.
const CoverageScene = dynamic(
  () => import("@/components/three/coverage-scene").then((module) => module.CoverageScene),
  { ssr: false, loading: () => null },
);

export function CoverageFlythrough() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useReducedMotion();

  // Mobile + reduced-motion get the calm static panel instead of the pinned 3D scroll.
  if (isMobile || prefersReducedMotion) return <CoverageStatic />;
  return <CoverageLive />;
}

function CoverageLive() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Feed scroll into a plain ref the Canvas reads in its render loop (no React re-render on scroll).
  useEffect(() => scrollYProgress.on("change", (value) => (progress.current = value)), [scrollYProgress]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="coverage-heading"
      className="relative h-[320vh] bg-[#0a1020]"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 16%, #14203c 0%, #0a1020 55%, #070b16 100%)",
          }}
        />
        <div className="absolute inset-0">
          <CoverageScene progress={progress} />
        </div>

        {/* Headline pinned to the top-left, kept compact so it never meets the scene below. */}
        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-28">
            <div className="max-w-md">
              <p className="font-display text-sm font-medium tracking-widest text-blue-300 uppercase">
                {coverageIntro.eyebrow}
              </p>
              <h2
                id="coverage-heading"
                className="font-display mt-3 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] font-bold tracking-tight text-white"
              >
                {coverageIntro.heading}
              </h2>
              <p className="mt-4 max-w-xs text-sm text-blue-100/60">{coverageIntro.lead}</p>
            </div>
          </div>
        </div>

        {/* Zone "sweep stepper" along the bottom — fills left-to-right in step with the beam. */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/85 to-transparent pt-20 pb-8">
          <div className="mx-auto max-w-3xl px-6">
            <motion.p
              style={{ opacity: hintOpacity }}
              className="mb-6 text-center text-xs tracking-widest text-blue-200/55 uppercase"
            >
              {coverageIntro.hint}{" "}
              <span className="inline-block motion-safe:animate-bounce">↓</span>
            </motion.p>
            <ZoneStepper scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoneStepper({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const fillWidth = useTransform(scrollYProgress, [0.06, 0.92], ["0%", "100%"]);

  return (
    <ol className="relative flex items-start justify-between">
      <span aria-hidden className="absolute top-2 right-2 left-2 h-px bg-white/15" />
      <motion.span
        aria-hidden
        style={{ width: fillWidth }}
        className="absolute top-2 left-2 h-px bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.7)]"
      />
      {coverageZones.map((zone, index) => (
        <ZoneStep key={zone.id} zone={zone} index={index} scrollYProgress={scrollYProgress} />
      ))}
    </ol>
  );
}

function ZoneStep({
  zone,
  index,
  scrollYProgress,
}: {
  zone: CoverageZone;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const threshold = 0.12 + index * 0.25;
  const opacity = useTransform(scrollYProgress, [threshold - 0.1, threshold], [0.4, 1]);
  const dotColor = useTransform(scrollYProgress, [threshold - 0.05, threshold], ["#243b5e", "#7cc0ff"]);
  const dotScale = useTransform(scrollYProgress, [threshold - 0.06, threshold], [0.7, 1]);

  return (
    <motion.li style={{ opacity }} className="relative z-10 flex w-24 flex-col items-center gap-2.5 text-center sm:w-auto">
      <motion.span
        style={{ backgroundColor: dotColor, scale: dotScale }}
        className="size-4 rounded-full ring-4 ring-[#070b16]"
      />
      <span className="font-display text-xs font-semibold text-white sm:text-sm">{zone.label}</span>
    </motion.li>
  );
}
