import type { Metadata } from "next";
import { LegalArticle } from "@/components/sections/legal-article";
import { accessibilityStatement } from "@/content/legal/accessibility";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility Statement",
  description:
    "Our commitment to an accessible website built to WCAG 2.2 AA — what we've done, known limitations, and how to request information in an alternative format.",
  path: "/accessibility",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Accessibility Statement", path: "/accessibility" },
]);

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LegalArticle doc={accessibilityStatement} />
    </>
  );
}
