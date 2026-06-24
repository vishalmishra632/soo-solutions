import { caseStudies } from "@/content/case-studies";
import type { CaseStudy } from "@/types";

const TODO_PREFIX = "TODO:";

/** A case study is publishable only with a real cover image, a real title, and a human-confirmed outcome. */
export function isPublished(study: CaseStudy): boolean {
  return Boolean(study.cover) && !study.title.startsWith(TODO_PREFIX) && study.outcomeConfirmed === true;
}

export const publishedCaseStudies: CaseStudy[] = caseStudies.filter(isPublished);

/** Drives nav, sitemap, robots, and the page state. False until real installs land. */
export const hasPublishableWork: boolean = publishedCaseStudies.length > 0;

/** Up to three other published installs, for the "related" rail on a detail page. */
export function relatedCaseStudies(slug: string): CaseStudy[] {
  return publishedCaseStudies.filter((study) => study.slug !== slug).slice(0, 3);
}

/**
 * Backstop: in a production build, an entry that LOOKS published (a real, non-TODO title) must be
 * FULLY published (cover + confirmed outcome). Catches half-filled entries before they ship as proof.
 */
export function assertWorkContentResolvedForProduction(): void {
  if (process.env.NODE_ENV !== "production") return;

  const halfPublished = caseStudies.filter(
    (study) => !study.title.startsWith(TODO_PREFIX) && !isPublished(study),
  );

  if (halfPublished.length > 0) {
    const slugs = halfPublished.map((study) => study.slug).join(", ");
    throw new Error(
      `Case studies have a real title but are not fully published (need cover + outcomeConfirmed): ${slugs}`,
    );
  }
}
