"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiError } from "@/lib/api/client";
import {
  PRODUCTS_TAG,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/api/products";
import { deletePicture, uploadPictures } from "@/lib/api/pictures";
import type { ProductRequest } from "@/lib/api/types";

export type AdminResult<T = unknown> =
  | ({ ok: true } & T)
  | { ok: false; error: string };

function fail(err: unknown, verb: string): { ok: false; error: string } {
  if (err instanceof ApiError) {
    if (err.status === 401) return { ok: false, error: "Your session expired — please sign in again." };
    if (err.status === 403) return { ok: false, error: "Admin access required." };
    return { ok: false, error: err.body?.message ?? `${verb} failed (${err.status}).` };
  }
  return { ok: false, error: `Something went wrong — ${verb.toLowerCase()} failed.` };
}

function revalidateProduct(id?: number) {
  revalidateTag(PRODUCTS_TAG, "max");
  revalidatePath("/admin/products");
  if (id) {
    revalidatePath(`/admin/products/${id}`);
    revalidatePath(`/products/${id}`);
  }
}

export async function createProductAction(
  input: ProductRequest,
): Promise<AdminResult<{ id: number }>> {
  try {
    const product = await createProduct(input);
    revalidateProduct(product.id);
    return { ok: true, id: product.id };
  } catch (err) {
    return fail(err, "Create");
  }
}

export async function updateProductAction(
  id: number,
  input: ProductRequest,
): Promise<AdminResult> {
  try {
    await updateProduct(id, input);
    revalidateProduct(id);
    return { ok: true };
  } catch (err) {
    return fail(err, "Update");
  }
}

export async function deleteProductAction(id: number): Promise<AdminResult> {
  try {
    await deleteProduct(id);
    revalidateProduct(id);
    return { ok: true };
  } catch (err) {
    return fail(err, "Delete");
  }
}

export async function uploadPicturesAction(
  productId: number,
  form: FormData,
): Promise<AdminResult<{ count: number }>> {
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    return { ok: false, error: "Choose at least one image file." };
  }
  const payload = new FormData();
  for (const file of files) payload.append("files", file);

  try {
    const created = await uploadPictures(productId, payload);
    revalidateProduct(productId);
    return { ok: true, count: created.length };
  } catch (err) {
    return fail(err, "Upload");
  }
}

export async function deletePictureAction(
  productId: number,
  pictureId: number,
): Promise<AdminResult> {
  try {
    await deletePicture(productId, pictureId);
    revalidateProduct(productId);
    return { ok: true };
  } catch (err) {
    return fail(err, "Delete");
  }
}
