const LOCALE = process.env.NEXT_PUBLIC_LOCALE || "en-US";
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || "USD";

/** Format a monetary amount for display. All money in the UI goes through this. */
export function formatMoney(
  amount: number,
  currency: string = CURRENCY,
  locale: string = LOCALE,
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export function formatDate(iso: string, locale: string = LOCALE): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
