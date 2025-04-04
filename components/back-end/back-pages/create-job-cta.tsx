"use client";

import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock,
  Copy,
  FileText,
  PlusCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const recentJobs = [
  {
    id: 1,
    title: "Senior Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
    applications: 24,
  },
  {
    id: 2,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    posted: "1 day ago",
    applications: 18,
  },
  {
    id: 3,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    posted: "3 days ago",
    applications: 12,
  },
];

const templates = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Template for engineering roles with technical requirements.",
  },
  {
    id: 2,
    title: "Design Professional",
    description: "Template for design roles with portfolio requirements.",
  },
  {
    id: 3,
    title: "Marketing Position",
    description: "Template for marketing roles with experience requirements.",
  },
];

export function CreateJobCta() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create Job Post</h2>
        <p className="text-muted-foreground">
          Create a new job posting or use a template.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <CardDescription>
              Create a new job posting to attract qualified candidates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent">Recent Jobs</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between border-b p-4 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-100 p-2">
                          <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            <span>{job.posted}</span>
                          </div>
                          <div className="text-sm font-medium">
                            {job.applications} applications
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button>
                    View All Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{template.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {template.description}
                            </p>
                          </div>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="rounded-full bg-blue-600 p-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button disabled={!selectedTemplate}>
                    Use Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="flex flex-col shadow-sm">
          <CardHeader>
            <CardTitle>Quick Post</CardTitle>
            <CardDescription>
              Create a new job posting in minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <PlusCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Post a New Job</p>
                    <p className="text-sm text-muted-foreground">
                      Create a job posting from scratch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Benefits of posting a job:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Reach qualified candidates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Automated candidate matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Application tracking tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Candidate communication</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <Button className="w-full" size="lg">
                Create New Job Post
                <PlusCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Job Posting Process</CardTitle>
          <CardDescription>
            Follow these steps to create an effective job posting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-lg font-bold text-blue-600">1</span>
              </div>
              <h3 className="mb-2 font-medium">Create Job Details</h3>
              <p className="text-sm text-muted-foreground">
                Define the role, requirements, and responsibilities.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-lg font-bold text-blue-600">2</span>
              </div>
              <h3 className="mb-2 font-medium">Set Screening Questions</h3>
              <p className="text-sm text-muted-foreground">
                Add questions to filter candidates automatically.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-lg font-bold text-blue-600">3</span>
              </div>
              <h3 className="mb-2 font-medium">Review & Publish</h3>
              <p className="text-sm text-muted-foreground">
                Preview your job post and make it live.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-lg font-bold text-blue-600">4</span>
              </div>
              <h3 className="mb-2 font-medium">Manage Applications</h3>
              <p className="text-sm text-muted-foreground">
                Review, sort, and respond to applicants.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
