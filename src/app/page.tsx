import Link from "next/link";
import { PlantArt } from "@/components/art/PlantArt";
import { HomeReminderBanner } from "@/components/HomeReminderBanner";
import { ArrowRightIcon, BellIcon, ShieldIcon, SproutIcon, TruckIcon } from "@/components/Icons";
import { ProductCard } from "@/components/ProductCard";
import { btnPrimary, btnSecondary, btnSun, container, eyebrow } from "@/components/ui";
import { plants } from "@/data/plants";
import { products } from "@/data/products";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <HomeReminderBanner />

      {/* Hero */}
      <section className={`${container} grid items-center gap-10 pb-6 pt-10 md:grid-cols-2 md:pt-16`}>
        <div>
          <p className={eyebrow}>Europe&rsquo;s houseplant marketplace</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] text-forest sm:text-5xl lg:text-6xl">
            Plants that feel at home, from growers who know them best.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Succulents and houseplants from 400+ independent sellers across Europe — delivered healthy, with the care
            know-how to keep them that way.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#shop" className={btnPrimary}>
              Shop plants
            </Link>
            <Link href="/plant-hub" className={btnSecondary}>
              <SproutIcon width={18} height={18} />
              My Plant Hub
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4" aria-hidden="true">
          <div className="col-span-3 row-span-2 flex items-center rounded-[2rem] bg-mint p-4">
            <PlantArt kind="monstera" bg="#E2F0E3" className="w-full animate-sway [transform-origin:50%_85%]" />
          </div>
          <div className="col-span-2 rounded-[2rem] bg-sun-soft p-3">
            <PlantArt kind="echeveria" className="w-full" />
          </div>
          <div className="col-span-2 rounded-[2rem] bg-sky-soft p-3">
            <PlantArt kind="pilea" className="w-full" />
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className={`${container} py-6`} aria-label="Why shop with us">
        <ul className="grid gap-3 text-sm sm:grid-cols-3">
          {[
            { icon: <TruckIcon />, title: "Plastic-free delivery", text: "EU-wide in 2–4 days, free over €35" },
            { icon: <ShieldIcon />, title: "30-day healthy plant promise", text: "Arrives happy or we replace it" },
            { icon: <SproutIcon />, title: "Care that continues", text: "Care guides and optional reminders in Plant Hub" },
          ].map((item) => (
            <li key={item.title} className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                {item.icon}
              </span>
              <span>
                <span className="block font-semibold">{item.title}</span>
                <span className="text-muted">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Plant Hub entry point */}
      <section className={`${container} py-8`} aria-labelledby="hub-promo-title">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-9 text-white sm:px-10 sm:py-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                New · Plant Hub
              </p>
              <h2 id="hub-promo-title" className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Plant care doesn&rsquo;t stop at checkout. Neither do we.
              </h2>
              <p className="mt-3 max-w-lg text-white/80">
                Plants you buy appear in your Plant Hub. The ones we can identify get a care guide and up to 3
                hand-picked products. Turn on a watering reminder if you&rsquo;d like one.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2"><SproutIcon width={17} height={17} className="text-sun" /> Care guides for your plants</li>
                <li className="flex items-center gap-2"><BellIcon width={17} height={17} className="text-sun" /> Optional watering reminders</li>
              </ul>
              <Link href="/plant-hub" className={`${btnSun} mt-7`}>
                See Alex&rsquo;s plants
                <ArrowRightIcon width={17} height={17} />
              </Link>
            </div>
            <div className="mx-auto grid w-full max-w-[17rem] grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-4 md:mx-0 md:ml-auto md:max-w-[17rem] md:grid-cols-2">
              {plants.map((plant) => (
                <Link
                  key={plant.id}
                  href={`/plant-hub/${plant.id}`}
                  data-testid={`teaser-${plant.id}`}
                  className="rounded-2xl bg-white p-2 text-center text-ink shadow-lift transition-transform hover:-translate-y-1"
                >
                  <div className="relative rounded-xl" style={{ backgroundColor: plant.tint }}>
                    <PlantArt kind={plant.art} bg={plant.tint} className="w-full p-1.5" />
                    {!plant.identified && (
                      <span className="absolute inset-x-1 top-1 rounded-full bg-white px-1 py-0.5 text-[10px] font-bold leading-tight text-muted ring-1 ring-line">
                        Not identified yet
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 truncate text-xs font-semibold">{plant.nickname}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className={`${container} scroll-mt-28 py-8`} aria-labelledby="shop-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className={eyebrow}>Shop</p>
            <h2 id="shop-title" className="mt-1 text-3xl font-semibold">
              Popular this week
            </h2>
          </div>
          <p className="text-sm text-muted">Sold and shipped by independent European growers</p>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
