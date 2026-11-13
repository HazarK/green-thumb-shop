"use client";

import Link from "next/link";
import type { IdentifiedPlant, Reminder } from "@/types";
import { getProduct } from "@/data/products";
import { formatDate } from "@/lib/dates";
import { frequencyLabel, getStatus, isDue } from "@/lib/reminders";
import { markWatered, showToast, undoWatered } from "@/lib/store";
import { PlantArt } from "./art/PlantArt";
import { ArrowRightIcon, CheckIcon, DropIcon } from "./Icons";
import { StatusChip } from "./StatusChip";
import { btnPrimary, btnSecondary } from "./ui";

interface Props {
  plant: IdentifiedPlant;
  reminder: Reminder;
  canUndo: boolean;
}

/** One watering task on the Plant Hub dashboard. */
export function ReminderCard({ plant, reminder, canUndo }: Props) {
  const status = getStatus(reminder);
  const due = isDue(status);
  const justDone = status.wateredToday && canUndo;
  const topPick = getProduct(plant.recommendations[0].productId);

  if (justDone) {
    return (
      <li
        data-testid={`reminder-${plant.id}`}
        data-state="done"
        className="rounded-3xl border border-leaf/30 bg-mint p-4 sm:p-5"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 animate-pop items-center justify-center rounded-full bg-leaf text-white">
            <CheckIcon width={28} height={28} strokeWidth={3} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold text-forest">Nice work — {plant.nickname} watered</p>
            <p className="text-sm text-forest/80">
              We&rsquo;ll remind you again on <strong>{formatDate(status.nextDue)}</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => undoWatered(plant.id)}
            className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-forest underline underline-offset-4 hover:bg-white/60"
          >
            Undo
          </button>
        </div>
        {topPick && (
          <Link
            href={`/plant-hub/${plant.id}#discover`}
            className="mt-4 flex animate-rise items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm hover:shadow-card"
          >
            <span>
              <span className="font-semibold">While you&rsquo;re here:</span>{" "}
              <span className="text-muted">see what helps your {plant.nickname} thrive, like {topPick.name.split(",")[0]}.</span>
            </span>
            <ArrowRightIcon className="shrink-0 text-leaf" />
          </Link>
        )}
      </li>
    );
  }

  return (
    <li
      data-testid={`reminder-${plant.id}`}
      data-state={due ? "due" : "upcoming"}
      className={`rounded-3xl border bg-white p-4 shadow-card sm:p-5 ${due ? "border-sun" : "border-line"}`}
    >
      <div className="flex items-center gap-4">
        <Link
          href={`/plant-hub/${plant.id}`}
          className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl"
          style={{ backgroundColor: plant.tint }}
          aria-label={`${plant.nickname} profile`}
        >
          <PlantArt kind={plant.art} bg={plant.tint} className="h-full w-full p-1.5" />
        </Link>
        <div className="min-w-0 flex-1">
          <StatusChip status={status} />
          <p className="mt-1.5 font-semibold leading-tight">Water your {plant.nickname}</p>
          <p className="text-sm text-muted">
            {reminder.enabled ? frequencyLabel(reminder.frequencyDays) : "Reminder paused"} · last watered{" "}
            {formatDate(reminder.lastWatered)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={`${due ? btnPrimary : btnSecondary} !py-2.5`}
          onClick={() => {
            markWatered(plant.id);
            showToast({ message: `${plant.nickname} marked as watered.` });
          }}
        >
          <DropIcon width={17} height={17} />
          Mark as watered
        </button>
        <Link href={`/plant-hub/${plant.id}#reminder`} className={`${btnSecondary} !border-transparent !py-2.5`}>
          Adjust reminder
        </Link>
      </div>
    </li>
  );
}
