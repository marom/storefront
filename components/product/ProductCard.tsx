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
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/products/${product.id}`} className="block">
        {primary ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publicAssetUrl(primary.url)}
            alt={primary.altText ?? product.name}
            className="aspect-square w-full bg-lilac/15 object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-lilac/20 font-display text-4xl text-lilac-deep">
            {product.name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={`/products/${product.id}`}
          className="font-display text-base transition-colors group-hover:text-lilac-deep"
        >
          {product.name}
        </Link>
        <div>
          <Badge>{product.categoryName}</Badge>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <Money value={product.price} className="text-sm font-semibold" />
          <span className={`text-xs ${outOfStock ? "text-danger" : "text-ink-soft"}`}>
            {outOfStock ? "Out of stock" : `${product.stockQuantity} in stock`}
          </span>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
