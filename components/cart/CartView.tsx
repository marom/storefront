"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { buttonClasses } from "@/components/ui/Button";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartView() {
  const { items, hydrated } = useCart();

  if (!hydrated) return <p className="text-sm text-ink-soft">Loading cart…</p>;
  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <ul className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <CartLineItem key={item.productId} item={item} />
        ))}
      </ul>
      <div className="space-y-4">
        <CartSummary />
        <Link href="/checkout" className={`${buttonClasses()} w-full`}>
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
