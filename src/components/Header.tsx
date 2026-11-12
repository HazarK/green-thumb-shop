"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { plants } from "@/data/plants";
import { getStatus, isDue } from "@/lib/reminders";
import { basketCount, useDemoState } from "@/lib/store";
import { BasketIcon, Logo } from "./Icons";
import { container } from "./ui";

export function Header() {
  const pathname = usePathname();
  const state = useDemoState();
  const count = basketCount(state);
  const dueCount = state
    ? plants.filter((p) => isDue(getStatus(state.reminders[p.id]))).length
    : 0;

  const onShop = pathname === "/" || pathname.startsWith("/product");
  const onHub = pathname.startsWith("/plant-hub");
  const onBasket = pathname.startsWith("/basket");

  const navLink = (active: boolean) =>
    `relative rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
      active ? "bg-mint text-forest" : "text-ink hover:bg-cream-deep"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div className="bg-forest text-white">
        <p className={`${container} py-1.5 text-center text-xs`}>
          <span className="font-semibold text-sun">Case-study prototype</span>
          <span className="mx-1.5 opacity-50">·</span>
          You&rsquo;re browsing as Alex, a returning customer
          <span className="hidden sm:inline"> — no sign-in needed</span>
        </p>
      </div>
      <div className={`${container} flex h-16 items-center justify-between gap-2`}>
        <Link href="/" className="flex items-center gap-2.5 rounded-xl" aria-label="Green Thumb Shop — home">
          <Logo className="h-9 w-9 shrink-0" />
          <span className="font-display text-lg font-semibold leading-none tracking-tight text-forest max-[420px]:hidden">
            Green Thumb <span className="text-leaf">Shop</span>
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1.5">
          <Link href="/#shop" className={navLink(onShop)} aria-current={onShop ? "page" : undefined}>
            Shop
          </Link>
          <Link href="/plant-hub" className={navLink(onHub)} aria-current={onHub ? "page" : undefined}>
            Plant Hub
            {dueCount > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1 text-[11px] font-bold text-ink">
                {dueCount}
                <span className="sr-only"> care {dueCount === 1 ? "task" : "tasks"} due</span>
              </span>
            )}
          </Link>
          <Link
            href="/basket"
            className={`${navLink(onBasket)} flex items-center gap-1.5`}
            aria-current={onBasket ? "page" : undefined}
            data-testid="basket-link"
          >
            <BasketIcon />
            <span>Basket</span>
            <span
              data-testid="basket-count"
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ${
                count > 0 ? "bg-forest text-white" : "bg-cream-deep text-muted"
              }`}
            >
              {count}
              <span className="sr-only"> {count === 1 ? "item" : "items"}</span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
