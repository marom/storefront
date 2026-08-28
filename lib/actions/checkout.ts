"use server";

import { revalidateTag } from "next/cache";
import { ApiError } from "@/lib/api/client";
import { placeOrder } from "@/lib/api/orders";
import { PRODUCTS_TAG } from "@/lib/api/products";
import type { OrderItemRequest, PaymentMethod } from "@/lib/api/types";

export interface PlaceOrderInput {
  shippingAddress: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: OrderItemRequest[];
}

export type PlaceOrderResult =
  | { ok: true; orderId: number; orderNumber: string }
  | { ok: false; error: string };

/** Places the order as the authenticated customer (customer id comes from the JWT). */
export async function placeOrderAction(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  if (input.items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  try {
    const order = await placeOrder({
      shippingAddress: input.shippingAddress,
      notes: input.notes || undefined,
      paymentMethod: input.paymentMethod,
      items: input.items,
    });

    // Stock changed — mark cached product reads stale.
    revalidateTag(PRODUCTS_TAG, "max");

    return { ok: true, orderId: order.id, orderNumber: order.orderNumber };
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        return { ok: false, error: "Your session expired — please sign in again." };
      }
      if (err.status === 403) {
        return { ok: false, error: "Only customer accounts can place orders." };
      }
      return { ok: false, error: err.body?.message ?? `Order failed (${err.status}).` };
    }
    return { ok: false, error: "Something went wrong placing your order." };
  }
}
