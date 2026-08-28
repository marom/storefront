"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitReviewAction } from "@/lib/actions/reviews";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { inputClasses } from "@/components/ui/Field";

export function ReviewForm({
  productId,
  reviewerEmail,
}: {
  productId: number;
  reviewerEmail: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await submitReviewAction({ productId, rating, comment });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setComment("");
      setMessage("Thanks for your review!");
      router.refresh();
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className="font-display text-lg">Write a review</h3>
        <p className="text-xs text-ink-soft">Posting as {reviewerEmail}</p>

        <div className="flex items-center gap-2">
          <label className="text-sm text-ink-soft" htmlFor="rating">
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={`${inputClasses} w-auto rounded-full`}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <textarea
          required
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts"
          className={inputClasses}
        />

        {error && <p className="text-sm text-danger">{error}</p>}
        {message && <p className="text-sm text-lilac-deep">{message}</p>}

        <Button type="submit" disabled={pending}>
          {pending ? "Submitting…" : "Submit review"}
        </Button>
      </form>
    </Card>
  );
}
