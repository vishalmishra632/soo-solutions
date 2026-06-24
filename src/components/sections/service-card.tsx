import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import { resolveIcon } from "@/lib/icons";
import type { Service } from "@/types";

export function ServiceCard({
  service,
  titleAs = "h3",
}: {
  service: Service;
  titleAs?: "h2" | "h3";
}) {
  const Icon = resolveIcon(service.icon);
  const Title = titleAs;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card p-6 text-card-foreground shadow-card transition-[box-shadow,border-color] duration-300 hover:border-primary hover:shadow-elevated focus-visible:border-primary focus-visible:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* the accent rule that "draws" across the top on hover/focus */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
      <IconBadge icon={Icon} />
      <Title className="mt-5 font-display text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-tight text-foreground">
        {service.title}
      </Title>
      <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary">
        Learn more
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          aria-hidden
        />
      </span>
    </Link>
  );
}
