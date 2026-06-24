import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { team } from "@/content/about";
import type { TeamMember } from "@/types";

function Portrait({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={member.alt}
        width={640}
        height={800}
        className="h-full w-full object-cover transition-[filter] duration-300 hover:grayscale-0 motion-reduce:transition-none md:grayscale"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={member.alt}
      className="from-accent via-card to-secondary h-full w-full bg-gradient-to-br"
    />
  );
}

export function TeamGrid() {
  const featured = team.find((member) => member.featured) ?? team[0];
  const rest = team.filter((member) => member !== featured);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading eyebrowMuted eyebrow="The crew" title="Meet the team behind the cameras" />

      <RevealOnScroll className="mt-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="shadow-card aspect-[3/4] overflow-hidden rounded-xl">
            <Portrait member={featured} />
          </div>
          <div>
            {featured.quote ? (
              <blockquote className="font-display text-foreground text-[clamp(1.5rem,2.5vw,2rem)] leading-snug font-medium">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            ) : null}
            <p className="font-display text-foreground mt-6 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-tight">
              {featured.name}
            </p>
            <p className="text-muted-foreground text-sm">{featured.role}</p>
            <p className="text-muted-foreground mt-1 text-sm">{featured.detail}</p>
          </div>
        </div>
      </RevealOnScroll>

      {rest.length > 0 ? (
        <RevealOnScroll className="mt-16">
          <ul className="flex flex-wrap justify-center gap-8">
            {rest.map((member) => (
              <li key={member.name} className="w-full max-w-72">
                <div className="shadow-card aspect-[3/4] overflow-hidden rounded-xl">
                  <Portrait member={member} />
                </div>
                <p className="font-display text-foreground mt-4 text-lg font-semibold tracking-tight">
                  {member.name}
                </p>
                <p className="text-muted-foreground text-sm">{member.role}</p>
                <p className="text-muted-foreground mt-1 text-sm">{member.detail}</p>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      ) : null}
    </section>
  );
}
