import type { Metadata } from "next";
import { FaqExplorer } from "@/components/sections/faq-explorer";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { faqCategories } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "FAQ",
    description:
      "Straight answers about security camera installation, pricing, warranty, the brands we install, and support.",
    path: "/faq",
  });
}

// Single source: the JSON-LD is built from the same content the page renders.
const faqItems = faqCategories.flatMap((category) => category.items);

const structuredData = [
  { key: "faqpage", data: faqPageSchema(faqItems) },
  {
    key: "breadcrumb",
    data: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
  },
];

export default function FaqPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {structuredData.map(({ key, data }) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <section className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          Good to know
        </p>
        <h1 className="font-display text-foreground mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight">
          Frequently asked questions
        </h1>
        <p className="text-muted-foreground mt-4 max-w-[60ch] text-lg">
          Straight answers on installation, pricing, warranty, brands, and support. Can&rsquo;t find
          yours? We&rsquo;re a message away.
        </p>
      </section>

      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <FaqExplorer categories={faqCategories} />
      </div>

      <RevealOnScroll>
        <CtaBand
          title="Still have questions?"
          description="Tell us about your property and we'll get you a straight answer."
          primary={{ label: "Talk to us", href: "/contact" }}
        />
      </RevealOnScroll>
    </main>
  );
}
