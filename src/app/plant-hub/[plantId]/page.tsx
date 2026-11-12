import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlantProfile } from "@/components/PlantProfile";
import { getPlant, plants } from "@/data/plants";

type Props = { params: Promise<{ plantId: string }> };

/** Only known ids exist; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return plants.map((p) => ({ plantId: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plant = getPlant((await params).plantId);
  return { title: plant ? `${plant.commonName} care — Plant Hub` : "Plant not found" };
}

export default async function PlantPage({ params }: Props) {
  const plant = getPlant((await params).plantId);
  if (!plant) notFound();
  return <PlantProfile plant={plant} />;
}
