"use client";

import { useRouter, useSearchParams } from "next/navigation";

/** Reads/writes `?q=` and `?sort=`; the server component does the actual filtering. */
export function ProductSearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "featured";

  function update(key: "q" | "sort", value: string) {
    const next = new URLSearchParams(params.toString());
    const isDefault = value === "" || (key === "sort" && value === "featured");
    if (isDefault) next.delete(key);
    else next.set(key, value);
    const query = next.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }

  const field =
    "rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        defaultValue={q}
        onChange={(e) => update("q", e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className={`w-full ${field}`}
      />
      <select
        value={sort}
        onChange={(e) => update("sort", e.target.value)}
        aria-label="Sort products"
        className={field}
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
