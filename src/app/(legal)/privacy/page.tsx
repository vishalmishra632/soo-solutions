import type { Metadata } from "next";
import { LegalArticle } from "@/components/sections/legal-article";
import { privacyPolicy } from "@/content/legal/privacy";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Soo Solutions collects, uses, protects, and shares the personal information you provide through this website, and your privacy rights under Canada's PIPEDA.",
  path: "/privacy",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LegalArticle doc={privacyPolicy} />
    </>
  );
}
