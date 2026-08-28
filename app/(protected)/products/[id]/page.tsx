import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { getProduct } from "@/lib/api/products";
import { listReviews } from "@/lib/api/reviews";
import { requireSession } from "@/lib/auth/session";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ReviewList } from "@/components/product/ReviewList";
import { ReviewForm } from "@/components/product/ReviewForm";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId <= 0) notFound();

  const session = await requireSession();

  const [product, reviews] = await Promise.all([
    getProduct(productId),
    listReviews(productId),
  ]).catch((err: unknown) => {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  });

  return (
    <div className="space-y-12">
      <ProductDetail product={product} />
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Reviews</h2>
        <ReviewList reviews={reviews} />
        {session.role === "ROLE_CUSTOMER" ? (
          <ReviewForm productId={product.id} reviewerEmail={session.email} />
        ) : (
          <p className="text-sm text-zinc-500">
            Only customer accounts can post reviews.
          </p>
        )}
      </section>
    </div>
  );
}
