import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About Soo Solutions — local CCTV specialists";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "About",
    title: "Local CCTV specialists",
    subtitle: "Certified technicians, warranty-backed installs, and reliable local support.",
  });
}
