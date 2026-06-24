import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { CookiePreferencesButton } from "./cookie-preferences-button";
import { PartnerLogo } from "@/components/shared/partner-logo";
import { SITE } from "@/lib/site";
import { visibleNav } from "@/lib/nav";

export function Footer() {
  const { contact } = SITE;
  const year = new Date().getFullYear();
  const address = `${contact.address.street}, ${contact.address.city}, ${contact.address.region}, ${contact.address.country}`;

  return (
    <footer className="border-border bg-card text-card-foreground mt-auto border-t">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-[40ch] text-sm">{SITE.description}</p>
            <p className="font-display text-primary mt-4 text-sm font-medium">
              {SITE.defaultTagline}
            </p>
            {SITE.socials.length > 0 ? (
              <ul className="mt-4 flex gap-3">
                {SITE.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-foreground text-sm font-semibold tracking-tight">
              Explore
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {visibleNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-foreground text-sm font-semibold tracking-tight">
              Contact
            </h2>
            <address className="text-muted-foreground mt-4 space-y-3 text-sm not-italic">
              <p className="flex items-start gap-2">
                <MapPin className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-primary size-4 shrink-0" aria-hidden />
                <a href={contact.phoneHref} className="hover:text-primary transition-colors">
                  {contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="text-primary size-4 shrink-0" aria-hidden />
                <a
                  href={`mailto:${contact.primaryEmail}`}
                  className="hover:text-primary transition-colors"
                >
                  {contact.primaryEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="text-primary size-4 shrink-0" aria-hidden />
                <span>{contact.hours}</span>
              </p>
            </address>
          </div>

          <div>
            <h2 className="font-display text-foreground text-sm font-semibold tracking-tight">
              Official Partners
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              {SITE.partners.map((partner) => (
                <li key={partner.name} className="text-muted-foreground">
                  <PartnerLogo name={partner.name} className="h-6 w-auto" />
                  <span className="mt-1.5 block">{partner.tagline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {SITE.legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
