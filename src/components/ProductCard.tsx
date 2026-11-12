"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { AddToBasketButton } from "./AddToBasketButton";
import { ProductArt } from "./art/ProductArt";
import { StarIcon } from "./Icons";
import { StockBadge } from "./StockBadge";

/** Standard marketplace product tile. */
export function ProductCard({ product, reason }: { product: Product; reason?: string }) {
  const noteId = `stock-note-${product.id}`;
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-3 shadow-card transition-shadow hover:shadow-lift">
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden rounded-2xl"
        style={{ backgroundColor: product.tint }}
        aria-label={product.name}
      >
        <ProductArt
          kind={product.art}
          bg={product.tint}
          accent={product.accent}
          label={product.label}
          className={`mx-auto aspect-square w-full max-w-[15rem] p-5 transition-transform duration-300 group-hover:scale-[1.04] ${
            product.inStock ? "" : "opacity-60 grayscale-[35%]"
          }`}
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3">
            <StockBadge inStock={false} />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="text-xs text-muted">{product.seller}</p>
        <h3 className="mt-1 font-sans text-[15px] font-semibold leading-snug tracking-normal">
          <Link href={`/product/${product.id}`} className="hover:text-leaf">
            {product.name}
          </Link>
        </h3>
        {reason ? (
          <p className="mt-2 rounded-xl bg-mint/70 px-3 py-2 text-[13px] leading-snug text-forest">{reason}</p>
        ) : (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-muted">
            <StarIcon width={13} height={13} className="text-sun" />
            <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span> ({product.reviews})
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          <AddToBasketButton product={product} compact describedBy={noteId} />
        </div>
        {!product.inStock && (
          <p id={noteId} className="mt-2 text-xs text-clay">
            Currently unavailable.{" "}
            <Link href={`/product/${product.id}`} className="font-semibold underline underline-offset-2">
              See an alternative
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}
