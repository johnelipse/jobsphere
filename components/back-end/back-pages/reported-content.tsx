"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  Flag,
  MoreHorizontal,
  Search,
  Shield,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reportedContent = [
  {
    id: 1,
    type: "job-post",
    title: "Senior Developer with 20+ years experience (entry level salary)",
    reason: "Misleading job description",
    reporter: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    reportedUser: {
      name: "Tech Corp Inc.",
      email: "hr@techcorp.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TC",
    },
    date: "2 days ago",
    status: "pending",
  },
  {
    id: 2,
    type: "user",
    title: "Fake recruiter account",
    reason: "Scam/Fraud",
    reporter: {
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
    },
    reportedUser: {
      name: "John Smith",
      email: "john.smith@fakeemail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    date: "1 day ago",
    status: "pending",
  },
  {
    id: 3,
    type: "job-post",
    title: "Marketing position with inappropriate content",
    reason: "Inappropriate content",
    reporter: {
      name: "Michael Brown",
      email: "m.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
    },
    reportedUser: {
      name: "Creative Agency LLC",
      email: "jobs@creativeagency.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CA",
    },
    date: "3 days ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "user",
    title: "Harassing messages from employer",
    reason: "Harassment",
    reporter: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
    },
    reportedUser: {
      name: "Robert Taylor",
      email: "r.taylor@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RT",
    },
    date: "4 days ago",
    status: "investigating",
  },
  {
    id: 5,
    type: "job-post",
    title: "Discriminatory job requirements",
    reason: "Discrimination",
    reporter: {
      name: "David Wilson",
      email: "david.w@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
    },
    reportedUser: {
      name: "Global Industries",
      email: "careers@globalindustries.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "GI",
    },
    date: "5 days ago",
    status: "dismissed",
  },
];

export function ReportedContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredContent = reportedContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Pending Review
          </Badge>
        );
      case "investigating":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Shield className="mr-1 h-3 w-3" /> Investigating
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        );
      case "dismissed":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            <X className="mr-1 h-3 w-3" /> Dismissed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Reports & Flagged Content
        </h2>
        <p className="text-muted-foreground">
          Review and manage reported content and users.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Reported Content</CardTitle>
              <CardDescription>
                Review flagged content and take action
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <TabsList>
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="job-post">Job Posts</TabsTrigger>
                <TabsTrigger value="user">Users</TabsTrigger>
              </TabsList>

              <div className="flex flex-col gap-2 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {["all", "job-post", "user"].map((type) => (
              <TabsContent key={type} value={type} className="mt-4 space-y-4">
                {filteredContent
                  .filter((item) => type === "all" || item.type === type)
                  .map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex items-center justify-between border-b bg-muted/30 p-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-red-100 p-2">
                            <Flag className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Reported {item.date} • Reason: {item.reason}
                            </p>
                          </div>
                        </div>
                        <div>{getStatusBadge(item.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Reported By
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={item.reporter.avatar}
                                  alt={item.reporter.name}
                                />
                                <AvatarFallback>
                                  {item.reporter.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {item.reporter.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {item.reporter.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Reported Content Owner
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={item.reportedUser.avatar}
                                  alt={item.reportedUser.name}
                                />
                                <AvatarFallback>
                                  {item.reportedUser.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {item.reportedUser.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {item.reportedUser.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 border-t bg-muted/30 p-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm">
                              Take Action
                              <MoreHorizontal className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Mark as Investigating
                            </DropdownMenuItem>
                            <DropdownMenuItem>Resolve Report</DropdownMenuItem>
                            <DropdownMenuItem>Dismiss Report</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-amber-600">
                              Warn User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Ban User
                            </DropdownMenuItem>
                            {item.type === "job-post" && (
                              <DropdownMenuItem className="text-red-600">
                                Remove Job Post
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))}

                {filteredContent.filter(
                  (item) => type === "all" || item.type === type
                ).length === 0 && (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Flag className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">
                      No reports found
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      No reports match your current filters.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
