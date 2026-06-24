// Cookie-based consent for non-essential analytics. We store the visitor's choice in a first-party
// cookie (not localStorage) so it is sent with requests and respected consistently. Only "accepted"
// turns on Vercel Web Analytics / Speed Insights — see ConsentedAnalytics.

export const CONSENT_COOKIE = "soo-cookie-consent";

export type ConsentChoice = "accepted" | "declined";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Reads the stored consent choice from the cookie, or null if the visitor has not chosen yet. */
export function readConsentChoice(): ConsentChoice | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`));

  const value = match?.split("=")[1];
  return value === "accepted" || value === "declined" ? value : null;
}

/** Persists the visitor's choice for a year on a first-party, lax cookie. Returns the saved choice. */
export function writeConsentChoice(choice: ConsentChoice): ConsentChoice {
  if (typeof document !== "undefined") {
    document.cookie = `${CONSENT_COOKIE}=${choice}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  }
  return choice;
}

/** Clears the stored choice so the consent banner is shown again. Returns null (no choice). */
export function clearConsentChoice(): null {
  if (typeof document !== "undefined") {
    document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }
  return null;
}
