import type { OrderItemResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";

export function OrderItemsTable({ items }: { items: OrderItemResponse[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-surface shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-lilac/15 text-left text-xs uppercase tracking-wide text-ink-soft">
          <tr>
            <th className="px-5 py-3 font-semibold">Product</th>
            <th className="px-5 py-3 text-right font-semibold">Qty</th>
            <th className="px-5 py-3 text-right font-semibold">Unit price</th>
            <th className="px-5 py-3 text-right font-semibold">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-5 py-3">{item.productName}</td>
              <td className="px-5 py-3 text-right tabular-nums">{item.quantity}</td>
              <td className="px-5 py-3 text-right tabular-nums">
                <Money value={item.unitPrice} />
              </td>
              <td className="px-5 py-3 text-right tabular-nums">
                <Money value={item.subtotal} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
