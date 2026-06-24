import type { Metadata } from "next";
import { ServicesConstellation } from "@/components/sections/services-constellation";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Security camera and CCTV services for homes and businesses — installation, system design, maintenance, upgrades, and remote viewing from a local team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-medium uppercase tracking-widest text-primary">
            What we do
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight text-foreground">
            Security camera services, end to end
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            From the first site survey to ongoing support — every part of a camera system, installed
            and backed by a local team.
          </p>
        </div>
        <div className="mt-14">
          <ServicesConstellation />
        </div>
      </section>
      <RevealOnScroll>
        <CtaBand
          title="Not sure which service you need?"
          description="Tell us about your property and we'll recommend the right system."
        />
      </RevealOnScroll>
    </main>
  );
}
