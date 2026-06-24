// A tiny external store for the visitor's cookie-consent choice, shared across the banner, the analytics
// gate, and the footer "Cookie preferences" control. The cookie is the source of truth; this just lets
// React components subscribe to changes via useSyncExternalStore (see useConsent).
import {
  clearConsentChoice,
  readConsentChoice,
  writeConsentChoice,
  type ConsentChoice,
} from "@/lib/consent";

// "unknown" is the server / pre-hydration value: we have not read the cookie yet, so neither the banner
// nor analytics should act. Once mounted, the snapshot becomes the real choice (or null if none was made).
export type ConsentState = ConsentChoice | null | "unknown";

const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getConsentSnapshot(): ConsentState {
  return readConsentChoice();
}

export function getConsentServerSnapshot(): ConsentState {
  return "unknown";
}

export function acceptConsent(): void {
  writeConsentChoice("accepted");
  notify();
}

export function declineConsent(): void {
  writeConsentChoice("declined");
  notify();
}

export function reopenConsent(): void {
  clearConsentChoice();
  notify();
}
