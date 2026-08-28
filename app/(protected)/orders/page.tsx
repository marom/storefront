import type { Metadata } from "next";
import { listOrders } from "@/lib/api/orders";
import { OrderHistoryList } from "@/components/order/OrderHistoryList";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Orders — Storefront" };

export default async function OrdersPage() {
  const orders = await listOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Your orders</h1>
      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Orders you place will show up here."
        />
      ) : (
        <OrderHistoryList orders={orders} />
      )}
    </div>
  );
}
