"use client";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCategory } from "@/hooks/useCategories";
import CategoryPageSkeleton from "./skeletons/category-page-skeleton";
import { JobCard } from "./jobs/job-card";
import JobCardSkeleton from "./skeletons/job-card-skeleton";

export default function CategoryDetailPage({ slug }: { slug: string }) {
  const { category, isLoading } = useCategory(slug);

  const skeletonCount = 4;
  const skeletonArray = Array.from(
    { length: skeletonCount },
    (_, index) => index
  );

  if (isLoading) {
    return <CategoryPageSkeleton />;
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/categories">Back to Categories</Link>
        </Button>
      </div>
    );
  }

  const jobsWithDeadlines = (category.jobs || []).map((job) => {
    // Skip calculation if deadline is not set
    if (!job.deadline) {
      return {
        ...job,
        daysRemaining: null,
        isExpired: false,
      };
    }

    // Ensure deadline is a Date object
    const deadlineDate = new Date(job.deadline);

    // Get current date without time component for more accurate day calculation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate difference in milliseconds
    const differenceMs = deadlineDate.getTime() - today.getTime();

    // Convert to days and round down
    const daysRemaining = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return {
      ...job,
      daysRemaining: daysRemaining,
      isExpired: daysRemaining < 0,
    };
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href="/categories"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all categories
        </Link>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {category.title} Jobs
        </h1>
        <div className="mt-6 flex items-center">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {(category.jobs ?? []).length}{" "}
            {(category.jobs ?? []).length === 1 ? "job" : "jobs"} available
          </Badge>
        </div>
      </div>

      {(category.jobs ?? []).length === 0 ? (
        <Card className="text-center p-12">
          <h3 className="text-xl font-semibold mb-2">No jobs available</h3>
          <p className="text-muted-foreground">
            There are currently no jobs listed in this category.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          {isLoading
            ? skeletonArray.map((index) => (
                <JobCardSkeleton key={`skeleton-${index}`} />
              ))
            : jobsWithDeadlines
                .slice(0, 4)
                .map((job) => (
                  <JobCard
                    myJob={job}
                    isSaved={job.isSaved as boolean}
                    jobType={job.jobType}
                    createdAt={job.createdAt}
                    key={job.id}
                    description={job.description ?? ""}
                    id={job.id}
                    title={job.title}
                    company={job.company as string}
                    country={job.country as string}
                    city={job.city as string}
                    logo={"https://hrty.vercel.app/uEFqB1"}
                    daysRemaining={job.daysRemaining as number}
                  />
                ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Don't see the right job for you?
        </h3>
        <Button asChild>
          <Link href="/jobs/alert">
            <CalendarDays className="mr-2 h-4 w-4" />
            Create Job Alert
          </Link>
        </Button>
      </div>
    </div>
  );
}
