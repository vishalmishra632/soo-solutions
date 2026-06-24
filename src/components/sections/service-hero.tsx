import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { SITE } from "@/lib/site";
import type { Service } from "@/types";

const segmentLabel: Record<Service["segment"], string> = {
  commercial: "Commercial",
  residential: "Residential",
  both: "Commercial & Residential",
};

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(65% 60% at 80% 10%, var(--secondary), transparent 70%)" }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="font-display text-sm font-medium uppercase tracking-widest">
          <Link
            href="/services"
            className="rounded-sm text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Services
          </Link>
          <span className="text-muted-foreground"> / {service.title}</span>
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight text-foreground">
          {service.title}
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg text-muted-foreground">{service.summary}</p>
        <p className="mt-5">
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {segmentLabel[service.segment]}
          </span>
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Magnetic className="block w-full sm:inline-block sm:w-auto">
            <Button asChild size="lg" className="w-full shadow-soft hover:shadow-glow sm:w-auto">
              <Link href="/contact">Request a Quote for this service</Link>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href={SITE.contact.phoneHref}>
              <Phone className="mr-2 size-4" aria-hidden />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
