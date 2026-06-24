"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MessageCircle, MessageSquare, Phone, X, type LucideIcon } from "lucide-react";
import { useConsent } from "@/hooks/use-consent";
import { callHref, emailHref, smsHref, whatsappHref } from "@/lib/contact";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

// WhatsApp's brand green — used only as the recognisable colour for the WhatsApp action, not its logo.
const WHATSAPP_GREEN = "#25d366";

interface FabAction {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  style?: CSSProperties;
  className?: string;
}

const actions: FabAction[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: whatsappHref(),
    icon: MessageCircle,
    external: true,
    style: { backgroundColor: WHATSAPP_GREEN },
    className: "text-white",
  },
  { key: "call", label: "Call us", href: callHref(), icon: Phone, className: "bg-primary text-primary-foreground" },
  { key: "sms", label: "Text us", href: smsHref(), icon: MessageSquare, className: "bg-secondary text-secondary-foreground" },
  { key: "email", label: "Email", href: emailHref(), icon: Mail, className: "bg-card text-card-foreground border-border border" },
];

export function ContactFab() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLAnchorElement>(null);
  const { choice, ready } = useConsent();

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function handlePointer(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }

    firstActionRef.current?.focus();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pointerdown", handlePointer);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("pointerdown", handlePointer);
    };
  }, [open]);

  // Step aside while the cookie banner owns the bottom of the screen — one prompt at a time.
  if (ready && choice === null) return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 print:hidden"
    >
      <AnimatePresence>
        {open ? (
          <motion.ul
            className="flex flex-col items-end gap-3"
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={{ shown: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.li
                  key={action.key}
                  variants={{
                    hidden: { opacity: 0, y: 12, scale: 0.9 },
                    shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: EASE_OUT } },
                  }}
                >
                  <a
                    ref={index === 0 ? firstActionRef : undefined}
                    href={action.href}
                    {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setOpen(false)}
                    style={action.style}
                    className={cn(
                      "shadow-card focus-visible:ring-ring flex items-center gap-2 rounded-full py-2.5 pr-2.5 pl-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                      action.className,
                    )}
                  >
                    {action.label}
                    <span className="flex size-7 items-center justify-center rounded-full bg-black/10">
                      <Icon className="size-4" aria-hidden />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact us — WhatsApp, call, or message"}
        className="bg-primary text-primary-foreground shadow-elevated hover:shadow-glow focus-visible:ring-ring relative grid size-14 place-items-center rounded-full transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {!open ? (
          <span
            aria-hidden
            className="bg-primary/40 absolute inset-0 rounded-full motion-safe:animate-ping"
          />
        ) : null}
        <span className="relative">
          {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
        </span>
      </button>
    </div>
  );
}
