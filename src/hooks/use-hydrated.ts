"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// False on the server and during the first client render, true once hydrated —
// the no-flash way to gate client-only UI without setState-in-effect.
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
