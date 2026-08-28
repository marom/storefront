import { apiFetch } from "./client";
import type { ProductRequest, ProductResponse } from "./types";

/** Cache tag for all product reads — invalidated after an order changes stock or an admin edit. */
export const PRODUCTS_TAG = "products";

export function listProducts(): Promise<ProductResponse[]> {
  return apiFetch<ProductResponse[]>("/products", {
    cache: "force-cache",
    revalidate: 60,
    tags: [PRODUCTS_TAG],
  });
}

export function getProduct(id: number): Promise<ProductResponse> {
  return apiFetch<ProductResponse>(`/products/${id}`, {
    cache: "force-cache",
    revalidate: 60,
    tags: [PRODUCTS_TAG, `product-${id}`],
  });
}

// --- admin (ROLE_ADMIN + Bearer) ---

export function createProduct(body: ProductRequest): Promise<ProductResponse> {
  return apiFetch<ProductResponse>("/products", { method: "POST", body, auth: true });
}

export function updateProduct(id: number, body: ProductRequest): Promise<ProductResponse> {
  return apiFetch<ProductResponse>(`/products/${id}`, { method: "PUT", body, auth: true });
}

export function deleteProduct(id: number): Promise<void> {
  return apiFetch<void>(`/products/${id}`, { method: "DELETE", auth: true });
}
