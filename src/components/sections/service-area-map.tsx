import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE } from "@/lib/site";

const MAPS_QUERY = encodeURIComponent("253 Bruce St, Unit 2, Sault Ste. Marie, ON");

export function ServiceAreaMap() {
  const { address } = SITE.contact;
  const mapsLink = `https://www.google.com/maps?q=${MAPS_QUERY}`;
  const fullAddress = `${address.street}, ${address.city}, ${address.region}, ${address.country}`;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading eyebrowMuted eyebrow="Where we work" title={`Serving ${address.city}`} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-muted-foreground max-w-[60ch] text-lg">
            We install and support security camera systems across the local area. Confirm coverage
            for your address — send us a message and we&rsquo;ll let you know.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {SITE.serviceAreas.map((area) => (
              <li
                key={area.slug}
                className="bg-secondary text-secondary-foreground rounded-full px-3 py-1"
              >
                {area.name}
              </li>
            ))}
          </ul>
          <address className="text-muted-foreground mt-6 flex items-start gap-2 text-sm not-italic">
            <MapPin className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
            <span>{fullAddress}</span>
          </address>
        </div>

        <div className="border-border shadow-soft hidden overflow-hidden rounded-xl border md:block">
          <iframe
            title="Map of the Soo Solutions service area"
            src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-[4/3] w-full"
          />
        </div>

        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Soo Solutions location in Google Maps"
          className="border-border from-accent via-card to-secondary shadow-soft focus-visible:ring-ring relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
        >
          <span className="text-foreground flex flex-col items-center gap-2 text-sm font-medium">
            <MapPin className="text-primary size-8" aria-hidden />
            Open in Maps
          </span>
        </a>
      </div>
    </section>
  );
}
