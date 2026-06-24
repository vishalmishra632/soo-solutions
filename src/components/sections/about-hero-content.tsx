"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { EASE_OUT } from "@/lib/motion";
import type { AboutMission } from "@/types";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// H1 keeps opacity 1 (transform-only) so it never delays LCP.
const riseOnly: Variants = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function AboutHeroContent({ mission }: { mission: AboutMission }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
      <motion.p
        variants={fadeUp}
        className="font-display text-muted-foreground text-sm font-medium tracking-widest uppercase"
      >
        {mission.eyebrow}
      </motion.p>
      <motion.h1
        variants={riseOnly}
        className="font-display text-foreground mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] font-bold tracking-tight"
      >
        {mission.headline}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="text-muted-foreground mt-8 max-w-[60ch] text-xl leading-relaxed md:text-2xl"
      >
        {mission.lead}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-10">
        <Magnetic className="block w-full sm:inline-block sm:w-auto">
          <Button asChild size="lg" className="shadow-soft hover:shadow-glow w-full sm:w-auto">
            <Link href="/contact">Book a free site assessment</Link>
          </Button>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
}
