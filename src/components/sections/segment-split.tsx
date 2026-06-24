import { SegmentCard } from "./segment-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SiteImage } from "@/components/shared/site-image";
import { segments } from "@/content/home";
import type { SiteImageId } from "@/content/site-images";

const coverFor: Record<string, { id: SiteImageId; alt: string }> = {
  commercial: {
    id: "com-retail",
    alt: "Security cameras covering a commercial retail interior",
  },
  residential: {
    id: "res-eave",
    alt: "A security camera mounted under the eave of a home",
  },
};

export function SegmentSplit() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <SectionHeading eyebrow="Who we protect" title="Built for your property" />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {segments.map((segment) => {
          const cover = coverFor[segment.key];
          return (
            <SegmentCard
              key={segment.key}
              segment={segment}
              cover={
                cover ? (
                  <SiteImage id={cover.id} alt={cover.alt} fill sizes="(min-width:768px) 50vw, 100vw" />
                ) : undefined
              }
            />
          );
        })}
      </div>
    </section>
  );
}
