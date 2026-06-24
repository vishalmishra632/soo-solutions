import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  robots?: Metadata["robots"];
}

export function absoluteUrl(path: string) {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

export function buildMetadata({ title, description, path, robots }: PageMetadata): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(robots ? { robots } : {}),
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_CA",
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — Security Cameras & CCTV` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
