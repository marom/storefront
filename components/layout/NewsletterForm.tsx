"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="mt-4 max-w-sm rounded-full bg-mint/50 px-4 py-2.5 text-sm font-medium text-ink">
        You&rsquo;re on the list. ✦
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex max-w-sm gap-2">
      <input
        required
        type="email"
        placeholder="you@example.com"
        aria-label="Email address"
        className="w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm placeholder:text-ink-soft focus:border-lilac-deep focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-lilac-deep"
      >
        Join
      </button>
    </form>
  );
}
