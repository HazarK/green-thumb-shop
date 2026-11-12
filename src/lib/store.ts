"use client";

import { useSyncExternalStore } from "react";
import { plants } from "@/data/plants";
import { getProduct } from "@/data/products";
import type { Reminder } from "@/types";
import { todayISO } from "./dates";
import { seedReminder } from "./reminders";

/**
 * Tiny client-side store for the prototype. Everything lives in
 * localStorage so demo interactions survive a refresh — there is no backend.
 */

const STORAGE_KEY = "green-thumb-shop:demo:v1";

export interface OrderSummary {
  number: string;
  itemCount: number;
  total: number;
}

export interface DemoState {
  basket: Record<string, number>;
  reminders: Record<string, Reminder>;
  /** lastWatered value before the most recent "mark as watered", for undo. */
  undo: Record<string, string>;
  wateringsLogged: number;
  notifyWhenBack: string[];
  lastOrder: OrderSummary | null;
}

function seedState(): DemoState {
  return {
    basket: {},
    reminders: Object.fromEntries(plants.map((p) => [p.id, seedReminder(p)])),
    undo: {},
    wateringsLogged: 7,
    notifyWhenBack: [],
    lastOrder: null,
  };
}

let state: DemoState | null = null;
const listeners = new Set<() => void>();

function load(): DemoState {
  const seed = seedState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const saved = JSON.parse(raw) as Partial<DemoState>;
    return {
      ...seed,
      ...saved,
      reminders: { ...seed.reminders, ...(saved.reminders ?? {}) },
    };
  } catch {
    return seed;
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode) — the demo still works in memory */
  }
}

function getSnapshot(): DemoState | null {
  if (state === null && typeof window !== "undefined") state = load();
  return state;
}

const getServerSnapshot = (): DemoState | null => null;

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function update(fn: (s: DemoState) => DemoState) {
  state = fn(getSnapshot() ?? seedState());
  persist();
  listeners.forEach((l) => l());
}

/** Returns null until the browser state has been read (use for skeletons). */
export function useDemoState(): DemoState | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function basketCount(s: DemoState | null): number {
  if (!s) return 0;
  return Object.values(s.basket).reduce((sum, q) => sum + q, 0);
}

/* ---------- Basket ---------- */

export function addToBasket(productId: string, qty = 1): boolean {
  const product = getProduct(productId);
  if (!product || !product.inStock) return false;
  update((s) => ({
    ...s,
    lastOrder: null,
    basket: { ...s.basket, [productId]: Math.min(9, (s.basket[productId] ?? 0) + qty) },
  }));
  return true;
}

export function setQuantity(productId: string, qty: number) {
  update((s) => {
    const basket = { ...s.basket };
    if (qty <= 0) delete basket[productId];
    else basket[productId] = Math.min(9, qty);
    return { ...s, basket };
  });
}

export function removeFromBasket(productId: string) {
  setQuantity(productId, 0);
}

export function placeDemoOrder(order: OrderSummary) {
  update((s) => ({ ...s, basket: {}, lastOrder: order }));
}

export function clearLastOrder() {
  update((s) => ({ ...s, lastOrder: null }));
}

/* ---------- Reminders ---------- */

export function markWatered(plantId: string) {
  update((s) => {
    const r = s.reminders[plantId];
    if (!r) return s;
    return {
      ...s,
      undo: { ...s.undo, [plantId]: r.lastWatered },
      wateringsLogged: s.wateringsLogged + 1,
      reminders: { ...s.reminders, [plantId]: { ...r, lastWatered: todayISO() } },
    };
  });
}

export function undoWatered(plantId: string) {
  update((s) => {
    const previous = s.undo[plantId];
    const r = s.reminders[plantId];
    if (!previous || !r) return s;
    const undo = { ...s.undo };
    delete undo[plantId];
    return {
      ...s,
      undo,
      wateringsLogged: Math.max(0, s.wateringsLogged - 1),
      reminders: { ...s.reminders, [plantId]: { ...r, lastWatered: previous } },
    };
  });
}

export function updateReminder(plantId: string, patch: Partial<Reminder>) {
  update((s) => {
    const r = s.reminders[plantId];
    if (!r) return s;
    return { ...s, reminders: { ...s.reminders, [plantId]: { ...r, ...patch } } };
  });
}

/* ---------- Misc ---------- */

export function toggleNotify(productId: string) {
  update((s) => ({
    ...s,
    notifyWhenBack: s.notifyWhenBack.includes(productId)
      ? s.notifyWhenBack.filter((id) => id !== productId)
      : [...s.notifyWhenBack, productId],
  }));
}

export function resetDemo() {
  state = seedState();
  persist();
  listeners.forEach((l) => l());
}

/* ---------- Toasts (not persisted) ---------- */

export interface Toast {
  id: number;
  message: string;
  href?: string;
  linkLabel?: string;
}

let toasts: Toast[] = [];
const noToasts: Toast[] = [];
const toastListeners = new Set<() => void>();
let nextToastId = 1;

function emitToasts() {
  toastListeners.forEach((l) => l());
}

export function showToast(toast: Omit<Toast, "id">) {
  const id = nextToastId++;
  toasts = [...toasts.slice(-1), { ...toast, id }];
  emitToasts();
  window.setTimeout(() => dismissToast(id), 4500);
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emitToasts();
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(
    (fn) => {
      toastListeners.add(fn);
      return () => {
        toastListeners.delete(fn);
      };
    },
    () => toasts,
    () => noToasts,
  );
}
