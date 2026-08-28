"use client";

import type { CartItem } from "@/lib/cart/totals";
import { useCart } from "@/lib/cart/CartContext";
import { Money } from "@/components/ui/Money";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function CartLineItem({ item }: { item: CartItem }) {
  const { setQuantity, remove } = useCart();

  return (
    <li className="flex items-center gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex h-14 w-14 items-center justify-center rounded bg-zinc-100 font-semibold text-zinc-300 dark:bg-zinc-900 dark:text-zinc-700">
        {item.name.slice(0, 1).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{item.name}</p>
        <Money value={item.price} className="text-xs text-zinc-500" />
      </div>
      <QuantityStepper
        value={item.quantity}
        min={1}
        max={item.stockQuantity}
        onChange={(q) => setQuantity(item.productId, q)}
      />
      <Money
        value={item.price * item.quantity}
        className="w-20 text-right text-sm font-semibold"
      />
      <button
        type="button"
        onClick={() => remove(item.productId)}
        className="text-xs text-zinc-400 hover:text-red-600"
      >
        Remove
      </button>
    </li>
  );
}
