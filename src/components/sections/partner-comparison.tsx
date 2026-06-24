import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { comparisonRows, comparisonTiers } from "@/content/solutions";
import { SITE } from "@/lib/site";
import type { ComparisonCell, ComparisonRow, ProductBrand } from "@/types";

function taglineFor(brand: ProductBrand): string {
  return SITE.partners.find((partner) => partner.name === brand)?.tagline ?? "";
}

function cellFor(row: ComparisonRow, brand: ProductBrand): ComparisonCell {
  if (brand === "Lorex") return row.lorex;
  if (brand === "Hikvision") return row.hikvision;
  return row.hilook;
}

// One calm cell language: a plain blue check, the word "Partial", or an em-dash — each with an
// explicit accessible name so nothing reads by colour or glyph alone.
function CellMark({ cell }: { cell: ComparisonCell }) {
  if (cell.level === "yes") {
    return (
      <>
        <Check className="inline size-5 text-primary" aria-hidden />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (cell.level === "partial") {
    return <span className="text-sm text-muted-foreground">Partial</span>;
  }
  return (
    <>
      <span aria-hidden className="text-muted-foreground">
        &mdash;
      </span>
      <span className="sr-only">Not available</span>
    </>
  );
}

export function PartnerComparison() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Compare the tiers"
            title="Which brand fits your build?"
            description="A conservative, like-for-like look at where each brand we install is strongest."
          />
        </RevealOnScroll>

        <RevealOnScroll>
          {/* Desktop: a flat, edge-led table */}
          <table className="mt-12 hidden w-full border-collapse text-left md:table">
            <caption className="sr-only">
              Capability comparison across the camera brands Soo Solutions installs.
            </caption>
            <thead>
              <tr className="bg-secondary">
                <th scope="col" className="p-5 align-bottom">
                  <span className="sr-only">Capability</span>
                </th>
                {comparisonTiers.map((tier) => (
                  <th key={tier.brand} scope="col" className="p-5 align-top">
                    <span className="font-display text-lg font-semibold text-foreground">{tier.brand}</span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {taglineFor(tier.brand)}
                    </span>
                    <span className="mt-2 block text-xs font-medium tracking-wide text-secondary-foreground">
                      Best for: {tier.bestFor}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.capability} className="border-t border-border transition-colors hover:bg-accent">
                  <th scope="row" className="p-5 font-medium text-foreground">
                    {row.capability}
                  </th>
                  <td className="p-5 text-center">
                    <CellMark cell={row.lorex} />
                  </td>
                  <td className="p-5 text-center">
                    <CellMark cell={row.hikvision} />
                  </td>
                  <td className="p-5 text-center">
                    <CellMark cell={row.hilook} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: one stacked card per brand */}
          <div className="mt-10 space-y-6 md:hidden">
            {comparisonTiers.map((tier) => (
              <div key={tier.brand} className="rounded-lg border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-xl font-semibold text-foreground">{tier.brand}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{taglineFor(tier.brand)}</p>
                <p className="mt-2 text-xs font-medium tracking-wide text-secondary-foreground">
                  Best for: {tier.bestFor}
                </p>
                <dl className="mt-4 divide-y divide-border">
                  {comparisonRows.map((row) => (
                    <div key={row.capability} className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="text-sm text-foreground">{row.capability}</dt>
                      <dd className="shrink-0 text-right">
                        <CellMark cell={cellFor(row, tier.brand)} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
