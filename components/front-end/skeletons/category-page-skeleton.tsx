import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/categories"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all categories
        </Link>
      </div>

      {/* Category header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-10">
        <Skeleton className="h-12 w-3/4 max-w-md mb-4" />
        <div className="mt-6 flex items-center">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-6">
        {/* Generate 3 skeleton job cards */}
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <SkeletonJobCard key={index} />
          ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Skeleton className="h-7 w-64 mx-auto mb-4" />
        <Button disabled className="opacity-70">
          <CalendarDays className="mr-2 h-4 w-4" />
          Create Job Alert
        </Button>
      </div>
    </div>
  );
}

function SkeletonJobCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="w-full lg:w-3/4">
              {/* Company */}
              <Skeleton className="h-4 w-32 mb-2" />

              {/* Job title */}
              <Skeleton className="h-7 w-3/4 mb-4" />

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
              </div>

              {/* Description */}
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-5/6 mt-2" />
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3 mt-4 lg:mt-0">
              {/* Salary */}
              <Skeleton className="h-6 w-24" />

              {/* Button */}
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-6 bg-muted/40">
          {/* Requirements heading */}
          <Skeleton className="h-5 w-28 mb-3" />

          {/* Requirements list */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
