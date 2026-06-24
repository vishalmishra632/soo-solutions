"use client";

import { useEffect, useMemo, useState } from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  const opts = useMemo(
    () => ({ align: "start" as const, loop: true, duration: prefersReducedMotion ? 0 : 25 }),
    [prefersReducedMotion],
  );

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={opts}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2">
            <figure className="bg-card text-card-foreground shadow-card flex h-full flex-col rounded-xl p-8">
              <Quote className="text-primary/30 size-8" aria-hidden />
              <blockquote className="text-foreground mt-4 text-lg md:text-xl">
                {item.quote}
              </blockquote>
              <figcaption className="text-muted-foreground mt-6 text-sm">
                — {item.author}, {item.role} · <span className="capitalize">{item.segment}</span>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-center gap-4">
        <CarouselPrevious className="static size-11 translate-x-0 translate-y-0" />
        <div className="flex gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={selected === index ? "true" : undefined}
              className="focus-visible:ring-ring flex size-6 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
            >
              <span
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  selected === index ? "bg-primary" : "bg-border",
                )}
              />
            </button>
          ))}
        </div>
        <CarouselNext className="static size-11 translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
