"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callHref, emailHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

type PropertyType = "home" | "business";

interface Zone {
  id: string;
  x: number; // 0-100, position over the property
  y: number;
  home: string;
  business: string;
}

const ZONES: Zone[] = [
  { id: "entrance", x: 50, y: 12, home: "Front entrance", business: "Front entrance" },
  { id: "perimeter", x: 15, y: 16, home: "Perimeter", business: "Perimeter" },
  { id: "driveway", x: 13, y: 46, home: "Driveway", business: "Parking lot" },
  { id: "side", x: 87, y: 46, home: "Side & gate", business: "Loading dock" },
  { id: "rear", x: 50, y: 88, home: "Back yard", business: "Yard & rear" },
  { id: "indoor", x: 50, y: 50, home: "Indoors", business: "Indoors" },
];

const CENTER = { x: 50, y: 50 };

// A glowing coverage wedge from the building out to a zone — apex at the camera, base past the marker.
function wedgePoints(x: number, y: number): string {
  const dx = x - CENTER.x;
  const dy = y - CENTER.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const perpX = -uy;
  const perpY = ux;
  const reach = length + 5;
  const half = 9;
  const baseX = CENTER.x + ux * reach;
  const baseY = CENTER.y + uy * reach;
  return `${CENTER.x},${CENTER.y} ${baseX + perpX * half},${baseY + perpY * half} ${baseX - perpX * half},${baseY - perpY * half}`;
}

export function BlindSpotMapper() {
  const [type, setType] = useState<PropertyType>("home");
  const [selected, setSelected] = useState<Set<string>>(new Set(["entrance", "driveway"]));

  function toggle(id: string) {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const chosen = ZONES.filter((zone) => selected.has(zone.id));
  const labels = chosen.map((zone) => zone[type]);
  const message =
    `Hi Soo Solutions, I'd like a quote for my ${type}.` +
    (labels.length ? ` Areas to cover: ${labels.join(", ")}.` : "");
  const enquiryWhatsApp = whatsappHref(message);
  const enquiryEmail = emailHref("Quote request", message);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div>
        <div className="border-border bg-secondary inline-flex rounded-full border p-1">
          {(["home", "business"] as PropertyType[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              aria-pressed={type === option}
              className={cn(
                "rounded-full px-6 py-1.5 text-sm font-medium capitalize transition-colors",
                type === option ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative mt-5 aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            <rect x="5" y="5" width="90" height="90" rx="6" className="fill-secondary stroke-border" fillOpacity={0.4} strokeWidth={0.5} />
            {chosen
              .filter((zone) => zone.id !== "indoor")
              .map((zone) => (
                <motion.polygon
                  key={zone.id}
                  points={wedgePoints(zone.x, zone.y)}
                  className="fill-primary"
                  fillOpacity={0.16}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            <rect
              x="38"
              y="38"
              width="24"
              height="24"
              rx="3"
              className={cn("stroke-primary", selected.has("indoor") ? "fill-primary" : "fill-card")}
              fillOpacity={selected.has("indoor") ? 0.22 : 1}
              strokeWidth={0.6}
            />
            <circle cx="50" cy="50" r="2.2" className="fill-primary" />
          </svg>

          {ZONES.map((zone) => {
            const on = selected.has(zone.id);
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => toggle(zone.id)}
                aria-pressed={on}
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap shadow-sm transition-colors",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/60",
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", on ? "bg-primary-foreground" : "bg-primary")} />
                  {zone[type]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="font-display text-foreground text-xl font-semibold tracking-tight">
          Your coverage plan
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {chosen.length
            ? `${chosen.length} ${chosen.length === 1 ? "area" : "areas"} mapped — we'll spec the right cameras for each.`
            : "Tap the spots on your property you want covered."}
        </p>

        <ul className="mt-4 flex min-h-8 flex-wrap gap-2">
          {chosen.map((zone) => (
            <li
              key={zone.id}
              className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
            >
              {zone[type]}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-2.5">
          <Button asChild size="lg">
            <a href={enquiryWhatsApp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden />
              Send my plan on WhatsApp
            </a>
          </Button>
          <div className="grid grid-cols-2 gap-2.5">
            <Button asChild size="lg" variant="outline">
              <a href={callHref()}>
                <Phone className="size-4" aria-hidden />
                Call
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={enquiryEmail}>
                <Mail className="size-4" aria-hidden />
                Email
              </a>
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mt-3 text-xs">
          Free and no-obligation. We&rsquo;ll confirm the details and book a site visit.
        </p>
      </div>
    </div>
  );
}
