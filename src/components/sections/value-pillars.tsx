import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { PillarCard } from "./pillar-card";
import { pillarIcons } from "@/content/home";
import { SITE } from "@/lib/site";

export function ValuePillars() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <SectionHeading eyebrow="Why Soo Solutions" title="Security, done properly" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SITE.pillars.map((pillar, index) => {
          const iconName = pillarIcons[index] ?? "ShieldCheck";
          return (
            <RevealOnScroll key={pillar.title} delay={index * 0.08} className="h-full">
              <PillarCard
                title={pillar.title}
                description={pillar.description}
                iconName={iconName}
              />
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
