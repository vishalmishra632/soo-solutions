import { CameraAperture } from "./camera-aperture";

// Shown by route-level loading.tsx while a segment streams in. On the static site this rarely appears
// (pages are prefetched), so it never adds a fake delay — it just keeps navigation on-brand when it does.
export function RouteLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
    >
      <CameraAperture size={84} />
      <span className="font-display text-muted-foreground text-xs font-medium tracking-[0.35em] uppercase">
        Focusing
      </span>
      <span className="sr-only">Loading page</span>
    </div>
  );
}
