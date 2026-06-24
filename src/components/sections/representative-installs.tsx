import { SiteImage } from "@/components/shared/site-image";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import type { SiteImageId } from "@/content/site-images";

// Representative install imagery (stock stand-ins, clearly labelled) until real Soo Solutions project
// photos land — see public/images/CREDITS.md.
const INSTALLS: { id: SiteImageId; label: string; segment: string }[] = [
  { id: "com-retail", label: "Retail storefront", segment: "Commercial" },
  { id: "res-eave", label: "Home perimeter", segment: "Residential" },
  { id: "com-warehouse", label: "Warehouse & dock", segment: "Commercial" },
  { id: "res-doorbell", label: "Front door & driveway", segment: "Residential" },
  { id: "com-office", label: "Office & corridors", segment: "Commercial" },
  { id: "com-parking", label: "Parking & perimeter", segment: "Commercial" },
  { id: "res-yard", label: "Back yard & gates", segment: "Residential" },
  { id: "misc-technician", label: "A clean, professional fit", segment: "On site" },
];

export function RepresentativeInstalls() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {INSTALLS.map((item, index) => (
          <RevealOnScroll key={item.id} delay={index * 0.05} className="h-full">
            <figure className="border-border bg-card shadow-card group h-full overflow-hidden rounded-xl border">
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <SiteImage
                  id={item.id}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                  fill
                />
              </div>
              <figcaption className="flex items-center justify-between gap-2 p-4">
                <span className="font-display text-foreground text-sm font-medium">{item.label}</span>
                <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {item.segment}
                </span>
              </figcaption>
            </figure>
          </RevealOnScroll>
        ))}
      </ul>
    </section>
  );
}
