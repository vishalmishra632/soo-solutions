"use client";

import { motion } from "motion/react";

// A brief CCTV "switching feed" cut, played once when it mounts: the screen dims behind scanlines, a
// bright sync-roll band sweeps top-to-bottom, and a corner cue flashes — then everything fades to
// nothing, revealing the new page beneath. Pointer-events are off throughout, and it only mounts on
// client navigations (see the marketing template), so it never becomes persistent chrome.
export function FeedSwitchOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(7,11,18,0.5)",
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px)",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-x-0 h-[22vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(96,165,250,0.15) 42%, rgba(226,240,255,0.55) 50%, rgba(96,165,250,0.15) 58%, transparent)",
        }}
        initial={{ top: "-25%" }}
        animate={{ top: "125%" }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      />

      <motion.div
        className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-blue-100/90 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.6, times: [0, 0.15, 0.7, 1], ease: "easeOut" }}
      >
        <span className="size-1.5 rounded-full bg-red-500" />
        Switching feed
      </motion.div>
    </div>
  );
}
