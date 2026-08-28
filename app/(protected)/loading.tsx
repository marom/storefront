import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-64 w-full rounded-[2.5rem]" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
