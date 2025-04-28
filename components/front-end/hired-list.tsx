import type { User } from "@prisma/client";
import { HiredUserCard } from "./hired-user-card";
import { HireProps } from "@/types/types";

export function HiredTalentList({
  hiredUsers,
  userDetails,
}: {
  hiredUsers: HireProps[];
  userDetails: User[];
}) {
  return (
    <div className="flex-1 py-4 px-6">
      {hiredUsers.length > 0 ? (
        <div className="space-y-4">
          {hiredUsers.map((user) => (
            <HiredUserCard
              userDetails={userDetails}
              key={user.id}
              user={user}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No hired talent yet</p>
        </div>
      )}
    </div>
  );
}
