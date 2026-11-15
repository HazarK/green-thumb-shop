"use client";

import { useRef } from "react";
import type { IdentifiedPlant, Reminder } from "@/types";
import { addDays, formatDate } from "@/lib/dates";
import { FREQUENCY_OPTIONS, frequencyLabel, getStatus, isDue, turnedOnLabel } from "@/lib/reminders";
import { markWatered, setReminderEnabled, showToast, undoWatered, updateReminder } from "@/lib/store";
import { BellIcon, CheckIcon, DropIcon } from "./Icons";
import { NotificationPreview } from "./NotificationPreview";
import { StatusChip } from "./StatusChip";
import { btnPrimary, card, eyebrow } from "./ui";

interface Props {
  plant: IdentifiedPlant;
  reminder: Reminder;
  canUndo: boolean;
}

/** Create / customise the watering reminder on a plant profile. */
export function ReminderSettings({ plant, reminder, canUndo }: Props) {
  const status = getStatus(reminder);
  const justDone = status.wateredToday && canUndo;
  const turnedOn = turnedOnLabel(reminder);
  const toggleRef = useRef<HTMLInputElement>(null);
  const options = FREQUENCY_OPTIONS.includes(plant.defaultFrequencyDays)
    ? FREQUENCY_OPTIONS
    : [...FREQUENCY_OPTIONS, plant.defaultFrequencyDays].sort((a, b) => a - b);

  return (
    <section id="reminder" aria-labelledby="reminder-title" className={`${card} scroll-mt-32 p-5 sm:p-7`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={eyebrow}>Care reminder</p>
          <h2 id="reminder-title" className="mt-1 text-2xl font-semibold">
            Watering reminder
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
        <label className={`flex items-center gap-3 text-sm font-semibold ${reminder.enabled ? "cursor-pointer" : "cursor-not-allowed text-muted"}`}>
          <span>{reminder.enabled ? "Reminder on" : "Reminder off"}</span>
          <input
            ref={toggleRef}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            checked={reminder.enabled}
            // Opt-in: while off, the "Turn on watering reminder" button below is the way in.
            disabled={!reminder.enabled}
            onChange={(e) => {
              setReminderEnabled(plant.id, e.target.checked);
              showToast({
                message: e.target.checked
                  ? `Watering reminder for ${plant.nickname} is on.`
                  : `Watering reminder for ${plant.nickname} is paused.`,
              });
            }}
          />
          <span className="relative h-7 w-12 rounded-full bg-line transition-colors after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-leaf peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky" />
        </label>
          {turnedOn && (
            <p className="text-xs text-muted" data-testid="reminder-opt-in">
              You turned this on · {turnedOn}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <fieldset disabled={!reminder.enabled} className="disabled:opacity-50">
            <legend className="text-sm font-semibold">How often should we remind you?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {options.map((days) => {
                const selected = reminder.frequencyDays === days;
                const recommended = days === plant.defaultFrequencyDays;
                return (
                  <label
                    key={days}
                    className={`relative cursor-pointer rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors has-focus-visible:outline has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-sky ${
                      selected ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-forest"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`frequency-${plant.id}`}
                      value={days}
                      checked={selected}
                      className="sr-only"
                      onChange={() => {
                        updateReminder(plant.id, { frequencyDays: days });
                        showToast({
                          message: `Reminder updated: ${frequencyLabel(days).toLowerCase()}. Next on ${formatDate(addDays(reminder.lastWatered, days))}.`,
                        });
                      }}
                    />
                    {frequencyLabel(days)}
                    {recommended && (
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${selected ? "bg-sun text-ink" : "bg-sun-soft text-[#7A5A00]"}`}>
                        Recommended
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <p className="mt-3 text-sm text-muted">
            Based on the care guide for {plant.botanicalName}. Adjust it for your home — warmer, brighter rooms dry
            soil faster.
          </p>

          <div
            aria-live="polite"
            data-testid="reminder-status"
            className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 ${justDone ? "bg-mint" : "bg-cream"}`}
          >
            {!reminder.enabled ? (
              <>
                <div>
                  <StatusChip status={status} />
                  <p className="mt-1.5 text-sm text-muted">Optional. We only remind you if you turn this on.</p>
                </div>
                <button
                  type="button"
                  className={`${btnPrimary} !py-2.5`}
                  onClick={() => {
                    setReminderEnabled(plant.id, true);
                    showToast({ message: `Watering reminder for ${plant.nickname} is on.` });
                    // The button is replaced, so hand focus to the now-enabled toggle.
                    requestAnimationFrame(() => toggleRef.current?.focus());
                  }}
                >
                  <BellIcon width={17} height={17} />
                  Turn on watering reminder
                </button>
              </>
            ) : (
              <>
            {justDone ? (
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 animate-pop items-center justify-center rounded-full bg-leaf text-white">
                  <CheckIcon strokeWidth={3} />
                </span>
                <div>
                  <p className="font-semibold text-forest">Watered today — nice work!</p>
                  <p className="text-sm text-forest/80">
                    Next reminder: <strong>{formatDate(status.nextDue)}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <StatusChip status={status} />
                <p className="mt-1.5 text-sm text-muted">
                  Last watered {formatDate(reminder.lastWatered)}
                  {reminder.enabled && <> · next reminder <strong className="text-ink">{formatDate(status.nextDue)}</strong></>}
                </p>
              </div>
            )}
            {justDone ? (
              <button
                type="button"
                onClick={() => undoWatered(plant.id)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-forest underline underline-offset-4 hover:bg-white/60"
              >
                Undo
              </button>
            ) : (
              <button
                type="button"
                className={`${btnPrimary} !py-2.5`}
                onClick={() => {
                  markWatered(plant.id);
                  showToast({ message: `${plant.nickname} marked as watered.` });
                }}
              >
                <DropIcon width={17} height={17} />
                Mark as watered
              </button>
            )}
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-line p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <BellIcon width={17} height={17} className="text-leaf" />
            What Alex will receive
          </p>
          <div className="mt-3">
            <NotificationPreview
              when={reminder.enabled ? formatDate(status.nextDue) : "reminder off"}
              title={`Time to water your ${plant.nickname} 💧`}
              body={`It's been ${reminder.frequencyDays} days. Tap to log it and see this week's care tip.`}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Simulated for this prototype. In the live product this arrives by push or email{" "}
            {isDue(status) && reminder.enabled ? "today" : "on the due date"} and links straight back to Plant Hub.
          </p>
        </div>
      </div>
    </section>
  );
}
