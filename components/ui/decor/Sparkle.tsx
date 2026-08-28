/** Four-point sparkle/star accent. Colour follows `currentColor`; size via `className`. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0c.6 5.4 3 8.7 12 12-9 3.3-11.4 6.6-12 12-.6-5.4-3-8.7-12-12C9 8.7 11.4 5.4 12 0Z" />
    </svg>
  );
}
