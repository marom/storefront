"use client";

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
  disabled = false,
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  const cap = max && max > 0 ? max : undefined;

  return (
    <div className="inline-flex items-center rounded-full border-2 border-line">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className="rounded-l-full px-3 py-1.5 text-sm hover:bg-lilac/20 disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="min-w-9 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(cap ? Math.min(cap, value + 1) : value + 1)}
        disabled={disabled || (cap !== undefined && value >= cap)}
        className="rounded-r-full px-3 py-1.5 text-sm hover:bg-lilac/20 disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
