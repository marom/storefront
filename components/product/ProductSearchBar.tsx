"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { inputClasses } from "@/components/ui/Field";

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
    router.replace(query ? `/?${query}#shop` : "/#shop", { scroll: false });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        defaultValue={q}
        onChange={(e) => update("q", e.target.value)}
        placeholder="Search the shop"
        aria-label="Search products"
        className={`${inputClasses} rounded-full`}
      />
      <select
        value={sort}
        onChange={(e) => update("sort", e.target.value)}
        aria-label="Sort products"
        className={`${inputClasses} rounded-full sm:w-56`}
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
