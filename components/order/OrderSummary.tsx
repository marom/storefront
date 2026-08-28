import type { OrderResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";
import { Card } from "@/components/ui/Card";

export function OrderSummary({ order }: { order: OrderResponse }) {
  return (
    <Card className="space-y-3 text-sm">
      <h2 className="font-display text-base">Summary</h2>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <Money value={order.totalAmount} />
      </div>
      <div>
        <span className="text-ink-soft">Ship to</span>
        <p className="whitespace-pre-line">{order.shippingAddress}</p>
      </div>
      {order.notes && (
        <div>
          <span className="text-ink-soft">Notes</span>
          <p className="whitespace-pre-line">{order.notes}</p>
        </div>
      )}
    </Card>
  );
}
