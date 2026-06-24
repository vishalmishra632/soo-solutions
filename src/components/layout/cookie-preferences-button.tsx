"use client";

import { useConsent } from "@/hooks/use-consent";

/** Footer control that re-opens the consent banner so visitors can change their analytics choice. */
export function CookiePreferencesButton() {
  const { reopen } = useConsent();

  return (
    <button
      type="button"
      onClick={reopen}
      className="text-muted-foreground hover:text-primary focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      Cookie preferences
    </button>
  );
}
