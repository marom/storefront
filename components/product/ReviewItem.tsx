import type { ReviewResponse } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Stars } from "./Stars";

export function ReviewItem({ review }: { review: ReviewResponse }) {
  return (
    <Card as="li" className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{review.customerName}</span>
        <Stars rating={review.rating} />
      </div>
      <p className="mt-2 text-sm text-ink-soft">{review.comment}</p>
      <p className="mt-2 text-xs text-ink-soft/70">{formatDate(review.createdAt)}</p>
    </Card>
  );
}
