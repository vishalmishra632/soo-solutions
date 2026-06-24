import { Check } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

export function ServiceIncludes({ items }: { items: string[] }) {
  return (
    <section id="included" className="scroll-mt-32 border-t border-border py-12 md:py-16">
      <RevealOnScroll>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-foreground">
          What&rsquo;s included
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-4" aria-hidden />
              </span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
