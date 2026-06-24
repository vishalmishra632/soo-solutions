"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

type RevealFrom = "up" | "left" | "right" | "pop";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: RevealFrom;
}

const hiddenByDirection: Record<RevealFrom, TargetAndTransition> = {
  up: { opacity: 0, y: 24 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  pop: { opacity: 0, scale: 0.8 },
};

const shownByDirection: Record<RevealFrom, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  pop: { opacity: 1, scale: 1 },
};

export function RevealOnScroll({ children, delay = 0, className, from = "up" }: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  // Per-leaf guard is the reduced-motion guarantee: render static children with no opacity/x/scale
  // keyframes (MotionConfig alone does not suppress opacity).
  if (prefersReducedMotion) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      initial={hiddenByDirection[from]}
      whileInView={shownByDirection[from]}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
