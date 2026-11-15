import type { IdentifiedPlant, Plant } from "@/types";
import { addDays, todayISO } from "@/lib/dates";

/**
 * Alex's fictional purchase history. In production this would come from
 * the order service; for the prototype it is preloaded mock data.
 */
export const plants: Plant[] = [
  {
    id: "echeveria",
    commonName: "Mexican Snowball",
    identified: true,
    botanicalName: "Echeveria elegans",
    nickname: "Echeveria",
    art: "echeveria",
    tint: "#E4F0E2",
    purchasedDaysAgo: 24,
    orderNumber: "GT-48213",
    seller: "Suculentas del Sol",
    difficulty: "Easy",
    intro:
      "A compact, silvery-blue rosette from the semi-deserts of Mexico. It stores water in its plump leaves, so it would much rather be a little dry than a little wet.",
    watering: {
      summary: "Every 2 weeks — soak, then let it dry out",
      detail:
        "Water thoroughly until it runs from the drainage hole, then wait until the soil is completely dry before watering again. That is roughly every 2 weeks in spring and summer and every 3–4 weeks in winter. Water the soil, not the rosette — water trapped between the leaves can cause rot.",
    },
    sunlight: {
      summary: "Bright light, with a few hours of direct sun",
      detail:
        "A south- or west-facing windowsill is ideal. Aim for 4–6 hours of bright light a day. If the rosette starts to stretch and the leaves space out, it is reaching for more light — move it closer to the window.",
    },
    fertilizing: {
      summary: "Monthly in spring and summer, at half strength",
      detail:
        "Feed once a month from April to September with a low-nitrogen succulent or cactus fertilizer diluted to half the label strength. Don't feed in autumn and winter, when the plant is resting.",
    },
    tips: [
      "Use a gritty, free-draining succulent mix and a pot with a drainage hole.",
      "Wrinkled, soft leaves mean it is thirsty. Yellow, translucent leaves mean too much water.",
      "Gently pull away dried leaves at the base to keep pests from settling in.",
      "The powdery coating on the leaves is natural sun protection — try not to rub it off.",
      "Keep above 5 °C. It enjoys a summer outdoors but is not frost-hardy.",
    ],
    defaultFrequencyDays: 14,
    seedLastWateredDaysAgo: 14,
    seedReminderOnDaysAgo: 22,
    recommendations: [
      {
        productId: "succulent-feed",
        reason:
          "Your Echeveria is in its growing season. A low-nitrogen feed once a month keeps the rosette compact and colourful.",
      },
      {
        productId: "gritty-soil-mix",
        reason:
          "Echeverias need fast-draining soil. After a few weeks at home, repotting out of nursery compost helps prevent root rot.",
      },
      {
        productId: "terracotta-pot",
        reason:
          "Terracotta breathes and dries quickly — the easiest way to avoid overwatering a succulent.",
      },
    ],
  },
  {
    id: "monstera",
    commonName: "Swiss Cheese Plant",
    identified: true,
    botanicalName: "Monstera deliciosa",
    nickname: "Monstera",
    art: "monstera",
    tint: "#E0EEF2",
    purchasedDaysAgo: 96,
    orderNumber: "GT-39127",
    seller: "Jungle Loft Amsterdam",
    difficulty: "Easy",
    intro:
      "A fast-growing climber from Central American rainforests, loved for its large split leaves. Give it something to climb and it will reward you with bigger, more dramatic foliage.",
    watering: {
      summary: "About once a week — when the top 3–5 cm is dry",
      detail:
        "Push a finger into the soil: if the top 3–5 cm feels dry, water until it drains through, then empty the saucer. Expect roughly weekly watering in summer and every 2 weeks in winter. Drooping leaves usually mean thirst; yellowing lower leaves usually mean too much water.",
    },
    sunlight: {
      summary: "Bright, indirect light",
      detail:
        "Place it near an east- or north-facing window, or a metre or two back from a sunny one. Harsh midday sun can scorch the leaves, while too little light means new leaves stay small and don't split.",
    },
    fertilizing: {
      summary: "Every 4 weeks from spring to early autumn",
      detail:
        "Use a balanced liquid houseplant fertilizer every 4 weeks between March and September. Stop feeding in winter when growth slows down.",
    },
    tips: [
      "Add a moss pole — climbing support encourages larger leaves with more splits.",
      "Wipe leaves with a damp cloth every few weeks so they can absorb more light.",
      "Tuck aerial roots back into the pot or onto the pole rather than cutting them.",
      "Repot every 1–2 years in spring, going up one pot size.",
      "Toxic if chewed — keep out of reach of pets and small children.",
    ],
    defaultFrequencyDays: 7,
    seedLastWateredDaysAgo: 5,
    recommendations: [
      {
        productId: "moss-pole",
        reason:
          "Monsteras are climbers. A moss pole supports the stems and encourages bigger, more fenestrated leaves.",
      },
      {
        productId: "houseplant-feed",
        reason:
          "A balanced feed every 4 weeks supports the new leaves your Monstera pushes out in the growing season.",
      },
      {
        productId: "mister",
        reason:
          "A fine mist makes it easy to keep the moss pole damp and to wipe dust off those large leaves.",
      },
    ],
  },
  {
    id: "snake-plant",
    commonName: "Snake Plant",
    identified: true,
    botanicalName: "Dracaena trifasciata",
    nickname: "Snake Plant",
    art: "snake",
    tint: "#F6EDD3",
    purchasedDaysAgo: 152,
    orderNumber: "GT-31560",
    seller: "Nordic Green Studio",
    difficulty: "Easy",
    intro:
      "Upright, architectural and famously hard to kill. Formerly known as Sansevieria, it tolerates low light and missed waterings better than almost any other houseplant.",
    watering: {
      summary: "Every 2–3 weeks — let the soil dry out fully",
      detail:
        "Wait until the soil is dry all the way down, then water around the edge of the pot rather than into the centre of the leaves. In winter, once a month is usually enough. Overwatering is the one thing it will not forgive.",
    },
    sunlight: {
      summary: "Low to bright indirect light",
      detail:
        "It copes with a dim corner but grows faster and keeps stronger leaf markings in bright, indirect light. Avoid long spells of hot, direct afternoon sun.",
    },
    fertilizing: {
      summary: "Two or three times a year, in spring and summer",
      detail:
        "A light feeder: a half-strength cactus or houseplant fertilizer two or three times between April and August is plenty. Never feed in winter.",
    },
    tips: [
      "Choose a heavy pot — tall leaves can make the plant top-heavy.",
      "It likes being slightly root-bound; repot only every 2–3 years.",
      "Soft, mushy leaves at the base are a sign of overwatering. Let it dry out fully.",
      "Dust the leaves occasionally to keep the patterning crisp.",
      "Mildly toxic if eaten — keep away from curious pets.",
    ],
    defaultFrequencyDays: 21,
    seedLastWateredDaysAgo: 12,
    recommendations: [
      {
        productId: "terracotta-pot",
        reason:
          "A heavy terracotta pot keeps tall leaves stable and lets the soil dry out between waterings.",
      },
      {
        productId: "mineral-cactus-mix",
        reason:
          "Snake plants are prone to root rot in dense compost. A mineral mix drains fast and keeps roots healthy.",
      },
      {
        productId: "watering-can",
        reason:
          "A narrow spout lets you water the soil at the edge of the pot instead of the centre of the leaves.",
      },
    ],
  },
  {
    // Edge case: the order line is a mixed pack, so there is no species to match.
    id: "mixed-succulent",
    identified: false,
    commonName: "Mixed succulent",
    nickname: "Mixed succulent",
    art: "mixed",
    tint: "#F1EADB",
    purchasedOn: "2026-11-01",
    orderNumber: "GT-50377",
    seller: "Kaktus Kollektiv",
    orderItemName: "Succulent surprise trio (mixed)",
    notice:
      "We couldn't match this plant to a care guide yet, so here are general succulent care tips. Full guide coming soon.",
    basicTips: [
      { icon: "water", title: "Watering", text: "Water only when the soil is completely dry." },
      { icon: "light", title: "Sunlight", text: "Give it bright light with some direct sun." },
      { icon: "soil", title: "Pot and soil", text: "Use a free-draining pot and soil." },
      { icon: "season", title: "Winter", text: "Water less often in the cold, dark months." },
    ],
    reminderNote: "Personal reminders start once we've identified this plant.",
  },
];

/** Plants with a matched species: only these get schedules and recommendations. */
export const identifiedPlants = plants.filter((p): p is IdentifiedPlant => p.identified);

/** Purchase date as a local YYYY-MM-DD string. */
export const purchaseDateISO = (plant: Plant) =>
  plant.identified ? addDays(todayISO(), -plant.purchasedDaysAgo) : plant.purchasedOn;

export const getPlant = (id: string) => plants.find((p) => p.id === id);
