import { cn } from "@/lib/utils";

// A camera iris built from real geometry: a lens ring, a pulsing focus ring, and six swept blades
// around a central hexagon opening. Stroke inherits `currentColor` so callers set the brand colour.
const BLADES = 6;
const CENTER = 60;
const LENS_RING = 54;
const FOCUS_RING = 46;
const BLADE_OUTER = 42;
const BLADE_INNER = 14;
const BLADE_SWEEP = 26; // degrees each blade leans, which reads as an iris rather than a plain star

function polar(radius: number, degrees: number): readonly [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [CENTER + radius * Math.cos(radians), CENTER + radius * Math.sin(radians)];
}

const innerVertices = Array.from({ length: BLADES }, (_, index) => polar(BLADE_INNER, index * 60 + 30));
const hexagonPoints = innerVertices.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
const bladeEdges = innerVertices.map(([x1, y1], index) => {
  const [x2, y2] = polar(BLADE_OUTER, index * 60 + 30 - BLADE_SWEEP);
  return { x1, y1, x2, y2 };
});

interface CameraApertureProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function CameraAperture({ size = 96, className, animated = true }: CameraApertureProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("text-primary", className)}
      aria-hidden
      focusable="false"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={FOCUS_RING}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className={cn("origin-center opacity-40", animated && "animate-focus-pulse")}
      />
      <circle cx={CENTER} cy={CENTER} r={LENS_RING} fill="none" stroke="currentColor" strokeWidth={3} />
      <g
        style={{ transformOrigin: "60px 60px" }}
        className={cn(animated && "animate-aperture-spin")}
      >
        <polygon
          points={hexagonPoints}
          fill="currentColor"
          fillOpacity={0.08}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {bladeEdges.map((edge, index) => (
          <line
            key={index}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}
