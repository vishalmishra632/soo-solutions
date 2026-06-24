"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
        Something went wrong
      </p>
      <h1 className="font-display text-foreground mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
        Our feed dropped for a second
      </h1>
      <p className="text-muted-foreground mt-4 max-w-[60ch]">
        An unexpected error interrupted this page. Try reloading — if it keeps happening, reach out and
        we will sort it.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={reset} className="shadow-soft hover:shadow-glow">
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
