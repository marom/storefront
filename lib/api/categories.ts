import { apiFetch } from "./client";
import type { CategoryResponse } from "./types";

export function listCategories(): Promise<CategoryResponse[]> {
  return apiFetch<CategoryResponse[]>("/categories", {
    cache: "force-cache",
    revalidate: 300,
    tags: ["categories"],
  });
}

export function getCategory(id: number): Promise<CategoryResponse> {
  return apiFetch<CategoryResponse>(`/categories/${id}`, {
    cache: "force-cache",
    revalidate: 300,
    tags: ["categories", `category-${id}`],
  });
}
