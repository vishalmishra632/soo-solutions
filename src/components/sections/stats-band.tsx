import { Counter } from "@/components/shared/counter";
import { ContourBackdrop } from "@/components/shared/contour-backdrop";
import { stats } from "@/content/home";

export function StatsBand() {
  return (
    <section aria-label="By the numbers" className="bg-secondary relative overflow-hidden py-16 md:py-20">
      <ContourBackdrop />
      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold tracking-tight">
              <span className="text-foreground">
                <Counter value={stat.value} />
              </span>
              <span className="text-primary">{stat.suffix}</span>
            </p>
            <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
