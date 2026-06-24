import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Soo Solutions — Security camera & CCTV services";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Services",
    title: "Security systems, done properly",
    subtitle: "Site survey, certified installation, and warranty-backed support.",
  });
}
