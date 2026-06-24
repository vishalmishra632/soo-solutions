import { RoundedBox } from "@react-three/drei";
import type { ReactNode } from "react";

// Shared brand materials for every camera type: deep-navy body, electric-blue emissive accent ring,
// dark glass lens, tinted dome glass, light trim. Spread as props so each mesh owns its material and
// R3F disposes it automatically when the model unmounts on swap (no manual dispose / no leaks).
const BODY = { color: "#21386b", roughness: 0.45, metalness: 0.55 };
const DARK = { color: "#0c1326", roughness: 0.5, metalness: 0.45 };
const LENS = { color: "#070b16", roughness: 0.08, metalness: 0.95 };
const GLASS = {
  color: "#0a1124",
  roughness: 0.06,
  metalness: 0.9,
  emissive: "#1e3a8a",
  emissiveIntensity: 0.35,
  toneMapped: false,
};
const ACCENT = { color: "#3b82f6", emissive: "#2563eb", emissiveIntensity: 2, toneMapped: false };
const TRIM = { color: "#ccd8ef", roughness: 0.55, metalness: 0.25 };

// userData on emissive parts so the swap "shutter flash" can find them and pulse emissiveIntensity.
const accentFlash = { flash: true, baseEmissive: 2 } as const;
const glassFlash = { flash: true, baseEmissive: 0.35 } as const;

export type HeroCameraSlug = "bullet" | "dome" | "turret" | "ptz" | "video-doorbell";

// Ordered cycle for the hero. Names/descriptions are pulled from cameraTypes by slug elsewhere.
export const HERO_SLUGS: HeroCameraSlug[] = ["bullet", "dome", "turret", "ptz", "video-doorbell"];

function Bullet() {
  return (
    <group>
      {/* barrel along Z */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.08]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 1.4, 48]} />
        <meshStandardMaterial {...BODY} />
      </mesh>
      {/* sun shade lip */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.45]}>
        <cylinderGeometry args={[0.44, 0.44, 0.16, 48]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      {/* lens */}
      <mesh position={[0, 0, 0.6]}>
        <sphereGeometry args={[0.34, 48, 48]} />
        <meshStandardMaterial {...LENS} />
      </mesh>
      {/* accent ring */}
      <mesh position={[0, 0, 0.58]} userData={accentFlash}>
        <torusGeometry args={[0.4, 0.045, 16, 64]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      {/* mount arm + base */}
      <mesh position={[0, -0.55, -0.28]}>
        <cylinderGeometry args={[0.06, 0.06, 0.55, 24]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      <mesh position={[0, -0.82, -0.28]}>
        <cylinderGeometry args={[0.22, 0.24, 0.08, 32]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
    </group>
  );
}

function Dome() {
  return (
    <group position={[0, -0.05, 0]}>
      {/* ceiling plate */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 48]} />
        <meshStandardMaterial {...BODY} />
      </mesh>
      {/* accent rim */}
      <mesh position={[0, 0.33, 0]} rotation={[Math.PI / 2, 0, 0]} userData={accentFlash}>
        <torusGeometry args={[0.5, 0.035, 16, 64]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      {/* tinted dome cover (bulging down) */}
      <mesh position={[0, 0.34, 0]} rotation={[Math.PI, 0, 0]} userData={glassFlash}>
        <sphereGeometry args={[0.52, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...GLASS} transparent opacity={0.92} />
      </mesh>
      {/* inner lens visible through the dome */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.2, 40, 40]} />
        <meshStandardMaterial {...LENS} />
      </mesh>
    </group>
  );
}

function Turret() {
  return (
    <group position={[0, -0.02, 0]}>
      {/* wall/ceiling mount cup */}
      <mesh position={[0, -0.34, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.16, 48]} />
        <meshStandardMaterial {...BODY} />
      </mesh>
      <mesh position={[0, -0.26, 0]}>
        <sphereGeometry args={[0.48, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      {/* eyeball */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.44, 56, 56]} />
        <meshStandardMaterial {...BODY} />
      </mesh>
      {/* lens disc on the eyeball front, tilted up-forward */}
      <group position={[0, 0.12, 0.16]} rotation={[-0.5, 0, 0]}>
        <mesh position={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.08, 48]} />
          <meshStandardMaterial {...LENS} />
        </mesh>
        <mesh position={[0, 0, 0.22]} userData={accentFlash}>
          <torusGeometry args={[0.29, 0.03, 16, 64]} />
          <meshStandardMaterial {...ACCENT} />
        </mesh>
      </group>
    </group>
  );
}

function Ptz() {
  return (
    <group position={[0, -0.12, 0]}>
      {/* ceiling flange */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 48]} />
        <meshStandardMaterial {...BODY} />
      </mesh>
      {/* motor housing */}
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.32, 48]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      {/* accent seam */}
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]} userData={accentFlash}>
        <torusGeometry args={[0.58, 0.045, 16, 64]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      {/* large moving dome */}
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI, 0, 0]} userData={glassFlash}>
        <sphereGeometry args={[0.6, 56, 56, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...GLASS} transparent opacity={0.9} />
      </mesh>
      {/* protruding zoom lens */}
      <group position={[0, 0.16, 0.3]} rotation={[0.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.22, 0.4, 40]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <sphereGeometry args={[0.19, 40, 40]} />
          <meshStandardMaterial {...LENS} />
        </mesh>
      </group>
    </group>
  );
}

function Doorbell() {
  return (
    <group scale={1.22}>
      {/* rounded faceplate */}
      <RoundedBox args={[0.58, 1.14, 0.22]} radius={0.18} smoothness={6}>
        <meshStandardMaterial {...BODY} />
      </RoundedBox>
      {/* recessed front panel */}
      <RoundedBox args={[0.42, 0.96, 0.05]} radius={0.14} smoothness={5} position={[0, 0, 0.11]}>
        <meshStandardMaterial {...DARK} />
      </RoundedBox>
      {/* lens at top */}
      <mesh position={[0, 0.34, 0.16]}>
        <sphereGeometry args={[0.15, 44, 44]} />
        <meshStandardMaterial {...LENS} />
      </mesh>
      <mesh position={[0, 0.34, 0.17]} userData={accentFlash}>
        <torusGeometry args={[0.17, 0.022, 16, 56]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      {/* speaker grille */}
      {[-0.05, 0, 0.05].map((y) => (
        <mesh key={y} position={[0, y, 0.15]}>
          <boxGeometry args={[0.22, 0.014, 0.02]} />
          <meshStandardMaterial {...TRIM} />
        </mesh>
      ))}
      {/* call button with glowing ring */}
      <mesh position={[0, -0.32, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.06, 40]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      <mesh position={[0, -0.32, 0.18]} userData={accentFlash}>
        <torusGeometry args={[0.16, 0.028, 16, 56]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
    </group>
  );
}

const BUILDERS: Record<HeroCameraSlug, () => ReactNode> = {
  bullet: Bullet,
  dome: Dome,
  turret: Turret,
  ptz: Ptz,
  "video-doorbell": Doorbell,
};

/** Returns the primitive model for a camera slug (one model mounted at a time). */
export function buildCamera(slug: HeroCameraSlug): ReactNode {
  const Model = BUILDERS[slug];
  return <Model />;
}
