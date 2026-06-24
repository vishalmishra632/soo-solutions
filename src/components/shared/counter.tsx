"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      if (prefersReducedMotion) {
        node.textContent = `${value}${suffix}`;
        return;
      }

      // Counts up once when it enters view — never re-animates on scroll-back (soo-motion-3d).
      const tally = { current: 0 };
      gsap.to(tally, {
        current: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 85%", once: true },
        onUpdate: () => {
          node.textContent = `${Math.round(tally.current)}${suffix}`;
        },
      });
    },
    { dependencies: [value, suffix, prefersReducedMotion] },
  );

  return (
    <span ref={ref} className={className}>
      {prefersReducedMotion ? `${value}${suffix}` : `0${suffix}`}
    </span>
  );
}
