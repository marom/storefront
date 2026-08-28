export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const rounded = Math.round(rating);
  return (
    <span
      className={`inline-flex text-amber-500 ${className}`}
      aria-label={`${rating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden>
          {i < rounded ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
