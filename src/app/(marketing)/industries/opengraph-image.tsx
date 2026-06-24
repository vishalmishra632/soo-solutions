import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Soo Solutions — security tuned to your industry";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Industries",
    title: "Security tuned to your sector",
    subtitle: "Retail, warehousing, hospitality, healthcare, education, and more.",
  });
}
