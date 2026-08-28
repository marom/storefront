import Link from "next/link";
import type { ProductResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";
import { Badge } from "@/components/ui/Badge";
import { publicAssetUrl } from "@/lib/assets";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: ProductResponse }) {
  const outOfStock = product.stockQuantity <= 0;
  const primary = product.pictures[0];

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <Link href={`/products/${product.id}`} className="block">
        {primary ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publicAssetUrl(primary.url)}
            alt={primary.altText ?? product.name}
            className="aspect-square w-full bg-zinc-100 object-cover dark:bg-zinc-900"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-zinc-100 text-3xl font-semibold text-zinc-300 dark:bg-zinc-900 dark:text-zinc-700">
            {product.name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/products/${product.id}`} className="text-sm font-medium hover:underline">
          {product.name}
        </Link>
        <div>
          <Badge>{product.categoryName}</Badge>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <Money value={product.price} className="text-sm font-semibold" />
          <span className={`text-xs ${outOfStock ? "text-red-600" : "text-zinc-500"}`}>
            {outOfStock ? "Out of stock" : `${product.stockQuantity} in stock`}
          </span>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
