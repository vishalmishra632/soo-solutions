import type { SiteImageId } from "@/content/site-images";

export type Segment = "commercial" | "residential" | "both";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface Partner {
  name: string;
  tagline: string;
}

export interface Pillar {
  title: string;
  description: string;
}

export interface NapAddress {
  street: string;
  city: string;
  region: string;
  country: string;
}

export interface ContactInfo {
  phoneDisplay: string;
  phoneE164: string;
  phoneHref: string;
  primaryEmail: string;
  address: NapAddress;
  hours: string;
}

export interface ServiceArea {
  slug: string;
  name: string;
}

export interface Site {
  name: string;
  shortName: string;
  url: string;
  description: string;
  taglines: string[];
  defaultTagline: string;
  nav: NavLink[];
  legalNav: NavLink[];
  partners: Partner[];
  pillars: Pillar[];
  badges: string[];
  contact: ContactInfo;
  serviceAreas: ServiceArea[];
  socials: SocialLink[];
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  segment: Segment;
  highlights: string[];
  icon: string;
}

export interface Industry {
  slug: string;
  name: string;
  challenge: string;
  solution: string;
  icon: string;
  outcome: string;
  imageId?: SiteImageId;
  image?: string;
  imageAlt?: string;
}

export type FaqGroup = "general" | "commercial" | "residential" | "products" | "support";

export interface Faq {
  question: string;
  answer: string;
  group: FaqGroup;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  segment: Segment;
  verified?: boolean;
}

export type ProductBrand = "Lorex" | "Hikvision" | "HiLook";

export type ProductCategory = "Cameras" | "Recorders" | "Kits" | "Accessories";

export interface Product {
  brand: ProductBrand;
  name: string;
  category: ProductCategory;
  summary: string;
  features: string[];
}

export interface SupplyItem {
  name: string;
  spec: string;
  packNote: string;
  options: string[];
  imageId: SiteImageId;
}

export interface SupplyCategory {
  slug: string;
  name: string;
  blurb: string;
  icon: string;
  items: SupplyItem[];
}

export interface MicroTrust {
  label: string;
  icon: string;
}

export interface HeroSegment {
  key: "commercial" | "residential";
  title: string;
  body: string;
  href: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudyQuote {
  text: string;
  author: string;
  role: string;
  verified: true;
}

export interface CaseStudyBeforeAfter {
  before: CaseStudyImage;
  after: CaseStudyImage;
}

export interface CaseStudy {
  slug: string;
  title: string;
  outcome: string;
  segment: Segment;
  image?: string;
  alt: string;
  // Additive (kept back-compatible): new fields drive the Work page + the publish gate.
  cover?: CaseStudyImage;
  summary?: string;
  outcomeConfirmed?: boolean;
  challenge?: string;
  solution?: string;
  gallery?: CaseStudyImage[];
  beforeAfter?: CaseStudyBeforeAfter;
  quote?: CaseStudyQuote;
}

export interface AboutMission {
  eyebrow: string;
  headline: string;
  lead: string;
}

export interface TeamMember {
  name: string;
  role: string;
  detail: string;
  quote?: string;
  photo?: string;
  alt: string;
  featured?: boolean;
}

export type CertificationKind = "partner" | "credential";

export interface Certification {
  label: string;
  sublabel: string;
  kind: CertificationKind;
  icon: string;
}

export interface AboutValue {
  title: string;
  body: string;
}

export type SolutionSegment = "commercial" | "residential";

export interface SolutionLayer {
  title: string;
  description: string;
  icon: string;
  flag?: string;
}

export interface SolutionStack {
  segment: SolutionSegment;
  label: string;
  headline: string;
  lead: string;
  layers: SolutionLayer[];
  cta: { label: string; href: string };
}

export type ComparisonLevel = "yes" | "partial" | "no";

export interface ComparisonCell {
  level: ComparisonLevel;
  source?: string;
}

export interface ComparisonRow {
  capability: string;
  lorex: ComparisonCell;
  hikvision: ComparisonCell;
  hilook: ComparisonCell;
}

export interface ComparisonTier {
  brand: ProductBrand;
  bestFor: string;
}

// Legal pages (Privacy, Terms, Accessibility) are content-driven like every other section.
// A document is a list of anchored sections; each section is a list of typed blocks so one
// renderer handles all three documents and copy never lives in JSX.

export type LegalFactKey =
  | "entityName"
  | "businessNumber"
  | "province"
  | "registeredAddress"
  | "privacyOfficerName"
  | "privacyOfficerEmail"
  | "privacyOfficerPhone"
  | "retentionPeriod"
  | "governingProvince";

// An inline piece of legal copy: plain text, a link, or a deferred company-fact placeholder.
export type LegalRun = { text: string; href?: string } | { fact: LegalFactKey };

export type LegalBlock =
  | { kind: "paragraph"; runs: LegalRun[] }
  | { kind: "subheading"; text: string }
  | { kind: "list"; ordered?: boolean; items: LegalRun[][] }
  | { kind: "definitions"; entries: { term: string; runs: LegalRun[] }[] }
  | { kind: "note"; runs: LegalRun[] };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  lastUpdated: string;
  sections: LegalSection[];
}
