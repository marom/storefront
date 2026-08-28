"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ProductResponse } from "@/lib/api/types";
import { useHydrated } from "@/lib/useHydrated";
import { cartItemCount, cartSubtotal, type CartItem } from "./totals";
import {
  addToCart,
  clearCart,
  getCartServerSnapshot,
  getCartSnapshot,
  removeFromCart,
  setCartQuantity,
  subscribeCart,
} from "./store";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  /** False until the client has read localStorage — guards against hydration flicker. */
  hydrated: boolean;
  add: (product: ProductResponse, quantity?: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);
  const hydrated = useHydrated();

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: cartItemCount(items),
      subtotal: cartSubtotal(items),
      hydrated,
      add: addToCart,
      setQuantity: setCartQuantity,
      remove: removeFromCart,
      clear: clearCart,
    }),
    [items, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
