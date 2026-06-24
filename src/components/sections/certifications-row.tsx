import { SectionHeading } from "@/components/shared/section-heading";
import { IconBadge } from "@/components/shared/icon-badge";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { certifications } from "@/content/about";
import { resolveIcon } from "@/lib/icons";

export function CertificationsRow() {
  return (
    <section
      aria-label="Certifications and authorizations"
      className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32"
    >
      <SectionHeading eyebrowMuted eyebrow="Credentials" title="Certified, licensed, authorized" />
      <RevealOnScroll className="mt-12">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {certifications.map((cert) => {
            const Icon = resolveIcon(cert.icon);
            return (
              <li
                key={cert.label}
                className="border-border bg-card shadow-soft flex flex-col items-center gap-3 rounded-lg border p-6 text-center"
              >
                <IconBadge icon={Icon} />
                <span className="text-foreground text-sm font-medium">{cert.label}</span>
                <span className="text-muted-foreground text-xs">{cert.sublabel}</span>
              </li>
            );
          })}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
