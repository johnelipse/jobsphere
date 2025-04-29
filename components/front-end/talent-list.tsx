// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import type { User } from "@prisma/client";
// import { ProfileDialog } from "./profile-dialog";
// import { HiringDialog } from "./hiring-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { MapPin, Briefcase, ChevronDown, ChevronUp } from "lucide-react";

// export function TalentList({ allUsers }: { allUsers: User[] }) {
//   const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>(
//     {}
//   );

//   const toggleExpand = (userId: string) => {
//     setExpandedUsers((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   return (
//     <div className="flex-1 space-y-6 px-6 py-4">
//       {allUsers.map((user) => {
//         const isExpanded = expandedUsers[user.id] || false;

//         return (
//           <Card
//             key={user.id}
//             className="overflow-hidden border-none bg-gradient-to-br from-white to-blue-50 shadow-md transition-all duration-300 hover:shadow-lg"
//           >
//             <CardContent className="p-0">
//               {/* Top colored banner */}
//               <div className="h-3 bg-gradient-to-r from-cyan-500 to-teal-400" />

//               <div className="p-6">
//                 <div className="flex items-start gap-6">
//                   {/* Left column - Avatar and basic info */}
//                   <div className="flex flex-col items-center space-y-2">
//                     <div className="relative">
//                       <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-200 to-teal-300 opacity-70 blur-sm" />
//                       <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
//                         <Image
//                           src={
//                             (user.image as string) ||
//                             "/placeholder.svg?height=80&width=80"
//                           }
//                           alt={user.name}
//                           width={80}
//                           height={80}
//                           className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Middle column - Main content */}
//                   <div className="flex-1">
//                     <div className="mb-3">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-xl font-bold tracking-tight text-gray-800">
//                           {user.name}
//                         </h3>
//                         <Badge className="bg-gradient-to-r from-cyan-500 to-teal-500 px-3 py-1 text-white">
//                           Available
//                         </Badge>
//                       </div>
//                       <p className="text-md font-medium text-cyan-700">
//                         {user.job}
//                       </p>
//                     </div>

//                     <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                       <div className="flex items-center gap-1">
//                         <Briefcase className="h-4 w-4 text-cyan-600" />
//                         <span className="font-semibold text-cyan-700">
//                           ${user.salary}/hr
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-cyan-600" />
//                         <span>Remote</span>
//                       </div>
//                     </div>

//                     {/* Skills section */}
//                     <div className="mb-4">
//                       <div className="flex flex-wrap gap-2">
//                         {user.skills
//                           .slice(0, isExpanded ? user.skills.length : 3)
//                           .map((skill, i) => (
//                             <Badge
//                               key={i}
//                               variant="outline"
//                               className="border-cyan-200 bg-gradient-to-r from-cyan-50 to-teal-50 px-3 py-1 text-xs font-medium text-cyan-800 shadow-sm transition-all duration-300 hover:shadow"
//                             >
//                               {skill}
//                             </Badge>
//                           ))}
//                         {!isExpanded && user.skills.length > 3 && (
//                           <Badge
//                             variant="secondary"
//                             className="cursor-pointer px-3 py-1 text-xs font-medium"
//                             onClick={() => toggleExpand(user.id)}
//                           >
//                             +{user.skills.length - 3} more
//                           </Badge>
//                         )}
//                       </div>
//                     </div>

//                     {/* Summary with expand/collapse */}
//                     <div className="relative">
//                       <p
//                         className={`text-sm text-gray-600 ${
//                           !isExpanded && "line-clamp-2"
//                         }`}
//                       >
//                         {user.summary}
//                       </p>
//                       {user.summary && user.summary.length > 120 && (
//                         <button
//                           onClick={() => toggleExpand(user.id)}
//                           className="mt-1 flex items-center text-xs font-medium text-cyan-600 hover:text-cyan-800"
//                         >
//                           {isExpanded ? (
//                             <>
//                               Show less <ChevronUp className="ml-1 h-3 w-3" />
//                             </>
//                           ) : (
//                             <>
//                               Show more <ChevronDown className="ml-1 h-3 w-3" />
//                             </>
//                           )}
//                         </button>
//                       )}
//                     </div>

//                     {/* Actions */}
//                     <div className="mt-4 flex items-center justify-between">
//                       <ProfileDialog user={user} />
//                       <HiringDialog user={user} applicantId={user.id} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@prisma/client";
import { ProfileDialog } from "./profile-dialog";
import { HiringDialog } from "./hiring-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, ChevronDown, ChevronUp } from "lucide-react";

export function TalentList({ allUsers }: { allUsers: User[] }) {
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpand = (userId: string) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="flex-1 space-y-6 px-3 py-4 sm:px-6">
      {allUsers.map((user) => {
        const isExpanded = expandedUsers[user.id] || false;

        return (
          <Card
            key={user.id}
            className="overflow-hidden border-none bg-gradient-to-br from-white to-blue-50 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="p-0">
              {/* Top colored banner */}
              <div className="h-3 bg-gradient-to-r from-cyan-500 to-teal-400" />

              <div className="p-4 sm:p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                  {/* Left column - Avatar and basic info */}
                  <div className="flex w-full justify-center sm:w-auto sm:justify-start">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-200 to-teal-300 opacity-70 blur-sm" />
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-20 sm:w-20">
                        <Image
                          src={
                            (user.image as string) ||
                            "/placeholder.svg?height=80&width=80" ||
                            "/placeholder.svg"
                          }
                          alt={user.name || "User"}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Middle column - Main content */}
                  <div className="flex-1 w-full">
                    <div className="mb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-800">
                          {user.name}
                        </h3>
                        <Badge
                          className="self-start sm:self-auto bg-gradient-to-r from-cyan-500
                        md:block hidden to-teal-500 px-2 py-1 text-xs sm:text-sm text-white"
                        >
                          Available
                        </Badge>
                      </div>
                      <p className="text-sm sm:text-md font-medium text-cyan-700">
                        {user.job}
                      </p>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
                        <span className="font-semibold text-cyan-700">
                          ${user.salary}/hr
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
                        <span>Remote</span>
                      </div>
                    </div>

                    {/* Skills section */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {user.skills
                          .slice(0, isExpanded ? user.skills.length : 3)
                          .map((skill, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="border-cyan-200 bg-gradient-to-r from-cyan-50 to-teal-50 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-cyan-800 shadow-sm transition-all duration-300 hover:shadow"
                            >
                              {skill}
                            </Badge>
                          ))}
                        {!isExpanded && user.skills.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="cursor-pointer px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium"
                            onClick={() => toggleExpand(user.id)}
                          >
                            +{user.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Summary with expand/collapse */}
                    <div className="relative">
                      <p
                        className={`text-xs sm:text-sm text-gray-600 ${
                          !isExpanded && "line-clamp-2"
                        }`}
                      >
                        {user.summary}
                      </p>
                      {user.summary && user.summary.length > 120 && (
                        <button
                          onClick={() => toggleExpand(user.id)}
                          className="mt-1 flex items-center text-xs font-medium text-cyan-600 hover:text-cyan-800"
                        >
                          {isExpanded ? (
                            <>
                              Show less <ChevronUp className="ml-1 h-3 w-3" />
                            </>
                          ) : (
                            <>
                              Show more <ChevronDown className="ml-1 h-3 w-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 sm:justify-between">
                      <ProfileDialog user={user} />
                      <HiringDialog user={user} applicantId={user.id} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
