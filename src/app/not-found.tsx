import Link from "next/link";
import { LogoMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center"
    >
      <LogoMark className="size-20" title={false} />
      <p className="font-display text-primary mt-8 text-sm font-medium tracking-widest uppercase">404</p>
      <h1 className="font-display text-foreground mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
        This frame is out of view
      </h1>
      <p className="text-muted-foreground mt-4 max-w-[60ch]">
        The page you are looking for does not exist or has moved. Let&apos;s get you back in focus.
      </p>
      <Button asChild className="shadow-soft hover:shadow-glow mt-8">
        <Link href="/">Back to home</Link>
      </Button>
      <nav aria-label="Helpful links" className="mt-10">
        <ul className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-primary focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
