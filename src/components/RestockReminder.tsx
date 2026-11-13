"use client";

import { useRef } from "react";
import type { Product } from "@/types";
import { setRestockReminder, useDemoState } from "@/lib/store";
import { BellIcon } from "./Icons";
import { NotificationPreview } from "./NotificationPreview";
import { btnSecondary } from "./ui";

const shortName = (product: Product) => product.name.split(",")[0];

/**
 * "Remind me when it's back" for a sold-out product. The state lives in the
 * demo store, so the product page and the Plant Hub card stay in sync.
 */
export function RestockReminderButton({ product, className = "" }: { product: Product; className?: string }) {
  const state = useDemoState();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const set = state?.notifyWhenBack.includes(product.id) ?? false;

  return (
    <span className="inline-flex flex-wrap items-center gap-x-1 gap-y-1">
      <button
        ref={buttonRef}
        type="button"
        data-testid={`restock-button-${product.id}`}
        aria-pressed={set}
        // Once set, the button is a status; "Cancel" is the way to undo it.
        aria-disabled={set || undefined}
        onClick={() => {
          if (!set) setRestockReminder(product.id, true);
        }}
        className={`${btnSecondary} ${className} ${set ? "!cursor-default !border-leaf !bg-mint hover:!bg-mint" : ""}`}
      >
        {!set && <BellIcon width={17} height={17} />}
        {set ? "Reminder set ✓" : "Remind me when it's back"}
      </button>
      {set && (
        <button
          type="button"
          data-testid={`restock-cancel-${product.id}`}
          aria-label={`Cancel back-in-stock reminder for ${shortName(product)}`}
          onClick={() => {
            setRestockReminder(product.id, false);
            buttonRef.current?.focus();
          }}
          className="rounded-full px-2 py-1.5 text-sm font-semibold text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </button>
      )}
    </span>
  );
}

/** Confirmation (announced politely) plus the simulated back-in-stock notification. */
export function RestockReminderStatus({ product, className = "" }: { product: Product; className?: string }) {
  const state = useDemoState();
  const set = state?.notifyWhenBack.includes(product.id) ?? false;

  return (
    // The live region stays mounted so screen readers announce the change.
    <div aria-live="polite" data-testid={`restock-status-${product.id}`} className={set ? className : ""}>
      {set && (
        <div className="animate-rise">
          <p className="text-sm font-semibold text-forest">We&rsquo;ll remind you as soon as it&rsquo;s back in stock.</p>
          <div className="mt-2.5 rounded-2xl border border-dashed border-line p-3">
            <NotificationPreview
              when="when restocked"
              title={`Good news: ${shortName(product)} is back 🌱`}
              body={product.restockAlertBody ?? "It's available again. Tap to add it to your basket."}
            />
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Simulated for this prototype. In the live product this arrives by push or email when the seller
              restocks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
