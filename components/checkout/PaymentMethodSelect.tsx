import type { PaymentMethod } from "@/lib/api/types";

const METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "CREDIT_CARD", label: "Credit card" },
  { value: "DEBIT_CARD", label: "Debit card" },
  { value: "UPI", label: "UPI" },
  { value: "NET_BANKING", label: "Net banking" },
  { value: "WALLET", label: "Wallet" },
  { value: "CASH_ON_DELIVERY", label: "Cash on delivery" },
];

export function PaymentMethodSelect({
  value,
  onChange,
  className,
}: {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  className?: string;
}) {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value as PaymentMethod)}
      aria-label="Payment method"
    >
      {METHODS.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  );
}
