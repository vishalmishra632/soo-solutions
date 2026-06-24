"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { blueprintIntro } from "@/content/blueprint";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { BlueprintStatic } from "./blueprint-static";

// WebGL stays off the server and out of the first-load bundle; null while it streams in.
const BlueprintScene = dynamic(
  () => import("@/components/three/blueprint-scene").then((module) => module.BlueprintScene),
  { ssr: false, loading: () => null },
);

export function BlueprintBuild() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useReducedMotion();

  if (isMobile || prefersReducedMotion) return <BlueprintStatic />;
  return <BlueprintLive />;
}

function BlueprintLive() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => scrollYProgress.on("change", (value) => (progress.current = value)), [scrollYProgress]);

  const planOpacity = useTransform(scrollYProgress, [0.35, 0.58], [1, 0.35]);
  const doneOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0.35, 1]);
  const barFill = useTransform(scrollYProgress, [0.08, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="blueprint-heading"
      className="relative h-[220vh] bg-[#0a1424]"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(110% 90% at 50% 12%, #0e2138 0%, #0a1424 55%, #060b16 100%)",
          }}
        />
        <div className="absolute inset-0">
          <BlueprintScene progress={progress} />
        </div>

        {/* Compact headline, top-left. */}
        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-28">
            <div className="max-w-md">
              <p className="font-display text-sm font-medium tracking-widest text-cyan-300 uppercase">
                {blueprintIntro.eyebrow}
              </p>
              <h2
                id="blueprint-heading"
                className="font-display mt-3 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] font-bold tracking-tight text-white"
              >
                {blueprintIntro.heading}
              </h2>
              <p className="mt-4 max-w-xs text-sm text-blue-100/60">{blueprintIntro.lead}</p>
            </div>
          </div>
        </div>

        {/* Blueprint → Installed status, bottom-centre, filling with scroll. */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060b16] via-[#060b16]/80 to-transparent pb-10 pt-16">
          <div className="mx-auto flex max-w-md items-center gap-4 px-6 font-display text-sm font-semibold tracking-wide">
            <motion.span style={{ opacity: planOpacity }} className="shrink-0 text-cyan-200 uppercase">
              {blueprintIntro.planLabel}
            </motion.span>
            <span className="relative h-px flex-1 bg-white/15">
              <motion.span
                style={{ width: barFill }}
                className="absolute inset-y-0 left-0 bg-cyan-300 shadow-[0_0_10px_rgba(125,200,255,0.8)]"
              />
            </span>
            <motion.span style={{ opacity: doneOpacity }} className="shrink-0 text-white uppercase">
              {blueprintIntro.doneLabel}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
