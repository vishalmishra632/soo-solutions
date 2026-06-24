import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/sections/case-detail";
import { publishedCaseStudies, relatedCaseStudies } from "@/lib/work";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return publishedCaseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = publishedCaseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    return buildMetadata({ title: "Work", description: "Recent installs.", path: `/work/${slug}` });
  }

  // Description from the neutral summary — never the (unverified) outcome claim.
  return buildMetadata({
    title: study.title,
    description: study.summary ?? study.title,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = publishedCaseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    notFound();
  }

  const related = relatedCaseStudies(study.slug);
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.title, path: `/work/${study.slug}` },
  ]);

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <CaseDetail study={study} related={related} />
    </main>
  );
}
