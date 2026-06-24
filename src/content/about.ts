import type { AboutMission, AboutValue, Certification, TeamMember } from "@/types";
import type { SiteImageId } from "@/content/site-images";
import { SITE } from "@/lib/site";

export const aboutMission: AboutMission = {
  eyebrow: `About ${SITE.shortName} · ${SITE.defaultTagline}`,
  headline: "Named after the Soo, installing security cameras here since 2021",
  lead: "We design and install security camera systems we'd be glad to put on our own homes. The person who quotes your job is the person who does it: certified, warrantied work, with no call centres and no subcontractors in between.",
};

// Our-story copy — why the company is named after Sault Ste. Marie ("the Soo"), founded 2021. Drafted +
// adversarially checked (brand voice / honesty / human-written) before shipping; uses only supported facts.
export const aboutStory = {
  eyebrow: "Our story",
  heading: "Where the name comes from",
  paragraphs: [
    "We started here in 2021, in the city locals call the Soo. Naming the company after it was the easy part: Sault Ste. Marie gave us our footing, and putting it on the sign felt like the honest thing to do. It's part gratitude, part promise. Look closely at the logo and the two lenses spell it back to you: the “oo” of Soo.",
    "Being from here changes how the work gets done. The person who walks your property and quotes the job is the same one who runs the cable and mounts the cameras, so no call centre and no subcontractor ever gets handed your address. We supply and install Lorex, Hikvision, and HiLook gear, certified and warranty-backed, and we're a short drive away if you ever need us back.",
  ],
  imageId: "hero-camera",
  imageAlt: "A Soo Solutions security camera mounted on a building exterior",
  detail: "Since 2021 · Sault Ste. Marie, Ontario",
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
