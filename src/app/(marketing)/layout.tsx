import { localBusinessSchema } from "@/lib/schema";
import { assertWorkContentResolvedForProduction } from "@/lib/work";

// Backstop: fails the production build if any case study has a real title but isn't fully published.
assertWorkContentResolvedForProduction();

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      {children}
    </>
  );
}
