"use client";
import { useState } from "react";
import { DownloadIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import Link from "next/link";
import { HiringDialog } from "./hiring-dialog";

export function ProfileDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-none text-black border-none">
            View {user.name}'s Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto p-0 sm:max-w-[400px] md:right-0 md:h-screen md:max-h-[600px] md:w-[900px] md:max-w-[900px] md:rounded-none">
          <div className="flex flex-col relative">
            {/* Header section with profile info */}
            <div className="border-b p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <img
                      src={user.image as string}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{user.name}</h2>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {user.city}, {user.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {/* <Button className="flex-1">Hire Me</Button> */}
                  <HiringDialog user={user} applicantId={user.id} />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{user.job}</h2>

                <div className="text-xl font-bold">${user.salary}/hr</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="mb-4 text-gray-700">{user.headline}</p>

              <p className="mb-2 text-gray-700">{user.summary}</p>
            </div>

            {user.resume ? (
              <Link
                className="bg-[#0e8388] flex items-center gap-2 rounded-lg absolute bottom-8 right-4"
                download={user.resume}
                href={user.resume as string}
              >
                View CV
                <DownloadIcon />
              </Link>
            ) : (
              ""
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
