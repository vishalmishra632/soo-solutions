import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SiteImage } from "@/components/shared/site-image";
import { TiltCard } from "@/components/shared/tilt-card";
import { Button } from "@/components/ui/button";
import type { SiteImageId } from "@/content/site-images";

// Representative install imagery (stock stand-ins, see public/images/CREDITS.md) until real project photos land.
const FEATURED: { id: SiteImageId; label: string; segment: string }[] = [
  { id: "com-retail", label: "Retail storefront", segment: "Commercial" },
  { id: "res-eave", label: "Family home", segment: "Residential" },
  { id: "com-warehouse", label: "Warehouse & dock", segment: "Commercial" },
];

export function FeaturedWork() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Recent work"
          title="Systems we install"
          description="Representative installs across commercial and residential properties."
        />
        <Button asChild variant="ghost" className="max-md:hidden">
          <Link href="/work">
            View all work
            <ArrowRight className="ml-1 size-4" aria-hidden />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {FEATURED.map((item) => (
          <TiltCard key={item.id} className="group h-full">
            <figure className="border-border bg-card text-card-foreground shadow-card group-hover:shadow-elevated h-full overflow-hidden rounded-xl border transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <SiteImage
                  id={item.id}
                  alt={`${item.label} — ${item.segment.toLowerCase()} security camera install`}
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none"
                  fill
                />
              </div>
              <figcaption className="flex items-center justify-between gap-2 p-5">
                <span className="font-display text-foreground font-medium">{item.label}</span>
                <span className="bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-xs font-medium">
                  {item.segment}
                </span>
              </figcaption>
            </figure>
          </TiltCard>
        ))}
      </div>

      <Button asChild variant="outline" className="mt-8 w-full md:hidden">
        <Link href="/work">View all work</Link>
      </Button>
    </section>
  );
}
