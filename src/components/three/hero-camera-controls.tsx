"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroCamera } from "./hero-cameras";

interface HeroCameraControlsProps {
  items: HeroCamera[];
  activeIndex: number;
  onNext: () => void;
  onSelect: (index: number) => void;
}

// Keyboard-operable controls for the hero camera cycle (the canvas mesh click isn't keyboard-reachable).
// The label region is aria-live so screen readers hear the type name + descriptor on each change.
export function HeroCameraControls({ items, activeIndex, onNext, onSelect }: HeroCameraControlsProps) {
  const active = items[activeIndex];

  return (
    <div className="mt-6">
      <div aria-live="polite" aria-atomic="true">
        <p className="font-display text-foreground text-lg font-semibold tracking-tight">
          {active.name}
        </p>
        <p className="text-muted-foreground mt-1 max-w-[42ch] text-sm">{active.shortDescription}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="group" aria-label="Choose a camera type">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Show ${item.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "focus-visible:ring-ring h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                index === activeIndex
                  ? "bg-primary w-7"
                  : "bg-border hover:bg-muted-foreground w-2.5",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next camera type"
          className="border-border text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Next type
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
