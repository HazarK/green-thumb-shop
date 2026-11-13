export type PlantArtKind =
  | "echeveria"
  | "monstera"
  | "snake"
  | "aloe"
  | "haworthia"
  | "pilea"
  | "cactus"
  | "mixed";

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

interface PlantBase {
  id: string;
  commonName: string;
  nickname: string;
  art: PlantArtKind;
  tint: string;
  orderNumber: string;
  seller: string;
}

/** A purchased plant we matched to a species, with a full care guide. */
export interface IdentifiedPlant extends PlantBase {
  identified: true;
  botanicalName: string;
  purchasedDaysAgo: number;
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

export interface BasicTip {
  icon: "water" | "light" | "soil" | "season";
  title: string;
  text: string;
}

/**
 * A purchased plant whose order line has no reliable species (e.g. a mixed
 * pack). It gets general tips only: no schedule and no recommendations.
 */
export interface UnidentifiedPlant extends PlantBase {
  identified: false;
  /** Local date, YYYY-MM-DD */
  purchasedOn: string;
  orderItemName: string;
  notice: string;
  basicTips: BasicTip[];
  reminderNote: string;
}

export type Plant = IdentifiedPlant | UnidentifiedPlant;

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
  /** Body of the simulated "back in stock" notification. */
  restockAlertBody?: string;
  featured?: boolean;
}

export interface Reminder {
  enabled: boolean;
  frequencyDays: number;
  /** Local date, YYYY-MM-DD */
  lastWatered: string;
}
