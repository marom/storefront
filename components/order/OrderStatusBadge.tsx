import type { OrderStatus, PaymentStatus } from "@/lib/api/types";

const TONE: Record<string, string> = {
  PENDING: "bg-butter/50 text-ink",
  CONFIRMED: "bg-sky/50 text-ink",
  PROCESSING: "bg-sky/50 text-ink",
  SHIPPED: "bg-lilac/40 text-ink",
  DELIVERED: "bg-mint/60 text-ink",
  COMPLETED: "bg-mint/60 text-ink",
  CANCELLED: "bg-blush/70 text-ink",
  FAILED: "bg-blush/70 text-ink",
  REFUNDED: "bg-line text-ink-soft",
};

export function OrderStatusBadge({ status }: { status: OrderStatus | PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        TONE[status] ?? "bg-line text-ink"
      }`}
    >
      {status.toLowerCase()}
    </span>
  );
}
