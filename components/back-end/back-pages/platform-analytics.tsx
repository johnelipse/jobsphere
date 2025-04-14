// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { User } from "@prisma/client";
// import { useJobs } from "@/hooks/useJobsHook";
// import { useApplications } from "@/hooks/useApplicationHook";

// const userSignups = [
//   { date: "Jan", count: 120 },
//   { date: "Feb", count: 150 },
//   { date: "Mar", count: 180 },
//   { date: "Apr", count: 220 },
//   { date: "May", count: 300 },
//   { date: "Jun", count: 250 },
//   { date: "Jul", count: 280 },
// ];

// const jobPostings = [
//   { date: "Jan", count: 45 },
//   { date: "Feb", count: 52 },
//   { date: "Mar", count: 61 },
//   { date: "Apr", count: 85 },
//   { date: "May", count: 91 },
//   { date: "Jun", count: 72 },
//   { date: "Jul", count: 84 },
// ];

// const applications = [
//   { date: "Jan", count: 320 },
//   { date: "Feb", count: 380 },
//   { date: "Mar", count: 420 },
//   { date: "Apr", count: 520 },
//   { date: "May", count: 680 },
//   { date: "Jun", count: 590 },
//   { date: "Jul", count: 610 },
// ];

// const userTypes = [
//   { name: "Job Seekers", value: 65 },
//   { name: "Employers", value: 25 },
//   { name: "Recruiters", value: 10 },
// ];

// const COLORS = ["#3b82f6", "#8b5cf6", "#10b981"];

// export function PlatformAnalytics({ users }: { users: User[] }) {
//   const { jobs, isLoading } = useJobs();
//   const { applications } = useApplications();
//   return (
//     <section className="space-y-4">
//       <div>
//         <h2 className="text-2xl font-bold tracking-tight">
//           Platform Analytics
//         </h2>
//         <p className="text-muted-foreground">
//           Monitor platform performance and user activity.
//         </p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card className="shadow-sm">
//           <CardHeader className="pb-2">
//             <CardTitle>Total Users</CardTitle>
//             <CardDescription>Platform user count</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">4,826</div>
//             <p className="text-sm text-green-600">+12% from last month</p>
//             <div className="mt-4 h-[200px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={userSignups}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="date" tickLine={false} axisLine={false} />
//                   <YAxis tickLine={false} axisLine={false} />
//                   <Tooltip
//                     content={({ active, payload }) => {
//                       if (active && payload && payload.length) {
//                         return (
//                           <div className="rounded-lg border bg-background p-2 shadow-sm">
//                             <div className="grid grid-cols-2 gap-2">
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                   Date
//                                 </span>
//                                 <span className="font-bold text-muted-foreground">
//                                   {payload[0].payload.date}
//                                 </span>
//                               </div>
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                   Users
//                                 </span>
//                                 <span className="font-bold">
//                                   {payload[0].value}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="count"
//                     stroke="#3b82f6"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-sm">
//           <CardHeader className="pb-2">
//             <CardTitle>Job Postings</CardTitle>
//             <CardDescription>Total jobs posted</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">1,284</div>
//             <p className="text-sm text-green-600">+8% from last month</p>
//             <div className="mt-4 h-[200px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={jobPostings}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="date" tickLine={false} axisLine={false} />
//                   <YAxis tickLine={false} axisLine={false} />
//                   <Tooltip
//                     content={({ active, payload }) => {
//                       if (active && payload && payload.length) {
//                         return (
//                           <div className="rounded-lg border bg-background p-2 shadow-sm">
//                             <div className="grid grid-cols-2 gap-2">
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                   Date
//                                 </span>
//                                 <span className="font-bold text-muted-foreground">
//                                   {payload[0].payload.date}
//                                 </span>
//                               </div>
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                   Jobs
//                                 </span>
//                                 <span className="font-bold">
//                                   {payload[0].value}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                   />
//                   <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-sm">
//           <CardHeader className="pb-2">
//             <CardTitle>User Distribution</CardTitle>
//             <CardDescription>User types breakdown</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">100%</div>
//             <p className="text-sm text-muted-foreground">All platform users</p>
//             <div className="mt-4 h-[200px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={userTypes}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) =>
//                       `${name} ${(percent * 100).toFixed(0)}%`
//                     }
//                   >
//                     {userTypes.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     content={({ active, payload }) => {
//                       if (active && payload && payload.length) {
//                         return (
//                           <div className="rounded-lg border bg-background p-2 shadow-sm">
//                             <div className="grid grid-cols-2 gap-2">
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                   Type
//                                 </span>
//                                 <span className="font-bold text-muted-foreground">
//                                   {payload[0].name}
//                                 </span>
//                               </div>
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                   Percentage
//                                 </span>
//                                 <span className="font-bold">
//                                   {payload[0].value}%
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="shadow-sm">
//         <CardHeader>
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <CardTitle>Detailed Analytics</CardTitle>
//               <CardDescription>Platform performance over time</CardDescription>
//             </div>
//             <div>
//               <Select defaultValue="7days">
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select timeframe" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="7days">Last 7 days</SelectItem>
//                   <SelectItem value="30days">Last 30 days</SelectItem>
//                   <SelectItem value="90days">Last 90 days</SelectItem>
//                   <SelectItem value="year">Last year</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="applications">
//             <TabsList>
//               <TabsTrigger value="applications">Applications</TabsTrigger>
//               <TabsTrigger value="users">User Growth</TabsTrigger>
//               <TabsTrigger value="jobs">Job Posts</TabsTrigger>
//             </TabsList>

//             <TabsContent value="applications" className="pt-4">
//               <div className="h-[400px]">
//                 <ChartContainer config={{ line: { color: "#10b981" } }}>
//                   <LineChart data={applications}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" tickLine={false} axisLine={false} />
//                     <YAxis tickLine={false} axisLine={false} />
//                     <Tooltip
//                       content={({ active, payload }) => {
//                         if (active && payload && payload.length) {
//                           return (
//                             <div className="rounded-lg border bg-background p-2 shadow-sm">
//                               <div className="grid grid-cols-2 gap-2">
//                                 <div className="flex flex-col">
//                                   <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                     Date
//                                   </span>
//                                   <span className="font-bold text-muted-foreground">
//                                     {payload[0].payload.date}
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-col">
//                                   <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                     Applications
//                                   </span>
//                                   <span className="font-bold">
//                                     {payload[0].value}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         }
//                         return null;
//                       }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="count"
//                       stroke="#10b981"
//                       strokeWidth={2}
//                       dot={{ r: 4 }}
//                       activeDot={{ r: 6 }}
//                     />
//                   </LineChart>
//                 </ChartContainer>
//               </div>
//             </TabsContent>

//             <TabsContent value="users" className="pt-4">
//               <div className="h-[400px]">
//                 <ChartContainer config={{ line: { color: "#3b82f6" } }}>
//                   <LineChart data={userSignups}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" tickLine={false} axisLine={false} />
//                     <YAxis tickLine={false} axisLine={false} />
//                     <Tooltip
//                       content={({ active, payload }) => {
//                         if (active && payload && payload.length) {
//                           return (
//                             <div className="rounded-lg border bg-background p-2 shadow-sm">
//                               <div className="grid grid-cols-2 gap-2">
//                                 <div className="flex flex-col">
//                                   <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                     Date
//                                   </span>
//                                   <span className="font-bold text-muted-foreground">
//                                     {payload[0].payload.date}
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-col">
//                                   <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                     Users
//                                   </span>
//                                   <span className="font-bold">
//                                     {payload[0].value}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         }
//                         return null;
//                       }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="count"
//                       stroke="#3b82f6"
//                       strokeWidth={2}
//                       dot={{ r: 4 }}
//                       activeDot={{ r: 6 }}
//                     />
//                   </LineChart>
//                 </ChartContainer>
//               </div>
//             </TabsContent>

//             <TabsContent value="jobs" className="pt-4">
//               <div className="h-[400px]">
//                 <ChartContainer config={{ bar: { color: "#8b5cf6" } }}>
//                   <BarChart data={jobPostings}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" tickLine={false} axisLine={false} />
//                     <YAxis tickLine={false} axisLine={false} />
//                     <Tooltip
//                       content={({ active, payload }) => {
//                         if (active && payload && payload.length) {
//                           return (
//                             <div className="rounded-lg border bg-background p-2 shadow-sm">
//                               <div className="grid grid-cols-2 gap-2">
//                                 <div className="flex flex-col">
//                                   <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                     Date
//                                   </span>
//                                   <span className="font-bold text-muted-foreground">
//                                     {payload[0].payload.date}
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-col">
//                                   <span className="text-[0.70rem] uppercase text-muted-foreground">
//                                     Jobs
//                                   </span>
//                                   <span className="font-bold">
//                                     {payload[0].value}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         }
//                         return null;
//                       }}
//                     />
//                     <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ChartContainer>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </section>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@prisma/client";
import { useJobs } from "@/hooks/useJobsHook";
import { useApplications } from "@/hooks/useApplicationHook";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981"];

export function PlatformAnalytics({ users }: { users: User[] }) {
  const { jobs, isLoading } = useJobs();
  const { applications } = useApplications();

  // Process users data for charts
  const usersByMonth = users.reduce<{ [key: string]: number }>((acc, user) => {
    const date = new Date(user.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    if (!acc[month]) acc[month] = 0;
    acc[month]++;
    return acc;
  }, {});

  const userSignups = Object.entries(usersByMonth).map(([date, count]) => ({
    date,
    count,
  }));

  // Process jobs data for charts
  const jobsByMonth =
    jobs?.reduce<{ [key: string]: number }>((acc, job) => {
      const date = new Date(job.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) acc[month] = 0;
      acc[month]++;
      return acc;
    }, {}) || {};

  const jobPostings = Object.entries(jobsByMonth).map(([date, count]) => ({
    date,
    count,
  }));

  // Process applications data for charts
  const applicationsByMonth =
    applications?.reduce<{ [key: string]: number }>((acc, application) => {
      const date = new Date(application.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) acc[month] = 0;
      acc[month]++;
      return acc;
    }, {}) || {};

  const applicationData = Object.entries(applicationsByMonth).map(
    ([date, count]) => ({ date, count })
  );

  // Calculate user types distribution
  const userTypes = [
    {
      name: "Job Seekers",
      value: Math.round(
        (users.filter((user) => user.role === "USER").length / users.length) *
          100
      ),
    },
    {
      name: "Employers",
      value: Math.round(
        (users.filter((user) => user.role === "EMPLOYER").length /
          users.length) *
          100
      ),
    },
    {
      name: "Recruiters",
      value: Math.round(
        (users.filter((user) => user.role === "ADMIN").length / users.length) *
          100
      ),
    },
  ];

  // Calculate growth percentages
  const calculateGrowth = (data: { count: number }[]) => {
    if (data.length < 2) return 0;
    const currentMonth = data[data.length - 1].count;
    const prevMonth = data[data.length - 2].count;
    return prevMonth > 0
      ? Math.round(((currentMonth - prevMonth) / prevMonth) * 100)
      : 0;
  };

  const userGrowth = calculateGrowth(userSignups);
  const jobGrowth = calculateGrowth(jobPostings);

  return (
    <section className="space-y-4 pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Platform Analytics
        </h2>
        <p className="text-muted-foreground">
          Monitor platform performance and user activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Platform user count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-sm text-green-600">
              {userGrowth > 0 ? `+${userGrowth}%` : `${userGrowth}%`} from last
              month
            </p>
            <div className="mt-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userSignups}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Date
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.date}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Users
                                </span>
                                <span className="font-bold">
                                  {payload[0].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Job Postings</CardTitle>
            <CardDescription>Total jobs posted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{jobs?.length || 0}</div>
            <p className="text-sm text-green-600">
              {jobGrowth > 0 ? `+${jobGrowth}%` : `${jobGrowth}%`} from last
              month
            </p>
            <div className="mt-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobPostings}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Date
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.date}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Jobs
                                </span>
                                <span className="font-bold">
                                  {payload[0].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>User types breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">100%</div>
            <p className="text-sm text-muted-foreground">All platform users</p>
            <div className="mt-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Type
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Percentage
                                </span>
                                <span className="font-bold">
                                  {payload[0].value}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Platform performance over time</CardDescription>
            </div>
            <div>
              <Select defaultValue="7days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="applications">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="users">User Growth</TabsTrigger>
              <TabsTrigger value="jobs">Job Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="pt-4">
              <div className="h-[100%]">
                <ChartContainer config={{ line: { color: "#10b981" } }}>
                  <LineChart data={applicationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Date
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.date}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Applications
                                  </span>
                                  <span className="font-bold">
                                    {payload[0].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="users" className="pt-4">
              <div className="h-[100%]">
                <ChartContainer config={{ line: { color: "#3b82f6" } }}>
                  <LineChart data={userSignups}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Date
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.date}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Users
                                  </span>
                                  <span className="font-bold">
                                    {payload[0].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="pt-4">
              <div className="h-[100%]">
                <ChartContainer config={{ bar: { color: "#8b5cf6" } }}>
                  <BarChart data={jobPostings}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Date
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.date}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Jobs
                                  </span>
                                  <span className="font-bold">
                                    {payload[0].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
