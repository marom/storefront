import Link from "next/link";
import { listCategories } from "@/lib/api/categories";

const TONES = ["bg-lilac/30", "bg-peach/40", "bg-butter/40", "bg-mint/40", "bg-blush/40", "bg-sky/40"];

export async function CategoryTiles() {
  const categories = await listCategories();
  if (categories.length === 0) return null;

  return (
    <section className="space-y-4">
      <p className="eyebrow">Shop by category</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category, i) => (
          <Link
            key={category.id}
            href={`/?category=${encodeURIComponent(category.name)}#shop`}
            className={`group flex aspect-[4/3] flex-col justify-end rounded-3xl p-5 transition-transform hover:-translate-y-1 ${TONES[i % TONES.length]}`}
          >
            <span className="font-display text-lg">{category.name}</span>
            <span className="text-sm text-ink-soft group-hover:text-lilac-deep">Shop now →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
