import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact Soo Solutions — request a free quote";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Request a free quote",
    subtitle: "Tell us about your property and we'll recommend the right system.",
  });
}
