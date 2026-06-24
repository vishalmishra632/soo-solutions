"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { visibleNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function Header() {
  const pathname = usePathname();
  const condensed = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 80,
    () => false,
  );

  return (
    <header
      className={cn(
        "bg-background/70 sticky top-0 z-50 border-b border-transparent backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300",
        condensed && "border-border/60 bg-background/85 shadow-soft",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 transition-[height] duration-300",
          condensed ? "h-14" : "h-20",
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {visibleNav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group focus-visible:ring-ring relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "bg-primary absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href={SITE.contact.phoneHref}>
              <Phone className="mr-2 size-4" aria-hidden />
              Call Now
            </a>
          </Button>
          <Button asChild size="sm" className="shadow-soft hover:shadow-glow hidden sm:inline-flex">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
