export const coverageIntro = {
  eyebrow: "Designed coverage",
  heading: "Every angle. No blind spots.",
  lead: "Planned zone by zone — the way we design a real install.",
  hint: "Scroll to sweep",
};

export interface CoverageZone {
  id: string;
  label: string;
  detail: string;
}

export const coverageZones: CoverageZone[] = [
  { id: "entrance", label: "Front entrance", detail: "Faces and deliveries, right at the door." },
  { id: "driveway", label: "Driveway", detail: "Plates and vehicles, day or night." },
  { id: "perimeter", label: "Perimeter", detail: "The fence line and every approach." },
  { id: "yard", label: "Back yard", detail: "Blind corners and rear access." },
];
