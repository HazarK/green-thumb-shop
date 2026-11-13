"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { identifiedPlants } from "@/data/plants";
import { getProduct } from "@/data/products";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/format";
import { useDemoState } from "@/lib/store";
import { AddToBasketButton } from "./AddToBasketButton";
import { ProductArt } from "./art/ProductArt";
import { AlertIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon, SproutIcon, StarIcon, TruckIcon } from "./Icons";
import { RestockReminderButton, RestockReminderStatus } from "./RestockReminder";
import { StockBadge } from "./StockBadge";
import { btnSecondary, card, container } from "./ui";

export function ProductView({ product }: { product: Product }) {
  const state = useDemoState();
  const [qty, setQty] = useState(1);
  const inBasket = state?.basket[product.id] ?? 0;
  const alternative = product.alternativeId ? getProduct(product.alternativeId) : undefined;

  // Rule-based personalisation: is this product recommended for a plant Alex owns?
  const match = identifiedPlants
    .map((plant) => ({ plant, rec: plant.recommendations.find((r) => r.productId === product.id) }))
    .find((m) => m.rec);

  return (
    <div className={`${container} py-6 sm:py-8`}>
      {match ? (
        <Link href={`/plant-hub/${match.plant.id}#discover`} className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-forest hover:underline">
          <ArrowLeftIcon width={16} height={16} /> Back to your {match.plant.nickname}
        </Link>
      ) : (
        <Link href="/#shop" className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-forest hover:underline">
          <ArrowLeftIcon width={16} height={16} /> Back to shop
        </Link>
      )}

      <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="relative self-start rounded-[2rem] p-6 sm:p-10" style={{ backgroundColor: product.tint }}>
          <ProductArt
            kind={product.art}
            bg={product.tint}
            accent={product.accent}
            label={product.label}
            className={`mx-auto w-full max-w-[24rem] ${product.inStock ? "" : "opacity-60 grayscale-[35%]"}`}
          />
          {!product.inStock && (
            <span className="absolute left-5 top-5">
              <StockBadge inStock={false} />
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-leaf">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-forest sm:text-4xl">{product.name}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span>
              Sold by <strong className="text-ink">{product.seller}</strong> · {product.sellerLocation}
            </span>
            <span className="flex items-center gap-1">
              <StarIcon width={14} height={14} className="text-sun" />
              <strong className="text-ink">{product.rating.toFixed(1)}</strong> ({product.reviews} reviews)
            </span>
          </p>

          <div className="mt-5 flex items-center gap-4">
            <p className="font-display text-4xl font-semibold" data-testid="product-price">
              {formatPrice(product.price)}
            </p>
            {product.inStock && <StockBadge inStock />}
          </div>

          <p className="mt-4 text-[17px] leading-relaxed text-ink/90">{product.description}</p>

          {match && (
            <p className="mt-5 flex gap-3 rounded-2xl bg-mint px-4 py-3.5 text-sm leading-relaxed text-forest">
              <SproutIcon className="mt-0.5 shrink-0" />
              <span>
                <strong>Recommended for your {match.plant.nickname}.</strong> {match.rec!.reason}
              </span>
            </p>
          )}

          {product.inStock ? (
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-line bg-white" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    className="h-11 w-11 rounded-full text-lg font-semibold hover:bg-cream-deep disabled:text-line"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold" aria-live="polite">{qty}</span>
                  <button
                    type="button"
                    className="h-11 w-11 rounded-full text-lg font-semibold hover:bg-cream-deep disabled:text-line"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    disabled={qty >= 9}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <AddToBasketButton product={product} qty={qty} className="min-w-52 flex-1 !py-3.5 sm:flex-none" onAdded={() => setQty(1)} />
              </div>
              {inBasket > 0 && (
                <p
                  role="status"
                  data-testid="in-basket-note"
                  className="mt-4 flex animate-rise flex-wrap items-center justify-between gap-3 rounded-2xl border border-leaf/30 bg-mint px-4 py-3 text-sm text-forest"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf text-white">
                      <CheckIcon width={14} height={14} strokeWidth={3} />
                    </span>
                    {inBasket} in your basket
                  </span>
                  <Link href="/basket" className="flex items-center gap-1 font-bold underline underline-offset-4">
                    View basket <ArrowRightIcon width={16} height={16} />
                  </Link>
                </p>
              )}
            </div>
          ) : (
            <div className="mt-6" data-testid="out-of-stock">
              <div id="stock-explanation" role="status" className="flex gap-3 rounded-2xl border border-clay/30 bg-clay-soft px-4 py-4 text-clay">
                <AlertIcon className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">Sorry — this product is out of stock</p>
                  <p className="mt-0.5 text-sm leading-relaxed">
                    It can&rsquo;t be added to your basket right now. {product.restockNote}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <AddToBasketButton product={product} describedBy="stock-explanation" className="min-w-52 !py-3.5" />
                <RestockReminderButton product={product} className="!py-3.5" />
              </div>
              <RestockReminderStatus product={product} className="mt-4" />

              {alternative && (
                <section aria-labelledby="alternative-title" data-testid="alternative" className="mt-6 rounded-3xl border-2 border-leaf/40 bg-white p-4 shadow-card sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-leaf">Available now</p>
                  <h2 id="alternative-title" className="mt-1 text-xl font-semibold">
                    A similar product that&rsquo;s in stock
                  </h2>
                  <div className="mt-4 flex gap-4">
                    <Link
                      href={`/product/${alternative.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28"
                      style={{ backgroundColor: alternative.tint }}
                      aria-label={alternative.name}
                    >
                      <ProductArt kind={alternative.art} bg={alternative.tint} accent={alternative.accent} label={alternative.label} className="h-full w-full p-2.5" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-[15px] font-semibold leading-snug tracking-normal">
                        <Link href={`/product/${alternative.id}`} className="hover:text-leaf">{alternative.name}</Link>
                      </h3>
                      <p className="mt-0.5 text-xs text-muted">Sold by {alternative.seller}</p>
                      <p className="mt-1 text-sm text-muted">{alternative.short}</p>
                      <p className="mt-1.5 text-lg font-bold">{formatPrice(alternative.price)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <AddToBasketButton product={alternative} compact />
                    <Link href={`/product/${alternative.id}`} className={`${btnSecondary} !px-4 !py-2.5`}>
                      View details
                    </Link>
                  </div>
                </section>
              )}
            </div>
          )}

          <div className={`${card} mt-8 p-5`}>
            <h2 className="font-sans text-base font-bold tracking-normal">Product details</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <CheckIcon width={16} height={16} className="mt-1 shrink-0 text-leaf" strokeWidth={2.6} />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2.5 border-t border-line pt-4 text-sm text-muted">
              <TruckIcon width={18} height={18} className="shrink-0 text-forest" />
              EU-wide delivery in 2–4 working days. Free over {formatPrice(FREE_SHIPPING_THRESHOLD)}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
