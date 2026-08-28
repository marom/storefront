import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Cart — Storefront" };

export default function CartPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Your cart</h1>
      <CartView />
    </div>
  );
}
