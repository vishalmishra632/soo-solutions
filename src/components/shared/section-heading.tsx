import { SplitReveal } from "@/components/shared/split-reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  eyebrowMuted?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowMuted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "font-display text-sm font-medium tracking-widest uppercase",
            eyebrowMuted ? "text-muted-foreground" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <SplitReveal
        as="h2"
        text={title}
        className="font-display text-foreground mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight"
      />
      {description ? <p className="text-muted-foreground mt-4 text-lg">{description}</p> : null}
    </div>
  );
}
