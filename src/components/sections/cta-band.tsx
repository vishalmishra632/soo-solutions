import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callHref, whatsappHref } from "@/lib/contact";

interface CtaBandProps {
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  /** Pre-fills the WhatsApp button so each page can ask about its own topic (defaults to a quote). */
  whatsappMessage?: string;
}

const outlineOnPrimary =
  "border-primary-foreground/70 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground";

export function CtaBand({
  title,
  description,
  primary = { label: "Get a Free Quote", href: "/contact" },
  whatsappMessage,
}: CtaBandProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="bg-primary text-primary-foreground shadow-glow relative overflow-hidden rounded-xl p-10 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full opacity-50"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          />
          <div className="relative">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="text-primary-foreground mt-4 max-w-[60ch]">{description}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href={primary.href}>{primary.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className={outlineOnPrimary}>
                <a href={callHref()}>
                  <Phone className="mr-2 size-4" aria-hidden />
                  Call Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className={outlineOnPrimary}>
                <a href={whatsappHref(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 size-4" aria-hidden />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
