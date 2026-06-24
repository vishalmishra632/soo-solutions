"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MessageCircle, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { SiteImage } from "@/components/shared/site-image";
import { Button } from "@/components/ui/button";
import { resolveIcon } from "@/lib/icons";
import { suppliesEnquiryMessage, supplyCategories } from "@/content/supplies";
import { emailHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import type { SupplyItem } from "@/types";

interface OrderLine {
  id: string;
  name: string;
  option: string;
  qty: number;
}

const lineId = (name: string, option: string) => `${name}__${option}`;

export function SuppliesOrder() {
  const [order, setOrder] = useState<OrderLine[]>([]);
  const [open, setOpen] = useState(false);

  function add(item: SupplyItem, option: string) {
    const id = lineId(item.name, option);
    setOrder((previous) => {
      if (previous.some((line) => line.id === id)) {
        return previous.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...previous, { id, name: item.name, option, qty: 1 }];
    });
  }

  function step(id: string, delta: number) {
    setOrder((previous) =>
      previous.flatMap((line) => {
        if (line.id !== id) return [line];
        const qty = line.qty + delta;
        return qty <= 0 ? [] : [{ ...line, qty }];
      }),
    );
  }

  const qtyFor = (name: string, option: string) =>
    order.find((line) => line.id === lineId(name, option))?.qty ?? 0;
  const totalCases = order.reduce((sum, line) => sum + line.qty, 0);

  const orderLines = order.map(
    (line) =>
      `• ${line.name}${line.option ? ` (${line.option})` : ""} × ${line.qty} ${line.qty === 1 ? "case" : "cases"}`,
  );
  const message = order.length
    ? `Hi Soo Solutions, I'd like to order these supplies:\n${orderLines.join("\n")}`
    : suppliesEnquiryMessage;

  return (
    <>
      <div className="space-y-16 md:space-y-20">
        {supplyCategories.map((category) => {
          const CategoryIcon = resolveIcon(category.icon);
          return (
            <section key={category.slug} aria-labelledby={`supply-${category.slug}`}>
              <div className="flex items-start gap-4">
                <span className="bg-secondary text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
                  <CategoryIcon className="size-6" aria-hidden />
                </span>
                <div>
                  <h2
                    id={`supply-${category.slug}`}
                    className="font-display text-foreground text-2xl font-bold tracking-tight"
                  >
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground mt-1 max-w-2xl">{category.blurb}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <OrderItemCard key={item.name} item={item} qtyFor={qtyFor} onAdd={add} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <AnimatePresence>
        {totalCases > 0 ? (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,30rem)] -translate-x-1/2"
          >
            {open ? (
              <div className="border-border bg-card mb-2 rounded-2xl border p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-foreground text-sm font-semibold tracking-wide uppercase">
                    Your list
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOrder([])}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                    Clear
                  </button>
                </div>

                <ul className="mt-3 max-h-[38vh] space-y-2 overflow-auto">
                  {order.map((line) => (
                    <li key={line.id} className="flex items-center gap-2">
                      <span className="text-foreground min-w-0 flex-1 text-sm">
                        {line.name}
                        {line.option ? (
                          <span className="text-muted-foreground"> · {line.option}</span>
                        ) : null}
                      </span>
                      <div className="border-border flex items-center rounded-full border">
                        <button
                          type="button"
                          onClick={() => step(line.id, -1)}
                          aria-label={`Remove a case of ${line.name}`}
                          className="text-muted-foreground hover:text-foreground flex size-7 items-center justify-center"
                        >
                          <Minus className="size-3.5" aria-hidden />
                        </button>
                        <span className="w-6 text-center text-sm font-medium tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => step(line.id, 1)}
                          aria-label={`Add a case of ${line.name}`}
                          className="text-muted-foreground hover:text-foreground flex size-7 items-center justify-center"
                        >
                          <Plus className="size-3.5" aria-hidden />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 grid gap-2">
                  <Button asChild>
                    <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" aria-hidden />
                      Send list on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={emailHref("Supplies order", message)}>
                      <Mail className="size-4" aria-hidden />
                      Email the list
                    </a>
                  </Button>
                </div>
                <p className="text-muted-foreground mt-2 text-center text-xs">
                  No checkout — we&rsquo;ll reply with case pricing and pickup.
                </p>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="border-primary bg-primary text-primary-foreground flex w-full items-center justify-between rounded-full border px-5 py-3 shadow-lg"
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                {open ? <X className="size-4" aria-hidden /> : <ShoppingCart className="size-4" aria-hidden />}
                Your list · {totalCases} {totalCases === 1 ? "case" : "cases"}
              </span>
              <span className="text-sm font-medium">{open ? "Close" : "Review & send"}</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function OrderItemCard({
  item,
  qtyFor,
  onAdd,
}: {
  item: SupplyItem;
  qtyFor: (name: string, option: string) => number;
  onAdd: (item: SupplyItem, option: string) => void;
}) {
  const [option, setOption] = useState(item.options[0] ?? "");
  const inList = qtyFor(item.name, option);

  return (
    <article className="border-border bg-card text-card-foreground shadow-card flex h-full flex-col overflow-hidden rounded-xl border">
      <div className="bg-secondary relative aspect-[4/3] w-full overflow-hidden">
        <SiteImage
          id={item.imageId}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          fill
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-foreground text-lg font-semibold tracking-tight">{item.name}</h3>
        <p className="text-muted-foreground mt-2 text-sm">{item.spec}</p>
        <p className="text-muted-foreground mt-2 text-xs font-medium">{item.packNote}</p>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          {item.options.length > 0 ? (
            <select
              value={option}
              onChange={(event) => setOption(event.target.value)}
              aria-label={`Option for ${item.name}`}
              className="border-border bg-background text-foreground focus-visible:ring-ring rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              {item.options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ) : null}
          <Button
            type="button"
            size="sm"
            variant={inList > 0 ? "secondary" : "default"}
            onClick={() => onAdd(item, option)}
            className="w-full"
          >
            {inList > 0 ? (
              `Added · ${inList} in list`
            ) : (
              <>
                <Plus className="size-4" aria-hidden />
                Add to order
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
