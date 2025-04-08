import { getSingleJob } from "@/actions/jobs";
import JobUpdateForm from "@/components/forms/update-job-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full py-6 ">
      <JobUpdateForm paramId={id} />
    </div>
  );
}
