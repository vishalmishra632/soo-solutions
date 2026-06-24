"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Search } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { FaqCategory } from "@/types";

interface FlatItem {
  question: string;
  answer: string;
  categoryId: string;
  categoryTitle: string;
}

export function FaqExplorer({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const items = useMemo<FlatItem[]>(
    () =>
      categories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryTitle: category.title,
        })),
      ),
    [categories],
  );

  const needle = query.trim().toLowerCase();
  const filtered = items.filter(
    (item) =>
      (activeCategory === "all" || item.categoryId === activeCategory) &&
      (!needle ||
        item.question.toLowerCase().includes(needle) ||
        item.answer.toLowerCase().includes(needle)),
  );

  return (
    <div>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions…"
          aria-label="Search frequently asked questions"
          className="border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-ring w-full rounded-full border py-3.5 pr-4 pl-12 text-base focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
          All
        </Chip>
        {categories.map((category) => (
          <Chip
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.title}
          </Chip>
        ))}
      </div>

      <p className="text-muted-foreground mt-5 text-sm" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "answer" : "answers"}
        {needle ? ` for “${query.trim()}”` : ""}
      </p>

      <div className="mt-2">
        <AnimatePresence initial={false}>
          {filtered.map((item) => (
            <FaqRow key={`${item.categoryId}-${item.question}`} item={item} needle={needle} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <div className="border-border mt-6 rounded-2xl border border-dashed p-8 text-center">
            <p className="text-foreground font-medium">No questions match that.</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Ask us directly and we&rsquo;ll give you a straight answer.
            </p>
            <Link href="/contact" className="text-primary mt-3 inline-block text-sm font-semibold">
              Talk to us &rarr;
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FaqRow({ item, needle }: { item: FlatItem; needle: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="border-border border-b"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <span className="min-w-0">
          <span className="font-display text-foreground block text-base font-medium md:text-lg">
            {highlight(item.question, needle)}
          </span>
          <span className="text-muted-foreground/70 mt-1 block text-xs font-medium tracking-wide uppercase">
            {item.categoryTitle}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="text-primary mt-1 shrink-0"
        >
          <Plus className="size-5" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground max-w-[68ch] pb-5 text-base">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

// Highlight the first match of the search term inside a question.
function highlight(text: string, needle: string): ReactNode {
  if (!needle) return text;
  const index = text.toLowerCase().indexOf(needle);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-primary/20 text-foreground rounded-sm px-0.5">
        {text.slice(index, index + needle.length)}
      </mark>
      {text.slice(index + needle.length)}
    </>
  );
}
