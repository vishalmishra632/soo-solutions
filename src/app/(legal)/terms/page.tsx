import type { Metadata } from "next";
import { LegalArticle } from "@/components/sections/legal-article";
import { termsAndConditions } from "@/content/legal/terms";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing your use of the Soo Solutions website. Quotes shown here are not binding; supply and installation work is covered by separate written agreements.",
  path: "/terms",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Terms & Conditions", path: "/terms" },
]);

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LegalArticle doc={termsAndConditions} />
    </>
  );
}
