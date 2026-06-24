import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  label?: string;
  className?: string;
}

export function IconBadge({ icon: Icon, label, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "bg-primary/10 text-primary shadow-soft inline-flex size-12 items-center justify-center rounded-lg",
        className,
      )}
    >
      <Icon className="size-6" aria-hidden />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
