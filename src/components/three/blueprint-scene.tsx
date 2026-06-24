"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ReleaseContextOnUnmount } from "./release-context";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  Color,
  type Group,
  type Mesh,
  MeshBasicMaterial,
  type MeshStandardMaterial,
} from "three";
import { buildCamera } from "./camera-builders";
import { silenceThreeClockDeprecation } from "./silence-three-warnings";

silenceThreeClockDeprecation();

// Scroll morphs one camera from a glowing wireframe "plan" into the finished, solid unit — two copies
// of the same model cross-fading, with a scan ring rising through it as it materialises. `progress` is a
// plain ref (0..1) the parent feeds from page scroll, read in useFrame so scrolling never re-renders.
type ProgressRef = { current: number };

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

function BuildCamera({ progress }: { progress: ProgressRef }) {
  const rig = useRef<Group>(null);
  const blueprint = useRef<Group>(null);
  const solid = useRef<Group>(null);
  const solidMeshes = useRef<Mesh[]>([]);
  const wireMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#7cc0ff"),
        wireframe: true,
        transparent: true,
        opacity: 1,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => {
    blueprint.current?.traverse((child) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) mesh.material = wireMaterial;
    });
    const collected: Mesh[] = [];
    solid.current?.traverse((child) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) {
        const material = mesh.material as MeshStandardMaterial;
        material.transparent = true;
        mesh.userData.baseOpacity = material.opacity;
        collected.push(mesh);
      }
    });
    solidMeshes.current = collected;
    const material = wireMaterial;
    return () => material.dispose();
  }, [wireMaterial]);

  useFrame((_, delta) => {
    const rigGroup = rig.current;
    if (!rigGroup) return;
    rigGroup.rotation.y += delta * 0.25;

    const p = easeInOut(clamp01(progress.current));
    wireMaterial.opacity = clamp01(1 - smoothstep(0.1, 0.7, p));
    const solidOpacity = smoothstep(0.3, 0.95, p);
    solidMeshes.current.forEach((mesh) => {
      const material = mesh.material as MeshStandardMaterial;
      material.opacity = (mesh.userData.baseOpacity ?? 1) * solidOpacity;
    });
    rigGroup.scale.setScalar(0.95 + 0.05 * p);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={rig}>
        <group ref={blueprint}>{buildCamera("bullet")}</group>
        <group ref={solid}>{buildCamera("bullet")}</group>
      </group>
    </Float>
  );
}

function ScanRing({ progress }: { progress: ProgressRef }) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    const p = clamp01(progress.current);
    if (mesh.current) mesh.current.position.y = -1.1 + 2.2 * easeInOut(p);
    if (material.current) material.current.opacity = Math.sin(p * Math.PI) * 0.6;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.46, 0.62, 64]} />
      <meshBasicMaterial
        ref={material}
        color="#9fd0ff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function ScrollCamera({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree();
  useFrame(() => {
    const eased = easeInOut(clamp01(progress.current));
    camera.position.set(0, 0.2, 5.1 - 0.7 * eased);
    camera.lookAt(0, -0.05, 0);
  });
  return null;
}

export function BlueprintScene({ progress }: { progress: ProgressRef }) {
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
        camera={{ position: [0, 0.2, 5.1], fov: 40, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ReleaseContextOnUnmount />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <BuildCamera progress={progress} />
        <ScanRing progress={progress} />
        <ScrollCamera progress={progress} />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[2, 3, 3]} scale={3} />
          <Lightformer intensity={1} color="#cfe0ff" position={[-3, 1, 2]} scale={2} />
        </Environment>
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.55} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
