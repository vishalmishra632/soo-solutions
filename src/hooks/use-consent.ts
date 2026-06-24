"use client";

import { useSyncExternalStore } from "react";
import type { ConsentChoice } from "@/lib/consent";
import {
  acceptConsent,
  declineConsent,
  getConsentServerSnapshot,
  getConsentSnapshot,
  reopenConsent,
  subscribeConsent,
} from "@/lib/consent-store";

interface ConsentApi {
  choice: ConsentChoice | null;
  ready: boolean;
  accept: () => void;
  decline: () => void;
  reopen: () => void;
}

/** Subscribes to the visitor's consent choice. `ready` is false until the cookie has been read on the client. */
export function useConsent(): ConsentApi {
  const state = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const ready = state !== "unknown";

  return {
    choice: ready ? state : null,
    ready,
    accept: acceptConsent,
    decline: declineConsent,
    reopen: reopenConsent,
  };
}
