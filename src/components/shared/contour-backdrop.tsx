import { cn } from "@/lib/utils";

const RINGS = 9;

// A faint topographic / contour-line motif that drifts slowly behind a section for depth. Pure SVG +
// CSS (no WebGL), sits at -z-10 above the section background, and the drift stops under reduced motion.
export function ContourBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="text-primary/[0.07] animate-contour-drift absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        {Array.from({ length: RINGS }, (_, index) => (
          <ellipse
            key={index}
            cx={200}
            cy={200}
            rx={36 + index * 22}
            ry={26 + index * 15}
            stroke="currentColor"
            strokeWidth={1.2}
          />
        ))}
      </svg>
    </div>
  );
}
