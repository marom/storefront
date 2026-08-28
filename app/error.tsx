"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Sparkle } from "@/components/ui/decor/Sparkle";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <Sparkle className="mx-auto h-7 w-7 text-lilac-deep" />
      <h2 className="text-2xl">Something went sideways</h2>
      <p className="text-sm text-ink-soft">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
