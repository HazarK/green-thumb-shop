"use client";

import Link from "next/link";
import { plants } from "@/data/plants";
import { formatDate } from "@/lib/dates";
import { getStatus, isDue } from "@/lib/reminders";
import { useDemoState } from "@/lib/store";
import { PlantArt } from "./art/PlantArt";
import { ArrowRightIcon, CheckIcon, DropIcon } from "./Icons";
import { btnPrimary, container } from "./ui";

/** The "reason to return": a personal care reminder on the marketplace home. */
export function HomeReminderBanner() {
  const state = useDemoState();

  if (!state) {
    return (
      <div className={`${container} pt-5`} aria-hidden="true">
        <div className="h-[92px] animate-pulse rounded-3xl bg-cream-deep" />
      </div>
    );
  }

  const ranked = plants
    .map((plant) => ({ plant, status: getStatus(state.reminders[plant.id]) }))
    .filter((r) => r.status.state !== "off")
    .sort((a, b) => a.status.daysUntil - b.status.daysUntil);
  const next = ranked[0];
  if (!next) return null;
  const due = isDue(next.status);

  return (
    <div className={`${container} pt-5`}>
      <section
        aria-label="Your plant-care reminder"
        data-testid="home-reminder"
        className={`flex animate-rise flex-col gap-4 rounded-3xl border p-4 sm:flex-row sm:items-center sm:p-5 ${
          due ? "border-sun bg-sun-soft" : "border-leaf/25 bg-mint"
        }`}
      >
        <div className="flex flex-1 items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 rounded-2xl bg-white/70">
            <PlantArt kind={next.plant.art} bg="#ffffff" className="h-full w-full p-1.5" />
            <span className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white ring-2 ring-white ${due ? "bg-sky" : "bg-leaf"}`}>
              {due ? <DropIcon width={13} height={13} /> : <CheckIcon width={13} height={13} strokeWidth={3} />}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest/70">Welcome back, Alex</p>
            {due ? (
              <p className="mt-0.5 font-display text-lg font-semibold leading-snug sm:text-xl">
                Your {next.plant.nickname} is {next.status.state === "overdue" ? "overdue for" : "due for"} watering
                {next.status.state === "today" ? " today" : ""}.
              </p>
            ) : (
              <p className="mt-0.5 font-display text-lg font-semibold leading-snug sm:text-xl">
                Your plants are all cared for. Next up: {next.plant.nickname} on {formatDate(next.status.nextDue)}.
              </p>
            )}
            <p className="text-sm text-forest/80">
              {due
                ? `You bought it ${next.plant.purchasedDaysAgo} days ago — here is how to keep it thriving.`
                : "Check care guides and what grows well with them in Plant Hub."}
            </p>
          </div>
        </div>
        <Link href="/plant-hub" className={`${btnPrimary} shrink-0`}>
          Open Plant Hub
          <ArrowRightIcon width={17} height={17} />
        </Link>
      </section>
    </div>
  );
}
