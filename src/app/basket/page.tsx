import type { Metadata } from "next";
import { BasketView } from "@/components/BasketView";

export const metadata: Metadata = { title: "Basket" };

export default function BasketPage() {
  return <BasketView />;
}
