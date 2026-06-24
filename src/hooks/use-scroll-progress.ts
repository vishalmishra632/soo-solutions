"use client";

import { useScroll } from "motion/react";

// Page scroll progress as a 0→1 MotionValue (drive progress bars, parallax, etc.).
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
