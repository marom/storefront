import type { OrderResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";

export function OrderSummary({ order }: { order: OrderResponse }) {
  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 p-4 text-sm dark:border-zinc-800">
      <h2 className="text-sm font-semibold">Summary</h2>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <Money value={order.totalAmount} />
      </div>
      <div>
        <span className="text-zinc-500">Ship to</span>
        <p className="whitespace-pre-line">{order.shippingAddress}</p>
      </div>
      {order.notes && (
        <div>
          <span className="text-zinc-500">Notes</span>
          <p className="whitespace-pre-line">{order.notes}</p>
        </div>
      )}
    </div>
  );
}
