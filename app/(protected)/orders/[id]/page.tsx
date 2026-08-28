import { notFound, redirect } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { getOrder } from "@/lib/api/orders";
import { formatDate } from "@/lib/format";
import { OrderConfirmationHeader } from "@/components/order/OrderConfirmationHeader";
import { OrderItemsTable } from "@/components/order/OrderItemsTable";
import { OrderSummary } from "@/components/order/OrderSummary";
import { PaymentSummary } from "@/components/order/PaymentSummary";
import { OrderStatusBadge } from "@/components/order/OrderStatusBadge";

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ placed?: string }>;
}) {
  const { id } = await params;
  const { placed } = await searchParams;
  const orderId = Number(id);
  if (!Number.isInteger(orderId) || orderId <= 0) notFound();

  const order = await getOrder(orderId).catch((err: unknown) => {
    if (err instanceof ApiError) {
      // 403 = someone else's order — treat as not found (don't reveal it exists).
      if (err.status === 404 || err.status === 403) notFound();
      if (err.status === 401) redirect("/login");
    }
    throw err;
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {placed ? (
        <OrderConfirmationHeader orderNumber={order.orderNumber} />
      ) : (
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl">Order {order.orderNumber}</h1>
            <p className="text-sm text-ink-soft">{formatDate(order.createdAt)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      )}

      <OrderItemsTable items={order.items} />

      <div className="grid gap-6 sm:grid-cols-2">
        <OrderSummary order={order} />
        {order.payment && <PaymentSummary payment={order.payment} />}
      </div>
    </div>
  );
}
