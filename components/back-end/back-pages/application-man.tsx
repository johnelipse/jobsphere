"use client";

import { useState, useMemo } from "react";
import {
  Check,
  Clock,
  Download,
  MoreHorizontal,
  Search,
  Star,
  X,
  Filter,
  Calendar,
  Briefcase,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApplications } from "@/hooks/useApplicationHook";
import { useJobs } from "@/hooks/useJobsHook";
import { User } from "@prisma/client";
import { getTimeAgo } from "@/lib/getTimeAgo";
import CoverLetterDialog from "./cover-letter-dialog";
import { StatusUpdateDialog } from "./status-update-dialog";

// Define types based on Prisma models
type Status = "PENDING" | "SHORTLISTED" | "ACCEPTED" | "REJECTED";
type JobType = "REMOTE" | "ONSITE" | "FULLTIME" | "PART_TIME" | "CONTRACT";
type ExperienceLevel = "entry" | "mid" | "senior" | "executive";

export function ApplicationManagement({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const { applications } = useApplications();
  const { jobs } = useJobs();

  // Get job title by ID for display and filtering
  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job ? job.title : "Unknown Position";
  };

  // let userData = null;

  // if (applications?.length && users?.length) {
  //   const applicantId = applications[0]?.applicantId;
  //   userData = users.find((user) => user.id === applicantId);
  // }

  // console.log(userData);
  // // Get job type label
  const getJobTypeLabel = (type: JobType) => {
    switch (type) {
      case "REMOTE":
        return (
          <Badge variant="secondary">
            <Briefcase className="mr-1 h-3 w-3" /> Remote
          </Badge>
        );
      case "ONSITE":
        return (
          <Badge variant="secondary">
            <MapPin className="mr-1 h-3 w-3" /> Onsite
          </Badge>
        );
      case "FULLTIME":
        return <Badge variant="secondary">Full-time</Badge>;
      case "PART_TIME":
        return <Badge variant="secondary">Part-time</Badge>;
      case "CONTRACT":
        return <Badge variant="secondary">Contract</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  // Get experience level label
  const getExperienceLabel = (level: ExperienceLevel) => {
    switch (level) {
      case "entry":
        return "Entry Level";
      case "mid":
        return "Mid-Level";
      case "senior":
        return "Senior Level";
      case "executive":
        return "Executive";
      default:
        return level;
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "SHORTLISTED":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Star className="mr-1 h-3 w-3" /> Shortlisted
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Accepted
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format deadline
  const formatDeadline = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formatter.format(new Date(date));
  };

  // Get user initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Unique list of jobs for filtering
  const jobOptions = useMemo(() => {
    const uniqueJobs = Array.from(new Set(jobs.map((job) => job.id)));
    return uniqueJobs.map((id) => {
      const job = jobs.find((j) => j.id === id);
      return { id, title: job?.title || "Unknown" };
    });
  }, [jobs]);

  // Filter applications based on status, job, and search term
  const filteredApplications = (status: string) => {
    return applications
      .filter((app) => status === "all" || app.status === (status as Status))
      .filter((app) => jobFilter === "all" || app.jobId === jobFilter);
    // .filter(
    //   (app) =>
    //     app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     getJobTitle(app.jobId).toLowerCase().includes(searchTerm.toLowerCase())
    // );
  };

  // Get statistics for the dashboard
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((app) => app.status === "PENDING").length,
      shortlisted: applications.filter((app) => app.status === "SHORTLISTED")
        .length,
      accepted: applications.filter((app) => app.status === "ACCEPTED").length,
      rejected: applications.filter((app) => app.status === "REJECTED").length,
    };
  }, [applications]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Application Management
        </h2>
        <p className="text-muted-foreground">
          Review and manage candidate applications.
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-500">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500">
              Shortlisted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shortlisted}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-500">
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-500">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                Manage and review all received applications
              </CardDescription>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobOptions.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="SHORTLISTED">Shortlisted</TabsTrigger>
              <TabsTrigger value="ACCEPTED">Accepted</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            </TabsList>

            {["all", "PENDING", "SHORTLISTED", "ACCEPTED", "REJECTED"].map(
              (status) => (
                <TabsContent
                  key={status}
                  value={status}
                  className="border-none p-0 pt-4"
                >
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-4">Candidate</div>
                      <div className="col-span-3">Position</div>
                      <div className="col-span-2">Applied</div>
                      <div className="col-span-1">Resume</div>
                      <div className="col-span-2">Status</div>
                    </div>

                    {filteredApplications(status).length > 0 ? (
                      filteredApplications(status).map((application) => {
                        // Find the related job
                        const job = jobs.find(
                          (j) => j.id === application.jobId
                        );

                        return (
                          <div
                            key={application.id}
                            className="grid grid-cols-12 items-center gap-4 border-b p-4 last:border-0 hover:bg-muted/20"
                          >
                            <div className="col-span-4 flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={
                                    application.applicant?.image ||
                                    "/placeholder.svg?height=40&width=40"
                                  }
                                  alt={application.applicant?.name}
                                />
                                <AvatarFallback>
                                  {getInitials(
                                    application.applicant?.name as string
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {application.applicant?.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {application.applicant?.email}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <p className="font-medium">
                                {job ? job.title : "Unknown Position"}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {job &&
                                  job.jobType &&
                                  getJobTypeLabel(job.jobType as JobType)}
                                {job && job.experience && (
                                  <Badge variant="outline">
                                    {getExperienceLabel(
                                      job.experience as ExperienceLevel
                                    )}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm">
                                {getTimeAgo(application.createdAt)}
                              </p>
                              {job && job.deadline && (
                                <p className="mt-1 flex items-center text-xs text-muted-foreground">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Closes: {formatDeadline(job.deadline)}
                                </p>
                              )}
                            </div>
                            <div className="col-span-1">
                              {application.resume ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">
                                    Download Resume
                                  </span>
                                </Button>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  N/A
                                </span>
                              )}
                            </div>
                            <div className="col-span-2 flex items-center justify-between">
                              {getStatusBadge(application.status)}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    View Profile
                                  </DropdownMenuItem>
                                  {/* {application.resume && (
                                    <DropdownMenuItem>
                                      Download Resume
                                    </DropdownMenuItem>
                                  )} */}
                                  {application.coverLetter && (
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault();
                                      }}
                                    >
                                      <CoverLetterDialog
                                        application={application}
                                        triggerComponent={
                                          <p className="cursor-pointer">
                                            View Cover Letter
                                          </p>
                                        }
                                      />
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <StatusUpdateDialog
                                      mode="shortlist"
                                      applicationId={application.id}
                                      currentStatus={application.status}
                                      triggerComponent={
                                        <p className="cursor-pointer">
                                          Shortlist
                                        </p>
                                      }
                                    />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <StatusUpdateDialog
                                      mode="accept"
                                      applicationId={application.id}
                                      currentStatus={application.status}
                                      triggerComponent={
                                        <p className="cursor-pointer">Accept</p>
                                      }
                                    />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <StatusUpdateDialog
                                      mode="reject"
                                      applicationId={application.id}
                                      currentStatus={application.status}
                                      triggerComponent={
                                        <p className="cursor-pointer text-red-700">
                                          Reject
                                        </p>
                                      }
                                    />
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="mb-4 rounded-full bg-muted p-3">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium">
                          No applications found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {searchTerm
                            ? "Try adjusting your search or filters to find what you're looking for."
                            : "There are no applications with the selected status."}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              )
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div>
              Showing {filteredApplications("all").length} of{" "}
              {applications.length} applications
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-8">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
