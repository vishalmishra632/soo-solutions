import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { CaseGallery } from "./case-gallery";
import { CtaBand } from "./cta-band";
import type { CaseStudy } from "@/types";

const sectionHeading = "font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-foreground";

export function CaseDetail({ study, related }: { study: CaseStudy; related: CaseStudy[] }) {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pt-20 pb-8 md:pt-28">
        <p className="font-display text-sm font-medium tracking-widest uppercase">
          <Link
            href="/work"
            className="text-primary hover:text-foreground focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Work
          </Link>
          <span className="text-muted-foreground"> / {study.title}</span>
        </p>
        <h1 className="font-display text-foreground mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight">
          {study.title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-[60ch] text-lg">{study.summary ?? study.outcome}</p>
        <p className="mt-5">
          <span className="bg-secondary text-secondary-foreground inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize">
            {study.segment}
          </span>
        </p>
        {study.cover ? (
          <div className="border-border shadow-card mt-8 overflow-hidden rounded-2xl border">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              width={study.cover.width}
              height={study.cover.height}
              sizes="(min-width:1024px) 1024px, 100vw"
              className="w-full object-cover"
            />
          </div>
        ) : null}
        <div className="mt-8">
          <Magnetic className="inline-block">
            <Button asChild size="lg" className="hover:shadow-glow shadow-soft">
              <Link href="/contact">Start a project like this</Link>
            </Button>
          </Magnetic>
        </div>
      </section>

      {study.challenge || study.solution ? (
        <section className="mx-auto w-full max-w-[68ch] px-6 py-12 md:py-16">
          {study.challenge ? (
            <RevealOnScroll className="block">
              <h2 className={sectionHeading}>The challenge</h2>
              <p className="text-muted-foreground mt-3 text-lg">{study.challenge}</p>
            </RevealOnScroll>
          ) : null}
          {study.solution ? (
            <RevealOnScroll className="mt-10 block">
              <h2 className={sectionHeading}>What we did</h2>
              <p className="text-muted-foreground mt-3 text-lg">{study.solution}</p>
            </RevealOnScroll>
          ) : null}
        </section>
      ) : null}

      {study.gallery && study.gallery.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
          <h2 className={sectionHeading}>On site</h2>
          <div className="mt-8">
            <CaseGallery images={study.gallery} />
          </div>
        </section>
      ) : null}

      {study.beforeAfter ? (
        <section className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
          <h2 className={sectionHeading}>Before &amp; after</h2>
          <div className="mt-8">
            <BeforeAfterSlider before={study.beforeAfter.before} after={study.beforeAfter.after} />
          </div>
        </section>
      ) : null}

      {study.quote?.verified ? (
        <section className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
          <figure className="border-primary border-l-2 pl-6">
            <blockquote className="font-display text-foreground text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-tight">
              {study.quote.text}
            </blockquote>
            <figcaption className="text-muted-foreground mt-4">
              — {study.quote.author}, {study.quote.role}
            </figcaption>
          </figure>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
          <h2 className={sectionHeading}>More work</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/work/${item.slug}`}
                  className="group bg-card text-card-foreground shadow-card hover:shadow-elevated focus-visible:ring-ring block overflow-hidden rounded-xl transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {item.cover ? (
                    <Image
                      src={item.cover.src}
                      alt={item.cover.alt}
                      width={item.cover.width}
                      height={item.cover.height}
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="aspect-video w-full object-cover"
                    />
                  ) : null}
                  <div className="p-5">
                    <span className="bg-accent text-accent-foreground inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize">
                      {item.segment}
                    </span>
                    <h3 className="font-display text-foreground mt-3 text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/work"
            className="text-primary hover:text-foreground focus-visible:ring-ring mt-8 inline-flex rounded-sm text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            ← All work
          </Link>
        </section>
      ) : null}

      <RevealOnScroll>
        <CtaBand
          title="Start your project"
          description="Tell us about the property and we'll plan the right system."
        />
      </RevealOnScroll>
    </>
  );
}
