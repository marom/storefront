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
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="px-4 py-2 font-medium">SKU</th>
              <th className="px-4 py-2 text-right font-medium">Price</th>
              <th className="px-4 py-2 text-right font-medium">Stock</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 text-right font-medium">Pics</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {products.map((product) => (
              <tr key={product.id} className={deletingId === product.id ? "opacity-40" : undefined}>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    {product.pictures[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={publicAssetUrl(product.pictures[0].url)}
                        alt=""
                        className="h-8 w-8 rounded object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-800">
                        {product.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2 text-zinc-500">{product.sku}</td>
                <td className="px-4 py-2 text-right">
                  <Money value={product.price} />
                </td>
                <td className="px-4 py-2 text-right tabular-nums">{product.stockQuantity}</td>
                <td className="px-4 py-2">{product.active ? "Active" : "Inactive"}</td>
                <td className="px-4 py-2 text-right tabular-nums">{product.pictures.length}</td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-zinc-600 hover:underline dark:text-zinc-300"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    disabled={pending}
                    className="ml-3 text-red-600 hover:underline disabled:opacity-50"
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
