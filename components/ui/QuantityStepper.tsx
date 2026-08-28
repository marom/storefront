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
    <div className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className="px-2 py-1 text-sm disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(cap ? Math.min(cap, value + 1) : value + 1)}
        disabled={disabled || (cap !== undefined && value >= cap)}
        className="px-2 py-1 text-sm disabled:opacity-40"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
