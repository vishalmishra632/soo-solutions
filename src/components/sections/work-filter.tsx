"use client";

import { useState } from "react";
import { WorkGrid } from "./work-grid";
import { cn } from "@/lib/utils";
import type { CaseStudy, Segment } from "@/types";

type FilterValue = "all" | Extract<Segment, "commercial" | "residential">;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
];

export function WorkFilter({ items }: { items: CaseStudy[] }) {
  const [active, setActive] = useState<FilterValue>("all");
  const filtered = active === "all" ? items : items.filter((item) => item.segment === active);

  return (
    <div>
      <div role="group" aria-label="Filter installs" className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = filter.value === active;
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter.value)}
              className={cn(
                "focus-visible:ring-ring inline-flex min-h-11 items-center rounded-full px-5 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="text-muted-foreground mt-4 text-sm">
        {filtered.length} {filtered.length === 1 ? "install" : "installs"}
      </p>

      <div className="mt-6">
        <WorkGrid items={filtered} />
      </div>
    </div>
  );
}
