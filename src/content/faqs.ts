import type { Faq, FaqCategory } from "@/types";

export const faqs: Faq[] = [
  {
    question: "Do you supply the cameras, or do I buy them myself?",
    answer:
      "We supply and install the hardware as one package, using trusted brands like Lorex, Hikvision, and HiLook so the system is matched to your property.",
    group: "general",
  },
  {
    question: "Do you serve both homes and businesses?",
    answer: "Yes. We design and install systems for both residential and commercial properties.",
    group: "general",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We serve the local area around our 253 Bruce St location. Contact us with your address and we will confirm coverage.",
    group: "general",
  },
  {
    question: "Can you handle a multi-camera commercial project?",
    answer:
      "Yes. We survey the site, design coverage for liability and incident review, and install commercial-grade hardware with appropriate retention.",
    group: "commercial",
  },
  {
    question: "Will the system meet our retention or compliance needs?",
    answer:
      "We size recording and storage to your retention requirements and walk you through what the system captures and keeps.",
    group: "commercial",
  },
  {
    question: "Where should cameras go in my home?",
    answer:
      "During the site survey we identify entrances, driveways, and blind spots, then recommend placement that covers what matters without wasted cameras.",
    group: "residential",
  },
  {
    question: "Can I watch the cameras from my phone?",
    answer:
      "Yes. We configure and test secure remote viewing so you can check live and recorded footage from anywhere.",
    group: "residential",
  },
  {
    question: "Which camera brands do you install?",
    answer:
      "We work with Lorex, Hikvision, and HiLook, and recommend the right line for your property and budget.",
    group: "products",
  },
  {
    question: "Is the work and hardware under warranty?",
    answer:
      "Yes. Both the installation work and the hardware are backed, and our local team is available for support after install.",
    group: "support",
  },
];

// Topic-grouped FAQ for the /faq page. Answers that share a question with `faqs` above are kept
// byte-identical so the FAQPage JSON-LD on /faq never contradicts the service-detail FAQ JSON-LD.
export const faqCategories: FaqCategory[] = [
  {
    id: "installation",
    title: "Installation",
    items: [
      {
        question: "What happens during a typical installation?",
        answer:
          "We start with a free site survey to map coverage, then run cabling cleanly, mount the cameras for full angles, and configure recording and remote access before we hand it over.",
      },
      {
        question: "How long does an install take?",
        answer:
          "Most homes are completed in a single day; we confirm the exact timeline after the free site survey, since larger or commercial sites depend on camera count and cabling.",
      },
      {
        question: "Will the cabling be visible or messy?",
        answer:
          "No. We run cabling cleanly and discreetly and tidy up after — the next technician (and you) will thank us.",
      },
      {
        question: "Do I need to be home for the install?",
        answer:
          "Someone should be on site to give access and confirm camera positions, but you don't need to hover — we handle the rest.",
      },
      {
        question: "Can you work around an occupied home or business?",
        answer: "Yes. We schedule around your day and keep disruption to a minimum.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        question: "How much does a security camera system cost?",
        answer:
          "It depends on the property, the number of cameras, and your recording needs, so we quote per property. The site assessment and quote are free and come with no obligation.",
      },
      {
        question: "Is the site assessment and quote really free?",
        answer: "Yes. We assess the property and quote at no cost or obligation.",
      },
      {
        question: "What affects the price?",
        answer:
          "Camera count and quality, cabling runs, recording and storage, and any extras like remote viewing or access control.",
      },
      {
        question: "Do you supply the cameras, or do I buy them myself?",
        answer:
          "We supply and install the hardware as one package, using trusted brands like Lorex, Hikvision, and HiLook so the system is matched to your property.",
      },
    ],
  },
  {
    id: "warranty",
    title: "Warranty",
    items: [
      {
        question: "Is the work and the hardware under warranty?",
        answer:
          "Yes. Both the installation work and the hardware are backed, and our local team is available for support after install.",
      },
      {
        question: "What does the warranty cover?",
        answer:
          "Workmanship on the install plus the manufacturer's warranty on the cameras and recorder. We walk you through exactly what's covered before you sign off.",
      },
      {
        question: "What if a camera fails after the install?",
        answer:
          "Reach our local support line and we'll diagnose it — if it's covered, we'll sort it out under warranty and walk you through what that means.",
      },
    ],
  },
  {
    id: "brands",
    title: "Brands",
    items: [
      {
        question: "Which camera brands do you install?",
        answer:
          "We work with Lorex, Hikvision, and HiLook, and recommend the right line for your property and budget.",
      },
      {
        question: "Why those brands?",
        answer:
          "They cover the range we need: Lorex for sharp 4K home and small-business systems, Hikvision for commercial-grade multi-camera coverage, and HiLook for reliable, budget-friendly everyday setups.",
      },
      {
        question: "Can you upgrade or match my existing system?",
        answer:
          "Often, yes. We assess what's in place, reuse what still performs, and upgrade the rest to current standards.",
      },
      {
        question: "Will you push the most expensive option?",
        answer:
          "No. We recommend the tier that fits the job — sometimes that's the budget line. The goal is the right coverage, not the biggest invoice.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      {
        question: "What support do I get after the install?",
        answer:
          "A local team you can actually reach — for questions, checkups, and help if something needs attention after install.",
      },
      {
        question: "Can you help me set up remote viewing on my phone?",
        answer:
          "Yes. We configure and test secure remote viewing during the install, so you can check live and recorded footage from anywhere — and we're here if you need a hand later.",
      },
      {
        question: "Do you offer maintenance or checkups?",
        answer:
          "Yes. We offer scheduled maintenance to keep cameras aligned, firmware current, and footage there when you need it.",
      },
      {
        question: "What areas do you cover?",
        answer:
          "We serve the local area around our 253 Bruce St location. Contact us with your address and we will confirm coverage.",
      },
    ],
  },
];
