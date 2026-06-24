import { SiteImage } from "@/components/shared/site-image";
import { cn } from "@/lib/utils";

// The hero poster: shown on mobile, under prefers-reduced-motion, and while the 3D Canvas loads.
// Uses the locally-optimized hero photo (with blur placeholder) — the hero LCP image, so `priority`.
export function SceneFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-xl", className)}>
      <SiteImage
        id="hero-camera"
        alt="A modern security camera mounted on a building exterior against a bright sky"
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        fill
      />
    </div>
  );
}
