import { coverageIntro, coverageZones } from "@/content/coverage";

// Shown on mobile and under prefers-reduced-motion in place of the WebGL flythrough: the same story,
// told as a calm dark panel with a simple coverage diagram and the zone list.
export function CoverageStatic() {
  return (
    <section
      aria-labelledby="coverage-heading"
      className="relative overflow-hidden bg-[#0a1020] py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #14203c 0%, #0a1020 60%, #070b16 100%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-display text-sm font-medium tracking-widest text-blue-300 uppercase">
            {coverageIntro.eyebrow}
          </p>
          <h2
            id="coverage-heading"
            className="font-display mt-3 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-bold tracking-tight text-white"
          >
            {coverageIntro.heading}
          </h2>
          <p className="mt-4 max-w-md text-base text-blue-100/70">{coverageIntro.lead}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {coverageZones.map((zone) => (
              <li key={zone.id} className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-4">
                <span className="block font-display text-sm font-semibold text-white">
                  {zone.label}
                </span>
                <span className="mt-1 block text-xs text-blue-100/60">{zone.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <CoverageDiagram />
      </div>
    </section>
  );
}

// A static SVG of the camera, its coverage fan, and the four lit zones — the still version of the scene.
function CoverageDiagram() {
  return (
    <svg
      viewBox="0 0 320 280"
      aria-hidden
      className="mx-auto w-full max-w-sm text-blue-400"
    >
      <defs>
        <radialGradient id="fan" cx="50%" cy="12%" r="90%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M160 40 L40 250 L280 250 Z" fill="url(#fan)" />
      {[
        { x: 78, y: 214 },
        { x: 132, y: 244 },
        { x: 196, y: 244 },
        { x: 250, y: 214 },
      ].map((zone) => (
        <g key={zone.x}>
          <circle cx={zone.x} cy={zone.y} r="9" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.9" />
          <circle cx={zone.x} cy={zone.y} r="3" fill="#bfdbfe" />
        </g>
      ))}
      <line x1="160" y1="40" x2="160" y2="92" stroke="#16213d" strokeWidth="6" strokeLinecap="round" />
      <circle cx="160" cy="40" r="14" fill="#21386b" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="160" cy="40" r="5" fill="#070b16" />
    </svg>
  );
}
