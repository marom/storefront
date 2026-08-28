import Link from "next/link";
import type { OrderResponse } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { Money } from "@/components/ui/Money";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrderHistoryRow({ order }: { order: OrderResponse }) {
  return (
    <li>
      <Link
        href={`/orders/${order.id}`}
        className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
      >
        <div>
          <p className="text-sm font-medium">{order.orderNumber}</p>
          <p className="text-xs text-zinc-500">{formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <Money value={order.totalAmount} className="text-sm font-semibold" />
        </div>
      </Link>
    </li>
  );
}
