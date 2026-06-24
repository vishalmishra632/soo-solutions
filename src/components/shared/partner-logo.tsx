// Renders the in-house neutral SVG lockups in public/images/partners/. These are PLACEHOLDERS, not the
// official brand marks (see public/images/CREDITS.md) — SVG is vector, so next/image optimisation/blur
// isn't needed and a plain <img> is correct here.
const DIMENSIONS: Record<string, { width: number; height: number }> = {
  Lorex: { width: 200, height: 56 },
  Hikvision: { width: 280, height: 56 },
  HiLook: { width: 210, height: 56 },
};

export function PartnerLogo({ name, className = "h-7 w-auto" }: { name: string; className?: string }) {
  const dims = DIMENSIONS[name] ?? { width: 220, height: 56 };
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/partners/${name.toLowerCase()}.svg`}
      alt={name}
      width={dims.width}
      height={dims.height}
      loading="lazy"
      className={className}
    />
  );
}
