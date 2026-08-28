import type { OrderResponse } from "@/lib/api/types";
import { OrderHistoryRow } from "./OrderHistoryRow";

export function OrderHistoryList({ orders }: { orders: OrderResponse[] }) {
  return (
    <ul className="divide-y divide-zinc-100 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {orders.map((order) => (
        <OrderHistoryRow key={order.id} order={order} />
      ))}
    </ul>
  );
}
