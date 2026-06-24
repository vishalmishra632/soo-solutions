import type { HeroSegment, MicroTrust, ProcessStep, Stat } from "@/types";

export const homeHero = {
  title: "Security You Can Trust",
  subhead: "Professional camera installation for homes & businesses.",
};

export const homeCta = {
  title: "Ready to secure your property?",
  description:
    "Tell us about your site and we'll recommend the right system — commercial or residential.",
};

export const heroMicroTrust: MicroTrust[] = [
  { label: "Serving Sault Ste. Marie", icon: "MapPin" },
  { label: "Free on-site survey", icon: "ClipboardCheck" },
  { label: "3-year camera warranty", icon: "ShieldCheck" },
];

export const segments: HeroSegment[] = [
  {
    key: "commercial",
    title: "Commercial",
    body: "Multi-camera coverage for retail, warehouse, and office sites.",
    href: "/industries",
    icon: "Building2",
  },
  {
    key: "residential",
    title: "Residential",
    body: "Protect entrances, driveways, and family with a system designed for you.",
    href: "/services",
    icon: "House",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Assess",
    body: "We survey the site and map every blind spot.",
    icon: "ClipboardCheck",
  },
  {
    step: "02",
    title: "Recommend",
    body: "We design the coverage and pick the right cameras.",
    icon: "PencilRuler",
  },
  {
    step: "03",
    title: "Install",
    body: "Certified technicians install it cleanly and test it.",
    icon: "Wrench",
  },
  {
    step: "04",
    title: "Support",
    body: "Maintenance and a local support line after handoff.",
    icon: "LifeBuoy",
  },
];

// TODO: real numbers — placeholder stats, confirm with client before launch (PROGRESS open questions).
export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Installs" },
  { value: 12, suffix: "", label: "Years" },
  { value: 24, suffix: "h", label: "Response" },
  { value: 98, suffix: "%", label: "Satisfaction" },
];

// Icon names ordered to match SITE.pillars and SITE.badges (resolved via lib/icons).
export const pillarIcons = ["BadgeCheck", "Wrench", "ShieldCheck", "Headphones"];
export const badgeIcons = ["Package", "Clock", "Sparkles", "Smile"];
