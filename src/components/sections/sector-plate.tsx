import type { LucideIcon } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { SiteImage } from "@/components/shared/site-image";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

// Render the resolved icon through a prop so it is not a component created in render scope.
function PlateGlyph({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon className={className} aria-hidden />;
}

export function SectorPlate({
  industry,
  index,
  featured = false,
}: {
  industry: Industry;
  index: number;
  featured?: boolean;
}) {
  const icon = resolveIcon(industry.icon);
  const number = `0${index + 1}`;
  const aspect = featured ? "aspect-[5/4]" : "aspect-[16/10] lg:aspect-[4/3]";

  // A real context photo for the sector when one is wired; otherwise the composed numbered plate.
  if (industry.imageId) {
    return (
      <div className={cn("border-border bg-card shadow-card relative overflow-hidden rounded-2xl border", aspect)}>
        <SiteImage id={industry.imageId} sizes="(min-width: 1024px) 50vw, 100vw" fill />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "border-border from-card to-secondary shadow-card relative flex items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br",
        aspect,
      )}
    >
      <span className="font-display text-foreground/[0.07] pointer-events-none absolute -top-2 left-3 text-[clamp(4rem,12vw,9rem)] leading-none font-bold tracking-tight select-none">
        {number}
      </span>
      <div className="relative flex flex-col items-center gap-4">
        <RevealOnScroll from="pop" delay={0.15}>
          <PlateGlyph
            icon={icon}
            className={cn("text-primary", featured ? "size-16 md:size-20" : "size-14 md:size-16")}
          />
        </RevealOnScroll>
        <span className="text-muted-foreground text-sm font-medium tracking-[0.22em] uppercase">
          {industry.name}
        </span>
      </div>
    </div>
  );
}
