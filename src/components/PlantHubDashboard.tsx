"use client";

import Link from "next/link";
import { identifiedPlants, plants, purchaseDateISO } from "@/data/plants";
import { getProduct } from "@/data/products";
import { addDays, formatDate, todayISO } from "@/lib/dates";
import { getStatus, isDue } from "@/lib/reminders";
import { useDemoState } from "@/lib/store";
import { PlantArt } from "./art/PlantArt";
import { ArrowRightIcon, BellIcon, DropIcon, SunIcon } from "./Icons";
import { NotificationPreview } from "./NotificationPreview";
import { ProductCard } from "./ProductCard";
import { ReminderCard } from "./ReminderCard";
import { StatusChip } from "./StatusChip";
import { card, container, eyebrow } from "./ui";

function DashboardSkeleton() {
  return (
    <div className={`${container} py-10`} aria-busy="true" aria-label="Loading your plants">
      <div className="h-10 w-72 animate-pulse rounded-full bg-cream-deep" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-3xl bg-cream-deep" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-3xl bg-cream-deep" />
      </div>
    </div>
  );
}

export function PlantHubDashboard() {
  const state = useDemoState();
  if (!state) return <DashboardSkeleton />;

  const statuses = identifiedPlants.map((plant) => ({ plant, status: getStatus(state.reminders[plant.id]) }));
  const unidentified = plants.filter((plant) => !plant.identified);
  const waitingFor = state.notifyWhenBack.map((id) => getProduct(id)).filter((p) => p !== undefined);
  const dueCount = statuses.filter((s) => isDue(s.status)).length;
  const picks = identifiedPlants
    .map((plant) => ({ plant, rec: plant.recommendations[0], product: getProduct(plant.recommendations[0].productId) }))
    .filter((p) => p.product);

  return (
    <div className={`${container} py-8 sm:py-10`}>
      <p className={eyebrow}>Plant Hub</p>
      <h1 className="mt-2 text-4xl font-semibold text-forest sm:text-5xl">Good to see you, Alex</h1>
      <p className="mt-3 text-lg text-muted" data-testid="hub-summary">
        {plants.length} plants in your care ·{" "}
        {dueCount > 0 ? (
          <strong className="text-ink">
            {dueCount} {dueCount === 1 ? "needs" : "need"} water today
          </strong>
        ) : (
          <strong className="text-leaf">all watered and happy</strong>
        )}
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Care tasks */}
        <section aria-labelledby="care-title">
          <h2 id="care-title" className="flex items-center gap-2 text-2xl font-semibold">
            <DropIcon className="text-sky" /> Care reminders
          </h2>
          <ul className="mt-4 space-y-3">
            {identifiedPlants.map((plant) => (
              <ReminderCard
                key={plant.id}
                plant={plant}
                reminder={state.reminders[plant.id]}
                canUndo={Boolean(state.undo[plant.id])}
              />
            ))}
            {unidentified.map((plant) => (
              <li key={plant.id} data-testid={`reminder-${plant.id}`} data-state="unavailable">
                <Link
                  href={`/plant-hub/${plant.id}`}
                  className="flex items-center gap-4 rounded-3xl border border-dashed border-line bg-white/60 p-4 hover:bg-white sm:p-5"
                >
                  <span className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl" style={{ backgroundColor: plant.tint }}>
                    <PlantArt kind={plant.art} bg={plant.tint} className="h-full w-full p-1" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block font-semibold">{plant.commonName}</span>
                    <span className="text-muted">{plant.reminderNote}</span>
                  </span>
                  <ArrowRightIcon width={17} height={17} className="shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          {waitingFor.length > 0 && (
            <p
              data-testid="restock-alerts"
              className="mt-3 flex animate-rise items-start gap-2.5 rounded-2xl bg-sky-soft px-4 py-3 text-sm text-ink"
            >
              <BellIcon width={17} height={17} className="mt-0.5 shrink-0 text-sky" />
              <span>
                <span className="font-semibold">Back-in-stock alerts:</span>{" "}
                {waitingFor.map((product, i) => (
                  <span key={product.id}>
                    {i > 0 && ", "}
                    <Link href={`/product/${product.id}`} className="underline underline-offset-4 hover:text-sky">
                      {product.name.split(",")[0]}
                    </Link>
                  </span>
                ))}
                <span className="text-muted"> — we&rsquo;ll remind you when {waitingFor.length === 1 ? "it's" : "they're"} back.</span>
              </span>
            </p>
          )}
        </section>

        {/* How reminders bring Alex back */}
        <aside className={`${card} p-5`} aria-labelledby="nudge-title">
          <h2 id="nudge-title" className="flex items-center gap-2 font-sans text-base font-bold tracking-normal">
            <BellIcon width={18} height={18} className="text-leaf" /> How reminders reach you
          </h2>
          <p className="mt-1 text-sm text-muted">
            On the day a plant needs care, we send a gentle nudge that opens straight into Plant Hub.
          </p>
          <div className="mt-4 space-y-2">
            <NotificationPreview
              title="Time to water your Echeveria 💧"
              body="It's been 2 weeks. Tap to log it and see this week's care tip."
              when={formatDate(todayISO())}
            />
            <NotificationPreview
              title="Feeding season has started 🌱"
              body="Succulents grow fastest from April to September. See what your Echeveria needs."
              when={formatDate(addDays(todayISO(), 5))}
            />
          </div>
          <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-xs leading-relaxed text-muted">
            <strong className="text-ink">Prototype note:</strong> notifications are simulated here. Push and email
            delivery are out of scope for the MVP demo.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-2xl bg-mint px-2 py-3">
              <dt className="text-xs text-forest/80">Waterings logged</dt>
              <dd className="font-display text-2xl font-semibold text-forest" data-testid="waterings-logged">
                {state.wateringsLogged}
              </dd>
            </div>
            <div className="rounded-2xl bg-sun-soft px-2 py-3">
              <dt className="text-xs text-[#7A5A00]">Plants thriving</dt>
              <dd className="font-display text-2xl font-semibold text-[#7A5A00]">
                {plants.length - statuses.filter((s) => s.status.state === "overdue").length}/{plants.length}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* My plants */}
      <section className="mt-12" aria-labelledby="my-plants-title">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="my-plants-title" className="text-3xl font-semibold">
            My Plants
          </h2>
          <p className="text-sm text-muted">Added automatically from your Green Thumb Shop orders</p>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant) => (
            <li key={plant.id}>
              <Link
                href={`/plant-hub/${plant.id}`}
                data-testid={`plant-card-${plant.id}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-3 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: plant.tint }}>
                  <PlantArt
                    kind={plant.art}
                    bg={plant.tint}
                    className="mx-auto aspect-square w-full max-w-[16rem] p-5 transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3">
                    {plant.identified ? (
                      <StatusChip status={getStatus(state.reminders[plant.id])} />
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-bold text-muted ring-1 ring-line">
                        Not identified yet
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="text-xl font-semibold">{plant.commonName}</h3>
                  {plant.identified ? (
                    <>
                      <p className="text-sm italic text-muted">{plant.botanicalName}</p>
                      <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
                        <li className="flex gap-2"><DropIcon width={16} height={16} className="mt-0.5 shrink-0 text-sky" /> {plant.watering.summary}</li>
                        <li className="flex gap-2"><SunIcon width={16} height={16} className="mt-0.5 shrink-0 text-[#C99A10]" /> {plant.sunlight.summary}</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted">From your order: {plant.orderItemName}</p>
                      <p className="mt-3 text-sm text-ink/85">General succulent care tips for now. Full guide coming soon.</p>
                    </>
                  )}
                  <span className="mt-auto flex items-center justify-between pt-4 text-sm">
                    <span className="text-muted">Bought {formatDate(purchaseDateISO(plant))}</span>
                    <span className="flex items-center gap-1 font-semibold text-forest">
                      {plant.identified ? "Care guide" : "Care tips"} <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Discover more */}
      <section className="mt-12" aria-labelledby="picks-title">
        <p className={eyebrow}>Discover more</p>
        <h2 id="picks-title" className="mt-1 text-3xl font-semibold">
          Picked for your plants
        </h2>
        <p className="mt-1 text-muted">Based on what you own — not on what&rsquo;s trending.</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map(({ plant, rec, product }) => (
            <li key={plant.id}>
              <ProductCard product={product!} reason={`For your ${plant.nickname}: ${rec.reason}`} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
