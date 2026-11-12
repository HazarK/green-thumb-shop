"use client";

import Link from "next/link";
import { dismissToast, useToasts } from "@/lib/store";
import { CheckIcon, CloseIcon } from "./Icons";

export function Toaster() {
  const toasts = useToasts();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-50 sm:bottom-4 flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-full max-w-md animate-rise items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-lift"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf">
            <CheckIcon width={14} height={14} strokeWidth={3} />
          </span>
          <span className="flex-1">{t.message}</span>
          {t.href && (
            <Link
              href={t.href}
              onClick={() => dismissToast(t.id)}
              className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 font-semibold hover:bg-white/25"
            >
              {t.linkLabel}
            </Link>
          )}
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss"
            className="shrink-0 rounded-full p-1 text-white/70 hover:text-white"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
