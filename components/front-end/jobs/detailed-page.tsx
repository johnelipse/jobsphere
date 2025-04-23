"use client";
import { Copy, Heart, Info } from "lucide-react";
import { useJob } from "@/hooks/useJobsHook";
import JobDetailsSkeleton from "./job-details-skeloton";
import { calculateJobDeadline } from "@/lib/getDeadline";
import { getTimeAgo } from "@/lib/getTimeAgo";
import { JobApplicationDialog } from "./application-dialog";

export default function JobDetailsPage({ paramId }: { paramId: string }) {
  const { job, isLoading } = useJob(paramId);
  const jobWithDeadline = job ? calculateJobDeadline(job) : null;
  if (isLoading) {
    return <JobDetailsSkeleton />;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Job Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <h1 className="text-xl font-medium text-gray-900">
                  {job?.title}
                </h1>

                <div className="flex items-center text-sm text-gray-600">
                  <span>Posted {getTimeAgo(job?.createdAt as Date)}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-1 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                      🌐
                    </span>
                    {job?.country}-{job?.city}
                  </span>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p>{job?.description}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Project Type:</span>
                    <span className="text-sm text-gray-600">
                      {job?.jobType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Company:</span>
                    <span className="text-sm text-gray-600">
                      {job?.company}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Salary:</span>
                    <span className="text-sm text-gray-600">
                      $ {job?.salary}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">
                  Skills and Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job?.requiredSkills.map((skill, i) => {
                    return (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">
                  Activity on this job
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Proposals:</span>
                    <span className="text-sm flex items-center">
                      <Info className="h-4 w-4 text-gray-400 mr-1" />
                      15 to 20
                    </span>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <span className="text-sm">Last viewed by client:</span>
                    <span className="text-sm flex items-center">
                      <Info className="h-4 w-4 text-gray-400 mr-1" />
                      10 hours ago
                    </span>
                  </div> */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Interviewing:</span>
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Invites sent:</span>
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unanswered invites:</span>
                    <span className="text-sm">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Client Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* <Button className="w-full">Apply For the job</Button> */}
                <JobApplicationDialog
                  jobId={paramId}
                  jobTitle={job?.title ?? ""}
                />

                <button className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-md font-medium mt-3 flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved
                </button>

                {/* <button className="w-full text-sm text-gray-600 hover:text-gray-900 mt-4 flex items-center justify-center">
                  <Flag className="h-4 w-4 mr-2 text-gray-500" />
                  Flag as inappropriate
                </button> */}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">
                      Days remaining to stop applications:
                    </span>
                    <span className="text-sm font-medium">
                      {jobWithDeadline?.data?.daysRemaining} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available Connects:</span>
                    <span className="text-sm font-medium">0</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">About the client</h2>
                {/* <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="ml-2 text-sm">
                      Payment method verified
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="ml-2 text-sm">Phone number verified</span>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm">Australia</div>
                    <div className="text-sm text-gray-500">Geelong 7:40 PM</div>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm">2 jobs posted</div>
                    <div className="text-sm text-gray-500">
                      0% hire rate, 1 open job
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm">Member since Sep 17, 2023</div>
                  </div>
                </div> */}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-base font-medium mb-2">Job link</h3>
                  <div className="flex items-center bg-gray-100 rounded p-2">
                    <input
                      type="text"
                      value={`${baseUrl}/jobs/${encodeURIComponent(
                        job?.id as string
                      )}`}
                      readOnly
                      className="bg-transparent flex-1 text-sm text-gray-500 focus:outline-none"
                    />
                  </div>
                  <button className="text-[#14a800] text-sm hover:underline mt-2 flex items-center">
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
