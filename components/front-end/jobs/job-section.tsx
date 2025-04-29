"use client";

import { JobCard } from "./job-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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

export function JobSection({
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

  function handleRedirect() {
    router.push("/update");
  }

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

      <div
        className={`flex flex-col ${
          showProfileCard ? "md:flex-row" : ""
        } gap-4`}
      >
        <div className={`${showProfileCard ? "md:w-3/4" : "w-full"}`}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isLoading
                ? skeletonArray.map((index) => (
                    <CarouselItem
                      key={`skeleton-${index}`}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <JobCardSkeleton />
                    </CarouselItem>
                  ))
                : jobsWithDeadlines.slice(0, 4).map((job) => (
                    <CarouselItem
                      key={job.id}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
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
            <div className="flex absolute -top-10 right-12 gap-1 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        {showProfileCard && (
          <div className="md:w-1/4">
            <Card className="p-4 bg-green-100 border-green-200 h-[12rem]">
              <div className="text-sm font-medium mb-2">
                Want better recommendations?
              </div>
              <div className="text-sm font-medium mb-3">
                Build Your Profile!
              </div>
              <p className="text-xs text-gray-600 mb-4">
                You can also set your profile visible to employers and get
                headhunted!
              </p>
              <Button
                onClick={() => handleRedirect()}
                className="w-full text-white text-xs h-8"
              >
                Build profile <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
