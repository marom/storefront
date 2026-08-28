import type { ReactNode } from "react";

/** Soft rounded panel — the default surface for grouped content. */
export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  return (
    <Tag className={`rounded-3xl bg-surface p-6 shadow-soft ${className}`}>
      {children}
    </Tag>
  );
}
