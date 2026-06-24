import type { ComparisonRow, ComparisonTier, SolutionStack } from "@/types";

export const solutionStacks: SolutionStack[] = [
  {
    segment: "commercial",
    label: "Commercial",
    headline: "Commercial surveillance, built for liability and uptime",
    lead: "Coverage, retention, and access — sized to the site and the way you operate.",
    layers: [
      {
        title: "Multi-Camera Coverage",
        description: "Full interior and exterior coverage, sized to the site and how you operate.",
        icon: "Cctv",
      },
      /* Hidden until the client confirms these offerings — restore when verified:
      {
        title: "Video Analytics",
        description: "Smart detection at the camera and recorder, tuned to flag what matters.",
        icon: "ScanSearch",
      },
      {
        title: "Access Control",
        description: "Add door entry — keypad, fob, or mobile — wired into the same system.",
        icon: "KeyRound",
      },
      */
      {
        title: "24/7 Recording & Remote Viewing",
        description: "Continuous recording you can check live from anywhere, any time.",
        icon: "MonitorPlay",
      },
    ],
    cta: { label: "Get a commercial quote", href: "/contact" },
  },
  {
    segment: "residential",
    label: "Residential",
    headline: "Home security that covers the points that matter",
    lead: "Doorbell to driveway to living room — one system you can check from your phone.",
    layers: [
      {
        title: "Smart Doorbell",
        description: "See and speak to whoever is at the door, right from your phone.",
        icon: "Bell",
      },
      {
        title: "Perimeter Cameras",
        description: "Entrances, driveways, and yard lines kept under watch.",
        icon: "ScanLine",
      },
      {
        title: "Indoor Cameras",
        description: "Discreet coverage for the rooms that matter inside.",
        icon: "House",
      },
      {
        title: "Remote Viewing",
        description: "Live and recorded footage, wherever you are.",
        icon: "Smartphone",
      },
    ],
    cta: { label: "Get a residential quote", href: "/contact" },
  },
];

export const comparisonTiers: ComparisonTier[] = [
  { brand: "Lorex", bestFor: "Homes & small business" },
  { brand: "Hikvision", bestFor: "Commercial & multi-site" },
  { brand: "HiLook", bestFor: "Everyday, budget-conscious" },
];

// Conservative + honest: a `yes` is shown ONLY where products.ts literally lists the feature;
// `partial` for a weaker-but-real feature; everything else is `no` (Not listed). Never an invented level.
// Upgrading any `no` to `yes`/`partial` needs confirmed distributor data (see PROGRESS open question #21).
export const comparisonRows: ComparisonRow[] = [
  {
    capability: "4K resolution",
    lorex: { level: "yes", source: "Lorex 4K IP Cameras — 4K resolution" },
    hikvision: { level: "no" },
    hilook: { level: "no" },
  },
  {
    capability: "Colour night vision",
    lorex: { level: "yes", source: "Lorex 4K IP Cameras — Colour night vision" },
    hikvision: { level: "no" },
    hilook: { level: "no" },
  },
  {
    capability: "Multi-camera channels",
    lorex: { level: "partial", source: "Lorex NVR Systems — Multi-channel" },
    hikvision: { level: "yes", source: "Hikvision NVR & DVR — High channel counts" },
    hilook: { level: "no" },
  },
  {
    capability: "Expandable / RAID storage",
    lorex: { level: "yes", source: "Lorex NVR Systems — Expandable storage" },
    hikvision: { level: "yes", source: "Hikvision NVR & DVR — RAID-capable storage" },
    hilook: { level: "no" },
  },
  {
    capability: "Central multi-site management",
    lorex: { level: "no" },
    hikvision: { level: "yes", source: "Hikvision NVR & DVR — Centralized management" },
    hilook: { level: "no" },
  },
  {
    capability: "Weather-resistant build",
    lorex: { level: "no" },
    hikvision: { level: "yes", source: "Hikvision Turret & Bullet — Weather resistant" },
    hilook: { level: "no" },
  },
  {
    capability: "All-in-one kit",
    lorex: { level: "yes", source: "Lorex Wired Camera Kits — Camera + recorder bundle" },
    hikvision: { level: "no" },
    hilook: { level: "yes", source: "HiLook Starter Kits — All-in-one bundle" },
  },
  {
    capability: "Simple / quick install",
    lorex: { level: "no" },
    hikvision: { level: "no" },
    hilook: { level: "yes", source: "HiLook Starter Kits — Quick install" },
  },
  {
    capability: "Budget-friendly",
    lorex: { level: "no" },
    hikvision: { level: "no" },
    hilook: { level: "yes", source: "HiLook Starter Kits — Budget friendly" },
  },
];
