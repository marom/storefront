"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CategoryResponse, ProductRequest, ProductResponse } from "@/lib/api/types";
import { createProductAction, updateProductAction } from "@/lib/actions/admin-products";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { inputClasses, labelClasses } from "@/components/ui/Field";

export function ProductForm({
  categories,
  product,
}: {
  categories: CategoryResponse[];
  product?: ProductResponse;
}) {
  const router = useRouter();
  const editing = product !== undefined;
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [sku, setSku] = useState(product?.sku ?? "");
  const [stockQuantity, setStockQuantity] = useState(product ? String(product.stockQuantity) : "0");
  const [active, setActive] = useState(product?.active ?? true);
  const [categoryId, setCategoryId] = useState(
    product ? String(product.categoryId) : String(categories[0]?.id ?? ""),
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: ProductRequest = {
      name: name.trim(),
      description: description.trim() || undefined,
      price: Number(price),
      sku: sku.trim(),
      stockQuantity: Number(stockQuantity),
      active,
      categoryId: Number(categoryId),
    };

    startTransition(async () => {
      if (editing) {
        const res = await updateProductAction(product.id, payload);
        if (!res.ok) return setError(res.error);
        router.push("/admin/products");
      } else {
        const res = await createProductAction(payload);
        if (!res.ok) return setError(res.error);
        router.push(`/admin/products/${res.id}`);
      }
      router.refresh();
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className={labelClasses}>Name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
        </label>

        <label className="block space-y-1">
          <span className={labelClasses}>Description</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClasses}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className={labelClasses}>Price</span>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClasses}
            />
          </label>
          <label className="block space-y-1">
            <span className={labelClasses}>SKU</span>
            <input required value={sku} onChange={(e) => setSku(e.target.value)} className={inputClasses} />
          </label>
          <label className="block space-y-1">
            <span className={labelClasses}>Stock quantity</span>
            <input
              required
              type="number"
              min="0"
              step="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className={inputClasses}
            />
          </label>
          <label className="block space-y-1">
            <span className={labelClasses}>Category</span>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={inputClasses}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="accent-lilac-deep"
          />
          Active (visible &amp; purchasable)
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : editing ? "Save changes" : "Create product"}
        </Button>
      </form>
    </Card>
  );
}
