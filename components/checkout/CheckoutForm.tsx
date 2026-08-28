"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";
import { toOrderItems } from "@/lib/cart/totals";
import { useHydrated } from "@/lib/useHydrated";
import { placeOrderAction } from "@/lib/actions/checkout";
import type { PaymentMethod } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { OrderReview } from "./OrderReview";

const field =
  "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

export function CheckoutForm({ defaultAddress = "" }: { defaultAddress?: string }) {
  const hydrated = useHydrated();
  if (!hydrated) return <p className="text-sm text-zinc-500">Loading…</p>;
  return <CheckoutFormFields defaultAddress={defaultAddress} />;
}

function CheckoutFormFields({ defaultAddress }: { defaultAddress: string }) {
  const router = useRouter();
  const { items, clear } = useCart();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const [shippingAddress, setShippingAddress] = useState(defaultAddress);
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CREDIT_CARD");

  useEffect(() => {
    if (items.length === 0 && !pending && !done) {
      router.replace("/cart");
    }
  }, [items.length, pending, done, router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await placeOrderAction({
        shippingAddress,
        notes: notes || undefined,
        paymentMethod,
        items: toOrderItems(items),
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setDone(true);
      clear();
      router.push(`/orders/${result.orderId}?placed=1`);
    });
  }

  if (items.length === 0) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">Shipping</legend>
        <textarea
          required
          rows={3}
          placeholder="Shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className={field}
        />
        <textarea
          rows={2}
          placeholder="Order notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={field}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">Payment</legend>
        <PaymentMethodSelect
          value={paymentMethod}
          onChange={setPaymentMethod}
          className={field}
        />
      </fieldset>

      <OrderReview items={items} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Placing order…" : "Place order"}
      </Button>
    </form>
  );
}
