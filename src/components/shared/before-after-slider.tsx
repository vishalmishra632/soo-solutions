"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { CaseStudyImage } from "@/types";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function BeforeAfterSlider({
  before,
  after,
}: {
  before: CaseStudyImage;
  after: CaseStudyImage;
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  // Reduced motion: no drag, no clip animation — a labelled, static two-up instead.
  if (prefersReducedMotion) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { image: before, label: "Before" },
          { image: after, label: "After" },
        ].map(({ image, label }) => (
          <figure key={label}>
            <div className="border-border overflow-hidden rounded-xl border">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <figcaption className="text-muted-foreground mt-2 text-sm font-medium">{label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const moveFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons === 1) moveFromClientX(event.clientX);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step: Record<string, number> = {
      ArrowLeft: -2,
      ArrowRight: 2,
      PageDown: -10,
      PageUp: 10,
    };
    if (event.key in step) {
      event.preventDefault();
      setPosition((current) => clamp(current + step[event.key]));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  const rounded = Math.round(position);

  return (
    <div>
      <div
        ref={containerRef}
        className="border-border relative aspect-[16/10] w-full touch-none overflow-hidden rounded-xl border select-none"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          moveFromClientX(event.clientX);
        }}
        onPointerMove={onPointerMove}
      >
        <Image src={after.src} alt={after.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="100vw" className="object-cover" />
        </div>

        <span className="bg-foreground/80 text-background absolute top-3 left-3 rounded-full px-2 py-0.5 text-xs font-medium">
          Before
        </span>
        <span className="bg-foreground/80 text-background absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
          After
        </span>

        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${position}%` }}>
          <span aria-hidden className="bg-background/90 absolute inset-y-0 -ml-px w-0.5" />
          <button
            type="button"
            role="slider"
            aria-label="Reveal the install — before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rounded}
            aria-valuetext={`${rounded}% before, ${100 - rounded}% after`}
            onKeyDown={onKeyDown}
            className="bg-primary text-primary-foreground shadow-elevated focus-visible:ring-ring focus-visible:ring-offset-background pointer-events-auto absolute top-1/2 -ml-5 flex size-10 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <MoveHorizontal className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <p className="text-muted-foreground mt-3 text-sm">
        Drag the handle, or use the arrow keys, to compare before and after.
      </p>
    </div>
  );
}
