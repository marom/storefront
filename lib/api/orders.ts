import { apiFetch } from "./client";
import type { OrderRequest, OrderResponse } from "./types";

// All order endpoints require a Bearer token. GET is auto-scoped to the caller's
// own orders (customers); POST places the order as the authenticated customer.

export function listOrders(): Promise<OrderResponse[]> {
  return apiFetch<OrderResponse[]>("/orders", { cache: "no-store", auth: true });
}

export function getOrder(id: number): Promise<OrderResponse> {
  return apiFetch<OrderResponse>(`/orders/${id}`, { cache: "no-store", auth: true });
}

export function placeOrder(body: OrderRequest): Promise<OrderResponse> {
  return apiFetch<OrderResponse>("/orders", { method: "POST", body, auth: true });
}
