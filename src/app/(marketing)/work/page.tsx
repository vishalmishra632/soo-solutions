import type { Metadata } from "next";
import { RepresentativeInstalls } from "@/components/sections/representative-installs";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Recent security camera and CCTV installs across local commercial and residential properties — storefronts, warehouses, offices, and homes.",
  path: "/work",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
]);

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="mx-auto w-full max-w-3xl px-6 pt-20 pb-10 md:pt-28">
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          Recent installs
        </p>
        <h1 className="font-display text-foreground mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight">
          Installs across the local area
        </h1>
        <p className="text-muted-foreground mt-4 max-w-[60ch] text-lg">
          A sample of the camera and CCTV systems we design and fit for businesses and homes.{" "}
          <span className="text-muted-foreground/90">
            Representative installs — a gallery of our own recent local projects is on the way.
          </span>
        </p>
      </section>

      <RepresentativeInstalls />

      <RevealOnScroll>
        <CtaBand
          title="Want a system like these?"
          description="Tell us about your property and we'll plan the right coverage."
        />
      </RevealOnScroll>
    </main>
  );
}
