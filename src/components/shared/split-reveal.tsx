"use client";

import { Fragment, createElement, type ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  // fade=false animates transform only (no opacity) so LCP-critical headings paint instantly.
  fade?: boolean;
  // immediate plays on mount (above-the-fold hero); otherwise it plays once on scroll into view.
  immediate?: boolean;
  delay?: number;
}

// Kinetic per-word heading reveal. The heading carries an aria-label and each word is aria-hidden, so
// screen readers announce the whole line once. Renders plain text under prefers-reduced-motion.
export function SplitReveal({
  text,
  as = "span",
  className,
  wordClassName,
  fade = true,
  immediate = false,
  delay = 0,
}: SplitRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return createElement(as, { className }, <span className={wordClassName}>{text}</span>);
  }

  const hidden = fade ? { opacity: 0, y: "0.6em" } : { y: "0.5em" };
  const shown = fade ? { opacity: 1, y: 0 } : { y: 0 };
  const trigger = immediate
    ? { animate: shown }
    : { whileInView: shown, viewport: { once: true, margin: "-60px" } as const };

  const words = text.split(" ");

  return createElement(
    as,
    { className, "aria-label": text },
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          <motion.span
            aria-hidden
            initial={hidden}
            {...trigger}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: delay + index * 0.045 }}
            className={cn("inline-block", wordClassName)}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>,
  );
}
