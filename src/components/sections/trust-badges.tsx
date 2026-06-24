import { IconBadge } from "@/components/shared/icon-badge";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { badgeIcons } from "@/content/home";
import { resolveIcon } from "@/lib/icons";
import { SITE } from "@/lib/site";

export function TrustBadges() {
  return (
    <section aria-label="Why customers trust us" className="mx-auto w-full max-w-5xl px-6 py-16">
      <RevealOnScroll>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {SITE.badges.map((badge, index) => {
            const Icon = resolveIcon(badgeIcons[index] ?? "ShieldCheck");
            return (
              <li
                key={badge}
                className="border-border bg-card shadow-soft hover:shadow-card flex flex-col items-center gap-3 rounded-lg border p-6 text-center transition-shadow"
              >
                <IconBadge icon={Icon} />
                <span className="text-foreground text-sm font-medium">{badge}</span>
              </li>
            );
          })}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
