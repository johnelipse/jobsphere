"use client";

import Image from "next/image";
import type { User } from "@prisma/client";
import {
  CalendarIcon,
  BriefcaseIcon,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import { ProfileDialog } from "./profile-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HireProps } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function HiredUserCard({
  user,
  userDetails,
}: {
  user: HireProps;
  userDetails: User[];
}) {
  const [isHovering, setIsHovering] = useState(false);
  const currentUser = userDetails.find(
    (detail) => detail.id === user.applicantId
  );

  const hireDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Decorative elements */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-100 opacity-50" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-50 opacity-30" />

      <div className="relative flex items-start gap-5">
        {/* Left side - Image with enhanced styling */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-200 to-teal-400 opacity-70 blur-sm" />
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white shadow-md">
              <Image
                src={
                  (currentUser?.image as string) ||
                  "/placeholder.svg?height=80&width=80"
                }
                alt={currentUser?.name || "User"}
                width={80}
                height={80}
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-500 p-1 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Middle - Main content with improved typography and spacing */}
        <div className="relative flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-800">
                {currentUser?.name}
              </h3>
              <p className="text-md font-medium text-emerald-700">
                {user.jobTitle}
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-white shadow-sm">
              Hired
            </Badge>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-white/80 p-2 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <BriefcaseIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Salary</p>
                <p className="font-semibold text-emerald-700">
                  ${user.salaryOffered}/hr
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/80 p-2 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Hired on</p>
                <p className="font-semibold text-emerald-700">{hireDate}</p>
              </div>
            </div>
          </div>

          {/* Skills section with improved badges */}
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-gray-700">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {(currentUser?.skills ?? []).slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm ring-1 ring-inset ring-emerald-200 transition-all duration-300 hover:shadow"
                >
                  {skill}
                </span>
              ))}
              {(currentUser?.skills ?? []).length > 3 && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm ring-1 ring-inset ring-gray-200">
                  +{(currentUser?.skills ?? []).length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Actions with improved styling */}
          <div className="mt-5 flex items-center justify-between">
            {currentUser && (
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <ProfileDialog user={currentUser} />
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-emerald-200"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-red-600">
                  End Contract
                </DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
                <DropdownMenuItem>View Contract Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Animated highlight effect on hover */}
      {/* <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-200/20 to-teal-200/20 opacity-0 transition-opacity duration-500 ${
          isHovering ? "opacity-100" : ""
        }`}
      /> */}
    </div>
  );
}
