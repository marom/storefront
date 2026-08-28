import { listProducts } from "@/lib/api/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSearchBar } from "@/components/product/ProductSearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Hero } from "@/components/marketing/Hero";
import { CategoryTiles } from "@/components/marketing/CategoryTiles";
import { ValueProps } from "@/components/marketing/ValueProps";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; category?: string }>;
}) {
  const { q = "", sort = "featured", category = "" } = await searchParams;
  let products = (await listProducts()).filter((p) => p.active);

  if (category) {
    products = products.filter((p) => p.categoryName === category);
  }

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
    <div className="space-y-16">
      <Hero />
      <CategoryTiles />

      <section id="shop" className="scroll-mt-24 space-y-6">
        <div>
          <p className="eyebrow">{category || "Shop all"}</p>
          <h2 className="mt-1 text-3xl">
            {category ? category : "Everything in the shop"}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {sorted.length} item{sorted.length === 1 ? "" : "s"}
          </p>
        </div>
        <ProductSearchBar />
        {sorted.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="Try a different search or category."
          />
        ) : (
          <ProductGrid products={sorted} />
        )}
      </section>

      <ValueProps />
    </div>
  );
}
