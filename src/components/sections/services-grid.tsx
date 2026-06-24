import { ServiceCard } from "./service-card";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import type { Service } from "@/types";

export function ServicesGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => (
        <RevealOnScroll key={service.slug} delay={index * 0.06} className="h-full">
          <ServiceCard service={service} titleAs="h2" />
        </RevealOnScroll>
      ))}
    </div>
  );
}
