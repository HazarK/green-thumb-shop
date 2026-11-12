export type PlantArtKind =
  | "echeveria"
  | "monstera"
  | "snake"
  | "aloe"
  | "haworthia"
  | "pilea"
  | "cactus";

export type ProductArtKind =
  | "bottle"
  | "pot"
  | "bag"
  | "moss-pole"
  | "watering-can"
  | "mister"
  | PlantArtKind;

export interface CareFact {
  summary: string;
  detail: string;
}

export interface Recommendation {
  productId: string;
  /** Why this product is relevant to this specific plant. */
  reason: string;
}

export interface Plant {
  id: string;
  commonName: string;
  botanicalName: string;
  nickname: string;
  art: PlantArtKind;
  tint: string;
  purchasedDaysAgo: number;
  orderNumber: string;
  seller: string;
  difficulty: "Easy" | "Moderate";
  intro: string;
  watering: CareFact;
  sunlight: CareFact;
  fertilizing: CareFact;
  tips: string[];
  /** Recommended watering interval in days. */
  defaultFrequencyDays: number;
  /** Demo seed: how many days ago the plant was last watered. */
  seedLastWateredDaysAgo: number;
  recommendations: Recommendation[];
}

export interface Product {
  id: string;
  name: string;
  category: "Plants" | "Plant care" | "Pots & tools";
  price: number;
  seller: string;
  sellerLocation: string;
  rating: number;
  reviews: number;
  art: ProductArtKind;
  tint: string;
  accent?: string;
  label?: string;
  short: string;
  description: string;
  details: string[];
  inStock: boolean;
  /** Suggested substitute shown when this product is out of stock. */
  alternativeId?: string;
  restockNote?: string;
  featured?: boolean;
}

export interface Reminder {
  enabled: boolean;
  frequencyDays: number;
  /** Local date, YYYY-MM-DD */
  lastWatered: string;
}
