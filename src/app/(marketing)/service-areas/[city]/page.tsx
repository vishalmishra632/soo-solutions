import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/page-shell";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SITE.serviceAreas.map((area) => ({ city: area.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = SITE.serviceAreas.find((entry) => entry.slug === city);
  const name = area?.name ?? "Your Area";

  return buildMetadata({
    title: `Security Camera Installation in ${name}`,
    description: `Professional security camera and CCTV installation in ${name} by ${SITE.name}.`,
    path: `/service-areas/${city}`,
  });
}

export default async function ServiceAreaCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = SITE.serviceAreas.find((entry) => entry.slug === city);

  if (!area) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Service Area"
      title={`Security Cameras in ${area.name}`}
      description={`Local security camera and CCTV installation and support across ${area.name}.`}
    />
  );
}
