"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/client";
import { createReview } from "@/lib/api/reviews";

export interface SubmitReviewInput {
  productId: number;
  rating: number;
  comment: string;
}

export type SubmitReviewResult = { ok: true } | { ok: false; error: string };

/** Posts the review as the authenticated customer (customer id comes from the JWT). */
export async function submitReviewAction(input: SubmitReviewInput): Promise<SubmitReviewResult> {
  try {
    await createReview(input.productId, { rating: input.rating, comment: input.comment });
    revalidatePath(`/products/${input.productId}`);
    return { ok: true };
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        return { ok: false, error: "Your session expired — please sign in again." };
      }
      if (err.status === 403) {
        return { ok: false, error: "Only customer accounts can post reviews." };
      }
      if (err.status === 409) {
        return { ok: false, error: "You've already reviewed this product." };
      }
      return { ok: false, error: err.body?.message ?? `Review failed (${err.status}).` };
    }
    return { ok: false, error: "Something went wrong submitting your review." };
  }
}
