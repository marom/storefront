"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProductPictureResponse } from "@/lib/api/types";
import { deletePictureAction, uploadPicturesAction } from "@/lib/actions/admin-products";
import { publicAssetUrl } from "@/lib/assets";
import { Button } from "@/components/ui/Button";

export function ProductPicturesManager({
  productId,
  pictures,
}: {
  productId: number;
  pictures: ProductPictureResponse[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const files = inputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Choose at least one image file.");
      return;
    }
    const form = new FormData();
    for (const file of Array.from(files)) form.append("files", file);

    startTransition(async () => {
      const res = await uploadPicturesAction(productId, form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    });
  }

  function handleDelete(picture: ProductPictureResponse) {
    if (!window.confirm("Delete this picture?")) return;
    setError(null);
    startTransition(async () => {
      const res = await deletePictureAction(productId, picture.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Pictures</h2>

      {pictures.length === 0 ? (
        <p className="text-sm text-zinc-500">No pictures yet.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {pictures.map((picture) => (
            <li key={picture.id} className="space-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publicAssetUrl(picture.url)}
                alt={picture.altText ?? ""}
                className="aspect-square w-full rounded-lg border border-zinc-200 object-cover dark:border-zinc-800"
              />
              <button
                type="button"
                onClick={() => handleDelete(picture)}
                disabled={pending}
                className="text-xs text-red-600 hover:underline disabled:opacity-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleUpload} className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="block text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" variant="outline" disabled={pending}>
          {pending ? "Uploading…" : "Upload pictures"}
        </Button>
      </form>
    </section>
  );
}
