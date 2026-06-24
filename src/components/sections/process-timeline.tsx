import { SectionHeading } from "@/components/shared/section-heading";
import { ProcessTimelineTrack } from "./process-timeline-track";
import { processSteps } from "@/content/home";

export function ProcessTimeline() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <SectionHeading eyebrow="How it works" title="From first visit to ongoing support" />
      <div className="mt-12">
        <ProcessTimelineTrack steps={processSteps} />
      </div>
    </section>
  );
}
