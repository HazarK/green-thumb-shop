import Link from "next/link";
import type { BasicTip, UnidentifiedPlant } from "@/types";
import { formatLongDate } from "@/lib/dates";
import { PlantArt } from "./art/PlantArt";
import { AlertIcon, ArrowLeftIcon, BellIcon, CheckIcon, DropIcon, SproutIcon, SunIcon } from "./Icons";
import { card, container, eyebrow } from "./ui";

const tipStyle: Record<BasicTip["icon"], { icon: React.ReactNode; tone: string }> = {
  water: { icon: <DropIcon />, tone: "bg-sky-soft text-sky" },
  light: { icon: <SunIcon />, tone: "bg-sun-soft text-[#8A6600]" },
  soil: { icon: <SproutIcon />, tone: "bg-mint text-forest" },
  season: { icon: <DropIcon />, tone: "bg-cream-deep text-muted" },
};

/**
 * Profile for a purchased plant we could not match to a species. It shows
 * general tips only: no personal schedule and no product recommendations.
 */
export function UnidentifiedPlantProfile({ plant }: { plant: UnidentifiedPlant }) {
  return (
    <div className={`${container} py-6 sm:py-8`}>
      <Link href="/plant-hub" className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-forest hover:underline">
        <ArrowLeftIcon width={16} height={16} /> Plant Hub
      </Link>

      <div className="mt-4 grid items-center gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div className="rounded-[2rem] p-6 sm:p-8" style={{ backgroundColor: plant.tint }}>
          <PlantArt kind={plant.art} bg={plant.tint} className="mx-auto w-full max-w-[22rem]" />
        </div>
        <div>
          <p className={eyebrow}>My Plants</p>
          <h1 className="mt-2 text-4xl font-semibold text-forest sm:text-5xl">{plant.commonName}</h1>
          <p className="mt-3">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-muted ring-1 ring-line">
              Not identified yet
            </span>
          </p>
          <p
            data-testid="unidentified-notice"
            className="mt-4 flex max-w-xl gap-3 rounded-2xl border border-sun bg-sun-soft px-4 py-3.5 text-[15px] leading-relaxed text-ink"
          >
            <AlertIcon className="mt-0.5 shrink-0 text-[#8A6600]" />
            <span>{plant.notice}</span>
          </p>
          <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-line bg-white px-4 py-2.5 text-sm text-muted">
            <CheckIcon width={16} height={16} className="shrink-0 text-leaf" strokeWidth={2.6} />
            <span>
              Purchased <strong className="text-ink">{formatLongDate(plant.purchasedOn)}</strong> from {plant.seller} ·
              Order {plant.orderNumber}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted">
            Order item: <span className="text-ink">{plant.orderItemName}</span>
          </p>
        </div>
      </div>

      {/* No personal schedule until the plant is identified */}
      <section aria-labelledby="reminder-title" className={`${card} mt-10 p-5 sm:p-7`} data-testid="reminder-unavailable">
        <p className={eyebrow}>Care reminder</p>
        <h2 id="reminder-title" className="mt-1 text-2xl font-semibold">
          Watering reminder
        </h2>
        <p className="mt-4 flex items-start gap-3 rounded-2xl bg-cream p-4 text-[15px] leading-relaxed">
          <BellIcon className="mt-0.5 shrink-0 text-muted" />
          <span>{plant.reminderNote}</span>
        </p>
      </section>

      <section className="mt-12" aria-labelledby="care-tips-title">
        <p className={eyebrow}>Basic care</p>
        <h2 id="care-tips-title" className="mt-1 text-3xl font-semibold">
          General succulent care tips
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="basic-tips">
          {plant.basicTips.map((tip) => (
            <li key={tip.title} className={`${card} p-5`}>
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tipStyle[tip.icon].tone}`}>
                {tipStyle[tip.icon].icon}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{tip.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{tip.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
