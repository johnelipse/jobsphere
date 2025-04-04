"use client";
import {
  BriefcaseBusiness,
  Clock,
  FileCheck,
  FileX,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobs } from "@/hooks/useJobsHook";

export function JobOverview() {
  const { jobs } = useJobs();
  const activeJobs = jobs.filter((job) => job.status === "active");

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

  const expiredJobs = jobsWithDeadlines.filter(
    (job) => job.isExpired === true
  ).length;

  const soonExpiring = jobsWithDeadlines.filter(
    (job) => job.daysRemaining !== null && job.daysRemaining < 10
  ).length;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Overview</h2>
        <p className="text-muted-foreground">
          Monitor your job posting performance at a glance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Jobs Posted
            </CardTitle>
            <BriefcaseBusiness className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <FileCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              {soonExpiring} expiring soon
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expired Listings
            </CardTitle>
            <FileX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredJobs}</div>
            <p className="text-xs text-muted-foreground">Renew or archive</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Applications Received
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+28 this week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your job posting activity in the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">12 new applications received</p>
                <p className="text-sm text-muted-foreground">
                  For Senior Developer position
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>2h ago</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-green-100 p-2">
                <FileCheck className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Job post published</p>
                <p className="text-sm text-muted-foreground">
                  UX Designer - Remote
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>1d ago</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-amber-100 p-2">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Job post expiring soon</p>
                <p className="text-sm text-muted-foreground">
                  Marketing Specialist - 2 days left
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Just now</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
