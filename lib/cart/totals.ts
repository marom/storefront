import type { OrderItemRequest } from "@/lib/api/types";

export interface CartItem {
  productId: number;
  name: string;
  /** Unit price snapshot taken when the item was added; the API recomputes on order. */
  price: number;
  stockQuantity: number;
  quantity: number;
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function toOrderItems(items: CartItem[]): OrderItemRequest[] {
  return items.map((item) => ({ productId: item.productId, quantity: item.quantity }));
}
