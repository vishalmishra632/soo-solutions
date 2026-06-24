import { SiteImage } from "@/components/shared/site-image";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { cameraTypes, type CameraType } from "@/content/cameraTypes";

// A curated set with visually distinct install contexts (no repeated install photo).
const SHOWCASE_ORDER = ["bullet", "dome", "video-doorbell", "ptz", "turret", "floodlight"];

const showcase: CameraType[] = SHOWCASE_ORDER.map((slug) =>
  cameraTypes.find((camera) => camera.slug === slug),
).filter((camera): camera is CameraType => Boolean(camera));

export function PlacementShowcase() {
  return (
    <section className="bg-secondary/40 border-border border-y">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
            How it looks installed
          </p>
          <h2 className="font-display text-foreground mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
            The right camera, in the right place
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Where each type mounts — and why it belongs there.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((camera, index) => (
            <RevealOnScroll key={camera.slug} delay={index * 0.05} className="h-full">
              <figure className="border-border bg-card shadow-card flex h-full flex-col overflow-hidden rounded-xl border">
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <SiteImage
                    id={camera.installImageId}
                    alt={`${camera.name} mounted in context — ${camera.placement}`}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    fill
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-foreground font-semibold tracking-tight">
                    {camera.name}
                  </p>
                  <p className="text-muted-foreground mt-1.5 text-sm">{camera.placement}</p>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
