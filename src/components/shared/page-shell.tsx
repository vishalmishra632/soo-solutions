import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      {eyebrow ? (
        <p className="font-display text-primary text-sm font-medium tracking-widest uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">{description}</p>
      {children ? <div className="mt-10">{children}</div> : null}
    </main>
  );
}
