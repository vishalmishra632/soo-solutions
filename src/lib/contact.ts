import { SITE } from "@/lib/site";

// Static-friendly contact links built from the single phone source (SITE.contact.phoneE164).
// The number is a known TODO placeholder until the client confirms it; every helper degrades to a
// valid-looking link so the buttons can ship now and start working the moment the real number lands.

const PLACEHOLDER_E164 = "+10000000000";

export const defaultQuoteMessage =
  "Hi Soo Solutions, I'd like a quote for security cameras at my property.";

/** True once a real phone number has replaced the placeholder — lets callers hide hard dial actions. */
export function isPhoneConfigured(): boolean {
  const { phoneE164 } = SITE.contact;
  return phoneE164 !== PLACEHOLDER_E164 && !phoneE164.startsWith("TODO");
}

/** tel: link for a direct call. */
export function callHref(): string {
  return `tel:${SITE.contact.phoneE164}`;
}

/** sms: link with an optional pre-filled body (support varies by device, body is best-effort). */
export function smsHref(message: string = defaultQuoteMessage): string {
  return `sms:${SITE.contact.phoneE164}?&body=${encodeURIComponent(message)}`;
}

/** wa.me link (digits only, no +) that opens WhatsApp on mobile and WhatsApp Web on desktop. */
export function whatsappHref(message: string = defaultQuoteMessage): string {
  const digits = SITE.contact.phoneE164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** mailto: link with a pre-filled subject and body. */
export function emailHref(subject = "Quote request", message: string = defaultQuoteMessage): string {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  return `mailto:${SITE.contact.primaryEmail}?${query}`;
}
