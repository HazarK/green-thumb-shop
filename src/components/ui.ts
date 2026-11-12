/** Shared class strings so buttons and containers stay consistent. */
export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed";

export const btnPrimary = `${btnBase} bg-forest px-5 py-3 text-white hover:bg-forest-deep disabled:bg-line disabled:text-muted`;
export const btnSecondary = `${btnBase} border border-forest/25 bg-white px-5 py-3 text-forest hover:border-forest hover:bg-mint`;
export const btnSun = `${btnBase} bg-sun px-5 py-3 text-ink hover:bg-[#eab92c]`;
export const btnGhost = `${btnBase} px-3 py-2 text-forest hover:bg-mint`;

export const card = "rounded-3xl border border-line bg-white shadow-card";
export const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-leaf";
