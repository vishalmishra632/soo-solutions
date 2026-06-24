"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

// Frees this canvas's WebGL context the instant it unmounts, instead of leaving it for garbage
// collection. Each page mounts several R3F canvases; without an explicit release, navigating between
// pages piles up live contexts until the browser hits its per-tab cap (~16 in Chrome) and starts
// dropping older ones — which is why a scene can come back blank or slow to load after a round trip.
export function ReleaseContextOnUnmount() {
  const renderer = useThree((state) => state.gl);

  useEffect(() => {
    return () => {
      renderer.forceContextLoss();
    };
  }, [renderer]);

  return null;
}
