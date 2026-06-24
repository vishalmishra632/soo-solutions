"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import { CameraModel } from "./camera-model";
import { ReleaseContextOnUnmount } from "./release-context";
import { HeroCameraPoster } from "./hero-camera-poster";
import { silenceThreeClockDeprecation } from "./silence-three-warnings";
import { cn } from "@/lib/utils";

// Runs once when this client-only chunk loads — before the Canvas constructs its clock.
silenceThreeClockDeprecation();

// Live hero scene: DPR-clamped, paused off-screen (frameloop toggle), soft studio lighting + contact
// shadow. `index` selects the camera type; clicking the model calls `onAdvance` (same as the DOM controls).
export function CameraScene({ index, onAdvance }: { index: number; onAdvance: () => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setActive(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} aria-hidden className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0.4, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ReleaseContextOnUnmount />
        <FirstFrameSignal onPainted={() => setPainted(true)} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <CameraModel index={index} onAdvance={onAdvance} />
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.28}
          scale={5.5}
          blur={2.8}
          far={2.2}
          resolution={256}
          color="#1c2540"
        />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[2, 2, 3]} scale={3} />
          <Lightformer intensity={1} color="#cfe0ff" position={[-3, 1, 2]} scale={2} />
        </Environment>
        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.85} mipmapBlur />
        </EffectComposer>
      </Canvas>

      {/* Hold the matching camera poster over the canvas until the live scene has painted its first
          frame, so a revisit shows the camera immediately and cross-fades in rather than flashing an
          empty canvas while the context, environment, and shaders re-initialise. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          painted ? "opacity-0" : "opacity-100",
        )}
      >
        <HeroCameraPoster index={index} />
      </div>
    </div>
  );
}

// Flips `painted` true on the very first rendered frame (one shot), which is when it's safe to fade the
// poster out and reveal the live scene.
function FirstFrameSignal({ onPainted }: { onPainted: () => void }) {
  const hasPainted = useRef(false);

  useFrame(() => {
    if (!hasPainted.current) {
      hasPainted.current = true;
      onPainted();
    }
  });

  return null;
}
