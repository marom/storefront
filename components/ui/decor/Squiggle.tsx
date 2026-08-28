/** Hand-drawn wavy underline. Colour follows `currentColor`; size via `className`. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 12"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 8C14 2 26 2 38 8s24 6 36 0 24-6 36 0 24 6 36 0 24-6 34-3"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
