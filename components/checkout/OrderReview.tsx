import { cartSubtotal, type CartItem } from "@/lib/cart/totals";
import { Money } from "@/components/ui/Money";
import { Card } from "@/components/ui/Card";

export function OrderReview({ items }: { items: CartItem[] }) {
  return (
    <Card className="space-y-2 text-sm">
      <h3 className="font-display text-base">Order review</h3>
      <ul className="divide-y divide-line">
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
      <p className="text-xs text-ink-soft">
        The final total is calculated by the API when the order is placed.
      </p>
    </Card>
  );
}
