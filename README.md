# Green Thumb Shop — Plant Hub MVP

A case-study prototype of **Plant Hub**, a post-purchase plant-care feature for the fictional
European plant marketplace Green Thumb Shop.

> "Plant care doesn't stop at checkout. Neither should our relationship with customers."

## What it demonstrates

- **Marketplace home** with a personal care reminder for Alex, the demo customer
- **Plant Hub → My Plants**: Alex's previously purchased plants with care guides
- **Care reminders**: one optional, opt-in watering reminder per identified plant (on for the Echeveria,
  off for the others by default), configurable frequency, mark as watered, undo, visual feedback
- **Discover More**: rule-based product recommendations per owned plant
- **Basket**: add, change quantity, remove, totals, simulated checkout
- **Edge state — sold out**: an out-of-stock recommendation with a disabled Add to Basket, a suggested
  alternative, and a "Remind me when it's back" reminder shared between the product page and Plant Hub
- **Edge state — plant not identified yet**: a purchase with no reliable species shows general succulent
  tips, with no personal schedule and no recommendations

Everything is mock data. State is kept in `localStorage`; there is no backend, login, payment or API key.

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `src/data` — mock plants (Alex's purchase history) and marketplace products
- `src/lib` — client store (localStorage), reminder and date helpers
- `src/components` — UI components and inline SVG illustrations (`art/`)
- `src/app` — routes: `/`, `/plant-hub`, `/plant-hub/[plantId]`, `/product/[productId]`, `/basket`
