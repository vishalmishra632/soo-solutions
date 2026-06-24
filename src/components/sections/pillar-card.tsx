"use client";

import { motion, type Variants } from "motion/react";
import { resolveIcon } from "@/lib/icons";
import { EASE_OUT } from "@/lib/motion";

// Each pillar's icon gets a signature motion on hover: the badge stamps, the wrench turns, the shield
// scan-pulses, the headset's waves ripple. Keyframes return to rest, so it degrades cleanly under
// prefers-reduced-motion (the global MotionConfig suppresses the movement).
const ICON_MOTION: Record<string, Variants> = {
  BadgeCheck: {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: [0, -12, 10, -6, 0], scale: 1.08, transition: { duration: 0.55, ease: EASE_OUT } },
  },
  Wrench: {
    rest: { rotate: 0 },
    hover: { rotate: -26, transition: { duration: 0.45, ease: EASE_OUT } },
  },
  ShieldCheck: {
    rest: { scale: 1 },
    hover: { scale: [1, 1.14, 1], transition: { duration: 0.5, ease: EASE_OUT } },
  },
  Headphones: {
    rest: { y: 0 },
    hover: { y: [0, -3, 0], transition: { duration: 0.5, ease: EASE_OUT } },
  },
};

const cardLift: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.25, ease: EASE_OUT } },
};

const wave: Variants = {
  rest: { scale: 0.6, opacity: 0 },
  hover: (index: number) => ({
    scale: [0.6, 1.7],
    opacity: [0.5, 0],
    transition: { duration: 0.9, ease: EASE_OUT, delay: index * 0.18, repeat: Infinity, repeatDelay: 0.2 },
  }),
};

interface PillarCardProps {
  title: string;
  description: string;
  iconName: string;
}

export function PillarCard({ title, description, iconName }: PillarCardProps) {
  const Icon = resolveIcon(iconName);
  const iconMotion = ICON_MOTION[iconName] ?? ICON_MOTION.ShieldCheck;
  const showWaves = iconName === "Headphones";

  return (
    <motion.article
      variants={cardLift}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="border-border bg-card text-card-foreground shadow-card hover:shadow-elevated h-full rounded-lg border p-6 transition-shadow"
    >
      <span className="bg-primary/10 text-primary shadow-soft relative inline-flex size-12 items-center justify-center rounded-lg">
        {showWaves
          ? [0, 1].map((index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wave}
                className="border-primary/50 absolute inset-0 rounded-lg border"
              />
            ))
          : null}
        <motion.span variants={iconMotion} className="relative inline-flex">
          <Icon className="size-6" aria-hidden />
        </motion.span>
      </span>

      <h3 className="font-display text-foreground mt-5 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </motion.article>
  );
}
