"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { SplitReveal } from "@/components/shared/split-reveal";
import { resolveIcon } from "@/lib/icons";
import { callHref } from "@/lib/contact";
import { EASE_OUT } from "@/lib/motion";
import type { MicroTrust } from "@/types";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

interface HeroContentProps {
  eyebrow: string;
  title: string;
  subhead: string;
  microTrust: MicroTrust[];
}

export function HeroContent({ eyebrow, title, subhead, microTrust }: HeroContentProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.p
        variants={fadeUp}
        className="font-display text-primary text-sm font-medium tracking-widest uppercase"
      >
        {eyebrow}
      </motion.p>
      {/* Per-word kinetic reveal with an animated brand shine. fade=false keeps the text painted (no LCP hit). */}
      <SplitReveal
        as="h1"
        text={title}
        fade={false}
        immediate
        wordClassName="text-shine"
        className="font-display text-foreground mt-4 text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] font-bold tracking-tight"
      />
      <motion.p
        variants={fadeUp}
        className="text-muted-foreground mt-6 max-w-[48ch] text-lg md:text-xl"
      >
        {subhead}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Magnetic className="block w-full sm:inline-block sm:w-auto">
          <Button
            asChild
            size="lg"
            className="shadow-soft hover:shadow-glow w-full transition-transform hover:scale-[1.02] motion-reduce:hover:scale-100 sm:w-auto"
          >
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </Magnetic>
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
          <a href={callHref()}>
            <Phone className="mr-2 size-4" aria-hidden />
            Call Now
          </a>
        </Button>
      </motion.div>
      <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {microTrust.map((item) => {
          const Icon = resolveIcon(item.icon);
          return (
            <li key={item.label} className="text-muted-foreground flex items-center gap-2 text-sm">
              <Icon className="text-primary size-4 shrink-0" aria-hidden />
              {item.label}
            </li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}
