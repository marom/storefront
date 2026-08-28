import { apiFetch } from "./client";
import type { ProductPictureResponse, ProductPictureUpdateRequest } from "./types";

export function listPictures(productId: number): Promise<ProductPictureResponse[]> {
  // Public read.
  return apiFetch<ProductPictureResponse[]>(`/products/${productId}/pictures`, {
    cache: "no-store",
  });
}

/** `form` must carry one or more `files` parts. Admin only. */
export function uploadPictures(
  productId: number,
  form: FormData,
): Promise<ProductPictureResponse[]> {
  return apiFetch<ProductPictureResponse[]>(`/products/${productId}/pictures`, {
    method: "POST",
    body: form,
    auth: true,
  });
}

export function updatePicture(
  productId: number,
  pictureId: number,
  body: ProductPictureUpdateRequest,
): Promise<ProductPictureResponse> {
  return apiFetch<ProductPictureResponse>(
    `/products/${productId}/pictures/${pictureId}`,
    { method: "PUT", body, auth: true },
  );
}

export function deletePicture(productId: number, pictureId: number): Promise<void> {
  return apiFetch<void>(`/products/${productId}/pictures/${pictureId}`, {
    method: "DELETE",
    auth: true,
  });
}
