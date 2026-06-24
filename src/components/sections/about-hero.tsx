import { AboutHeroContent } from "./about-hero-content";
import { aboutMission } from "@/content/about";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(70% 60% at 80% 8%, var(--secondary), transparent 70%)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <AboutHeroContent mission={aboutMission} />
      </div>
    </section>
  );
}
