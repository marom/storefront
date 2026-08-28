"use client";

import type { CartItem } from "@/lib/cart/totals";
import { useCart } from "@/lib/cart/CartContext";
import { Money } from "@/components/ui/Money";
import { Card } from "@/components/ui/Card";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function CartLineItem({ item }: { item: CartItem }) {
  const { setQuantity, remove } = useCart();

  return (
    <Card as="li" className="flex items-center gap-4 p-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lilac/20 font-display text-lg text-lilac-deep">
        {item.name.slice(0, 1).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{item.name}</p>
        <Money value={item.price} className="text-xs text-ink-soft" />
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
        className="text-xs text-ink-soft transition-colors hover:text-danger"
      >
        Remove
      </button>
    </Card>
  );
}
