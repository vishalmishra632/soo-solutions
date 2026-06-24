import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "cctv-installation",
    title: "Security Camera & CCTV Installation",
    summary: "Professional supply and installation of cameras and CCTV for any property.",
    description:
      "We size the system to your property, run the cabling cleanly, mount the cameras for full coverage, and configure recording and remote access end to end.",
    segment: "both",
    highlights: [
      "Site-matched camera placement",
      "Clean cabling and mounting",
      "Recording and remote viewing configured",
    ],
    icon: "Cctv",
  },
  {
    slug: "commercial-security-systems",
    title: "Commercial Security Systems",
    summary: "Commercial-grade surveillance designed for liability, coverage, and uptime.",
    description:
      "Multi-camera systems for retail, warehouse, office, and multi-site operations, built around incident review, retention requirements, and dependable hardware.",
    segment: "commercial",
    highlights: [
      "Multi-camera and multi-site coverage",
      "Retention and incident review",
      "Commercial-grade hardware",
    ],
    icon: "Building2",
  },
  {
    slug: "residential-security-systems",
    title: "Residential Security Systems",
    summary: "Reliable home camera systems that protect entrances, driveways, and yards.",
    description:
      "A professionally installed home system covering the points that matter, with mobile viewing so you can check in from anywhere.",
    segment: "residential",
    highlights: ["Entrance and perimeter coverage", "Mobile viewing setup", "No DIY guesswork"],
    icon: "House",
  },
  {
    slug: "system-design-and-site-survey",
    title: "System Design & Site Survey",
    summary: "On-site assessment and a coverage plan before a single camera is mounted.",
    description:
      "We walk the property, identify blind spots, and design the camera count, placement, and recording approach that fits the space and the budget.",
    segment: "both",
    highlights: [
      "On-site blind-spot assessment",
      "Coverage and camera-count plan",
      "Budget-matched recommendation",
    ],
    icon: "ClipboardCheck",
  },
  {
    slug: "maintenance-and-support",
    title: "Maintenance & Support",
    summary: "Keep the system healthy with checkups, cleaning, and responsive support.",
    description:
      "Scheduled maintenance and a local support line so cameras stay aligned, firmware stays current, and footage is there when you need it.",
    segment: "both",
    highlights: ["Scheduled system checkups", "Firmware and storage health", "Local support line"],
    icon: "Wrench",
  },
  {
    slug: "upgrades-and-retrofits",
    title: "Upgrades & Retrofits",
    summary: "Modernize aging analog or partial systems without starting from scratch.",
    description:
      "We assess what is already in place, reuse what still performs, and upgrade cameras, recorders, and storage to current standards.",
    segment: "both",
    highlights: [
      "Analog-to-IP migration",
      "Reuse of viable infrastructure",
      "Modern recorder and storage",
    ],
    icon: "RefreshCw",
  },
  {
    slug: "remote-viewing-and-mobile-setup",
    title: "Remote Viewing & Mobile Setup",
    summary: "See your property live from your phone, configured and tested for you.",
    description:
      "We set up secure remote access and mobile apps so you can view live and recorded footage from anywhere, with the configuration handled and verified.",
    segment: "both",
    highlights: ["Secure remote access", "Mobile app configuration", "Tested before handoff"],
    icon: "Smartphone",
  },
];
