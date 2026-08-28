import type { OrderResponse } from "@/lib/api/types";
import { OrderHistoryRow } from "./OrderHistoryRow";

export function OrderHistoryList({ orders }: { orders: OrderResponse[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-surface shadow-soft">
      {orders.map((order) => (
        <OrderHistoryRow key={order.id} order={order} />
      ))}
    </ul>
  );
}
