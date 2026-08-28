// Client-only helpers for remembering the shopper between visits. The ecommerce-api
// has no auth, so checkout creates a Customer once and we reuse its id here.
import type { CustomerRequest } from "@/lib/api/types";

const CUSTOMER_ID_KEY = "storefront.customerId";
const CUSTOMER_KEY = "storefront.customer";

export function getStoredCustomerId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CUSTOMER_ID_KEY);
  const id = raw ? Number(raw) : NaN;
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function setStoredCustomerId(id: number): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOMER_ID_KEY, String(id));
}

export function getStoredCustomer(): Partial<CustomerRequest> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CUSTOMER_KEY);
    return raw ? (JSON.parse(raw) as Partial<CustomerRequest>) : null;
  } catch {
    return null;
  }
}

export function setStoredCustomer(customer: Partial<CustomerRequest>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } catch {
    // storage unavailable / quota — non-fatal
  }
}
