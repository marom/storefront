import { cartSubtotal, type CartItem } from "@/lib/cart/totals";
import { Money } from "@/components/ui/Money";

export function OrderReview({ items }: { items: CartItem[] }) {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 p-4 text-sm dark:border-zinc-800">
      <h3 className="text-sm font-semibold">Order review</h3>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {items.map((item) => (
          <li key={item.productId} className="flex justify-between py-2">
            <span>
              {item.name} &times; {item.quantity}
            </span>
            <Money value={item.price * item.quantity} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between pt-2 font-semibold">
        <span>Subtotal</span>
        <Money value={cartSubtotal(items)} />
      </div>
      <p className="text-xs text-zinc-400">
        The final total is calculated by the API when the order is placed.
      </p>
    </div>
  );
}
