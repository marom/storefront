import { apiFetch } from "./client";
import type { PaymentResponse } from "./types";

export function getPayment(id: number): Promise<PaymentResponse> {
  return apiFetch<PaymentResponse>(`/payments/${id}`, { cache: "no-store" });
}

export function completePayment(id: number): Promise<PaymentResponse> {
  return apiFetch<PaymentResponse>(`/payments/${id}/complete`, { method: "PUT" });
}
