import type { ReviewResponse } from "@/lib/api/types";
import { Stars } from "./Stars";
import { ReviewItem } from "./ReviewItem";

export function ReviewList({ reviews }: { reviews: ReviewResponse[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-ink-soft">
        No reviews yet. Be the first to review this product.
      </p>
    );
  }

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <Stars rating={average} />
        <span className="font-semibold">{average.toFixed(1)}</span>
        <span className="text-ink-soft">
          ({reviews.length} review{reviews.length === 1 ? "" : "s"})
        </span>
      </div>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
}
