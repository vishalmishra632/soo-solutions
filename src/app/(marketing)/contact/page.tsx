import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { BlindSpotMapper } from "@/components/sections/blind-spot-mapper";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Map the spots you want covered and send Soo Solutions a free, no-obligation quote request — or call us directly for security camera and CCTV installation.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = SITE;

  return (
    <PageShell
      eyebrow="Get in touch"
      title="Let's map your blind spots"
      description="Tap the spots on your property you want covered — we'll turn it into a free, no-obligation quote."
    >
      <BlindSpotMapper />

      <div className="border-border mt-14 border-t pt-10">
        <p className="font-display text-foreground text-sm font-semibold tracking-wide uppercase">
          Or reach us directly
        </p>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-display text-foreground font-medium">Phone</dt>
          <dd className="text-muted-foreground">
            <a
              href={contact.phoneHref}
              className="hover:text-primary focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
            >
              {contact.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-display text-foreground font-medium">Email</dt>
          <dd className="text-muted-foreground">
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="hover:text-primary focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
            >
              {contact.primaryEmail}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-display text-foreground font-medium">Address</dt>
          <dd className="text-muted-foreground">
            {contact.address.street}, {contact.address.city}, {contact.address.region},{" "}
            {contact.address.country}
          </dd>
        </div>
        <div>
          <dt className="font-display text-foreground font-medium">Hours</dt>
          <dd className="text-muted-foreground">{contact.hours}</dd>
        </div>
        </dl>
      </div>
    </PageShell>
  );
}
