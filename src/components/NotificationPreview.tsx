import { Logo } from "./Icons";

/** Mock of the push / email nudge that would bring a customer back. */
export function NotificationPreview({ title, body, when = "now" }: { title: string; body: string; when?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-3">
      <div className="flex items-start gap-3">
        <Logo className="h-9 w-9 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[13px] font-bold">Green Thumb Shop</p>
            <p className="shrink-0 text-[11px] text-muted">{when}</p>
          </div>
          <p className="text-[13px] font-semibold leading-snug">{title}</p>
          <p className="text-[13px] leading-snug text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}
