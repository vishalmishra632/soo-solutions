import type { Metadata } from "next";
import { Logo, LogoMark } from "@/components/layout/logo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brand",
  description: "The Soo Solutions logo system — mark, lockups, colours, and usage.",
  path: "/brand",
  robots: { index: false, follow: false },
});

const colors = [
  { name: "Primary — electric blue", oklch: "oklch(0.55 0.218 256)", hex: "#2563eb", swatch: "bg-primary" },
  { name: "Foreground — deep navy", oklch: "oklch(0.255 0.045 264)", hex: "#1c2540", swatch: "bg-foreground" },
  { name: "Background — warm white", oklch: "oklch(0.985 0.006 95)", hex: "#fafaf7", swatch: "bg-background border-border border" },
  { name: "Reversed accent", oklch: "oklch(0.74 0.13 256)", hex: "#7db0ff", swatch: "bg-[#7db0ff]" },
];

const sizes = [
  { label: "16px", cls: "size-4" },
  { label: "24px", cls: "size-6" },
  { label: "32px", cls: "size-8" },
  { label: "48px", cls: "size-12" },
];

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="border-border bg-card flex flex-col items-center gap-4 rounded-xl border p-8">
      <div className="flex min-h-24 items-center justify-center">{children}</div>
      <figcaption className="text-muted-foreground text-sm">{label}</figcaption>
    </figure>
  );
}

export default function BrandPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-6 py-20 md:py-24">
      <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">Brand</p>
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        The Soo Solutions mark
      </h1>
      <p className="text-muted-foreground mt-4 max-w-[60ch] text-lg">
        “Twin Aperture” — the two o’s of <em>Soo</em> as two camera lenses, offset for depth. Full notes in{" "}
        <code className="text-foreground">BRAND-NOTES.md</code>.
      </p>

      <section className="mt-14">
        <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight">The mark</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Tile label="Primary">
            <LogoMark className="size-20" />
          </Tile>
          <Tile label="Monochrome">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/icon-mono.svg" alt="Soo Solutions monochrome mark" width={80} height={80} />
          </Tile>
          <figure className="bg-foreground flex flex-col items-center gap-4 rounded-xl p-8">
            <div className="flex min-h-24 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/icon-reversed.svg" alt="Soo Solutions reversed mark" width={80} height={80} />
            </div>
            <figcaption className="text-sm text-white/70">Reversed</figcaption>
          </figure>
          <Tile label="App icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/app-icon.svg" alt="Soo Solutions app icon" width={80} height={80} />
          </Tile>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight">Lockups</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Tile label="Horizontal">
            <Logo />
          </Tile>
          <Tile label="Stacked">
            <Logo variant="stacked" />
          </Tile>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight">
          Holds up small
        </h2>
        <div className="border-border bg-card mt-6 flex flex-wrap items-end gap-10 rounded-xl border p-8">
          {sizes.map((size) => (
            <div key={size.label} className="flex flex-col items-center gap-3">
              <LogoMark className={size.cls} />
              <span className="text-muted-foreground text-xs">{size.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight">Colours</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {colors.map((color) => (
            <div key={color.hex} className="border-border bg-card flex items-center gap-4 rounded-xl border p-4">
              <div className={`size-12 shrink-0 rounded-lg ${color.swatch}`} />
              <div>
                <dt className="text-foreground font-medium">{color.name}</dt>
                <dd className="text-muted-foreground font-mono text-xs">
                  {color.hex} · {color.oklch}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
