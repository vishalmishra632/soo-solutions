"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/shared/lightbox";
import type { CaseStudyImage } from "@/types";

export function CaseGallery({ images }: { images: CaseStudyImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, position) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(position)}
              aria-label={image.alt}
              className="group border-border bg-card shadow-card focus-visible:ring-ring relative block aspect-[4/3] w-full overflow-hidden rounded-xl border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width:768px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
      </ul>

      {index !== null ? (
        <Lightbox images={images} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
      ) : null}
    </>
  );
}
