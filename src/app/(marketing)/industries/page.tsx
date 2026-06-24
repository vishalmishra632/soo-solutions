import type { Metadata } from "next";
import { IndustriesIntro } from "@/components/sections/industries-intro";
import { IndustriesShowcase } from "@/components/sections/industries-showcase";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Industries",
    description:
      "Security camera systems matched to how each sector works — retail, warehousing, hospitality, healthcare, education, condos, construction, and offices.",
    path: "/industries",
  });
}

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
]);

export default function IndustriesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <IndustriesIntro />

      <IndustriesShowcase />

      <RevealOnScroll>
        <CtaBand
          title="Don't see your exact setup?"
          description="If it has doors, docks, or a front desk, we've covered something like it. Tell us about the property."
        />
      </RevealOnScroll>
    </main>
  );
}
