import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

// Static backdrop-blur only — never transition it (see .skills/soo-motion-3d).
export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "border-border/60 bg-card/70 shadow-card rounded-xl border p-6 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
