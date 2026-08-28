import type { PaymentResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";
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
    <div className="space-y-3 rounded-lg border border-zinc-200 p-4 text-sm dark:border-zinc-800">
      <h2 className="text-sm font-semibold">Payment</h2>
      <div className="flex justify-between">
        <span className="text-zinc-500">Method</span>
        <span>{METHOD_LABEL[payment.paymentMethod] ?? payment.paymentMethod}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-zinc-500">Status</span>
        <OrderStatusBadge status={payment.paymentStatus} />
      </div>
      <div className="flex justify-between">
        <span className="text-zinc-500">Amount</span>
        <Money value={payment.amount} />
      </div>
    </div>
  );
}
