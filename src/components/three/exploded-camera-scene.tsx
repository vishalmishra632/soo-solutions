"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ReleaseContextOnUnmount } from "./release-context";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Group } from "three";
import { silenceThreeClockDeprecation } from "./silence-three-warnings";

silenceThreeClockDeprecation();

// Brand materials (shared with the hero camera): navy body, glowing accent ring, dark glass, a green
// sensor board. Each part flies out along its own axis from the assembled camera, with a floating
// label, then lerps back when `exploded` flips off. `factor` is held in a ref so it never re-renders.
const BODY = { color: "#21386b", roughness: 0.45, metalness: 0.55 };
const DARK = { color: "#0c1326", roughness: 0.5, metalness: 0.45 };
const LENS = { color: "#070b16", roughness: 0.08, metalness: 0.95 };
const ACCENT = { color: "#3b82f6", emissive: "#2563eb", emissiveIntensity: 2, toneMapped: false };
const SENSOR = { color: "#0b3d2e", emissive: "#10b981", emissiveIntensity: 0.6, toneMapped: false };

type Part = {
  name: string;
  offset: [number, number, number];
  label: [number, number, number];
  mesh: ReactNode;
};

const PARTS: Part[] = [
  {
    name: "Lens",
    offset: [0, 0, 1.35],
    label: [0, 0.55, 0.6],
    mesh: (
      <mesh position={[0, 0, 0.6]}>
        <sphereGeometry args={[0.34, 40, 40]} />
        <meshStandardMaterial {...LENS} />
      </mesh>
    ),
  },
  {
    name: "IR ring",
    offset: [0, 0, 0.85],
    label: [0.7, 0.12, 0.58],
    mesh: (
      <mesh position={[0, 0, 0.58]}>
        <torusGeometry args={[0.4, 0.045, 16, 64]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
    ),
  },
  {
    name: "Sun shade",
    offset: [0, 0.05, 0.42],
    label: [0, 0.55, 0.45],
    mesh: (
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.45]}>
        <cylinderGeometry args={[0.44, 0.44, 0.16, 48]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
    ),
  },
  {
    name: "Housing",
    offset: [0, 0, 0],
    label: [-0.7, 0.5, 0],
    mesh: (
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.4, 0.4, 1.4, 48]} />
        <meshStandardMaterial {...BODY} />
      </mesh>
    ),
  },
  {
    name: "Image sensor",
    offset: [0, 0, -0.8],
    label: [0.6, -0.4, -0.2],
    mesh: (
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.06, 32]} />
          <meshStandardMaterial {...SENSOR} />
        </mesh>
        <mesh position={[0, 0, -0.16]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial {...LENS} />
        </mesh>
      </group>
    ),
  },
  {
    name: "Mount",
    offset: [0, -0.9, 0],
    label: [0, -0.62, -0.28],
    mesh: (
      <group>
        <mesh position={[0, -0.55, -0.28]}>
          <cylinderGeometry args={[0.06, 0.06, 0.55, 24]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        <mesh position={[0, -0.82, -0.28]}>
          <cylinderGeometry args={[0.22, 0.24, 0.08, 32]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
      </group>
    ),
  },
];

function ExplodedCamera({ exploded }: { exploded: boolean }) {
  const factor = useRef(0);
  const groups = useRef<(Group | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  useFrame(() => {
    const target = exploded ? 1 : 0;
    factor.current += (target - factor.current) * 0.09;
    const f = factor.current;
    PARTS.forEach((part, index) => {
      const group = groups.current[index];
      if (group) group.position.set(part.offset[0] * f, part.offset[1] * f, part.offset[2] * f);
      const label = labels.current[index];
      if (label) label.style.opacity = String(Math.max(0, f * 1.15 - 0.15));
    });
  });

  return (
    <group position={[0, 0.1, 0.2]}>
      {PARTS.map((part, index) => (
        <group
          key={part.name}
          ref={(element) => {
            groups.current[index] = element;
          }}
        >
          {part.mesh}
          <Html position={part.label} center wrapperClass="pointer-events-none" zIndexRange={[6, 0]}>
            <div
              ref={(element) => {
                labels.current[index] = element;
              }}
              style={{ opacity: 0 }}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0f1830]/85 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-blue-400" />
              {part.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function ExplodedCameraScene({ exploded }: { exploded: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0] && setActive(entries[0].isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [3.6, 1.9, 5], fov: 36, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ReleaseContextOnUnmount />
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <ExplodedCamera exploded={exploded} />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[2, 3, 3]} scale={3} />
          <Lightformer intensity={1} color="#cfe0ff" position={[-3, 1, 2]} scale={2} />
        </Environment>
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.7} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
