// "use client";
// import { Search, MapPin } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useJobs } from "@/hooks/useJobsHook";
// import { JobCard } from "./jobs/job-card";

// export default function JobsPage() {
//   const { jobs } = useJobs();
//   const jobsWithDeadlines = jobs.map((job) => {
//     // Skip calculation if deadline is not set
//     if (!job.deadline) {
//       return {
//         ...job,
//         daysRemaining: null,
//         isExpired: false,
//       };
//     }

//     // Ensure deadline is a Date object
//     const deadlineDate = new Date(job.deadline);

//     // Calculate difference in milliseconds
//     const differenceMs = deadlineDate.getTime() - new Date().getTime();

//     // Convert to days and round down
//     const daysRemaining = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

//     return {
//       ...job,
//       daysRemaining: daysRemaining,
//       isExpired: daysRemaining < 0,
//     };
//   });
//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="container mx-auto px-4">
//         <Tabs defaultValue="find-job" className="w-full">
//           <TabsList className="grid grid-cols-4 max-w-md border-b rounded-none bg-transparent h-auto">
//             <TabsTrigger
//               value="find-job"
//               className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
//             >
//               Find job
//             </TabsTrigger>
//             <TabsTrigger
//               value="saved"
//               className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
//             >
//               Saved
//             </TabsTrigger>
//             <TabsTrigger
//               value="applications"
//               className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
//             >
//               My applications
//             </TabsTrigger>
//             <TabsTrigger
//               value="preferences"
//               className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
//             >
//               Career preferences
//             </TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       <main className="flex-1 py-6 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="col-span-1 md:col-span-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input placeholder="Show jobs" className="pl-10 rounded-md" />
//               </div>
//             </div>
//             <div className="col-span-1 md:col-span-1">
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input
//                   placeholder="Country, state, city or town"
//                   className="pl-10 rounded-md"
//                 />
//               </div>
//             </div>
//             <div className="col-span-1 md:col-span-1 flex gap-4">
//               <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
//                 Show jobs
//               </Button>
//               <Button variant="outline" className="flex gap-2 items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-filter"
//                 >
//                   <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//                 </svg>
//                 Clear filters
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div className="col-span-1">
//               <Select defaultValue="published">
//                 <SelectTrigger>
//                   <SelectValue placeholder="Published" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="published">Published</SelectItem>
//                   <SelectItem value="draft">Draft</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="col-span-1">
//               <Select defaultValue="profession">
//                 <SelectTrigger>
//                   <SelectValue placeholder="Profession" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="profession">Profession</SelectItem>
//                   <SelectItem value="it">IT</SelectItem>
//                   <SelectItem value="marketing">Marketing</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="col-span-1">
//               <Select defaultValue="industry">
//                 <SelectTrigger>
//                   <SelectValue placeholder="Industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="industry">Industry</SelectItem>
//                   <SelectItem value="tech">Tech</SelectItem>
//                   <SelectItem value="healthcare">Healthcare</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="col-span-1">
//               <Select defaultValue="seniority">
//                 <SelectTrigger>
//                   <SelectValue placeholder="Seniority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="seniority">Seniority</SelectItem>
//                   <SelectItem value="entry">Entry Level</SelectItem>
//                   <SelectItem value="mid">Mid Level</SelectItem>
//                   <SelectItem value="senior">Senior Level</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <div className="text-sm">
//               Found <span className="font-bold">50</span> jobs
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm">Sort by:</span>
//               <Select defaultValue="recommended">
//                 <SelectTrigger className="h-8 w-40">
//                   <SelectValue placeholder="Recommended" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="recommended">Recommended</SelectItem>
//                   <SelectItem value="newest">Newest</SelectItem>
//                   <SelectItem value="oldest">Oldest</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div
//             className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`}
//           >
//             {jobsWithDeadlines.map((job) => (
//               <JobCard
//                 key={job.id}
//                 id={job.id}
//                 title={job.title}
//                 company={job.company as string}
//                 country={job.country as string}
//                 city={job.city as string}
//                 logo={"https://hrty.vercel.app/uEFqB1"}
//                 daysRemaining={job.daysRemaining as number}
//               />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { Search, MapPin } from "lucide-react";
import { use, useState } from "react";

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
export interface NewUserProps extends User {
  applications: Application[];
}

export default function JobsPage({ users }: { users: NewUserProps[] }) {
  const { jobs, isLoading } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
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
  const session = useSession();
  const currentUser = users.find((user) => user.id === session.data?.user.id);

  const [searchResults, setSearchResults] = useState(jobsWithDeadlines);
  const [filteredData, setFilteredData] = useState(jobsWithDeadlines);
  const [isSearch, setIsSearch] = useState(true);

  // Calculate pagination
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobsWithDeadlines.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobsWithDeadlines.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent py-2"
            >
              Career preferences
            </TabsTrigger>
          </TabsList>
          <main className="flex-1 py-6 bg-gray-50">
            <TabsContent value="find-job">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-1 md:col-span-1">
                    <div className="flex-1 w-full">
                      <SearchBar
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
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 flex gap-4">
                    <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
                      Show jobs
                    </Button>
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="col-span-1">
                    <Select defaultValue="published">
                      <SelectTrigger>
                        <SelectValue placeholder="Published" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Select defaultValue="profession">
                      <SelectTrigger>
                        <SelectValue placeholder="Profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profession">Profession</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Select defaultValue="industry">
                      <SelectTrigger>
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Select defaultValue="seniority">
                      <SelectTrigger>
                        <SelectValue placeholder="Seniority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seniority">Seniority</SelectItem>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm">
                    Found <span className="font-bold">{jobs.length}</span> jobs
                    {jobs.length > 0 && (
                      <span className="ml-2 text-gray-500">
                        (Showing {indexOfFirstJob + 1}-
                        {Math.min(indexOfLastJob, jobs.length)} of {jobs.length}
                        )
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Sort by:</span>
                    <Select defaultValue="recommended">
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
                  {currentJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company as string}
                      country={job.country as string}
                      city={job.city as string}
                      logo={"https://hrty.vercel.app/uEFqB1"}
                      daysRemaining={job.daysRemaining as number}
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-8 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 h-9"
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="px-3 py-1 h-9 min-w-[36px]"
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 h-9"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="saved">
              <p>Saved</p>
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
            <TabsContent value="preferences">
              <p>Preferences</p>
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
