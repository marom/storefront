import type { ProductResponse } from "@/lib/api/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: ProductResponse[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
