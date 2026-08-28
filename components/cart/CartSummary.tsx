"use client";

import { useCart } from "@/lib/cart/CartContext";
import { Money } from "@/components/ui/Money";

export function CartSummary() {
  const { subtotal, itemCount } = useCart();

  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 p-4 text-sm dark:border-zinc-800">
      <div className="flex justify-between">
        <span className="text-zinc-500">Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Subtotal</span>
        <Money value={subtotal} />
      </div>
      <p className="text-xs text-zinc-400">
        The final total is calculated by the API when you place the order.
      </p>
    </div>
  );
}
