import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { legalFacts } from "@/content/legal/legal-facts";
import type { LegalBlock, LegalDocument, LegalRun } from "@/types";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const linkStyles =
  "text-primary underline decoration-1 underline-offset-4 hover:text-primary/80 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none rounded-sm";

/** Formats an ISO date like "2026-06-18" as "June 18, 2026" without timezone drift. */
function formatLegalDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const monthName = MONTHS[(month ?? 1) - 1] ?? "";
  return `${monthName} ${day}, ${year}`;
}

/** Renders one inline run: a company-fact placeholder, a link, or plain text. */
function LegalRunSpan({ run }: { run: LegalRun }) {
  if ("fact" in run) {
    return (
      <span
        data-legal-todo
        className="text-muted-foreground decoration-muted-foreground/40 underline decoration-dotted underline-offset-2"
      >
        {legalFacts[run.fact]}
      </span>
    );
  }

  if (!run.href) return <>{run.text}</>;

  if (run.href.startsWith("/")) {
    return (
      <Link href={run.href} className={linkStyles}>
        {run.text}
      </Link>
    );
  }

  const isExternal = run.href.startsWith("http");
  return (
    <a
      href={run.href}
      className={linkStyles}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {run.text}
      {isExternal ? (
        <>
          <ExternalLink className="ml-0.5 inline size-3 align-baseline" aria-hidden />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : null}
    </a>
  );
}

/** Renders an array of inline runs in reading order. */
function LegalRuns({ runs }: { runs: LegalRun[] }) {
  return (
    <>
      {runs.map((run, index) => (
        <LegalRunSpan key={index} run={run} />
      ))}
    </>
  );
}

/** Renders a single typed block (paragraph, subheading, list, definitions, or note). */
function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="text-muted-foreground leading-relaxed">
          <LegalRuns runs={block.runs} />
        </p>
      );
    case "subheading":
      return (
        <h3 className="font-display text-foreground mt-8 text-lg font-semibold tracking-tight">
          {block.text}
        </h3>
      );
    case "list": {
      const items = block.items.map((runs, index) => (
        <li key={index} className="leading-relaxed">
          <LegalRuns runs={runs} />
        </li>
      ));
      const className = "marker:text-primary/70 ml-5 space-y-2 text-muted-foreground";
      return block.ordered ? (
        <ol className={`list-decimal ${className}`}>{items}</ol>
      ) : (
        <ul className={`list-disc ${className}`}>{items}</ul>
      );
    }
    case "definitions":
      return (
        <dl className="border-border space-y-4 border-l pl-5">
          {block.entries.map((entry, index) => (
            <div key={index}>
              <dt className="text-foreground font-medium">{entry.term}</dt>
              <dd className="text-muted-foreground mt-1 leading-relaxed">
                <LegalRuns runs={entry.runs} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "note":
      return (
        <div className="border-primary/40 bg-secondary/50 rounded-lg border-l-4 px-4 py-3">
          <p className="text-foreground/80 leading-relaxed">
            <LegalRuns runs={block.runs} />
          </p>
        </div>
      );
  }
}

/** Renders a full legal document: header, in-page table of contents, and anchored sections. */
export function LegalArticle({ doc }: { doc: LegalDocument }) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-3xl flex-1 px-6 py-20 md:py-28">
      <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">Legal</p>
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {doc.title}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{doc.summary}</p>
      <p className="text-muted-foreground mt-4 text-sm">
        Last updated: <time dateTime={doc.lastUpdated}>{formatLegalDate(doc.lastUpdated)}</time>
      </p>

      <nav
        aria-label="Table of contents"
        className="border-border bg-card text-card-foreground shadow-soft mt-10 rounded-xl border p-6"
      >
        <p className="font-display text-foreground text-sm font-semibold tracking-tight">On this page</p>
        <ol className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {doc.sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-muted-foreground hover:text-primary focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="text-primary/70 tabular-nums">{index + 1}.</span> {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-14 space-y-14">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.blocks.map((block, index) => (
                <LegalBlockView key={index} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
