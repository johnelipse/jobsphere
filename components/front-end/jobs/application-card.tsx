"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  Calendar,
  ExternalLink,
  Building2,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Application, Job } from "@prisma/client";
import { useApplications } from "@/hooks/useApplicationHook";

export function ApplicationCard({
  application,
  jobs,
}: {
  application: Application;
  jobs: Job[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const job = jobs.find((job) => job.id === application.jobId);
  const { deletedApplication, isDeleting } = useApplications();

  async function deleteApplication() {
    deletedApplication(application.id);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "APPROVED":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "REJECTED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "SHORTLISTED":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Your application is under review";
      case "ACCEPTED":
        return "Congratulations! Your application has been approved";
      case "REJECTED":
        return "Thank you for your interest, but we've moved forward with other candidates";
      case "SHORTLISTED":
        return "You've been selected for an interview!";
      default:
        return "Application status";
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{job?.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <Building2 className="h-3.5 w-3.5 mr-1" />
              {job?.company}
            </div>
          </div>
          <Badge
            className={getStatusColor(application.status)}
            variant="outline"
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {getStatusMessage(status)}
          </p>

          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Applied on{" "}
              {format(new Date(application.createdAt), "MMM d, yyyy")}
            </div>
            {application.updatedAt &&
              application.createdAt.toString() !==
                application.updatedAt.toString() && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Status updated on{" "}
                  {format(new Date(application.updatedAt), "MMM d, yyyy")}
                </div>
              )}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Briefcase className="mr-2 h-4 w-4" />
                View Application Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Application for {job?.title}</DialogTitle>
                <DialogDescription>
                  Submitted to {job?.company} on{" "}
                  {format(new Date(application.createdAt), "MMMM d, yyyy")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">
                    Your Cover Letter
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {application.coverLetter}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Resume</h4>
                  <a
                    href={application.resume as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center"
                  >
                    <FileText className="mr-1 h-4 w-4" />
                    View your submitted resume
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Application ID</h4>
                  <p className="text-sm text-muted-foreground">
                    {application.id}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button">
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {application.status === "PENDING" ||
        application.status === "SHORTLISTED" ? (
          <Button
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={() => deleteApplication()}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            {isDeleting ? "Withdrawing...." : "Withdraw Application"}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={() => deleteApplication()}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            {isDeleting ? "deleting...." : "Delete Application"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
