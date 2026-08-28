import { apiFetch } from "./client";
import type { ReviewRequest, ReviewResponse } from "./types";

export function listReviews(productId: number): Promise<ReviewResponse[]> {
  // Public read.
  return apiFetch<ReviewResponse[]>(`/products/${productId}/reviews`, {
    cache: "no-store",
  });
}

export function createReview(
  productId: number,
  body: ReviewRequest,
): Promise<ReviewResponse> {
  // Requires ROLE_CUSTOMER; the reviewer is the authenticated customer.
  return apiFetch<ReviewResponse>(`/products/${productId}/reviews`, {
    method: "POST",
    body,
    auth: true,
  });
}
