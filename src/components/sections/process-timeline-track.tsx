"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { resolveIcon } from "@/lib/icons";
import type { ProcessStep } from "@/types";

// The install journey: as the section scrolls through, a glowing marker travels the connecting line and
// each step lights up the moment the marker reaches it (glow + pop + its text brightens). Under reduced
// motion the line is drawn full, the marker is dropped, and every step sits lit and static.
export function ProcessTimelineTrack({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 80%", "end 60%"],
  });
  const markerLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lastIndex = Math.max(1, steps.length - 1);

  return (
    <div ref={rootRef}>
      <div className="relative hidden md:block">
        <div aria-hidden className="bg-border absolute top-5 right-[12.5%] left-[12.5%] h-0.5" />
        <motion.div
          aria-hidden
          style={{ scaleX: prefersReducedMotion ? 1 : scrollYProgress }}
          className="bg-primary absolute top-5 right-[12.5%] left-[12.5%] h-0.5 origin-left"
        />

        {prefersReducedMotion ? null : (
          <div aria-hidden className="absolute top-5 right-[12.5%] left-[12.5%] h-0.5">
            <motion.span style={{ left: markerLeft }} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-primary block size-3 rounded-full shadow-[0_0_10px_2px_rgba(37,99,235,0.45)]" />
              <motion.span
                className="border-primary/50 absolute inset-0 rounded-full border"
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
              />
            </motion.span>
          </div>
        )}

        <ol className="relative grid grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <JourneyNode
              key={step.step}
              step={step}
              progress={scrollYProgress}
              fraction={index / lastIndex}
              reduced={prefersReducedMotion}
            />
          ))}
        </ol>
      </div>

      <ol className="relative grid gap-8 md:hidden">
        <div aria-hidden className="bg-border absolute inset-y-0 left-5 w-0.5" />
        <motion.div
          aria-hidden
          style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
          className="bg-primary absolute inset-y-0 left-5 w-0.5 origin-top"
        />
        {steps.map((step) => {
          const Icon = resolveIcon(step.icon);
          return (
            <li key={step.step} className="relative pl-16">
              <span className="border-primary bg-background text-primary absolute left-0 z-10 flex size-10 items-center justify-center rounded-full border-2">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="font-display text-primary text-sm font-medium">{step.step}</p>
              <h3 className="font-display text-foreground mt-1 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function JourneyNode({
  step,
  progress,
  fraction,
  reduced,
}: {
  step: ProcessStep;
  progress: MotionValue<number>;
  fraction: number;
  reduced: boolean;
}) {
  const Icon = resolveIcon(step.icon);
  const litStart = Math.max(0, fraction - 0.1);
  const glowOpacity = useTransform(progress, [litStart, fraction], [0, 1]);
  const nodeScale = useTransform(progress, [litStart, fraction], [1, 1.12]);
  const textOpacity = useTransform(progress, [litStart, fraction], [0.5, 1]);

  return (
    <li className="relative text-center">
      <span className="relative mx-auto flex size-10 items-center justify-center">
        {reduced ? null : (
          <motion.span
            aria-hidden
            style={{ opacity: glowOpacity, scale: nodeScale }}
            className="bg-primary/25 absolute inset-[-6px] rounded-full blur-md"
          />
        )}
        <motion.span
          style={{ scale: reduced ? 1 : nodeScale }}
          className="border-primary bg-background text-primary relative z-10 flex size-10 items-center justify-center rounded-full border-2"
        >
          <Icon className="size-5" aria-hidden />
        </motion.span>
      </span>

      <motion.div style={{ opacity: reduced ? 1 : textOpacity }}>
        <p className="font-display text-primary mt-4 text-sm font-medium">{step.step}</p>
        <h3 className="font-display text-foreground mt-1 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">{step.body}</p>
      </motion.div>
    </li>
  );
}
