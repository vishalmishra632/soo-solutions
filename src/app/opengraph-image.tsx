import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { SITE } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${SITE.name} — Security Cameras & CCTV`;

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Security Cameras & CCTV",
    title: "Smart Solutions. Safer Futures.",
    subtitle: "Supply and professional installation for commercial and residential properties.",
  });
}
