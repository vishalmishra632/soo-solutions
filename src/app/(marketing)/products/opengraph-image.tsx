import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Soo Solutions — Security cameras for every property";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Products",
    title: "Security cameras for every property",
    subtitle: "Bullet, dome, turret, PTZ, doorbell, and more — matched to the job.",
  });
}
