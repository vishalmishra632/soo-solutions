import type { Site } from "@/types";

// Single source for the phone number (E.164). Confirmed number, shared with the sister business
// (fonebazaar) — flows into the tel:/sms:/wa.me helpers (lib/contact.ts) and the footer/contact links.
const phoneE164 = "+17059710676";

export const SITE: Site = {
  name: "Soo Solutions Inc",
  shortName: "Soo Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://soosolutions.ca",
  description:
    "Soo Solutions Inc supplies and professionally installs security cameras and CCTV systems for commercial and residential properties — certified technicians, warranty-backed work, and trusted brands.",
  taglines: [
    "Smart Solutions. Safer Futures.",
    "Security You Can Trust.",
    "Solutions You Can Rely On.",
    "Your Property. Our Priority.",
  ],
  defaultTagline: "Smart Solutions. Safer Futures.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Solutions", href: "/solutions" },
    { label: "Work", href: "/work" },
    { label: "Products", href: "/products" },
    { label: "Supplies", href: "/supplies" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legalNav: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  partners: [
    { name: "Lorex", tagline: "4K and smart-home security cameras." },
    { name: "Hikvision", tagline: "Commercial-grade cameras and recorders." },
    { name: "HiLook", tagline: "Reliable everyday surveillance hardware." },
  ],
  pillars: [
    {
      title: "Certified Technicians",
      description: "Trained installers handle every mount, cable run, and configuration.",
    },
    {
      title: "Expert Service",
      description: "We survey the site, design the coverage, and install it right the first time.",
    },
    {
      title: "Warranty Assured",
      description: "The work and the hardware are backed, so you are never left stranded.",
    },
    {
      title: "Reliable Support",
      description: "A local team you can reach when you need a hand after install.",
    },
  ],
  badges: [
    "High Quality Products",
    "24/7 Protection",
    "Tailored Solutions",
    "Customer Satisfaction",
  ],
  contact: {
    phoneDisplay: "+1 (705) 971-0676",
    phoneE164,
    phoneHref: `tel:${phoneE164}`,
    primaryEmail: "Support@soosolutions.ca",
    address: {
      street: "253 Bruce St, Unit 2",
      city: "Sault Ste. Marie",
      region: "ON",
      country: "Canada",
    },
    hours: "Mon–Fri 10am–6pm · Sat 11am–5pm · Sun closed",
  },
  serviceAreas: [{ slug: "sault-ste-marie", name: "Sault Ste. Marie" }],
  socials: [],
};
