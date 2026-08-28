import type { OrderStatus, PaymentStatus } from "@/lib/api/types";
import { Badge } from "@/components/ui/Badge";

const TONE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  PROCESSING: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  SHIPPED: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  DELIVERED: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  FAILED: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  REFUNDED: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

export function OrderStatusBadge({ status }: { status: OrderStatus | PaymentStatus }) {
  return <Badge className={TONE[status] ?? ""}>{status.toLowerCase()}</Badge>;
}
