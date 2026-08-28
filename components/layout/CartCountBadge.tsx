"use client";

import { useCart } from "@/lib/cart/CartContext";

export function CartCountBadge() {
  const { itemCount, hydrated } = useCart();
  if (!hydrated || itemCount === 0) return null;
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lilac-deep px-1.5 text-[11px] font-bold text-white">
      {itemCount}
    </span>
  );
}
