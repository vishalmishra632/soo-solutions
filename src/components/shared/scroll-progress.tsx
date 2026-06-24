"use client";

import { motion } from "motion/react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

// Thin reading-progress bar pinned above the header. scaleX is a transform, so it is GPU-cheap, and it
// simply mirrors scroll position (no easing to fight prefers-reduced-motion).
export function ScrollProgress() {
  const scrollYProgress = useScrollProgress();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="from-primary to-primary/50 fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r"
    />
  );
}
