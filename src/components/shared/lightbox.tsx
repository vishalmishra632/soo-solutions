"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CaseStudyImage } from "@/types";

interface LightboxProps {
  images: CaseStudyImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

// Solid control chips on a known surface so text + focus ring meet AA regardless of the photo behind the scrim.
const chip =
  "inline-flex size-11 items-center justify-center rounded-full bg-card text-foreground shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const current = images[index];

  // Native <dialog> gives a focus trap, an inert top-layer background, and Esc handling for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // library-independent scroll lock
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const go = (delta: number) => onIndexChange((index + delta + count) % count);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" && count > 1) {
          event.preventDefault();
          go(1);
        } else if (event.key === "ArrowLeft" && count > 1) {
          event.preventDefault();
          go(-1);
        }
      }}
      aria-label={current ? current.alt : "Install photo"}
      className="backdrop:bg-foreground/85 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0"
    >
      <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-10">
        {current ? (
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
        ) : null}

        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={`absolute top-4 right-4 ${chip}`}>
          <X className="size-5" aria-hidden />
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className={`absolute top-1/2 left-4 -translate-y-1/2 ${chip}`}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className={`absolute top-1/2 right-4 -translate-y-1/2 ${chip}`}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <p
              aria-live="polite"
              className="bg-card text-foreground shadow-soft absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-sm font-medium"
            >
              {index + 1} / {count}
            </p>
          </>
        ) : null}
      </div>
    </dialog>
  );
}
