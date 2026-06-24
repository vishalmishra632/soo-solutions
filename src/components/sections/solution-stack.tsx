"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { SiteImage } from "@/components/shared/site-image";
import { resolveIcon } from "@/lib/icons";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SiteImageId } from "@/content/site-images";
import type { SolutionStack as SolutionStackContent } from "@/types";

const showOfferingFlags = process.env.NODE_ENV !== "production";

const stackImage: Record<string, { id: SiteImageId; alt: string }> = {
  commercial: { id: "com-retail", alt: "Cameras covering a commercial property" },
  residential: { id: "res-eave", alt: "A camera mounted on a home" },
};

// A slight overshoot so each number node "snaps" home as its layer locks onto the stack.
const SNAP: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const stackContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const layerItem: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};
const nodeSnap: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: SNAP, delay: 0.1 } },
};
const spineGrow: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.85, ease: EASE_OUT } },
};

export function SolutionStack({ stack }: { stack: SolutionStackContent }) {
  const cover = stackImage[stack.segment];
  return (
    <div>
      {cover ? (
        <div className="border-border bg-secondary shadow-card relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border">
          <SiteImage id={cover.id} alt={cover.alt} sizes="(min-width:1024px) 640px, 100vw" fill />
        </div>
      ) : null}
      <h2 className="font-display text-foreground text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight">
        {stack.headline}
      </h2>
      <p className="text-muted-foreground mt-3 max-w-[68ch] text-lg">{stack.lead}</p>

      <motion.ol
        className="relative mt-10 space-y-7"
        variants={stackContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* the continuous spine the nodes sit on — grows down as the system stacks up */}
        <motion.span
          aria-hidden
          variants={spineGrow}
          style={{ transformOrigin: "top" }}
          className="bg-border pointer-events-none absolute top-5 bottom-5 left-6 w-px"
        />
        {stack.layers.map((layer, index) => {
          const Icon = resolveIcon(layer.icon);
          const isFoundation = index === 0;
          return (
            <motion.li key={layer.title} variants={layerItem} className="relative flex gap-5">
              <div className="relative z-10 flex w-12 shrink-0 justify-center">
                <motion.span
                  variants={nodeSnap}
                  className={cn(
                    "bg-primary font-display text-primary-foreground shadow-soft flex items-center justify-center rounded-full font-semibold",
                    isFoundation ? "size-12 text-base" : "mt-0.5 size-9 text-sm",
                  )}
                >
                  {`0${index + 1}`}
                </motion.span>
              </div>
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Icon className="text-primary size-5 shrink-0" aria-hidden />
                  <h3
                    className={cn(
                      "font-display text-foreground font-semibold tracking-tight",
                      isFoundation ? "text-xl" : "text-lg",
                    )}
                  >
                    {layer.title}
                  </h3>
                  {showOfferingFlags && layer.flag ? (
                    <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                      {layer.flag}
                    </span>
                  ) : null}
                </div>
                <p className="text-muted-foreground mt-1 max-w-[60ch]">{layer.description}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      <div className="mt-10">
        <Magnetic className="inline-block">
          <Button asChild size="lg" className="shadow-soft hover:shadow-glow">
            <Link href={stack.cta.href}>{stack.cta.label}</Link>
          </Button>
        </Magnetic>
      </div>
    </div>
  );
}
