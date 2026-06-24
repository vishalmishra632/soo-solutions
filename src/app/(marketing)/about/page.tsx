import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { NameOrigin } from "@/components/sections/name-origin";
// Hidden for now until real content lands (placeholder team / stand-in photo / unconfirmed credentials):
// import { TeamGrid } from "@/components/sections/team-grid";
// import { CertificationsRow } from "@/components/sections/certifications-row";
import { ServiceAreaMap } from "@/components/sections/service-area-map";
import { ValuesBand } from "@/components/sections/values-band";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { SiteImage } from "@/components/shared/site-image";
import { aboutCta } from "@/content/about";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Soo Solutions Inc is a Canadian-owned security camera and CCTV company serving Sault Ste. Marie and Northern Ontario. From newcomers in 2019 to your trusted local installer — surveillance systems, smart monitoring, and warranty-backed installs for homes and businesses.",
  path: "/about",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AboutHero />
      <AboutStory />
      <RevealOnScroll>
        <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
          <figure className="border-border bg-secondary shadow-card relative aspect-[16/9] w-full overflow-hidden rounded-2xl border">
            <SiteImage
              id="about-sault"
              alt="The Sault Ste. Marie waterfront on the St. Marys River in Northern Ontario"
              sizes="(min-width:1024px) 1152px, 100vw"
              className="object-cover"
              fill
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-sm font-medium text-white">
              Proudly serving Sault Ste. Marie and Northern Ontario — the community we call home.
            </figcaption>
          </figure>
        </section>
      </RevealOnScroll>
      <NameOrigin />
      {/* Hidden for now until real content lands — uncomment to restore:
      <TeamGrid />
      <RevealOnScroll>
        <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
          <div className="border-border bg-secondary shadow-card relative aspect-[21/9] w-full overflow-hidden rounded-2xl border">
            <SiteImage
              id="misc-technician"
              alt="A technician installing a security camera on site"
              sizes="(min-width:1024px) 1152px, 100vw"
              fill
            />
          </div>
          <p className="text-muted-foreground mt-3 text-center text-sm">
            On-site installation — representative photo (TODO: real crew photo).
          </p>
        </section>
      </RevealOnScroll>
      <CertificationsRow />
      */}
      <RevealOnScroll>
        <ServiceAreaMap />
      </RevealOnScroll>
      <ValuesBand />
      <RevealOnScroll>
        <CtaBand title={aboutCta.title} description={aboutCta.description} />
      </RevealOnScroll>
    </main>
  );
}
