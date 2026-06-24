import type { Metadata } from "next";
import { SolutionsTabs } from "@/components/sections/solutions-tabs";
import { SolutionStack } from "@/components/sections/solution-stack";
import { PartnerComparison } from "@/components/sections/partner-comparison";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { solutionStacks } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Solutions",
    description:
      "Compare commercial and residential security systems side by side, then pick the right Lorex, Hikvision, or HiLook tier for your property.",
    path: "/solutions",
  });
}

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
]);

export default function SolutionsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-8 md:pt-28">
        <p className="font-display text-sm font-medium tracking-widest text-primary uppercase">
          How we solve it
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight text-foreground">
          Security solutions matched to your property
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
          Pick up where you left off — choose a side and we&rsquo;ll show you the exact system, then
          help you pick the right tier of hardware.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20 md:pb-28">
        <SolutionsTabs
          segments={solutionStacks.map((stack) => ({ value: stack.segment, label: stack.label }))}
          panels={solutionStacks.map((stack) => ({
            value: stack.segment,
            content: <SolutionStack stack={stack} />,
          }))}
        />
      </section>

      <PartnerComparison />

      <RevealOnScroll>
        <CtaBand
          title="Still weighing the options?"
          description="Tell us about the property and we'll recommend the exact stack and tier."
        />
      </RevealOnScroll>
    </main>
  );
}
