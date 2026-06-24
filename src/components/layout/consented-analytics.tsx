"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/hooks/use-consent";

/** Loads Vercel Web Analytics + Speed Insights only once the visitor has accepted non-essential cookies. */
export function ConsentedAnalytics() {
  const { choice } = useConsent();
  if (choice !== "accepted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
