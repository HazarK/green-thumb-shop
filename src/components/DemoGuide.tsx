"use client";

import Link from "next/link";
import { useState } from "react";
import { resetDemo, showToast } from "@/lib/store";
import { CloseIcon, CompassIcon } from "./Icons";

const happyPath = [
  { label: "See Alex's care reminder on the home page", href: "/" },
  { label: "Open Plant Hub and view My Plants", href: "/plant-hub" },
  { label: "Open the Echeveria: care guide and reminder", href: "/plant-hub/echeveria" },
  { label: "Discover More → open the recommended feed", href: "/product/succulent-feed" },
  { label: "Add it to the basket, then view the basket", href: "/basket" },
];

/** Small floating guide so an assessor can find both flows without instructions. */
export function DemoGuide() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div
          id="demo-guide"
          role="dialog"
          aria-label="Demo guide"
          className="w-[min(22rem,calc(100vw-2rem))] animate-rise rounded-3xl border border-line bg-white p-5 shadow-lift"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-leaf">Demo guide</p>
              <h2 className="mt-1 text-lg font-semibold">Two flows to try</h2>
            </div>
            <button type="button" onClick={close} aria-label="Close demo guide" className="rounded-full p-1.5 text-muted hover:bg-cream-deep">
              <CloseIcon />
            </button>
          </div>

          <p className="mt-4 text-sm font-semibold">1. Happy path — care to basket</p>
          <ol className="mt-2 space-y-1.5 text-sm">
            {happyPath.map((step, i) => (
              <li key={step.href} className="flex gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-forest">
                  {i + 1}
                </span>
                <Link href={step.href} onClick={close} className="text-ink underline decoration-line underline-offset-4 hover:decoration-forest">
                  {step.label}
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-sm font-semibold">2. Edge state — out of stock</p>
          <p className="mt-1 text-sm text-muted">
            In the Echeveria&rsquo;s Discover More section, the Gritty Soil Mix is sold out: Add to Basket is disabled
            and an alternative is offered.
          </p>
          <Link
            href="/product/gritty-soil-mix"
            onClick={close}
            className="mt-2 inline-block text-sm font-semibold text-clay underline underline-offset-4"
          >
            Open the out-of-stock product
          </Link>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-xs text-muted">Changes are saved in this browser only.</p>
            <button
              type="button"
              onClick={() => {
                resetDemo();
                showToast({ message: "Demo reset — Alex's reminders and basket are back to the start." });
                close();
              }}
              className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-cream-deep"
            >
              Reset demo
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="demo-guide"
        className="flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lift hover:bg-forest-deep"
      >
        <CompassIcon width={18} height={18} />
        Demo guide
      </button>
    </div>
  );
}
