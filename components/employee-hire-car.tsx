"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Briefcase,
  Building,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { HireProps } from "@/types/types";
import type { User } from "@prisma/client";

interface HireCardProps {
  invitation: HireProps;
  users: User[];
}

export function EmployeeHireCard({ invitation, users }: HireCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  // Find user data
  const employer = users.find((user) => user.id === invitation.employerId);
  const applicant = users?.find((user) => user.id === invitation?.applicantId);

  console.log("✅", invitation);

  // Format the start date
  const formattedStartDate = invitation?.startDate
    ? new Date(invitation.startDate as Date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  // Calculate days until start date
  const today = new Date();
  const start = invitation?.startDate
    ? new Date(invitation.startDate as Date)
    : new Date();
  const daysUntilStart = Math.ceil(
    (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Format salary
  const formattedSalary = invitation?.salaryOffered
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(invitation.salaryOffered as number)
    : "Competitive";

  //   const location = invitation?.location || "Remote (US)"

  return (
    <TooltipProvider>
      <Card
        className="relative overflow-hidden border-none bg-gradient-to-br from-[#e7f5f5] via-white to-[#e0f2f1] shadow-lg transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative elements */}
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#cbe4de] to-[#d6f0eb] opacity-50" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tl from-[#cbe4de] to-[#d6f0eb] opacity-40" />

        {/* Simple header banner */}
        <div className="relative bg-[#0e8388] py-3 text-center text-white">
          <span className="font-medium">Job Offer Details</span>
        </div>

        <CardContent className="relative p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {invitation?.jobTitle || "Job Position"}
                </h2>
                <p className="text-gray-600 mt-1">
                  <Building className="inline-block h-4 w-4 mr-1" />
                  {applicant?.name || "Company"}
                </p>
                <p className="text-gray-600 mt-1">
                  <MapPin className="inline-block h-4 w-4 mr-1" />
                  {applicant?.country}
                </p>
              </div>
            </div>

            <Badge className="px-3 py-1 text-sm font-medium mt-4 sm:mt-0 bg-[#cbe4de] text-[#0e8388]">
              Job Offer
            </Badge>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-5">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Offer Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbe4de] text-[#0e8388]">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Annual Salary</p>
                      <p className="font-semibold text-[#0e8388]">
                        {formattedSalary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbe4de] text-[#0e8388]">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contract Type</p>
                      <p className="font-semibold text-gray-800">
                        {invitation?.employmentType || "Full-time"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbe4de] text-[#0e8388]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-semibold text-gray-800">
                        {formattedStartDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Employer info */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Employer Details
                </h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#cbe4de]">
                      <Image
                        src={
                          employer?.image ||
                          "/placeholder.svg?height=48&width=48"
                        }
                        alt={(employer?.name as string) || "Employer"}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {employer?.name || "Hiring Manager"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {employer?.job || "Human Resources"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact via Email
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send an email to your contact</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Schedule a Call
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Schedule a phone call with your contact</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Days until start */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Time Until Start Date
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Starting in</span>
                    <span className="text-sm font-medium text-[#0e8388]">
                      {daysUntilStart} days
                    </span>
                  </div>
                  <Progress
                    value={100 - Math.min(daysUntilStart, 30) * 3.33}
                    className="h-2 bg-[#cbe4de]"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0e8388]" />
                    <span className="text-sm text-gray-600">
                      You're all set to start on{" "}
                      <span className="font-medium">{formattedStartDate}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-6 flex justify-end">
            <Button className="bg-[#0e8388] text-white shadow-md transition-all duration-300 hover:bg-[#0a6b6f] hover:shadow-lg">
              View Offer Details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>

        {/* Animated highlight effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#cbe4de]/10 to-[#0e8388]/5 opacity-0 transition-opacity duration-500 ${
            isHovering ? "opacity-100" : ""
          }`}
        />
      </Card>
    </TooltipProvider>
  );
}
