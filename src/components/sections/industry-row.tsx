import { SectorPlate } from "./sector-plate";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

export function IndustryRow({ industry, index }: { industry: Industry; index: number }) {
  const featured = index === 0;
  const plateOnRight = index % 2 === 1;

  return (
    <li className={cn("overflow-x-clip py-12 md:py-16", featured ? "lg:py-28" : "lg:py-24")}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-16">
        <RevealOnScroll
          from={plateOnRight ? "right" : "left"}
          className={cn("min-w-0", plateOnRight && "lg:order-last")}
        >
          <SectorPlate industry={industry} index={index} featured={featured} />
        </RevealOnScroll>

        <RevealOnScroll from="up" delay={0.08} className="min-w-0">
          <div>
            <h2
              className={cn(
                "font-display font-semibold tracking-tight text-foreground",
                featured ? "text-[clamp(1.75rem,3.5vw,2.75rem)]" : "text-[clamp(1.5rem,3vw,2.25rem)]",
              )}
            >
              {industry.name}
            </h2>

            <div className="mt-5">
              <p className="font-display text-xs font-medium tracking-widest text-muted-foreground uppercase">
                The challenge
              </p>
              <p className="mt-1 max-w-[58ch] text-lg text-muted-foreground">{industry.challenge}</p>
            </div>

            <div className="mt-4">
              <p className="font-display text-xs font-medium tracking-widest text-primary uppercase">
                Our approach
              </p>
              <p className="mt-1 max-w-[58ch] text-lg text-muted-foreground">{industry.solution}</p>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="border-l-2 border-primary pl-4 font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {industry.outcome}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </li>
  );
}
