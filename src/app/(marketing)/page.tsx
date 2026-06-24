import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { CoverageFlythrough } from "@/components/sections/coverage-flythrough";
import { BlueprintBuild } from "@/components/sections/blueprint-build";
import { SegmentSplit } from "@/components/sections/segment-split";
import { ValuePillars } from "@/components/sections/value-pillars";
import { ProcessTimeline } from "@/components/sections/process-timeline";
// Hidden for now until real content lands (placeholder stats / work gallery / verified reviews):
// import { StatsBand } from "@/components/sections/stats-band";
// import { FeaturedWork } from "@/components/sections/featured-work";
// import { Testimonials } from "@/components/sections/testimonials";
import { TrustBadges } from "@/components/sections/trust-badges";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { homeCta } from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Security Cameras & CCTV Installation",
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <RevealOnScroll>
        <PartnersStrip />
      </RevealOnScroll>
      <CoverageFlythrough />
      <RevealOnScroll>
        <SegmentSplit />
      </RevealOnScroll>
      <ValuePillars />
      <ProcessTimeline />
      <BlueprintBuild />
      {/* Hidden for now until real content lands — uncomment to restore:
      <RevealOnScroll>
        <StatsBand />
      </RevealOnScroll>
      <RevealOnScroll>
        <FeaturedWork />
      </RevealOnScroll>
      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>
      */}
      <TrustBadges />
      <RevealOnScroll>
        <CtaBand title={homeCta.title} description={homeCta.description} />
      </RevealOnScroll>
    </main>
  );
}
