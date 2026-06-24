"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import { resolveIcon } from "@/lib/icons";
import type { HeroSegment } from "@/types";
import type { ReactNode } from "react";

export function SegmentCard({ segment, cover }: { segment: HeroSegment; cover?: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = resolveIcon(segment.icon);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  function handleTilt(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(offsetX * 12);
    rotateX.set(-offsetY * 12);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX: springX, rotateY: springY, transformPerspective: 800 }
      }
      className="group transform-gpu"
    >
      <Link
        href={segment.href}
        className="border-border bg-card text-card-foreground shadow-card hover:shadow-elevated focus-visible:ring-ring block h-full overflow-hidden rounded-xl border p-8 transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {cover ? (
          <div className="bg-secondary relative -mx-8 -mt-8 mb-6 aspect-[16/10] overflow-hidden">
            {cover}
          </div>
        ) : null}
        <IconBadge icon={Icon} />
        <h3 className="font-display mt-5 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-tight">
          {segment.title}
        </h3>
        <p className="text-muted-foreground mt-2">{segment.body}</p>
        <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
          Explore {segment.title.toLowerCase()}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </Link>
    </motion.div>
  );
}
