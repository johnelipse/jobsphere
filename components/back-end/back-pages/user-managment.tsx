"use client";

import { useState } from "react";
import {
  Check,
  Download,
  MoreHorizontal,
  Search,
  Shield,
  User,
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

const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "job-seeker",
    status: "active",
    verified: true,
    joined: "Jan 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "employer",
    status: "active",
    verified: true,
    joined: "Feb 3, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    role: "job-seeker",
    status: "suspended",
    verified: false,
    joined: "Mar 22, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "employer",
    status: "active",
    verified: true,
    joined: "Apr 10, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    role: "job-seeker",
    status: "inactive",
    verified: true,
    joined: "May 5, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
  },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <X className="mr-1 h-3 w-3" /> Suspended
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "job-seeker":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <User className="mr-1 h-3 w-3" /> Job Seeker
          </Badge>
        );
      case "employer":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-500"
          >
            <Shield className="mr-1 h-3 w-3" /> Employer
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage users and their permissions.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage all users on the platform
              </CardDescription>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button variant="outline" size="sm">
                Add User
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="job-seeker">Job Seeker</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 text-sm font-medium">
                <div className="col-span-4">User</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Verified</div>
                <div className="col-span-2">Actions</div>
              </div>

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-12 items-center gap-4 border-b p-4 last:border-0"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2">{getRoleBadge(user.role)}</div>
                    <div className="col-span-2">
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="col-span-2">
                      {user.verified ? (
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-500"
                        >
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-amber-500 text-amber-500"
                        >
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Joined {user.joined}
                      </span>
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-amber-600">
                              Suspend User
                            </DropdownMenuItem>
                          ) : user.status === "suspended" ? (
                            <DropdownMenuItem className="text-green-600">
                              Reactivate User
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No users found.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
