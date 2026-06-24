import type { AboutMission, AboutValue, Certification, TeamMember } from "@/types";
import type { SiteImageId } from "@/content/site-images";
import { SITE } from "@/lib/site";

export const aboutMission: AboutMission = {
  eyebrow: `About ${SITE.shortName}`,
  headline: "Security cameras, built in the Soo",
  lead: "Soo Solutions Inc. is a Canadian-owned security camera and CCTV company serving homes and businesses across Sault Ste. Marie and Northern Ontario — surveillance systems, smart monitoring, and custom installations, backed by honest advice and dependable local support.",
};

// Our-story copy — the founders' immigrant journey (arrived in the Soo in 2019), gratitude to the city,
// and why the company carries its name. From the client's own account; written in the brand voice and
// kept honest. Local SEO terms (Sault Ste. Marie, Northern Ontario, CCTV/surveillance) woven in naturally.
export const aboutStory = {
  eyebrow: "Our story",
  heading: "Built in the Soo, built on trust",
  paragraphs: [
    "Our story began in 2019, when we came to Sault Ste. Marie as immigrants, starting a new chapter of life in Canada. The Soo was the first place we ever called home here, and from the very beginning the community welcomed us with kindness, opportunity, and a real sense of belonging.",
    "We had reasons to move on to bigger cities, but our hearts stayed here. Out of gratitude to the place that gave us our footing, we carried its name into the company itself — Soo Solutions Inc. — a way of honouring the city where our Canadian journey began.",
    "Today we design and install security camera systems for homes and businesses across Sault Ste. Marie and Northern Ontario: CCTV and surveillance, smart monitoring, and custom setups tailored to each property. We supply and install trusted brands like Lorex, Hikvision, and HiLook, certified and warranty-backed.",
    "For us, security is about more than cameras — it's about trust and peace of mind. The person who quotes your job is the same one who runs the cable and mounts it, so no call centre and no subcontractor is ever handed your address — just honest advice, clean work, and local support a short drive away.",
    "We're a local company that believes in looking after the community that looked after us. Every customer here isn't just a client — they're part of the place we proudly call home.",
  ],
  imageId: "hero-camera",
  imageAlt: "A Soo Solutions security camera mounted on a building exterior",
  detail: "Locally owned · Sault Ste. Marie & Northern Ontario",
} satisfies {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  imageId: SiteImageId;
  imageAlt: string;
  detail: string;
};

// TODO: real crew — names, roles, one-line details, founder quote, and portrait photos.
export const team: TeamMember[] = [
  {
    name: "TODO: founder name",
    role: "Founder & Lead Technician",
    detail: "TODO: years on the tools",
    quote: "I survey every commercial job myself — it's how I sleep at night.",
    alt: "Portrait of the Soo Solutions founder and lead technician",
    featured: true,
  },
  {
    name: "TODO: technician name",
    role: "Senior Installer",
    detail: "TODO: specialty",
    alt: "Portrait of a Soo Solutions senior installer",
  },
  {
    name: "TODO: technician name",
    role: "Installer",
    detail: "TODO: specialty",
    alt: "Portrait of a Soo Solutions installer",
  },
  {
    name: "TODO: coordinator name",
    role: "Service Coordinator",
    detail: "TODO: detail",
    alt: "Portrait of the Soo Solutions service coordinator",
  },
];

const partnerCertifications: Certification[] = SITE.partners.map((partner) => ({
  label: partner.name,
  sublabel: "Authorized installer",
  kind: "partner",
  icon: "ShieldCheck",
}));

export const certifications: Certification[] = [
  ...partnerCertifications,
  // TODO: confirm credentials before shipping these claims.
  { label: "Licensed & bonded", sublabel: "TODO: confirm", kind: "credential", icon: "BadgeCheck" },
  { label: "Insured", sublabel: "TODO: confirm", kind: "credential", icon: "BadgeCheck" },
];

export const aboutValues: AboutValue[] = [
  {
    title: "Local & accountable",
    body: "A real local team you can reach — the same people, start to finish.",
  },
  {
    title: "No shortcuts",
    body: "Clean cable runs and certified installs we'd put on our own homes.",
  },
  {
    title: "Plain-spoken advice",
    body: "We recommend what you need, not the biggest bill.",
  },
];

export const aboutCta = {
  title: "Book a free site assessment.",
  description:
    "We'll walk your property, map the blind spots, and recommend a system — no obligation.",
};

// The visual payoff for the name story: the two o's in "Soo" rendered as camera-aperture lenses.
export const nameOrigin = {
  eyebrow: "The name",
  intro: "Sault Ste. Marie. Locals call it the Soo.",
  caption: "So do we — and look closely: the two lenses are the “oo”.",
};
