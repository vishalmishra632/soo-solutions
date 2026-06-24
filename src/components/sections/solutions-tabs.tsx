"use client";

import { Suspense, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EASE_OUT } from "@/lib/motion";
import type { SolutionSegment } from "@/types";

interface SegmentMeta {
  value: SolutionSegment;
  label: string;
}

interface SegmentPanel {
  value: SolutionSegment;
  content: ReactNode;
}

interface SolutionsTabsProps {
  segments: SegmentMeta[];
  panels: SegmentPanel[];
}

function isSegment(value: string | null): value is SolutionSegment {
  return value === "commercial" || value === "residential";
}

export function SolutionsTabs(props: SolutionsTabsProps) {
  // useSearchParams must live under a Suspense boundary so the route stays statically prerendered;
  // the fallback renders the default (Commercial) so there is no layout shift before hydration.
  return (
    <Suspense fallback={<SolutionsTabsView {...props} initialSegment="commercial" />}>
      <SolutionsTabsFromParam {...props} />
    </Suspense>
  );
}

function SolutionsTabsFromParam(props: SolutionsTabsProps) {
  const params = useSearchParams();
  const requested = params.get("segment");
  return <SolutionsTabsView {...props} initialSegment={isSegment(requested) ? requested : "commercial"} />;
}

function SolutionsTabsView({
  segments,
  panels,
  initialSegment,
}: SolutionsTabsProps & { initialSegment: SolutionSegment }) {
  const [active, setActive] = useState<SolutionSegment>(initialSegment);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Tabs
      value={active}
      onValueChange={(next) => {
        if (isSegment(next)) setActive(next);
      }}
      activationMode="manual"
      className="w-full gap-0"
    >
      <div className="flex justify-center">
        <TabsList className="min-h-12 w-full rounded-full bg-secondary p-1 sm:w-auto">
          {segments.map((segment) => (
            <TabsTrigger
              key={segment.value}
              value={segment.value}
              className="min-h-11 rounded-full px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft sm:px-10 sm:text-base"
            >
              {segment.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <PanelRegion reduced={Boolean(prefersReducedMotion)}>
        {panels.map((panel) => (
          <TabsContent key={panel.value} value={panel.value} className="mt-12 focus-visible:outline-none">
            {prefersReducedMotion ? (
              panel.content
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
              >
                {panel.content}
              </motion.div>
            )}
          </TabsContent>
        ))}
      </PanelRegion>
    </Tabs>
  );
}

// The panel container tweens its height when the active stack changes — a one-shot, user-initiated
// change (outside the CLS window). Under reduced motion it is a plain box: instant swap, no tween.
function PanelRegion({ reduced, children }: { reduced: boolean; children: ReactNode }) {
  if (reduced) {
    return <div>{children}</div>;
  }
  return (
    <motion.div layout transition={{ duration: 0.32, ease: EASE_OUT }}>
      {children}
    </motion.div>
  );
}
