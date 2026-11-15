import type { IdentifiedPlant, Reminder } from "@/types";
import { addDays, daysBetween, formatDate, todayISO } from "./dates";

export type DueState = "overdue" | "today" | "soon" | "later" | "off";

export interface ReminderStatus {
  state: DueState;
  /** Days until due. Negative when overdue. */
  daysUntil: number;
  nextDue: string;
  label: string;
  wateredToday: boolean;
}

export function seedReminder(plant: IdentifiedPlant): Reminder {
  const optedIn = plant.seedReminderOnDaysAgo !== undefined;
  return {
    enabled: optedIn,
    ...(optedIn ? { enabledOn: addDays(todayISO(), -plant.seedReminderOnDaysAgo!) } : {}),
    frequencyDays: plant.defaultFrequencyDays,
    lastWatered: addDays(todayISO(), -plant.seedLastWateredDaysAgo),
  };
}

export function getStatus(reminder: Reminder): ReminderStatus {
  const today = todayISO();
  const nextDue = addDays(reminder.lastWatered, reminder.frequencyDays);
  const daysUntil = daysBetween(today, nextDue);
  const wateredToday = reminder.lastWatered === today;

  let state: DueState;
  let label: string;
  if (!reminder.enabled) {
    state = "off";
    label = "Reminder off";
  } else if (daysUntil < 0) {
    state = "overdue";
    label = `Overdue by ${-daysUntil} day${daysUntil === -1 ? "" : "s"}`;
  } else if (daysUntil === 0) {
    state = "today";
    label = "Water today";
  } else if (daysUntil <= 3) {
    state = "soon";
    label = daysUntil === 1 ? "Water tomorrow" : `Water in ${daysUntil} days`;
  } else {
    state = "later";
    label = `Water on ${formatDate(nextDue)}`;
  }
  return { state, daysUntil, nextDue, label, wateredToday };
}

export const isDue = (s: ReminderStatus) => s.state === "overdue" || s.state === "today";

export const FREQUENCY_OPTIONS = [7, 10, 14, 21, 28];

export function frequencyLabel(days: number): string {
  if (days === 7) return "Every week";
  if (days % 7 === 0) return `Every ${days / 7} weeks`;
  return `Every ${days} days`;
}

/** "today", "1 day ago", "22 days ago" — for "You turned this on · …". */
export function turnedOnLabel(reminder: Reminder): string | null {
  if (!reminder.enabled || !reminder.enabledOn) return null;
  const days = Math.max(0, daysBetween(reminder.enabledOn, todayISO()));
  if (days === 0) return "today";
  return days === 1 ? "1 day ago" : `${days} days ago`;
}
