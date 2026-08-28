"use client";

import { useState } from "react";
import type { ProductResponse } from "@/lib/api/types";
import { useCart } from "@/lib/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function AddToCartButton({
  product,
  withQuantity = false,
}: {
  product: ProductResponse;
  withQuantity?: boolean;
}) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const disabled = !product.active || product.stockQuantity <= 0;

  function handleAdd() {
    add(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-2">
      {withQuantity && (
        <QuantityStepper
          value={quantity}
          min={1}
          max={product.stockQuantity}
          onChange={setQuantity}
          disabled={disabled}
        />
      )}
      <Button
        type="button"
        variant={added ? "pill" : "primary"}
        className="w-full"
        onClick={handleAdd}
        disabled={disabled}
      >
        {disabled ? "Unavailable" : added ? "Added ✓" : "Add to cart"}
      </Button>
    </div>
  );
}
