"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Clock,
  MapPin,
  Building,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCategory } from "@/hooks/useCategories";
import CategoryPageSkeleton from "./skeletons/category-page-skeleton";

// Helper function to format date
function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Posted yesterday";
  } else if (diffDays < 7) {
    return `Posted ${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else {
    return `Posted on ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }
}

export default function CategoryDetailPage({ slug }: { slug: string }) {
  const { category, isLoading } = useCategory(slug);

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
        <div className="space-y-6">
          {(category?.jobs ?? []).map((job) => (
            <Card
              key={job.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <h3 className="text-xl font-bold hover:text-primary transition-colors">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="hover:underline"
                        >
                          {job.title}
                        </Link>
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          {job.country}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Briefcase className="h-3 w-3" />
                          {job.jobType}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          {formatDate(job.createdAt)}
                        </Badge>
                      </div>

                      <p className="mt-4 text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-3 mt-4 lg:mt-0">
                      <div className="text-lg font-semibold">{job.salary}</div>
                      <Button asChild>
                        <Link href={`/jobs/${job.id}`}>
                          View Job
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="p-6 bg-muted/40">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.requiredSkills.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
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
