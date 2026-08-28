"use client";

import { useCart } from "@/lib/cart/CartContext";

export function CartCountBadge() {
  const { itemCount, hydrated } = useCart();
  if (!hydrated || itemCount === 0) return null;
  return (
    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-900">
      {itemCount}
    </span>
  );
}
