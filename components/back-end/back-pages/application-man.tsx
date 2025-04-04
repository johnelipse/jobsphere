"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  Download,
  MoreHorizontal,
  Search,
  Star,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

const applications = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Developer",
    applied: "2 days ago",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    email: "alex.johnson@example.com",
    experience: "8 years",
    match: "92%",
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "UX Designer",
    applied: "1 day ago",
    status: "shortlisted",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
    email: "sarah.w@example.com",
    experience: "5 years",
    match: "88%",
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "Marketing Specialist",
    applied: "3 days ago",
    status: "rejected",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    email: "m.brown@example.com",
    experience: "4 years",
    match: "65%",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Senior Developer",
    applied: "5 hours ago",
    status: "accepted",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
    email: "emily.d@example.com",
    experience: "7 years",
    match: "95%",
  },
  {
    id: 5,
    name: "David Wilson",
    position: "UX Designer",
    applied: "1 week ago",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
    email: "david.w@example.com",
    experience: "3 years",
    match: "78%",
  },
];

export function ApplicationManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "shortlisted":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Star className="mr-1 h-3 w-3" /> Shortlisted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Accepted
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredApplications = (status: string) => {
    return applications
      .filter((app) => app.status === status || status === "all")
      .filter(
        (app) =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Application Management
        </h2>
        <p className="text-muted-foreground">
          Review and manage candidate applications.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                You have received 142 applications total
              </CardDescription>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            {["all", "pending", "shortlisted", "accepted", "rejected"].map(
              (status) => (
                <TabsContent
                  key={status}
                  value={status}
                  className="border-none p-0 pt-4"
                >
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-4">Candidate</div>
                      <div className="col-span-2">Position</div>
                      <div className="col-span-2">Applied</div>
                      <div className="col-span-2">Match</div>
                      <div className="col-span-2">Status</div>
                    </div>

                    {filteredApplications(status).length > 0 ? (
                      filteredApplications(status).map((application) => (
                        <div
                          key={application.id}
                          className="grid grid-cols-12 items-center gap-4 border-b p-4 last:border-0"
                        >
                          <div className="col-span-4 flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={application.avatar}
                                alt={application.name}
                              />
                              <AvatarFallback>
                                {application.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {application.email}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2">
                            {application.position}
                          </div>
                          <div className="col-span-2 text-muted-foreground">
                            {application.applied}
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-gray-200">
                                <div
                                  className="h-2 rounded-full bg-blue-600"
                                  style={{ width: application.match }}
                                ></div>
                              </div>
                              <span className="text-sm">
                                {application.match}
                              </span>
                            </div>
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
                                <DropdownMenuItem>
                                  Download Resume
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Shortlist</DropdownMenuItem>
                                <DropdownMenuItem>Accept</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No applications found.
                      </div>
                    )}
                  </div>
                </TabsContent>
              )
            )}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
