import { SiteImage } from "@/components/shared/site-image";
import { heroCameras } from "./hero-cameras";

// Static, WebGL-free render of the active camera type — used on the reduced-motion desktop path so the
// type can still be switched (instantly, no animation) using the product photo from cameraTypes.
export function HeroCameraPoster({ index }: { index: number }) {
  const camera = heroCameras[index] ?? heroCameras[0];
  return (
    <div className="bg-secondary/40 relative h-full w-full overflow-hidden rounded-xl">
      <SiteImage
        id={camera.imageId}
        alt={`${camera.name} — ${camera.shortDescription}`}
        priority
        sizes="(min-width:1024px) 40vw, 100vw"
        className="object-contain p-8"
        fill
      />
    </div>
  );
}
