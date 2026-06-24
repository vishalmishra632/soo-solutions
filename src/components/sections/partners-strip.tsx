import { PartnerLogo } from "@/components/shared/partner-logo";
import { SITE } from "@/lib/site";

export function PartnersStrip() {
  return (
    <section aria-label="Official partners" className="bg-secondary py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 sm:flex-row sm:justify-between">
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
          Brands we supply &amp; install
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {SITE.partners.map((partner) => (
            <li key={partner.name} className="group">
              <PartnerLogo
                name={partner.name}
                className="h-7 w-auto opacity-70 grayscale transition duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none md:h-8"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
