import { Sparkle } from "./decor/Sparkle";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-3xl bg-lilac/15 p-14 text-center">
      <Sparkle className="mx-auto mb-3 h-6 w-6 text-lilac-deep" />
      <p className="font-display text-lg">{title}</p>
      {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
    </div>
  );
}
