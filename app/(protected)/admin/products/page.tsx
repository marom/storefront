import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/lib/api/products";
import { buttonClasses } from "@/components/ui/Button";
import { ProductAdminTable } from "@/components/admin/ProductAdminTable";

export const metadata: Metadata = { title: "Manage products — Storefront" };

export default async function AdminProductsPage() {
  const products = await listProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-1 text-3xl">Manage products</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/admin/products/new" className={buttonClasses()}>
          New product
        </Link>
      </div>
      <ProductAdminTable products={products} />
    </div>
  );
}
