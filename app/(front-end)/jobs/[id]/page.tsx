import JobDetailsPage from "@/components/front-end/jobs/detailed-page";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <JobDetailsPage paramId={id} />
    </div>
  );
}
