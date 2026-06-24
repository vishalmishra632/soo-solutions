import { SiteImage } from "@/components/shared/site-image";
import { blueprintIntro } from "@/content/blueprint";

// Shown on mobile and under prefers-reduced-motion in place of the WebGL morph: the same story, told
// as a calm split panel — the plan on the left, the installed camera on the right.
export function BlueprintStatic() {
  return (
    <section
      aria-labelledby="blueprint-heading"
      className="relative overflow-hidden bg-[#0a1424] py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(120% 80% at 30% 0%, #0d1d33 0%, #0a1424 60%, #060b16 100%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="font-display text-sm font-medium tracking-widest text-cyan-300 uppercase">
            {blueprintIntro.eyebrow}
          </p>
          <h2
            id="blueprint-heading"
            className="font-display mt-3 max-w-md text-[clamp(1.9rem,4vw,3rem)] font-bold tracking-tight text-white"
          >
            {blueprintIntro.heading}
          </h2>
          <p className="mt-4 max-w-md text-base text-blue-100/70">{blueprintIntro.lead}</p>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <span className="rounded-full border border-cyan-300/40 px-3 py-1 font-medium text-cyan-200">
              {blueprintIntro.planLabel}
            </span>
            <span aria-hidden className="text-blue-200/40">
              →
            </span>
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 font-medium">
              {blueprintIntro.doneLabel}
            </span>
          </div>
        </div>

        <div className="border-primary/20 shadow-elevated relative aspect-[4/3] overflow-hidden rounded-2xl border">
          <SiteImage
            id="hero-camera"
            alt="A camera installed on a building exterior"
            sizes="(min-width:1024px) 40vw, 100vw"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </section>
  );
}
