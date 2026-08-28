import type { OrderItemResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";

export function OrderItemsTable({ items }: { items: OrderItemResponse[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-2 font-medium">Product</th>
            <th className="px-4 py-2 text-right font-medium">Qty</th>
            <th className="px-4 py-2 text-right font-medium">Unit price</th>
            <th className="px-4 py-2 text-right font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.productName}</td>
              <td className="px-4 py-2 text-right tabular-nums">{item.quantity}</td>
              <td className="px-4 py-2 text-right tabular-nums">
                <Money value={item.unitPrice} />
              </td>
              <td className="px-4 py-2 text-right tabular-nums">
                <Money value={item.subtotal} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
