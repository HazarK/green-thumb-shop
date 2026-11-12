import type { Metadata } from "next";
import { PlantHubDashboard } from "@/components/PlantHubDashboard";

export const metadata: Metadata = {
  title: "Plant Hub — My Plants",
  description: "Care guides, watering reminders and recommendations for the plants you bought at Green Thumb Shop.",
};

export default function PlantHubPage() {
  return <PlantHubDashboard />;
}
