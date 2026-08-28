// Module-level cart store backing `useSyncExternalStore` — the cart lives only in
// the browser (the ecommerce-api has no cart endpoint) and is mirrored to localStorage.
import type { ProductResponse } from "@/lib/api/types";
import type { CartItem } from "./totals";

const STORAGE_KEY = "storefront.cart";
type Listener = () => void;

const listeners = new Set<Listener>();
const EMPTY: CartItem[] = [];
let snapshot: CartItem[] = EMPTY;
let initialized = false;

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as CartItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeStorage(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // storage unavailable / quota exceeded — non-fatal
  }
}

function ensureInitialized(): void {
  if (initialized || typeof window === "undefined") return;
  snapshot = readStorage();
  initialized = true;
}

function emit(): void {
  for (const listener of listeners) listener();
}

function commit(next: CartItem[]): void {
  snapshot = next.length > 0 ? next : EMPTY;
  writeStorage();
  emit();
}

function clampToStock(quantity: number, stock: number): number {
  if (quantity < 1) return 1;
  if (stock > 0 && quantity > stock) return stock;
  return quantity;
}

export function subscribeCart(listener: Listener): () => void {
  ensureInitialized();
  listeners.add(listener);

  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      snapshot = readStorage();
      emit();
    }
  }
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getCartSnapshot(): CartItem[] {
  ensureInitialized();
  return snapshot;
}

export function getCartServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function addToCart(product: ProductResponse, quantity = 1): void {
  const current = getCartSnapshot();
  const existing = current.find((i) => i.productId === product.id);
  if (existing) {
    commit(
      current.map((i) =>
        i.productId === product.id
          ? { ...i, quantity: clampToStock(i.quantity + quantity, product.stockQuantity) }
          : i,
      ),
    );
    return;
  }
  commit([
    ...current,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity,
      quantity: clampToStock(quantity, product.stockQuantity),
    },
  ]);
}

export function setCartQuantity(productId: number, quantity: number): void {
  commit(
    getCartSnapshot().map((i) =>
      i.productId === productId ? { ...i, quantity: clampToStock(quantity, i.stockQuantity) } : i,
    ),
  );
}

export function removeFromCart(productId: number): void {
  commit(getCartSnapshot().filter((i) => i.productId !== productId));
}

export function clearCart(): void {
  commit([]);
}
