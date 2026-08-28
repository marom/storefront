"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { ProductResponse } from "@/lib/api/types";
import { deleteProductAction } from "@/lib/actions/admin-products";
import { publicAssetUrl } from "@/lib/assets";
import { Money } from "@/components/ui/Money";

export function ProductAdminTable({ products }: { products: ProductResponse[] }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(product: ProductResponse) {
    if (!window.confirm(`Delete “${product.name}”? This also removes its pictures.`)) return;
    setError(null);
    setDeletingId(product.id);
    startTransition(async () => {
      const res = await deleteProductAction(product.id);
      setDeletingId(null);
      if (!res.ok) setError(res.error);
    });
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="overflow-x-auto rounded-3xl bg-surface shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-lilac/15 text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-5 py-3 font-semibold">Product</th>
              <th className="px-5 py-3 font-semibold">SKU</th>
              <th className="px-5 py-3 text-right font-semibold">Price</th>
              <th className="px-5 py-3 text-right font-semibold">Stock</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Pics</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((product) => (
              <tr key={product.id} className={deletingId === product.id ? "opacity-40" : undefined}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {product.pictures[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={publicAssetUrl(product.pictures[0].url)}
                        alt=""
                        className="h-9 w-9 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lilac/20 font-display text-xs text-lilac-deep">
                        {product.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-semibold hover:text-lilac-deep"
                    >
                      {product.name}
                    </Link>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">{product.sku}</td>
                <td className="px-5 py-3 text-right">
                  <Money value={product.price} />
                </td>
                <td className="px-5 py-3 text-right tabular-nums">{product.stockQuantity}</td>
                <td className="px-5 py-3">{product.active ? "Active" : "Inactive"}</td>
                <td className="px-5 py-3 text-right tabular-nums">{product.pictures.length}</td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-ink-soft hover:text-lilac-deep"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    disabled={pending}
                    className="ml-4 text-danger hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
