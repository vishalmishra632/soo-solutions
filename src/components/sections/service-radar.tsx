"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// A "coverage radar" centred on the Soo: concentric range rings, a slow sweep, and pings rippling out
// over a few nearby markers. Pure ambience for the service-area story — the sweep/pings are dropped
// under prefers-reduced-motion, leaving a clean static radar.
const RINGS = [16, 30, 44];
const NEARBY = [
  { x: 30, y: 28 },
  { x: 72, y: 33 },
  { x: 66, y: 70 },
  { x: 24, y: 64 },
  { x: 79, y: 56 },
];

export function ServiceRadar({ cityName }: { cityName: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="border-primary/20 relative aspect-square w-full max-w-[460px] overflow-hidden rounded-2xl border">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, #13243f 0%, #0a1424 72%)" }}
      />

      {!reduce ? (
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(96,165,250,0.22), rgba(96,165,250,0.02) 22%, transparent 32%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
      ) : null}

      {!reduce
        ? [0, 1.5].map((delay) => (
            <motion.span
              key={delay}
              aria-hidden
              className="border-primary/40 absolute top-1/2 left-1/2 rounded-full border"
              style={{ x: "-50%", y: "-50%" }}
              initial={{ width: "10%", height: "10%", opacity: 0.55 }}
              animate={{ width: "86%", height: "86%", opacity: 0 }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay }}
            />
          ))
        : null}

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {RINGS.map((r) => (
          <circle key={r} cx={50} cy={50} r={r} fill="none" stroke="#3b82f6" strokeOpacity={0.18} strokeWidth={0.4} />
        ))}
        <line x1={50} y1={6} x2={50} y2={94} stroke="#3b82f6" strokeOpacity={0.1} strokeWidth={0.3} />
        <line x1={6} y1={50} x2={94} y2={50} stroke="#3b82f6" strokeOpacity={0.1} strokeWidth={0.3} />
        {NEARBY.map((marker) => (
          <circle key={`${marker.x}-${marker.y}`} cx={marker.x} cy={marker.y} r={1.1} fill="#60a5fa" fillOpacity={0.7} />
        ))}
        <circle cx={50} cy={50} r={3.6} fill="#3b82f6" fillOpacity={0.25} />
        <circle cx={50} cy={50} r={1.8} fill="#bfdbfe" />
      </svg>

      <span className="absolute top-1/2 left-1/2 mt-4 -translate-x-1/2 font-mono text-[10px] tracking-widest whitespace-nowrap text-blue-200/85 uppercase">
        {cityName}
      </span>

      <div
        aria-hidden
        className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-blue-200/70 uppercase"
      >
        <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
        Local · since 2019
      </div>
    </div>
  );
}
