---
name: soo-motion-3d
description: when adding animation, scroll effects, micro-interactions, or the 3D hero.
---

Motion and 3D for the SOO Solutions marketing site. Light-mode-first, "bright not dark", reduced-motion-honest. Animate **transform/opacity only**. Stack: `motion` 12.40 (`import from 'motion/react'`), `gsap` 3.15 + `@gsap/react` + `ScrollTrigger`, `lenis` 1.3.23, `three` 0.184 + `@react-three/fiber` 9.6.1 + `drei` 10.7.7 + `@react-three/postprocessing` 3.0.4. See **soo-component-patterns** for component tiers, **soo-design-system** for OKLCH tokens and shadows.

## RULES — Motion

1. **Import from `'motion/react'`, never `'framer-motion'`.** Same API, current package.
2. **One easing constant everywhere:** `const EASE = [0.22, 1, 0.36, 1] as const;`
3. **Scroll reveals** use `whileInView` with `viewport={{ once: true }}` (add `margin: "-80px"` to trigger before fully visible). Never re-animate on scroll-back.
4. **Staggered load reveal:** stagger children via a parent variant with `staggerChildren`, or pass an incrementing `delay` to sibling reveals. Keep per-item delay small (~0.06–0.1s).
5. **App shell wraps children in `<MotionConfig reducedMotion="user">`** so every Motion component respects the OS setting without per-component guards. The `RevealOnScroll` early-return is a belt-and-suspenders extra for the bare children case.
6. **Animation/Motion wrappers are `"use client"` leaves only.** Pages and sections stay Server Components (see **soo-component-patterns**). Wrap the smallest possible subtree.

## RULES — GSAP + Lenis

7. **Lenis smooth scroll is driven by the GSAP ticker** — do not run two independent RAF loops. Add Lenis to `gsap.ticker`, disable GSAP's lag smoothing, and call `ScrollTrigger.update` on Lenis scroll.
8. **Both GSAP/ScrollTrigger and Lenis are disabled under `prefers-reduced-motion`.** Guard the provider; bail before constructing Lenis. Native scroll is the reduced-motion fallback.
9. **Use `@gsap/react`'s `useGSAP`** for any GSAP timeline so cleanup/revert is automatic. Register `ScrollTrigger` once: `gsap.registerPlugin(useGSAP, ScrollTrigger)`.

## RULES — Micro-interaction catalog

Each animates **transform/opacity only** (plus `box-shadow` via the `shadow-glow` token, which is GPU-cheap and pre-defined — see **soo-design-system**).

10. **Button lift + sheen** — on hover, `whileHover={{ y: -2 }}` for the lift; the sheen is an absolutely-positioned gradient span translated across with `transform: translateX`. Property: `transform`.
11. **Card tilt + glow** — track pointer over the card, map to small `rotateX`/`rotateY` (cap ±6deg) on a `transform-gpu` element, and add `shadow-glow` on hover. Properties: `transform` + the `shadow-glow` token.
12. **Magnetic CTA** — on `pointermove`, translate the button toward the cursor by a fraction of the offset (`x = dx * 0.25`), spring back to `0,0` on `pointerleave`. Property: `transform`.
13. **Animated counters** — drive a Motion value with `useMotionValue` + `animate(count, target, { ease: EASE })`, render via `useTransform(v => Math.round(v))`. Start on `whileInView` / once. Property: text content (no layout thrash).

> **RULE:** Never animate `backdrop-filter` (blur is a per-frame repaint = jank). Animate `transform`/`opacity` only. Glass surfaces keep a *static* `backdrop-blur`; do not transition it.

## RULES — 3D hero contract

14. The R3F `<Canvas>` is a **`"use client"` leaf**.
15. **Import via `next/dynamic` with `{ ssr: false }` and a `<Suspense>` static poster.** WebGL never runs on the server.
16. Camera subject = **a GLTF camera model OR a primitive "bullet camera" fallback** (cylinders + spheres) if no asset has landed yet.
17. Motion = **auto-rotate + idle float + subtle pointer parallax + LOW bloom on the lens** (postprocessing). Keep bloom intensity small so the bright theme stays clean.
18. **DPR clamped `[1, 1.5]`** on the Canvas. Never render at uncapped retina DPR.
19. **Pause when off-screen** — `frameloop="demand"` + invalidate, or gate with an IntersectionObserver. No rendering while scrolled away.
20. **Static poster image on mobile and under `prefers-reduced-motion`** — never ship WebGL there.
21. **3D is NEVER in the home first-load bundle.** Dynamic import keeps it out; first-load JS budget is < 130KB per route (see QA gates in **soo-component-patterns**).

---

## Snippet 1 — Canonical `RevealOnScroll` (shared, verbatim)

`src/components/shared/reveal-on-scroll.tsx`

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function RevealOnScroll({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
```

Stagger a list by feeding each child an incrementing `delay`:

```tsx
{pillars.map((pillar, index) => (
  <RevealOnScroll key={pillar.id} delay={index * 0.08}>
    <PillarCard {...pillar} />
  </RevealOnScroll>
))}
```

## Snippet 2 — `<MotionConfig>` app-shell wrapper

Put this in the root layout (or a thin client shell it renders). Every Motion component below it then honors the OS reduced-motion setting.

```tsx
"use client";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

```tsx
// src/app/layout.tsx (excerpt) — keep <html>/<body> as the Server Component
<body className="bg-background text-foreground font-sans antialiased">
  <MotionProvider>{children}</MotionProvider>
</body>
```

## Snippet 3 — Lenis ↔ GSAP ticker sync (reduced-motion guarded)

`src/components/shared/smooth-scroll-provider.tsx`

```tsx
"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // native scroll, no GSAP loop

    const lenis = new Lenis({ smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const advanceLenis = (time: number) => lenis.raf(time * 1000); // ticker is seconds
    gsap.ticker.add(advanceLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(advanceLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

## Snippet 4 — Dynamic 3D hero import (`ssr: false` + Suspense poster)

`src/components/sections/hero-3d.tsx` — this stays a Server-importable wrapper; the heavy Canvas is split out and never enters the first-load bundle.

```tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Image from "next/image";

const HeroPoster = () => (
  <Image
    src="/hero/camera-poster.avif"
    alt="Security camera rendered against a warm near-white studio backdrop"
    width={1280}
    height={720}
    priority
    className="h-full w-full object-cover"
  />
);

// ssr:false keeps WebGL off the server and out of the home first-load bundle.
const HeroCanvas = dynamic(() => import("./hero-canvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: HeroPoster,
});

export function Hero3D() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-elevated">
      <Suspense fallback={<HeroPoster />}>
        <HeroCanvas />
      </Suspense>
    </div>
  );
}
```

> For mobile + `prefers-reduced-motion`, render `<HeroPoster />` directly and skip `HeroCanvas` entirely (check a `useMediaQuery`/server hint at the section level).

## Snippet 5 — Minimal R3F `<Canvas>` hero scene (R3F 9 / drei 10 / three 0.184 / postprocessing 3)

`src/components/sections/hero-canvas.tsx` — the `"use client"` leaf. Primitive "bullet camera" fallback, auto-rotate + idle float via `useFrame`, DPR clamp, LOW bloom.

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Group } from "three";

function BulletCamera() {
  const rig = useRef<Group>(null);
  useFrame((_, delta) => {
    if (rig.current) rig.current.rotation.y += delta * 0.25; // auto-rotate
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={rig}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1.6, 48]} />
          <meshStandardMaterial color="#1f3a8a" roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.95]}>
          <sphereGeometry args={[0.42, 48, 48]} />
          <meshStandardMaterial color="#0b1020" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{ position: [0, 0.4, 4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <BulletCamera />
      <Environment preset="city" />
      <EffectComposer>
        <Bloom intensity={0.35} luminanceThreshold={0.85} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
```

Notes for this stack:
- `frameloop="demand"` pauses rendering until `invalidate()` (call it from pointer parallax / IntersectionObserver) — pair with an observer to stop work off-screen.
- Keep `Bloom intensity` low (~0.35) and `luminanceThreshold` high (~0.85) so only the lens glows; the bright light theme must stay clean (see "bright not dark" in **soo-design-system**).
- Pointer parallax: read pointer in `useFrame` (`state.pointer.x/.y`) and lerp the rig rotation by a small factor instead of hard-setting it.
- Real GLTF camera: swap `<BulletCamera>` for a `useGLTF`-loaded model wrapped in the same `<Float>` + rotation rig; keep the primitive version as the fallback.
