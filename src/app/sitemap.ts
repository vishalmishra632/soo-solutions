import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/industries",
    "/solutions",
    "/products",
    "/supplies",
    "/service-areas",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  const servicePaths = services.map((service) => `/services/${service.slug}`);
  const cityPaths = SITE.serviceAreas.map((area) => `/service-areas/${area.slug}`);

  return [...staticPaths, ...servicePaths, ...cityPaths].map((path) => ({
    url: absoluteUrl(path === "" ? "/" : path),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
