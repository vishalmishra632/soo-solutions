import type { SiteImageId } from "@/content/site-images";

export interface CameraType {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  /** Product/form-factor shot — a key into `siteImages` (cameras/). */
  imageId: SiteImageId;
  /** A shot of this camera mounted in a real setting — key into `siteImages` (installs/). */
  installImageId: SiteImageId;
  features: string[];
  bestFor: string[];
  /** Where it mounts and why. */
  placement: string;
  formFactor: string;
  segment: "residential" | "commercial" | "both";
}

export const cameraTypes: CameraType[] = [
  {
    slug: "bullet",
    name: "Bullet Camera",
    shortDescription: "Long, visible body for outdoor long-range coverage and obvious deterrence.",
    longDescription:
      "The bullet's long barrel houses a longer lens, so it reaches further down a driveway, fence line, or yard than most other shapes. Mounted on a wall or eave it points exactly where you aim it, and because it is unmistakably a camera it doubles as a visible deterrent.",
    imageId: "bullet",
    installImageId: "res-eave",
    features: [
      "4K / 2K resolution options",
      "Long-range lens for distance coverage",
      "Infrared + colour night vision",
      "IP66/IP67 weatherproof housing",
      "AI person & vehicle detection",
      "PoE or wireless power",
    ],
    bestFor: ["Driveways and gates", "Perimeters and fence lines", "Parking and yards"],
    placement:
      "Wall- or eave-mounted, angled down a long sightline (driveway, alley, perimeter). The visible body is part of the deterrent, so it is meant to be seen.",
    formFactor: "Long barrel, wall/eave bracket",
    segment: "both",
  },
  {
    slug: "dome",
    name: "Dome Camera",
    shortDescription: "Discreet, vandal-resistant dome for indoor and sheltered outdoor coverage.",
    longDescription:
      "The tinted dome hides which way the lens is pointing and tucks neatly against a ceiling or soffit, so it reads as part of the space rather than a camera staring at people. The tough housing resists tampering, which is why you see domes in shops, lobbies, and corridors.",
    imageId: "dome",
    installImageId: "com-retail",
    features: [
      "Discreet, low-profile housing",
      "Vandal- and tamper-resistant",
      "Wide field of view",
      "Infrared night vision",
      "AI motion zones",
      "Indoor or sheltered-outdoor rated",
    ],
    bestFor: ["Retail floors and tills", "Lobbies and corridors", "Reception and common areas"],
    placement:
      "Ceiling- or soffit-mounted in occupied indoor spaces where a discreet look matters and the housing needs to resist tampering.",
    formFactor: "Low dome, ceiling/soffit mount",
    segment: "both",
  },
  {
    slug: "turret",
    name: "Turret / Eyeball Camera",
    shortDescription: "Ball-and-socket aiming with less IR glare than a dome — a flexible all-rounder.",
    longDescription:
      "The turret sits in an open socket you can swivel to any angle, so aiming is quick and precise. Because the lens and IR LEDs sit out in the open (not behind a dome cover) there is far less infrared glare and reflection at night, which gives cleaner footage in the dark.",
    imageId: "turret",
    installImageId: "com-office",
    features: [
      "Ball-and-socket flexible aiming",
      "Reduced IR glare vs domes",
      "Colour night vision",
      "Wide field of view",
      "AI person & vehicle detection",
      "Two-way audio (select models)",
    ],
    bestFor: ["Entrances and back-of-house", "Offices and clinics", "Tricky angles and corners"],
    placement:
      "Wall- or ceiling-mounted on building corners and soffits where you need to fine-tune the angle and want clean night footage without dome glare.",
    formFactor: "Open eyeball in a swivel socket",
    segment: "both",
  },
  {
    slug: "ptz",
    name: "PTZ (Pan-Tilt-Zoom)",
    shortDescription: "Motorised pan, tilt, and optical zoom to actively cover and track large areas.",
    longDescription:
      "A PTZ moves: it pans across an area, tilts up and down, and optically zooms in on detail a fixed camera would miss. Set patrol patterns or have it auto-track movement, so a single PTZ can do the work of several fixed cameras across a yard, lot, or floor.",
    imageId: "ptz",
    installImageId: "com-parking",
    features: [
      "Motorised pan / tilt / optical zoom",
      "Auto-tracking & preset patrols",
      "Long-range optical zoom",
      "4K resolution options",
      "IP66 weatherproof",
      "Remote app control of the lens",
    ],
    bestFor: ["Parking lots and yards", "Large retail and warehouse floors", "Wide open sites"],
    placement:
      "Pole- or high-wall-mounted overlooking a large open area, where its zoom and movement cover ground that fixed cameras can't.",
    formFactor: "Motorised dome on a pole/high mount",
    segment: "commercial",
  },
  {
    slug: "fisheye",
    name: "Fisheye / 360° Panoramic",
    shortDescription: "One ceiling camera that captures an entire room with no blind spots.",
    longDescription:
      "A single fisheye on the ceiling sees the whole room at once — 360° with no corners cut. Software 'de-warps' the curved image into normal-looking views, so one camera covers a retail floor or office that would otherwise take three or four fixed cameras.",
    imageId: "fisheye",
    installImageId: "ind-retail",
    features: [
      "360° single-point coverage",
      "De-warped multi-view output",
      "No blind spots in a room",
      "High-resolution sensor",
      "AI heat-mapping (select models)",
      "Indoor ceiling mount",
    ],
    bestFor: ["Open retail floors", "Offices and waiting rooms", "Small shops and reception"],
    placement:
      "Centre-of-ceiling mount in an open indoor space, replacing several fixed cameras with one wide overhead view.",
    formFactor: "Flat ceiling disc",
    segment: "both",
  },
  {
    slug: "video-doorbell",
    name: "Video Doorbell",
    shortDescription: "See and speak to whoever's at the door, from anywhere, with two-way audio.",
    longDescription:
      "Mounted at the entry, the doorbell shows you who's there before you open the door and lets you talk to them through your phone whether you're home or not. It records every press and every approach, so deliveries and visitors are never a mystery.",
    imageId: "doorbell",
    installImageId: "res-doorbell",
    features: [
      "Two-way audio",
      "Person detection & motion alerts",
      "Colour night vision",
      "Head-to-toe (tall) field of view",
      "Wired or battery power",
      "Local + cloud clip storage",
    ],
    bestFor: ["Front doors and entries", "Homes and small offices", "Deliveries and visitors"],
    placement:
      "At the entry door, framing the approach head-to-toe — the one camera every visitor meets first.",
    formFactor: "Slim doorbell faceplate",
    segment: "both",
  },
  {
    slug: "floodlight",
    name: "Floodlight Camera",
    shortDescription: "Bright motion-triggered light and a camera in one — deterrence you can see.",
    longDescription:
      "When motion is detected the floodlight snaps on, lighting the area and recording in full colour at the same time. The sudden light is a strong deterrent on its own, and it turns dark corners — side yards, driveways, loading areas — into well-lit, watched zones.",
    imageId: "floodlight",
    installImageId: "res-yard",
    features: [
      "Motion-activated floodlights",
      "Full-colour night recording",
      "Built-in siren & two-way audio",
      "Wide field of view",
      "IP65 weatherproof",
      "Person & vehicle detection",
    ],
    bestFor: ["Driveways and side yards", "Loading and back areas", "Dark exterior corners"],
    placement:
      "High on an exterior wall over a dark approach, so the light covers the area and the camera records the moment it triggers.",
    formFactor: "Twin floodlights + camera",
    segment: "both",
  },
  {
    slug: "covert-mini",
    name: "Covert / Mini Camera",
    shortDescription: "Small, discreet body for tight or sensitive placements.",
    longDescription:
      "When a full-size camera would be intrusive or get in the way, a mini body fits where others can't and stays out of sight. Used lawfully and with proper signage, it covers a till, a stockroom, or a discreet entry without dominating the space.",
    imageId: "covert",
    installImageId: "res-indoor",
    features: [
      "Compact, discreet form factor",
      "Wide-angle lens",
      "Infrared night vision",
      "Motion-only recording",
      "Wireless or PoE",
      "Local + cloud storage",
    ],
    bestFor: ["Tills and counters", "Stockrooms and back office", "Discreet indoor spots"],
    placement:
      "Tucked into a shelf, corner, or fixture indoors where a discreet view is needed — always used lawfully with the right notices in place.",
    formFactor: "Miniature body",
    segment: "both",
  },
  {
    slug: "lpr-anpr",
    name: "LPR / ANPR (License Plate)",
    shortDescription: "Purpose-built to capture readable plates at driveways, gates, and entries.",
    longDescription:
      "Reading a plate is a different job from watching a scene — it needs a specific lens, shutter, and IR tuned for fast-moving, reflective plates. An LPR/ANPR camera is set up to capture clean, legible plates day and night at a gate, driveway, or parking entry.",
    imageId: "lpr",
    installImageId: "com-parking",
    features: [
      "Optimised for legible plate capture",
      "Fast shutter for moving vehicles",
      "Day & night plate reading",
      "Narrow lane field of view",
      "Plate logging / watchlists (with NVR)",
      "IP66 weatherproof",
    ],
    bestFor: ["Gates and driveways", "Parking entries and exits", "Yards and depots"],
    placement:
      "Aimed straight down a single vehicle lane at the height and angle a plate passes through — a focused job, not a general view.",
    formFactor: "Bullet body, tuned optics",
    segment: "commercial",
  },
  {
    slug: "nvr-dvr-kits",
    name: "NVR / DVR & PoE Kits",
    shortDescription: "The recorder, storage, and power that turn cameras into a managed system.",
    longDescription:
      "The cameras are only half a system — the NVR/DVR records everything, holds the footage for as long as you need, and is where you search, export, and manage the whole setup. A PoE kit powers and connects the cameras over a single cable each, keeping the install clean.",
    imageId: "nvr",
    installImageId: "misc-control-room",
    features: [
      "Continuous & event recording",
      "Local storage + optional cloud",
      "Retention sized to your needs",
      "Single-cable PoE per camera",
      "Remote app & web viewing",
      "Central search, export & management",
    ],
    bestFor: ["Every system", "Multi-camera commercial sites", "Retention & incident review"],
    placement:
      "Installed in a secure cabinet, closet, or back office — the hub the cameras report to and where footage lives.",
    formFactor: "Rack/shelf recorder + PoE switch",
    segment: "both",
  },
];
