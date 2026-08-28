import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-lilac/35 px-3 py-1 text-xs font-semibold text-ink ${className}`}
    >
      {children}
    </span>
  );
}
