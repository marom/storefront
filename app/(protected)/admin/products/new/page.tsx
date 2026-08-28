import type { Metadata } from "next";
import Link from "next/link";
import { listCategories } from "@/lib/api/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "New product — Storefront" };

export default async function NewProductPage() {
  const categories = await listCategories();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <Link href="/admin/products" className="text-sm text-ink-soft hover:text-lilac-deep">
          ← Back to products
        </Link>
        <h1 className="mt-2 text-3xl">New product</h1>
      </div>
      <ProductForm categories={categories} />
      <p className="text-xs text-ink-soft">
        Save the product first, then add pictures on its edit page.
      </p>
    </div>
  );
}
