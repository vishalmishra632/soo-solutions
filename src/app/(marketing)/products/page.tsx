import type { Metadata } from "next";
import { CameraTypes } from "@/components/sections/camera-types";
import { CameraAnatomy } from "@/components/sections/camera-anatomy";
import { PlacementShowcase } from "@/components/sections/placement-showcase";
import { DayNightVision } from "@/components/sections/day-night-vision";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Every security camera type we supply and install — bullet, dome, turret, PTZ, fisheye, doorbell, floodlight, LPR, and NVR/DVR systems — matched to your property, from Lorex, Hikvision, and HiLook.",
  path: "/products",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
]);

export default function ProductsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="mx-auto w-full max-w-3xl px-6 pt-20 pb-4 md:pt-28">
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          What we install
        </p>
        <h1 className="font-display text-foreground mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight">
          Security cameras for every property
        </h1>
        <p className="text-muted-foreground mt-4 max-w-[60ch] text-lg">
          Supplied and professionally installed, from trusted brands. Here&rsquo;s the full range —
          and where each type fits.
        </p>
      </section>

      <CameraTypes />
      <CameraAnatomy />
      <PlacementShowcase />
      <RevealOnScroll>
        <DayNightVision />
      </RevealOnScroll>
      <PartnersStrip />

      <RevealOnScroll>
        <CtaBand
          title="Not sure which cameras you need?"
          description="Tell us about your property and we'll spec the right mix and tier."
        />
      </RevealOnScroll>
    </main>
  );
}
