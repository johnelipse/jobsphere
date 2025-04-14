"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ApplicationSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-8 w-64 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ApplicationCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function ApplicationCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="space-y-4">
        {/* Job title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Company name */}
        <Skeleton className="h-5 w-1/2" />

        {/* Status badge */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Date applied */}
        <Skeleton className="h-4 w-32" />

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}
