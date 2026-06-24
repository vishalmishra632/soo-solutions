"use client";

import "./globals.css";

// Catches errors thrown in the root layout itself. It replaces the whole document, so it ships its own
// <html>/<body> and leans on the token classes from globals.css for an on-brand fallback.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-primary text-sm font-medium tracking-widest uppercase">Unexpected error</p>
          <h1 className="text-foreground mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            We hit a snag
          </h1>
          <p className="text-muted-foreground mt-4 max-w-[60ch]">
            The page failed to load. Please reload to try again.
          </p>
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground focus-visible:ring-ring mt-8 inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
