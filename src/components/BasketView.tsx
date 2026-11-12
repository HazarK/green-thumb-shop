"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/format";
import { clearLastOrder, placeDemoOrder, removeFromBasket, setQuantity, showToast, useDemoState } from "@/lib/store";
import { ProductArt } from "./art/ProductArt";
import { BasketIcon, CheckIcon, ShieldIcon, TrashIcon } from "./Icons";
import { btnPrimary, btnSecondary, card, container, eyebrow } from "./ui";

export function BasketView() {
  const state = useDemoState();

  if (!state) {
    return (
      <div className={`${container} py-10`} aria-busy="true" aria-label="Loading your basket">
        <div className="h-10 w-48 animate-pulse rounded-full bg-cream-deep" />
        <div className="mt-8 h-64 animate-pulse rounded-3xl bg-cream-deep" />
      </div>
    );
  }

  /* Simulated checkout confirmation */
  if (state.lastOrder) {
    const order = state.lastOrder;
    return (
      <div className={`${container} py-12`}>
        <div className={`${card} mx-auto max-w-xl p-8 text-center`} data-testid="order-success" role="status">
          <span className="mx-auto flex h-16 w-16 animate-pop items-center justify-center rounded-full bg-leaf text-white">
            <CheckIcon width={32} height={32} strokeWidth={3} />
          </span>
          <p className="mt-5 inline-block rounded-full bg-sun-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7A5A00]">
            Simulated checkout — no payment taken
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-forest">Thank you, Alex!</h1>
          <p className="mt-2 text-muted">
            Demo order <strong className="text-ink">{order.number}</strong> · {order.itemCount}{" "}
            {order.itemCount === 1 ? "item" : "items"} · {formatPrice(order.total)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            In the live product, plants from this order would appear in Plant Hub automatically, with care guides and
            reminders ready to go.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/plant-hub" className={btnPrimary} onClick={clearLastOrder}>
              Back to Plant Hub
            </Link>
            <Link href="/#shop" className={btnSecondary} onClick={clearLastOrder}>
              Keep shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const lines = Object.entries(state.basket)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((l) => l.product && l.qty > 0)
    .map((l) => ({ product: l.product!, qty: l.qty }));

  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const toFree = FREE_SHIPPING_THRESHOLD - subtotal;

  /* Empty state */
  if (lines.length === 0) {
    return (
      <div className={`${container} py-12`}>
        <div className={`${card} mx-auto max-w-xl p-8 text-center`} data-testid="basket-empty">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-forest">
            <BasketIcon width={30} height={30} />
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-forest">Your basket is empty</h1>
          <p className="mt-2 text-muted">
            Not sure where to start? Plant Hub suggests products that suit the plants you already own.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/plant-hub/echeveria#discover" className={btnPrimary}>
              See picks for your Echeveria
            </Link>
            <Link href="/#shop" className={btnSecondary}>
              Browse the shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${container} py-8 sm:py-10`}>
      <p className={eyebrow}>Basket</p>
      <h1 className="mt-2 text-4xl font-semibold text-forest">Your basket</h1>
      <p className="mt-2 text-muted">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]">
        <ul className={`${card} divide-y divide-line px-4 sm:px-5`} aria-label="Basket items">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-4 py-4" data-testid={`basket-line-${product.id}`}>
              <Link
                href={`/product/${product.id}`}
                className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24"
                style={{ backgroundColor: product.tint }}
                aria-label={product.name}
              >
                <ProductArt kind={product.art} bg={product.tint} accent={product.accent} label={product.label} className="h-full w-full p-2" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">
                    <Link href={`/product/${product.id}`} className="hover:text-leaf">{product.name}</Link>
                  </p>
                  <p className="text-sm text-muted">Sold by {product.seller}</p>
                  <p className="mt-0.5 text-sm text-muted">{formatPrice(product.price)} each</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center rounded-full border border-line" role="group" aria-label={`Quantity of ${product.name}`}>
                    <button
                      type="button"
                      className="h-9 w-9 rounded-full font-semibold hover:bg-cream-deep"
                      onClick={() => setQuantity(product.id, qty - 1)}
                      aria-label={qty === 1 ? `Remove ${product.name}` : "Decrease quantity"}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{qty}</span>
                    <button
                      type="button"
                      className="h-9 w-9 rounded-full font-semibold hover:bg-cream-deep disabled:text-line"
                      onClick={() => setQuantity(product.id, qty + 1)}
                      disabled={qty >= 9}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="ml-auto text-right font-bold sm:ml-0 sm:w-20" data-testid="line-total">{formatPrice(product.price * qty)}</p>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromBasket(product.id);
                      showToast({ message: `${product.name} removed from your basket.` });
                    }}
                    className="flex items-center gap-1.5 rounded-full p-2 text-sm font-semibold text-muted hover:bg-clay-soft hover:text-clay"
                    aria-label={`Remove ${product.name} from basket`}
                  >
                    <TrashIcon width={18} height={18} />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className={`${card} p-5`} aria-labelledby="summary-title">
          <h2 id="summary-title" className="text-xl font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold" data-testid="basket-subtotal">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-semibold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-lg">
              <dt className="font-bold">Total</dt>
              <dd className="font-bold" data-testid="basket-total">{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="mt-1 text-xs text-muted">Prices include VAT.</p>
          {toFree > 0 && (
            <p className="mt-3 rounded-xl bg-sun-soft px-3 py-2 text-sm text-[#7A5A00]">
              Add <strong>{formatPrice(toFree)}</strong> more for free delivery.
            </p>
          )}
          <button
            type="button"
            className={`${btnPrimary} mt-4 w-full !py-3.5`}
            onClick={() =>
              placeDemoOrder({
                number: `GT-${String(Date.now()).slice(-5)}`,
                itemCount,
                total,
              })
            }
          >
            Checkout (demo)
          </button>
          <p className="mt-3 flex gap-2 text-xs leading-relaxed text-muted">
            <ShieldIcon width={16} height={16} className="mt-0.5 shrink-0 text-leaf" />
            Simulated checkout. This prototype never asks for payment or personal details.
          </p>
        </aside>
      </div>
    </div>
  );
}
