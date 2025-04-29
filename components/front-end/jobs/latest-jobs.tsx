"use client";

import { JobCard } from "./job-card";
import { SectionHeader } from "../section-header";
import { useJobs } from "@/hooks/useJobsHook";
import { useRouter } from "next/navigation";
import JobCardSkeleton from "../skeletons/job-card-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface JobSectionProps {
  title: string;
  showProfileCard?: boolean;
  showSaveButton?: boolean;
}

export function LatestJobSection({
  title,
  showProfileCard = false,
  showSaveButton = false,
}: JobSectionProps) {
  const { jobs, isLoading } = useJobs();
  const router = useRouter();

  const skeletonCount = 4;
  const skeletonArray = Array.from(
    { length: skeletonCount },
    (_, index) => index
  );

  const jobsWithDeadlines = jobs.map((job) => {
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

    // Calculate difference in milliseconds
    const differenceMs = deadlineDate.getTime() - new Date().getTime();

    // Convert to days and round down
    const daysRemaining = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return {
      ...job,
      daysRemaining: daysRemaining,
      isExpired: daysRemaining < 0,
    };
  });

  return (
    <div className="mb-8">
      <SectionHeader title={title} />

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4">
          {isLoading
            ? skeletonArray.map((index) => (
                <CarouselItem
                  key={`skeleton-${index}`}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <JobCardSkeleton />
                </CarouselItem>
              ))
            : jobsWithDeadlines.map((job) => (
                <CarouselItem
                  key={job.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <JobCard
                    myJob={job}
                    isSaved={job.isSaved as boolean}
                    jobType={job.jobType as string}
                    createdAt={job.createdAt}
                    description={job.description ?? ""}
                    id={job.id}
                    title={job.title}
                    company={job.company as string}
                    country={job.country as string}
                    city={job.city as string}
                    logo={"https://hrty.vercel.app/uEFqB1"}
                    daysRemaining={job.daysRemaining as number}
                    showSaveButton={showSaveButton}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <div className=" absolute -top-10 right-10 flex justify-end gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
