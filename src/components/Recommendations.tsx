"use client";

import Link from "next/link";
import type { IdentifiedPlant } from "@/types";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { AddToBasketButton } from "./AddToBasketButton";
import { ProductArt } from "./art/ProductArt";
import { AlertIcon } from "./Icons";
import { RestockReminderButton, RestockReminderStatus } from "./RestockReminder";
import { StockBadge } from "./StockBadge";
import { btnSecondary, eyebrow } from "./ui";

/** "Discover More": rule-based product picks for one owned plant. */
export function Recommendations({ plant }: { plant: IdentifiedPlant }) {
  const items = plant.recommendations
    .map((rec) => ({ rec, product: getProduct(rec.productId) }))
    .filter((i) => i.product);

  return (
    <section id="discover" aria-labelledby="discover-title" className="scroll-mt-32">
      <p className={eyebrow}>Discover more</p>
      <h2 id="discover-title" className="mt-1 text-3xl font-semibold">
        Helps your {plant.nickname} thrive
      </h2>
      <p className="mt-1 text-muted">Chosen for {plant.botanicalName} from sellers on Green Thumb Shop.</p>

      <ul className="mt-5 grid gap-4 lg:grid-cols-3">
        {items.map(({ rec, product }) => {
          const p = product!;
          const alternative = p.alternativeId ? getProduct(p.alternativeId) : undefined;
          const noteId = `rec-stock-${p.id}`;
          return (
            <li key={p.id}>
              <article
                data-testid={`rec-${p.id}`}
                className="flex h-full flex-col rounded-3xl border border-line bg-white p-3 shadow-card"
              >
                <div className="flex gap-4">
                  <Link
                    href={`/product/${p.id}`}
                    className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl"
                    style={{ backgroundColor: p.tint }}
                    aria-label={p.name}
                  >
                    <ProductArt
                      kind={p.art}
                      bg={p.tint}
                      accent={p.accent}
                      label={p.label}
                      className={`h-full w-full p-2.5 ${p.inStock ? "" : "opacity-60 grayscale-[35%]"}`}
                    />
                  </Link>
                  <div className="min-w-0 flex-1 py-1 pr-1">
                    <StockBadge inStock={p.inStock} />
                    <h3 className="mt-1 font-sans text-[15px] font-semibold leading-snug tracking-normal">
                      <Link href={`/product/${p.id}`} className="hover:text-leaf">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">Sold by {p.seller}</p>
                    <p className="mt-1.5 text-lg font-bold">{formatPrice(p.price)}</p>
                  </div>
                </div>

                <p className="mt-3 rounded-2xl bg-mint/70 px-3.5 py-3 text-sm leading-snug text-forest">
                  <span className="font-bold">Why it&rsquo;s relevant: </span>
                  {rec.reason}
                </p>

                {!p.inStock && (
                  <p id={noteId} role="status" className="mt-3 flex gap-2 rounded-2xl bg-clay-soft px-3.5 py-3 text-sm leading-snug text-clay">
                    <AlertIcon width={18} height={18} className="mt-0.5 shrink-0" />
                    <span>
                      Best match for your {plant.nickname}, but sold out right now
                      {alternative ? (
                        <>
                          .{" "}
                          <Link href={`/product/${alternative.id}`} className="font-bold underline underline-offset-2">
                            Try {alternative.name.split(",")[0]} instead
                          </Link>
                          , or get a reminder when it&rsquo;s back.
                        </>
                      ) : (
                        <>. Get a reminder when it&rsquo;s back.</>
                      )}
                    </span>
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-2 px-1 pb-1 pt-4">
                  <AddToBasketButton product={p} compact describedBy={noteId} className="flex-1 whitespace-nowrap" />
                  {!p.inStock && <RestockReminderButton product={p} className="whitespace-nowrap !px-4 !py-2.5" />}
                  <Link href={`/product/${p.id}`} className={`${btnSecondary} !px-4 !py-2.5`}>
                    Details
                  </Link>
                </div>
                {!p.inStock && <RestockReminderStatus product={p} className="px-1 pb-1 pt-3" />}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
