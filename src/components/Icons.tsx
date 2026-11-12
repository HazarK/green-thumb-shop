import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  width: 20,
  height: 20,
  ...props,
});

export const DropIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" /></svg>
);
export const SunIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.700l1.4 1.400M2 12h2M20 12h2M4.9 19.100l1.4-1.400M17.7 6.300l1.4-1.4" /></svg>
);
export const SproutIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 21v-9" /><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6Z" /><path d="M12 15c0-3.5 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.500Z" /></svg>
);
export const BasketIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 9h14l-1.3 9.200a2 2 0 0 1-2 1.800H8.300a2 2 0 0 1-2-1.800L5 9Z" /><path d="M9 9l3-5 3 5" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 12.500l4.5 4.500L19 7.5" /></svg>
);
export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeftIcon = (p: P) => (
  <svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const BellIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
);
export const TrashIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M9 7V4h6v3M6.5 7l.8 12a2 2 0 0 0 2 1.900h5.400a2 2 0 0 0 2-1.900l.8-12" /></svg>
);
export const StarIcon = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}><path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.200L12 17l-5.6 3 1.2-6.200L3 9.500l6.3-.8L12 3Z" /></svg>
);
export const AlertIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7.500v5M12 16.200v.1" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const TruckIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 3 5 6v5.500c0 4.3 2.9 7.7 7 9.5 4.1-1.8 7-5.2 7-9.500V6l-7-3Z" /><path d="m9 12 2.2 2.200L15 10.3" /></svg>
);
export const CompassIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>
);

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="13" fill="#1F4D36" />
      <path d="M20 31V18" stroke="#F4C542" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 20c0-6-4.5-9-10-9 0 6 4.5 9 10 9Z" fill="#8FD0A0" />
      <path d="M20 24.500c0-5 3.8-8 10-8 0 5-3.8 8-10 8Z" fill="#E2F0E3" />
    </svg>
  );
}
