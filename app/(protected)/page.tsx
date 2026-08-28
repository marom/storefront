import { listProducts } from "@/lib/api/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSearchBar } from "@/components/product/ProductSearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "featured" } = await searchParams;
  const products = (await listProducts()).filter((p) => p.active);

  const query = q.trim().toLowerCase();
  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.description ?? "").toLowerCase().includes(query),
      )
    : products;

  const sorted = [...filtered].sort((a, b) => {
    switch (sort as Sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-zinc-500">
          {sorted.length} item{sorted.length === 1 ? "" : "s"}
        </p>
      </div>
      <ProductSearchBar />
      {sorted.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try a different search term."
        />
      ) : (
        <ProductGrid products={sorted} />
      )}
    </div>
  );
}
