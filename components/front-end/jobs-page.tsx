"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobs } from "@/hooks/useJobsHook";
import { JobCard } from "./jobs/job-card";
import SearchBar from "../back-end/DataTableComponents/SearchBar";
import { TabsContent } from "@radix-ui/react-tabs";
import { Application, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ApplicationList } from "./jobs/application-list";
import JobCardSkeleton from "./skeletons/job-card-skeleton";
import { useCategories } from "@/hooks/useCategories";
import { EmployeeHireCard } from "../employee-hire-car";
import { useHires } from "@/hooks/useHireHook";
import { useIsaved } from "@/hooks/useIsaved";
import { Session } from "next-auth";
export interface NewUserProps extends User {
  applications: Application[];
}

export default function JobsPage({ users }: { users: NewUserProps[] }) {
  const { jobs, isLoading, refetch } = useJobs();
  const { allCategories } = useCategories();

  const { items } = useIsaved((state) => state);

  const { Invitations } = useHires();
  const skeletonCount = 12;
  const skeletonArray = Array.from(
    { length: skeletonCount },
    (_, index) => index
  );

  const expirience = ["entry", "mid", "senior", "executive"];
  const type = ["REMOTE", "ONSITE", "FULLTIME", "PART_TIME", "CONTRACT"];

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
  const itemsWithDeadlines = items.map((item) => {
    // Skip calculation if deadline is not set
    if (!item.deadline) {
      return {
        ...item,
        daysRemaining: null,
        isExpired: false,
      };
    }

    // Ensure deadline is a Date object
    const deadlineDate = new Date(item.deadline);

    // Calculate difference in milliseconds
    const differenceMs = deadlineDate.getTime() - new Date().getTime();

    // Convert to days and round down
    const daysRemaining = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return {
      ...item,
      daysRemaining: daysRemaining,
      isExpired: daysRemaining < 0,
    };
  });

  const session = useSession();
  const currentUser = users.find((user) => user.id === session.data?.user.id);

  const [sortBy, setSortBy] = useState("recommended");

  const [searchResults, setSearchResults] = useState(jobsWithDeadlines);
  const [location, setLocation] = useState<string | undefined>("");
  const [filteredJobs, setFilteredJobs] = useState(jobsWithDeadlines);
  const [seniority, setSeniority] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [isSearch, setIsSearch] = useState(true);

  const sortJobs = (jobs: any[], sortOption: any) => {
    switch (sortOption) {
      case "newest":
        return [...jobs].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return [...jobs].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "deadline":
        return [...jobs].sort((a, b) => {
          if (a.daysRemaining === null) return 1;
          if (b.daysRemaining === null) return -1;
          return a.daysRemaining - b.daysRemaining;
        });
      case "recommended":
      default:
        // You could implement a recommendation algorithm here
        // For now, let's just keep the original order
        return jobs;
    }
  };

  useEffect(() => {
    let results = filteredJobs;

    if (isSearch || searchResults || location) {
      results = searchResults;

      if (location) {
        // console.log("Location ✅:", location);
        results = results.filter((job) => {
          const locationString = `${job.country || ""} ${
            job.city || ""
          }`.toLowerCase();
          return locationString.includes(location.toLowerCase());
        });
      }

      if (category && category !== "categories") {
        results = results.filter((job) => job.categoryId === category);
      }

      if (seniority && seniority !== "seniority") {
        results = results.filter((res) => res.experience === seniority);
      }
      if (jobType && jobType !== "jobType") {
        results = results.filter((res) => res.jobType === jobType);
      }

      results = sortJobs(results, sortBy);
    }

    refetch();
    setFilteredJobs(results);
  }, [searchResults, isSearch, location, category, seniority, jobType, sortBy]);

  const clearFilters = () => {
    setLocation("");
    setJobType("");
    setCategory("");
    setSeniority("");
    setSortBy("recommended");
    setIsSearch(true);
    setFilteredJobs(jobsWithDeadlines);
  };

  const savedJobs = itemsWithDeadlines;

  function findJobInBoth(id: string): boolean {
    const JobInBoth = items.find((item) => item.id === id);
    return !!JobInBoth;
  }

  const filteredInvitations = Invitations.filter((inv) =>
    users.some((user) => user.id === inv.applicantId)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="find-job" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-3xl border-b rounded-none bg-transparent h-auto">
            <TabsTrigger
              value="find-job"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
            >
              Find job
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
            >
              Saved
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
            >
              My applications
            </TabsTrigger>

            {session.data?.user.role === "USER" && (
              <TabsTrigger
                value="hire"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
              >
                Hirings
              </TabsTrigger>
            )}
          </TabsList>
          <main className="flex-1 py-6 bg-gray-50">
            <TabsContent value="find-job">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-1 md:col-span-1">
                    <div className="flex-1 w-full">
                      <SearchBar
                        placeholder="Search for jobs.."
                        data={jobsWithDeadlines}
                        onSearch={setSearchResults}
                        setIsSearch={setIsSearch}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Country, state, city or town"
                        className="pl-10 rounded-md"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 flex gap-4">
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
                      onClick={() => clearFilters()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-filter"
                      >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                      </svg>
                      Clear filters
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-1">
                    <Select
                      value={jobType}
                      onValueChange={setJobType}
                      defaultValue="jobType"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {type.map((type, i) => {
                          return (
                            <SelectItem key={i} value={type}>
                              {type}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      defaultValue="all"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCategories.map((cat) => {
                          return (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Select
                      value={seniority}
                      onValueChange={setSeniority}
                      defaultValue="seniority"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seniority" />
                      </SelectTrigger>
                      <SelectContent>
                        {expirience.map((exp, i) => {
                          return (
                            <SelectItem key={i} value={exp}>
                              {exp}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm">
                    Found{" "}
                    <span className="font-bold">{filteredJobs.length}</span>{" "}
                    job(s)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Sort by:</span>
                    <Select
                      value={sortBy}
                      onValueChange={setSortBy}
                      defaultValue="recommended"
                    >
                      <SelectTrigger className="h-8 w-40">
                        <SelectValue placeholder="Recommended" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`}
                >
                  {isLoading
                    ? skeletonArray.map((index) => (
                        <JobCardSkeleton key={`skeleton-${index}`} />
                      ))
                    : filteredJobs.map((job) => {
                        const isEqual = findJobInBoth(job.id);
                        return isEqual ? (
                          <JobCard
                            refetch={refetch}
                            jobType={job.jobType as string}
                            myJob={job}
                            createdAt={job.createdAt}
                            key={job.id}
                            description={job.description ?? ""}
                            id={job.id}
                            title={job.title}
                            company={job.company as string}
                            country={job.country as string}
                            city={job.city as string}
                            logo={"https://hrty.vercel.app/uEFqB1"}
                            daysRemaining={job.daysRemaining as number}
                            isSaved={true}
                          />
                        ) : (
                          <JobCard
                            refetch={refetch}
                            jobType={job.jobType as string}
                            myJob={job}
                            createdAt={job.createdAt}
                            key={job.id}
                            description={job.description ?? ""}
                            id={job.id}
                            title={job.title}
                            company={job.company as string}
                            country={job.country as string}
                            city={job.city as string}
                            logo={"https://hrty.vercel.app/uEFqB1"}
                            daysRemaining={job.daysRemaining as number}
                            isSaved={job.isSaved as boolean}
                          />
                        );
                      })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div
                className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`}
              >
                {isLoading
                  ? skeletonArray.map((index) => (
                      <JobCardSkeleton key={`skeleton-${index}`} />
                    ))
                  : savedJobs.map((job) => (
                      <JobCard
                        refetch={refetch}
                        jobType={job.jobType as string}
                        myJob={job}
                        createdAt={job.createdAt}
                        key={job.id}
                        description={job.description ?? ""}
                        id={job.id}
                        title={job.title}
                        company={job.company as string}
                        country={job.country as string}
                        city={job.city as string}
                        logo={"https://hrty.vercel.app/uEFqB1"}
                        daysRemaining={job.daysRemaining as number}
                        isSaved={job.isSaved as boolean}
                      />
                    ))}
              </div>
              {savedJobs.length === 0 && (
                <div className="flex justify-center items-center py-40 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No saved jobs found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="applications">
              <div className="min-h-screen bg-gray-50">
                <ApplicationList
                  currentUser={currentUser}
                  jobs={jobs}
                  isLoading={isLoading}
                />
              </div>
            </TabsContent>
            <TabsContent value="hire">
              {filteredInvitations.length > 0 ? (
                filteredInvitations.map((invitation) => (
                  <EmployeeHireCard
                    key={invitation.id}
                    invitation={invitation}
                    users={users}
                  />
                ))
              ) : (
                <div className="max-w-5xl mx-auto border-[1px] border-gray-400 py-40 border-dotted mt-12 rounded-lg">
                  <p className="text-center">No Job invitations found</p>
                </div>
              )}
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
