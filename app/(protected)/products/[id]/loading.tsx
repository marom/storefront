import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-20 w-full rounded-3xl" />
        <Skeleton className="h-12 w-44 rounded-full" />
      </div>
    </div>
  );
}
