"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/hooks/use-consent";

/** First-visit consent prompt for non-essential analytics. Hidden once the visitor has made a choice. */
export function CookieConsentBanner() {
  const { choice, ready, accept, decline } = useConsent();

  // Stay invisible until we have read the cookie (avoids a flash) and once a choice already exists.
  if (!ready || choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="animate-in fade-in slide-in-from-bottom-6 fixed inset-x-0 bottom-0 z-[60] duration-300 motion-reduce:animate-none"
    >
      <div
        className="border-border bg-card text-card-foreground shadow-elevated mx-auto flex max-w-5xl flex-col gap-4 border-t px-6 py-5 sm:rounded-t-xl sm:border-x md:flex-row md:items-center md:justify-between"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-start gap-3">
          <Cookie className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="text-muted-foreground max-w-[60ch] text-sm">
            We use essential cookies to make this site work. With your consent we also use privacy-friendly
            analytics to understand how the site is used. You can change your choice at any time. Read our{" "}
            <Link
              href="/privacy"
              className="text-primary focus-visible:ring-ring rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3 md:justify-end">
          <Button variant="outline" onClick={decline} className="flex-1 md:flex-none">
            Decline
          </Button>
          <Button onClick={accept} className="shadow-soft hover:shadow-glow flex-1 md:flex-none">
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
