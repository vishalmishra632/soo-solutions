"use client";

import { useEffect, type ReactNode } from "react";

// GSAP + Lenis are a progressive enhancement, so they are dynamically imported inside the effect —
// this keeps ~80KB (gzip) of animation libs out of the first-load bundle on every page (the home keeps
// GSAP only because its scrub timeline + counters use the useGSAP hook directly). Native scroll runs
// until they load, and both bail under prefers-reduced-motion.
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      const advanceLenis = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(advanceLenis);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(advanceLenis);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
