"use client";
import { JobCard } from "./job-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "../section-header";
import { useJobs } from "@/hooks/useJobsHook";
import { useRouter } from "next/navigation";

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
  const { jobs } = useJobs();
  const router = useRouter();

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
        className={`grid grid-cols-1 md:grid-cols-${
          showProfileCard ? "3" : "2"
        } lg:grid-cols-4 gap-4`}
      >
        {jobsWithDeadlines.slice(0, 4).map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company as string}
            country={job.country as string}
            city={job.city as string}
            logo={"https://hrty.vercel.app/uEFqB1"}
            daysRemaining={job.daysRemaining as number}
            showSaveButton={showSaveButton}
          />
        ))}
      </div>
    </div>
  );
}
