import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Soo Solutions — commercial & residential security";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Solutions",
    title: "Commercial & residential security",
    subtitle: "Layered camera systems designed around how your property is used.",
  });
}
