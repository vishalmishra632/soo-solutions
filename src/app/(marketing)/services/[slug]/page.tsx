import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/service-hero";
import { ScrollSpyNav } from "@/components/sections/scroll-spy-nav";
import { ServiceIncludes } from "@/components/sections/service-includes";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceFaq } from "@/components/sections/service-faq";
import { RelatedServices } from "@/components/sections/related-services";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { services } from "@/content/services";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import type { Faq, FaqGroup, Segment } from "@/types";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

const onPageSections = [
  { id: "overview", label: "Overview" },
  { id: "included", label: "What's included" },
  { id: "process", label: "How it works" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "Related" },
];

// The shared FAQ pool is grouped; surface the entries relevant to this service's segment.
function faqsForSegment(segment: Segment): Faq[] {
  const groups: FaqGroup[] =
    segment === "commercial"
      ? ["general", "commercial", "support"]
      : segment === "residential"
        ? ["general", "residential", "support"]
        : ["general", "support"];
  return faqs.filter((faq) => groups.includes(faq.group));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);

  if (!service) {
    return buildMetadata({
      title: "Service",
      description: "Explore our security camera and CCTV services.",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((entry) => entry.slug !== service.slug)
    .filter(
      (entry) =>
        entry.segment === service.segment ||
        entry.segment === "both" ||
        service.segment === "both",
    )
    .slice(0, 3);

  const serviceFaqs = faqsForSegment(service.segment);

  const structuredData = [
    { key: "service", data: serviceSchema(service) },
    {
      key: "breadcrumb",
      data: breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
    },
  ];
  if (serviceFaqs.length > 0) {
    structuredData.push({ key: "faq", data: faqPageSchema(serviceFaqs) });
  }

  return (
    <main id="main-content" tabIndex={-1}>
      {structuredData.map(({ key, data }) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <ServiceHero service={service} />

      <div className="mx-auto w-full max-w-6xl px-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        <ScrollSpyNav sections={onPageSections} />
        <div className="min-w-0">
          <section id="overview" className="scroll-mt-32 py-12 md:py-16">
            <RevealOnScroll>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-foreground">
                Overview
              </h2>
              <p className="mt-4 max-w-[68ch] text-lg text-muted-foreground">
                {service.description}
              </p>
            </RevealOnScroll>
          </section>
          <ServiceIncludes items={service.highlights} />
          <ServiceProcess />
          <ServiceFaq faqs={serviceFaqs} />
          <RelatedServices items={relatedServices} />
        </div>
      </div>

      <RevealOnScroll>
        <CtaBand
          title={`Ready to get started with ${service.title}?`}
          description="Tell us about your property and we'll recommend the right system."
          primary={{ label: "Request a Quote", href: "/contact" }}
        />
      </RevealOnScroll>
    </main>
  );
}
