"use client";

import { Float } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { HERO_SLUGS, buildCamera } from "./camera-builders";

const EXIT_S = 0.28;
const ENTER_S = 0.34;
const FLASH_S = 0.45;
const SWAP_SPIN = Math.PI * 1.1;
const FLASH_SPIKE = 3.2;
const HOVER_SCALE = 0.05;
const HOVER_GLOW = 0.7;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Slight overshoot so the incoming camera "settles" into place like a shutter.
function easeOutBack(t: number) {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}

type Phase = "idle" | "exiting" | "entering";

// The hero camera: auto-rotate + idle float + pointer parallax (unchanged), plus a click-driven morph
// between camera types. Only one model is mounted at a time; R3F disposes the old geometries/materials
// when `rendered` changes. The brand "shutter flash" pulses the emissive accent rings on each swap.
export function CameraModel({ index, onAdvance }: { index: number; onAdvance: () => void }) {
  const rig = useRef<Group>(null);
  const swap = useRef<Group>(null);
  const [rendered, setRendered] = useState(index);
  const hovered = useRef(false);
  const hoverAmount = useRef(0);
  const anim = useRef<{ phase: Phase; t: number; flash: number }>({ phase: "idle", t: 0, flash: 0 });

  // The parent locks input during a swap, so `index` only changes from idle — kick off the exit here.
  useEffect(() => {
    if (index === rendered) return;
    anim.current.phase = "exiting";
    anim.current.t = 0;
  }, [index, rendered]);

  // Don't leave the cursor stuck as a pointer if we unmount mid-hover.
  useEffect(() => () => {
    document.body.style.cursor = "auto";
  }, []);

  useFrame((state, delta) => {
    const rigGroup = rig.current;
    const swapGroup = swap.current;
    if (!rigGroup || !swapGroup) return;

    rigGroup.rotation.y += delta * 0.25;
    const targetTilt = -state.pointer.y * 0.2;
    rigGroup.rotation.x += (targetTilt - rigGroup.rotation.x) * 0.05;

    hoverAmount.current += ((hovered.current ? 1 : 0) - hoverAmount.current) * 0.15;

    const a = anim.current;
    let scale = 1 + hoverAmount.current * HOVER_SCALE;
    let spin = 0;

    if (a.phase === "exiting") {
      a.t = Math.min(1, a.t + delta / EXIT_S);
      const progress = easeOutCubic(a.t);
      scale = 1 - progress;
      spin = progress * SWAP_SPIN;
      if (a.t >= 1) {
        setRendered(index);
        a.flash = 1;
        a.phase = "entering";
        a.t = 0;
      }
    } else if (a.phase === "entering") {
      a.t = Math.min(1, a.t + delta / ENTER_S);
      scale = easeOutBack(a.t);
      spin = (1 - a.t) * -SWAP_SPIN * 0.5;
      if (a.t >= 1) a.phase = "idle";
    }

    swapGroup.scale.setScalar(scale);
    swapGroup.rotation.y = spin;

    if (a.flash > 0) a.flash = Math.max(0, a.flash - delta / FLASH_S);
    const flash = a.flash * a.flash * FLASH_SPIKE + hoverAmount.current * HOVER_GLOW;
    swapGroup.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.userData?.flash) return;
      const material = mesh.material as MeshStandardMaterial;
      material.emissiveIntensity = mesh.userData.baseEmissive + flash;
    });
  });

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    onAdvance();
  }

  function handleOver(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    hovered.current = true;
    document.body.style.cursor = "pointer";
  }

  function handleOut() {
    hovered.current = false;
    document.body.style.cursor = "auto";
  }

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={rig}>
        <group ref={swap} onClick={handleClick} onPointerOver={handleOver} onPointerOut={handleOut}>
          {buildCamera(HERO_SLUGS[rendered])}
        </group>
      </group>
    </Float>
  );
}
