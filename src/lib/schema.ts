import type { Faq, Service } from "@/types";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

// Unknown client facts are stored as "TODO: ..." sentinels. They are fine in visible UI,
// but must never reach machine-readable structured data — strip them here.
function resolved(value: string) {
  return value.startsWith("TODO:") ? undefined : value;
}

function omitEmpty(object: JsonLd): JsonLd {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );
}

export function localBusinessSchema(): JsonLd {
  const { address, primaryEmail, phoneDisplay } = SITE.contact;

  const postalAddress = omitEmpty({
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: resolved(address.city),
    addressRegion: resolved(address.region),
    addressCountry: address.country,
  });

  return omitEmpty({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: primaryEmail,
    telephone: resolved(phoneDisplay),
    address: postalAddress,
    areaServed: SITE.serviceAreas
      .map((area) => area.name)
      .filter((name) => !name.startsWith("TODO:")),
    brand: SITE.partners.map((partner) => partner.name),
  });
}

export function serviceSchema(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { "@type": "HomeAndConstructionBusiness", name: SITE.name, url: SITE.url },
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

export function faqPageSchema(faqs: Pick<Faq, "question" | "answer">[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: NavCrumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface NavCrumb {
  name: string;
  path: string;
}
