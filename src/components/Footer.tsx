import Link from "next/link";
import { Logo } from "./Icons";
import { container } from "./ui";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-cream-deep/60">
      <div className={`${container} grid gap-8 py-10 sm:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-semibold text-forest">Green Thumb Shop</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Europe&rsquo;s marketplace for succulents and houseplants, grown by independent professional sellers.
          </p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li><Link className="hover:text-forest hover:underline" href="/#shop">Shop</Link></li>
            <li><Link className="hover:text-forest hover:underline" href="/plant-hub">Plant Hub</Link></li>
            <li><Link className="hover:text-forest hover:underline" href="/basket">Basket</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="font-semibold">About this prototype</p>
          <p className="mt-3 text-muted">
            A fictional MVP built for a product case study. Customer, sellers, products, reminders and checkout are
            simulated. No account, payment or personal data is used.
          </p>
        </div>
      </div>
    </footer>
  );
}
