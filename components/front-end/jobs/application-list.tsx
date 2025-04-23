"use client";

import { Job } from "@prisma/client";
import { NewUserProps } from "../jobs-page";
import { ApplicationCard } from "./application-card";
import { ApplicationSkeleton } from "../skeletons/applications-skeleton";
import { JobCTO } from "@/types/types";

export function ApplicationList({
  currentUser,
  jobs,
  isLoading,
}: {
  currentUser: NewUserProps | undefined;
  jobs: JobCTO[];
  isLoading: boolean;
}) {
  console.log(jobs, currentUser);
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ApplicationSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        My Job Applications({currentUser?.applications.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUser?.applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            jobs={jobs}
          />
        ))}
      </div>
    </div>
  );
}
