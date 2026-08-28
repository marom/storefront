import type { ReviewResponse } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { Stars } from "./Stars";

export function ReviewItem({ review }: { review: ReviewResponse }) {
  return (
    <li className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{review.customerName}</span>
        <Stars rating={review.rating} />
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{review.comment}</p>
      <p className="mt-2 text-xs text-zinc-400">{formatDate(review.createdAt)}</p>
    </li>
  );
}
