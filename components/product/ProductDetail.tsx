import type { ProductResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";
import { Badge } from "@/components/ui/Badge";
import { publicAssetUrl } from "@/lib/assets";
import { AddToCartButton } from "./AddToCartButton";

export function ProductDetail({ product }: { product: ProductResponse }) {
  const outOfStock = product.stockQuantity <= 0;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        {product.pictures.length > 0 ? (
          product.pictures.map((picture) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={picture.id}
              src={publicAssetUrl(picture.url)}
              alt={picture.altText ?? product.name}
              className="aspect-square w-full rounded-lg bg-zinc-100 object-cover dark:bg-zinc-900"
            />
          ))
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 text-6xl font-semibold text-zinc-300 dark:bg-zinc-900 dark:text-zinc-700">
            {product.name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Badge>{product.categoryName}</Badge>
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
        </div>
        <Money value={product.price} className="block text-xl font-semibold" />
        {product.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{product.description}</p>
        )}
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
          <dt className="text-zinc-500">SKU</dt>
          <dd>{product.sku}</dd>
          <dt className="text-zinc-500">Availability</dt>
          <dd className={outOfStock ? "text-red-600" : ""}>
            {outOfStock ? "Out of stock" : `${product.stockQuantity} in stock`}
          </dd>
        </dl>
        <AddToCartButton product={product} withQuantity />
      </div>
    </div>
  );
}
