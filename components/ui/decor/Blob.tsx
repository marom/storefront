/** Organic blob shape for section backgrounds. Fill follows `currentColor`;
 *  position/size/blur via `className` (e.g. "absolute -top-10 left-0 w-64 text-peach blur-2xl"). */
export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M43.4 -60.5C55.3 -50.3 63.1 -35.6 67.6 -19.8C72.1 -4 73.3 12.9 67.3 26.9C61.3 40.9 48.1 52 33.4 59.9C18.7 67.8 2.4 72.5 -14.6 71.3C-31.6 70.1 -49.3 63 -60.6 50.2C-71.9 37.4 -76.8 18.7 -76.6 0.1C-76.4 -18.5 -71.1 -37 -59.8 -47.9C-48.5 -58.8 -31.2 -62.1 -15.3 -63.9C0.6 -65.7 15.1 -66 43.4 -60.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
