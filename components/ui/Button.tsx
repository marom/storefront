import type { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const variants = {
  primary:
    "bg-ink text-cream shadow-soft hover:bg-lilac-deep hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border-2 border-ink text-ink hover:bg-ink hover:text-cream hover:-translate-y-0.5 active:translate-y-0",
  pill:
    "bg-lilac text-ink hover:bg-lilac-deep hover:text-white hover:-translate-y-0.5 active:translate-y-0",
} as const;

export type ButtonVariant = keyof typeof variants;

/** Shared class string, so `<Link>` elements can look like buttons without wrapping. */
export function buttonClasses(variant: ButtonVariant = "primary"): string {
  return `${base} ${variants[variant]}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={`${buttonClasses(variant)} ${className}`} {...props} />;
}
