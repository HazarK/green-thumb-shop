import type { ReminderStatus } from "@/lib/reminders";
import { BellIcon, CheckIcon, DropIcon } from "./Icons";

const styles: Record<ReminderStatus["state"], string> = {
  overdue: "bg-clay-soft text-clay",
  today: "bg-sun-soft text-[#7A5A00]",
  soon: "bg-sky-soft text-sky",
  later: "bg-mint text-forest",
  off: "bg-cream-deep text-muted",
};

export function StatusChip({ status }: { status: ReminderStatus }) {
  const watered = status.wateredToday && status.state !== "off";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${watered ? "bg-mint text-forest" : styles[status.state]}`}>
      {watered ? (
        <CheckIcon width={13} height={13} strokeWidth={3} />
      ) : status.state === "off" ? (
        <BellIcon width={13} height={13} />
      ) : (
        <DropIcon width={13} height={13} />
      )}
      {watered ? "Watered today" : status.label}
    </span>
  );
}
