import { cameraTypes } from "@/content/cameraTypes";
import type { SiteImageId } from "@/content/site-images";
import { HERO_SLUGS, type HeroCameraSlug } from "./camera-builders";

export interface HeroCamera {
  slug: HeroCameraSlug;
  name: string;
  shortDescription: string;
  imageId: SiteImageId;
}

// The hero cycle, driven by src/content/cameraTypes.ts so names/order/descriptions match the Products page.
export const heroCameras: HeroCamera[] = HERO_SLUGS.map((slug) => {
  const type = cameraTypes.find((entry) => entry.slug === slug);
  return type
    ? { slug, name: type.name, shortDescription: type.shortDescription, imageId: type.imageId }
    : null;
}).filter((entry): entry is HeroCamera => entry !== null);
