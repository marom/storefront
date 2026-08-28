import type { PaymentResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";
import { Card } from "@/components/ui/Card";
import { OrderStatusBadge } from "./OrderStatusBadge";

const METHOD_LABEL: Record<string, string> = {
  CREDIT_CARD: "Credit card",
  DEBIT_CARD: "Debit card",
  UPI: "UPI",
  NET_BANKING: "Net banking",
  WALLET: "Wallet",
  CASH_ON_DELIVERY: "Cash on delivery",
};

export function PaymentSummary({ payment }: { payment: PaymentResponse }) {
  return (
    <Card className="space-y-3 text-sm">
      <h2 className="font-display text-base">Payment</h2>
      <div className="flex justify-between">
        <span className="text-ink-soft">Method</span>
        <span>{METHOD_LABEL[payment.paymentMethod] ?? payment.paymentMethod}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-ink-soft">Status</span>
        <OrderStatusBadge status={payment.paymentStatus} />
      </div>
      <div className="flex justify-between">
        <span className="text-ink-soft">Amount</span>
        <Money value={payment.amount} />
      </div>
    </Card>
  );
}
