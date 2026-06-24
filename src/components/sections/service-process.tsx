import { processSteps } from "@/content/home";
import { resolveIcon } from "@/lib/icons";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

export function ServiceProcess() {
  return (
    <section id="process" className="scroll-mt-32 border-t border-border py-12 md:py-16">
      <RevealOnScroll>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-foreground">
          How it works
        </h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => {
            const Icon = resolveIcon(step.icon);
            return (
              <li key={step.step}>
                <span className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 font-display text-sm font-medium text-primary">{step.step}</p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </RevealOnScroll>
    </section>
  );
}
