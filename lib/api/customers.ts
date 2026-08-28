import { apiFetch } from "./client";
import type { CustomerResponse } from "./types";

// The `/customers` collection is ADMIN-only in the API. The storefront never
// creates customers directly — new shoppers sign up via POST /auth/register,
// which provisions the linked customer record. Kept here only as a typed
// wrapper for admin tooling.
export function getCustomer(id: number): Promise<CustomerResponse> {
  return apiFetch<CustomerResponse>(`/customers/${id}`, { cache: "no-store", auth: true });
}
