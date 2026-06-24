import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, LifeBuoy, MapPin, ShieldCheck } from "lucide-react";
import { ServiceRadar } from "@/components/sections/service-radar";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas",
  description:
    "Based in Sault Ste. Marie, installing and supporting security camera systems across the city and the surrounding area. Check whether we cover your address.",
  path: "/service-areas",
});

const POINTS = [
  {
    icon: MapPin,
    label: "Based here",
    value: `${SITE.contact.address.street.split(",")[0]} · ${SITE.contact.address.city}`,
  },
  { icon: Clock, label: "Since 2021", value: "Local owners, on the tools ourselves" },
  { icon: ShieldCheck, label: "Coverage", value: "The city and the surrounding area" },
  { icon: LifeBuoy, label: "Support", value: "A short drive away, after install" },
];

export default function ServiceAreasPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
              Where we work
            </p>
            <h1 className="font-display text-foreground mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight">
              Rooted in the Soo.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-[55ch] text-lg">
              We&rsquo;re based in Sault Ste. Marie and install across the city and the surrounding
              area — the same local team, a short drive away whenever you need us back.
            </p>

            <dl className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {POINTS.map((point) => (
                <div key={point.label} className="flex gap-3">
                  <span className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <point.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <dt className="font-display text-foreground text-sm font-semibold">{point.label}</dt>
                    <dd className="text-muted-foreground mt-0.5 text-sm">{point.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SITE.serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="border-border bg-card text-foreground hover:border-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  {area.name}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              ))}
              <Link
                href="/contact"
                className="border-border text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center rounded-full border border-dashed px-4 py-2 text-sm font-medium transition-colors"
              >
                Just outside the city? Check your address
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ServiceRadar cityName={SITE.serviceAreas[0]?.name ?? "Sault Ste. Marie"} />
          </div>
        </div>
      </section>

      <RevealOnScroll>
        <CtaBand
          title="Not sure if we reach you?"
          description="Tell us your address and we'll confirm coverage and book a free site visit."
        />
      </RevealOnScroll>
    </main>
  );
}
