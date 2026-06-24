"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Grid, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ReleaseContextOnUnmount } from "./release-context";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
  Vector3,
} from "three";
import { buildCamera } from "./camera-builders";
import { silenceThreeClockDeprecation } from "./silence-three-warnings";

silenceThreeClockDeprecation();

// A scroll-linked "coverage" flythrough: one camera on a pole sweeps a soft beam of light from its lens
// down across a dark property grid, locking onto each zone as it lands on it, while the view camera
// arcs in. `progress` is a plain ref (0..1) the parent feeds from page scroll, read inside useFrame so
// scrolling never re-renders React.
type ProgressRef = { current: number };

const ZONE_ANGLES = [-0.95, -0.32, 0.32, 0.95];
const ZONE_RADIUS = 4.6;
const SWEEP_FROM = ZONE_ANGLES[0] - 0.18;
const SWEEP_TO = ZONE_ANGLES[ZONE_ANGLES.length - 1] + 0.18;
const BLUE: [number, number, number] = [0.231, 0.51, 0.965];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
const sweepYaw = (progress: number) => lerp(SWEEP_FROM, SWEEP_TO, easeInOut(clamp01(progress)));

// A triangle fan (apex + ground arc) with per-vertex RGBA so edges feather to nothing — no hard lines.
// Apex elevated = a light beam from the lens; apex on the ground = the soft pool where it lands.
function buildFan(
  apex: [number, number, number],
  baseY: number,
  radius: number,
  halfAngle: number,
  apexAlpha: number,
  edgeAlpha: (t: number) => number,
): BufferGeometry {
  const segments = 30;
  const positions: number[] = [apex[0], apex[1], apex[2]];
  const colors: number[] = [BLUE[0], BLUE[1], BLUE[2], apexAlpha];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const angle = -halfAngle + 2 * halfAngle * t;
    positions.push(Math.sin(angle) * radius, baseY, Math.cos(angle) * radius);
    colors.push(BLUE[0], BLUE[1], BLUE[2], edgeAlpha(t));
  }
  const indices: number[] = [];
  for (let i = 1; i <= segments; i += 1) indices.push(0, i, i + 1);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 4));
  geometry.setIndex(indices);
  return geometry;
}

function ScanRig({ progress }: { progress: ProgressRef }) {
  const rig = useRef<Group>(null);
  const beamMaterial = useRef<MeshBasicMaterial>(null);
  // Beam: apex near the lens (elevated + forward), fading down to the ground arc.
  const beamGeometry = useMemo(() => buildFan([0, 1.5, 0.45], 0.02, 6, 0.34, 0.26, () => 0.015), []);
  // Footprint: the soft pool of light on the ground, feathered to nothing at the side edges.
  const footprintGeometry = useMemo(
    () => buildFan([0, 0.05, 0], 0.05, 6.2, 0.36, 0.18, (t) => Math.sin(Math.PI * t) * 0.14),
    [],
  );

  useFrame((state) => {
    const group = rig.current;
    if (!group) return;
    group.rotation.y = sweepYaw(progress.current);
    if (beamMaterial.current) {
      beamMaterial.current.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 2.2) * 0.1;
    }
  });

  return (
    <group ref={rig}>
      <group position={[0, 1.7, 0]} rotation={[0.34, 0, 0]} scale={0.6}>
        {buildCamera("bullet")}
      </group>
      <mesh geometry={beamGeometry}>
        <meshBasicMaterial
          ref={beamMaterial}
          vertexColors
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={footprintGeometry}>
        <meshBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Zones({ progress }: { progress: ProgressRef }) {
  const ringMaterials = useRef<(MeshStandardMaterial | null)[]>([]);
  const dotMaterials = useRef<(MeshStandardMaterial | null)[]>([]);
  const pulseMeshes = useRef<(Mesh | null)[]>([]);
  const pulseMaterials = useRef<(MeshBasicMaterial | null)[]>([]);
  const coverage = useRef<number[]>(ZONE_ANGLES.map(() => 0));
  const ripple = useRef<number[]>(ZONE_ANGLES.map(() => 0));

  useFrame((_, delta) => {
    const yaw = sweepYaw(progress.current);
    ZONE_ANGLES.forEach((angle, index) => {
      const covered = smoothstep(angle - 0.22, angle + 0.04, yaw);
      const ring = ringMaterials.current[index];
      const dot = dotMaterials.current[index];
      if (ring) ring.emissiveIntensity = 0.12 + covered * 3.2;
      if (dot) dot.emissiveIntensity = 0.3 + covered * 2.2;

      // Rising edge across "locked" fires a one-shot ripple that expands and fades.
      if (covered > 0.6 && coverage.current[index] <= 0.6) ripple.current[index] = 1;
      coverage.current[index] = covered;
      const value = (ripple.current[index] = Math.max(0, ripple.current[index] - delta * 1.3));

      const mesh = pulseMeshes.current[index];
      const material = pulseMaterials.current[index];
      if (mesh) mesh.scale.setScalar(1 + (1 - value) * 1.7);
      if (material) material.opacity = value * 0.7;
    });
  });

  return (
    <>
      {ZONE_ANGLES.map((angle, index) => (
        <group
          key={angle}
          position={[Math.sin(angle) * ZONE_RADIUS, 0.06, Math.cos(angle) * ZONE_RADIUS]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <mesh>
            <ringGeometry args={[0.52, 0.64, 56]} />
            <meshStandardMaterial
              ref={(element) => {
                ringMaterials.current[index] = element;
              }}
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.12}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
          <mesh>
            <circleGeometry args={[0.13, 28]} />
            <meshStandardMaterial
              ref={(element) => {
                dotMaterials.current[index] = element;
              }}
              color="#bfdbfe"
              emissive="#60a5fa"
              emissiveIntensity={0.3}
              toneMapped={false}
            />
          </mesh>
          <mesh
            ref={(element) => {
              pulseMeshes.current[index] = element;
            }}
          >
            <ringGeometry args={[0.6, 0.72, 56]} />
            <meshBasicMaterial
              ref={(element) => {
                pulseMaterials.current[index] = element;
              }}
              color="#93c5fd"
              transparent
              opacity={0}
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function ScrollCamera({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree();
  const target = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const eased = easeInOut(clamp01(progress.current));
    const angle = lerp(-0.16, 0.5, eased);
    const radius = lerp(12.5, 8.4, eased);
    const height = lerp(6.6, 3.4, eased);
    camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    target.set(0, lerp(1.3, 1.7, eased), lerp(2.8, 1.9, eased));
    camera.lookAt(target);
  });

  return null;
}

function Pole() {
  return (
    <mesh position={[0, 0.85, 0]}>
      <cylinderGeometry args={[0.05, 0.07, 1.7, 20]} />
      <meshStandardMaterial color="#16213d" roughness={0.6} metalness={0.4} />
    </mesh>
  );
}

export function CoverageScene({ progress }: { progress: ProgressRef }) {
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
    <div ref={wrapper} aria-hidden className="pointer-events-none h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 6.6, 12.5], fov: 42, near: 0.1, far: 120 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ReleaseContextOnUnmount />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 7, 3]} intensity={1.1} />
        <Grid
          args={[40, 40]}
          cellSize={1}
          cellThickness={0.6}
          cellColor="#1e3a8a"
          sectionSize={5}
          sectionThickness={1.1}
          sectionColor="#3b82f6"
          fadeDistance={32}
          fadeStrength={2}
          infiniteGrid
        />
        <Pole />
        <ScanRig progress={progress} />
        <Zones progress={progress} />
        <ScrollCamera progress={progress} />
        <Environment resolution={256}>
          <Lightformer intensity={1.6} position={[3, 4, 4]} scale={4} />
          <Lightformer intensity={0.8} color="#cfe0ff" position={[-4, 2, 2]} scale={3} />
        </Environment>
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
