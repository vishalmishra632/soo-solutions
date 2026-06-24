import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { testimonials } from "@/content/testimonials";

const verifiedTestimonials = testimonials.filter((testimonial) => testimonial.verified);

export function Testimonials() {
  // Honesty gate: never render placeholder/unverified reviews — omit the section until verified ones land.
  if (verifiedTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <SectionHeading eyebrow="In their words" title="Trusted by local owners" className="mb-12" />
      <TestimonialsCarousel items={verifiedTestimonials} />
    </section>
  );
}
