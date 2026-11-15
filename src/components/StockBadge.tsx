export function StockBadge({ inStock }: { inStock: boolean }) {
  return inStock ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-leaf">
      <span className="h-1.5 w-1.5 rounded-full bg-leaf" /> In stock
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft px-2.5 py-1 text-xs font-bold text-clay">
      <span className="h-1.5 w-1.5 rounded-full bg-clay" /> Sold out
    </span>
  );
}
