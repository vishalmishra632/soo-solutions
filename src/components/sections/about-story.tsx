import { SiteImage } from "@/components/shared/site-image";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { aboutStory } from "@/content/about";

// "Our story" — the founders' 2019 arrival in the Soo and why the company carries its name, paired with a
// camera image. Content-driven from aboutStory; two-column on desktop, stacks on mobile.
export function AboutStory() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <RevealOnScroll from="left">
          <div>
            <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
              {aboutStory.eyebrow}
            </p>
            <h2 className="font-display text-foreground mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
              {aboutStory.heading}
            </h2>
            <div className="mt-6 space-y-4">
              {aboutStory.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground max-w-[58ch] text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="text-foreground/75 mt-7 inline-flex items-center gap-2.5 text-sm font-medium">
              <span className="bg-primary size-1.5 rounded-full" aria-hidden />
              {aboutStory.detail}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll from="right" delay={0.1}>
          <div className="border-border bg-secondary shadow-elevated relative aspect-[4/5] w-full overflow-hidden rounded-2xl border">
            <SiteImage
              id={aboutStory.imageId}
              alt={aboutStory.imageAlt}
              sizes="(min-width:1024px) 540px, 100vw"
              className="object-cover"
              fill
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
