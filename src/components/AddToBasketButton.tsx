"use client";

import type { Product } from "@/types";
import { addToBasket, showToast } from "@/lib/store";
import { BasketIcon } from "./Icons";
import { btnPrimary } from "./ui";

interface Props {
  product: Product;
  qty?: number;
  className?: string;
  /** id of the element explaining why the button is disabled */
  describedBy?: string;
  compact?: boolean;
  onAdded?: () => void;
}

export function AddToBasketButton({ product, qty = 1, className = "", describedBy, compact, onAdded }: Props) {
  const size = compact ? "!px-4 !py-2.5" : "";

  if (!product.inStock) {
    return (
      <button type="button" disabled aria-describedby={describedBy} className={`${btnPrimary} ${size} ${className}`}>
        Out of stock
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${btnPrimary} ${size} ${className}`}
      aria-label={`Add ${product.name} to basket`}
      onClick={() => {
        if (addToBasket(product.id, qty)) {
          showToast({ message: `${product.name} added to your basket.`, href: "/basket", linkLabel: "View basket" });
          onAdded?.();
        }
      }}
    >
      <BasketIcon width={18} height={18} />
      Add to Basket
    </button>
  );
}
