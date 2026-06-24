import { ServiceCard } from "./service-card";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import type { Service } from "@/types";

export function RelatedServices({ items }: { items: Service[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id="related" className="scroll-mt-32 border-t border-border py-12 md:py-16">
      <RevealOnScroll>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-foreground">
          Related services
        </h2>
      </RevealOnScroll>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service, index) => (
          <RevealOnScroll key={service.slug} delay={index * 0.06} className="h-full">
            <ServiceCard service={service} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
