import { Check } from "lucide-react";
import { SiteImage } from "@/components/shared/site-image";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { cameraTypes } from "@/content/cameraTypes";

const segmentLabel = {
  residential: "Residential",
  commercial: "Commercial",
  both: "Home & commercial",
} as const;

export function CameraTypes() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          Camera types
        </p>
        <h2 className="font-display text-foreground mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
          Every camera type, and what each one is for
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          We supply and install the full range — and recommend the right shape for each spot on your
          property, not one model everywhere.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cameraTypes.map((camera, index) => (
          <RevealOnScroll key={camera.slug} delay={index * 0.05} className="h-full">
            <article className="border-border bg-card text-card-foreground shadow-card flex h-full flex-col overflow-hidden rounded-xl border">
              <div className="bg-secondary relative aspect-[4/3] w-full overflow-hidden">
                <SiteImage
                  id={camera.imageId}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  fill
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-foreground text-xl font-semibold tracking-tight">
                    {camera.name}
                  </h3>
                  <span className="bg-secondary text-secondary-foreground shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {segmentLabel[camera.segment]}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">{camera.shortDescription}</p>

                <ul className="mt-4 space-y-1.5">
                  {camera.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="text-foreground flex items-start gap-2 text-sm">
                      <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
                    Best for
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {camera.bestFor.map((use) => (
                      <li
                        key={use}
                        className="bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-xs font-medium"
                      >
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
