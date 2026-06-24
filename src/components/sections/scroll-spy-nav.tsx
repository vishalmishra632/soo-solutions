"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpySection {
  id: string;
  label: string;
}

export function ScrollSpyNav({
  sections,
  label = "On this page",
}: {
  sections: SpySection[];
  label?: string;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
        if (onScreen.length > 0) {
          setActiveId(onScreen[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Desktop: sticky left rail */}
      <nav aria-label={label} className="sticky top-24 hidden h-fit lg:block">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <ul className="border-l border-border">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "-ml-px flex border-l-2 py-2 pl-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: sticky horizontal pill bar */}
      <nav
        aria-label={label}
        className="sticky top-14 z-30 -mx-6 mb-8 border-b border-border bg-background/85 backdrop-blur-md lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-6 py-3">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
