import type { Metadata } from "next";
import { Boxes, Mail, MessageCircle, Package, Phone, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuppliesOrder } from "@/components/sections/supplies-order";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { suppliesEnquiryMessage, suppliesIntro } from "@/content/supplies";
import { callHref, emailHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Business Supplies",
  description:
    "PPE and gloves, restaurant and packaging supplies, and POS receipt rolls — supplied to local businesses by the case. Enquire for case pricing.",
  path: "/supplies",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Supplies", path: "/supplies" },
]);

export default function SuppliesPage() {
  const enquiryEmailHref = emailHref("Supplies enquiry", suppliesEnquiryMessage);
  const enquiryWhatsAppHref = whatsappHref(suppliesEnquiryMessage);

  return (
    <main id="main-content" tabIndex={-1} className="supplies-theme">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(75% 70% at 82% 0%, oklch(0.85 0.09 68 / 0.5), transparent 60%)",
          }}
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.3]" />
        <div className="mx-auto w-full max-w-3xl px-6 pt-20 pb-10 md:pt-28">
          <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
            {suppliesIntro.eyebrow}
          </p>
          <h1 className="font-display text-foreground mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight">
            {suppliesIntro.title}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-[60ch] text-lg">
            {suppliesIntro.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={enquiryWhatsAppHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden />
                Enquire on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={callHref()}>
                <Phone className="size-4" aria-hidden />
                Call Now
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={enquiryEmailHref}>
                <Mail className="size-4" aria-hidden />
                Email a List
              </a>
            </Button>
          </div>

          <div className="border-border/70 text-muted-foreground mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5 text-sm font-medium">
            <span className="text-primary inline-flex items-center gap-1.5">
              <Package className="size-4" aria-hidden /> By the case
            </span>
            <span className="text-primary inline-flex items-center gap-1.5">
              <Boxes className="size-4" aria-hidden /> By the pallet
            </span>
            <span className="text-primary inline-flex items-center gap-1.5">
              <Tag className="size-4" aria-hidden /> Case &amp; pallet pricing
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
        <SuppliesOrder />
      </section>

      <RevealOnScroll>
        <CtaBand
          title="Send us your list"
          description="Tell us the items and rough quantities and we'll come back with case pricing and pickup details."
          primary={{ label: "Email a List", href: enquiryEmailHref }}
          whatsappMessage={suppliesEnquiryMessage}
        />
      </RevealOnScroll>
    </main>
  );
}
