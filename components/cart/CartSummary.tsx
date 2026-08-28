"use client";

import { useCart } from "@/lib/cart/CartContext";
import { Money } from "@/components/ui/Money";
import { Card } from "@/components/ui/Card";

export function CartSummary() {
  const { subtotal, itemCount } = useCart();

  return (
    <Card className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-ink-soft">Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="flex justify-between text-base font-semibold">
        <span>Subtotal</span>
        <Money value={subtotal} />
      </div>
      <p className="text-xs text-ink-soft">
        The final total is calculated by the API when you place the order.
      </p>
    </Card>
  );
}
