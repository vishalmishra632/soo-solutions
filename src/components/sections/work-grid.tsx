"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Expand } from "lucide-react";
import { Lightbox } from "@/components/shared/lightbox";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CaseStudy, CaseStudyImage } from "@/types";

const tileClass =
  "group relative block h-full w-full overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function WorkGrid({ items }: { items: CaseStudy[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<{ images: CaseStudyImage[]; index: number } | null>(null);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const cover = item.cover;
            if (!cover) return null;
            const isCaseStudy = Boolean(item.challenge && item.solution);
            const galleryImages = item.gallery && item.gallery.length > 0 ? item.gallery : [cover];

            const media = (
              <>
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span
                  aria-hidden
                  className="from-foreground/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="bg-card/90 text-foreground inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize">
                    {item.segment}
                  </span>
                  <span className="text-background inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:opacity-100">
                    {isCaseStudy ? (
                      <>
                        View project <ArrowUpRight className="size-4" aria-hidden />
                      </>
                    ) : (
                      <>
                        View photo <Expand className="size-4" aria-hidden />
                      </>
                    )}
                  </span>
                </span>
              </>
            );

            return (
              <motion.li
                key={item.slug}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
              >
                {isCaseStudy ? (
                  <Link href={`/work/${item.slug}`} className={tileClass} aria-label={`${item.title} — view project`}>
                    {media}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLightbox({ images: galleryImages, index: 0 })}
                    className={cn(tileClass, "text-left")}
                    aria-label={`${item.title} — view photo`}
                  >
                    {media}
                  </button>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {lightbox ? (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onIndexChange={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
