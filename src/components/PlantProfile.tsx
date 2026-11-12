"use client";

import Link from "next/link";
import type { Plant } from "@/types";
import { addDays, formatLongDate, todayISO } from "@/lib/dates";
import { useDemoState } from "@/lib/store";
import { PlantArt } from "./art/PlantArt";
import { ArrowLeftIcon, CheckIcon, DropIcon, SproutIcon, SunIcon } from "./Icons";
import { Recommendations } from "./Recommendations";
import { ReminderSettings } from "./ReminderSettings";
import { card, container, eyebrow } from "./ui";

export function PlantProfile({ plant }: { plant: Plant }) {
  const state = useDemoState();

  const facts = [
    { key: "water", title: "Watering", icon: <DropIcon />, tone: "bg-sky-soft text-sky", fact: plant.watering },
    { key: "light", title: "Sunlight", icon: <SunIcon />, tone: "bg-sun-soft text-[#8A6600]", fact: plant.sunlight },
    { key: "feed", title: "Fertilizing", icon: <SproutIcon />, tone: "bg-mint text-forest", fact: plant.fertilizing },
  ];

  return (
    <div className={`${container} py-6 sm:py-8`}>
      <Link href="/plant-hub" className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-forest hover:underline">
        <ArrowLeftIcon width={16} height={16} /> Plant Hub
      </Link>

      {/* Header */}
      <div className="mt-4 grid items-center gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div className="rounded-[2rem] p-6 sm:p-8" style={{ backgroundColor: plant.tint }}>
          <PlantArt kind={plant.art} bg={plant.tint} className="mx-auto w-full max-w-[22rem]" />
        </div>
        <div>
          <p className={eyebrow}>My Plants · {plant.difficulty} care</p>
          <h1 className="mt-2 text-4xl font-semibold text-forest sm:text-5xl">{plant.commonName}</h1>
          <p className="mt-1 text-lg italic text-muted">{plant.botanicalName}</p>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink/90">{plant.intro}</p>
          <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-line bg-white px-4 py-2.5 text-sm text-muted">
            <CheckIcon width={16} height={16} className="text-leaf" strokeWidth={2.6} />
            <span>
              Purchased{" "}
              <strong className="text-ink">
                {state ? formatLongDate(addDays(todayISO(), -plant.purchasedDaysAgo)) : `${plant.purchasedDaysAgo} days ago`}
              </strong>{" "}
              from {plant.seller} · Order {plant.orderNumber}
            </span>
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f.key} className="rounded-2xl border border-line bg-white p-3.5">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${f.tone}`}>{f.icon}</span>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted">{f.title}</p>
                <p className="mt-0.5 text-sm font-semibold leading-snug">{f.fact.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reminder */}
      <div className="mt-10">
        {state ? (
          <ReminderSettings plant={plant} reminder={state.reminders[plant.id]} canUndo={Boolean(state.undo[plant.id])} />
        ) : (
          <div className="h-72 animate-pulse rounded-3xl bg-cream-deep" aria-busy="true" aria-label="Loading reminder" />
        )}
      </div>

      {/* Care guide */}
      <section className="mt-12" aria-labelledby="care-guide-title">
        <p className={eyebrow}>Care guide</p>
        <h2 id="care-guide-title" className="mt-1 text-3xl font-semibold">
          How to care for your {plant.nickname}
        </h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {facts.map((f) => (
            <article key={f.key} className={`${card} p-5`} data-testid={`care-${f.key}`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${f.tone}`}>{f.icon}</span>
                <h3 className="text-xl font-semibold">{f.title}</h3>
              </div>
              <p className="mt-3 font-semibold leading-snug">{f.fact.summary}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.fact.detail}</p>
            </article>
          ))}
        </div>

        <div className={`${card} mt-4 p-5 sm:p-7`}>
          <h3 className="text-xl font-semibold">Good to know</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {plant.tips.map((tip) => (
              <li key={tip} className="flex gap-3 text-[15px] leading-relaxed">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                  <CheckIcon width={14} height={14} strokeWidth={3} />
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-12">
        <Recommendations plant={plant} />
      </div>
    </div>
  );
}
