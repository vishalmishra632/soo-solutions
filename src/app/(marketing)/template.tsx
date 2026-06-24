"use client";

import { useEffect, useRef } from "react";
import { FeedSwitchOverlay } from "@/components/layout/feed-switch-overlay";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// A template (unlike a layout) remounts on every navigation, so it's where the page-to-page "feed
// switch" lives. We skip the cut on the very first load — that's the SiteLoader's job — and play it
// only on subsequent client navigations. The module flag survives navigations but resets on a full
// reload, which is exactly the "first load vs. navigation" distinction we want.
let hasNavigated = false;

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const isNavigation = useRef(hasNavigated).current;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {children}
      {isNavigation && !prefersReducedMotion ? <FeedSwitchOverlay /> : null}
    </>
  );
}
