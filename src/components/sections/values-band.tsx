import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { aboutValues } from "@/content/about";

export function ValuesBand() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrowMuted
        eyebrow="What we stand for"
        title="What you can hold us to"
        description="Three things we promise — and you can hold us to."
      />
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {aboutValues.map((value, index) => (
          <RevealOnScroll key={value.title} delay={index * 0.08}>
            <div>
              <p
                aria-hidden
                className="font-display text-foreground/15 text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-bold"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-foreground mt-3 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-tight">
                {value.title}
              </h3>
              <p className="text-muted-foreground mt-2">{value.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
