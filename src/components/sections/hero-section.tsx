import { HeroContent } from "./hero-content";
import { HeroAtmosphere } from "./hero-atmosphere";
import { LazyCameraScene } from "@/components/three/lazy-camera-scene";
import { heroMicroTrust, homeHero } from "@/content/home";
import { SITE } from "@/lib/site";

export function HeroSection() {
  const partnerEyebrow = SITE.partners.map((partner) => partner.name).join(" · ");

  return (
    <section className="relative overflow-hidden">
      <HeroAtmosphere />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[60%_40%] lg:py-28">
        <HeroContent
          eyebrow={partnerEyebrow}
          title={homeHero.title}
          subhead={homeHero.subhead}
          microTrust={heroMicroTrust}
        />
        <div className="w-full lg:justify-self-end">
          <LazyCameraScene className="bg-transparent shadow-none" />
        </div>
      </div>
    </section>
  );
}
