import { getAllUsers } from "@/actions/users";
import JobsPage from "@/components/front-end/jobs-page";
import { JobCardSkeletonArray } from "@/components/front-end/skeletons/job-card-skeleton";
import React, { Suspense } from "react";

export default async function page() {
  const users = await getAllUsers();
  return (
    <Suspense fallback={<JobCardSkeletonArray />}>
      <JobsPage users={users} />
    </Suspense>
  );
}
