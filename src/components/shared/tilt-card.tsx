"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Pointer-driven 3D tilt for cards (transform only, capped a few degrees). Renders a plain div under
// prefers-reduced-motion so the imperative spring never runs. Put the `group` class here if children
// rely on group-hover.
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(offsetX * max);
    rotateX.set(-offsetY * max);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={cn("transform-gpu", className)}
    >
      {children}
    </motion.div>
  );
}
