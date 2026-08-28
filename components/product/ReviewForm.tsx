"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitReviewAction } from "@/lib/actions/reviews";
import { Button } from "@/components/ui/Button";

const field =
  "rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
    >
      <h3 className="text-sm font-semibold">Write a review</h3>
      <p className="text-xs text-zinc-500">Posting as {reviewerEmail}</p>

      <div className="flex items-center gap-2">
        <label className="text-sm text-zinc-500" htmlFor="rating">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className={field}
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
        className={`w-full ${field}`}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Submit review"}
      </Button>
    </form>
  );
}
