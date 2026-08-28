import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { getProduct } from "@/lib/api/products";
import { listCategories } from "@/lib/api/categories";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductPicturesManager } from "@/components/admin/ProductPicturesManager";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId <= 0) notFound();

  const [product, categories] = await Promise.all([
    getProduct(productId),
    listCategories(),
  ]).catch((err: unknown) => {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  });

  return (
    <div className="mx-auto max-w-xl space-y-10">
      <div className="space-y-6">
        <div>
          <Link href="/admin/products" className="text-sm text-ink-soft hover:text-lilac-deep">
            ← Back to products
          </Link>
          <h1 className="mt-2 text-3xl">Edit “{product.name}”</h1>
        </div>
        <ProductForm categories={categories} product={product} />
      </div>
      <ProductPicturesManager productId={product.id} pictures={product.pictures} />
    </div>
  );
}
