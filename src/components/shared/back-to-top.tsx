"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function BackToTop() {
  const visible = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 600,
    () => false,
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })}
      aria-label="Back to top"
      className={cn(
        "glass border-border text-foreground shadow-card hover:shadow-elevated focus-visible:ring-ring fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full border transition duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none print:hidden",
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
