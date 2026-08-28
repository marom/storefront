import type { ProductResponse } from "@/lib/api/types";
import { Money } from "@/components/ui/Money";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { publicAssetUrl } from "@/lib/assets";
import { AddToCartButton } from "./AddToCartButton";

export function ProductDetail({ product }: { product: ProductResponse }) {
  const outOfStock = product.stockQuantity <= 0;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-4">
        {product.pictures.length > 0 ? (
          product.pictures.map((picture) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={picture.id}
              src={publicAssetUrl(picture.url)}
              alt={picture.altText ?? product.name}
              className="aspect-square w-full rounded-3xl bg-lilac/15 object-cover"
            />
          ))
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-lilac/20 font-display text-7xl text-lilac-deep">
            {product.name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="space-y-5">
        <div className="space-y-3">
          <Badge>{product.categoryName}</Badge>
          <h1 className="text-3xl sm:text-4xl">{product.name}</h1>
        </div>
        <Money value={product.price} className="block text-2xl font-semibold" />
        {product.description && (
          <p className="text-ink-soft">{product.description}</p>
        )}
        <Card className="p-5">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-ink-soft">SKU</dt>
            <dd>{product.sku}</dd>
            <dt className="text-ink-soft">Availability</dt>
            <dd className={outOfStock ? "text-danger" : ""}>
              {outOfStock ? "Out of stock" : `${product.stockQuantity} in stock`}
            </dd>
          </dl>
        </Card>
        <AddToCartButton product={product} withQuantity />
      </div>
    </div>
  );
}
