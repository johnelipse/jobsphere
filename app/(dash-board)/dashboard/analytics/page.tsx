import { getAllUsers } from "@/actions/users";
import { PlatformAnalytics } from "@/components/back-end/back-pages/platform-analytics";
import React from "react";

export default async function page() {
  const Users = await getAllUsers();
  return (
    <div className="w-full pt-6">
      <PlatformAnalytics users={Users} />
    </div>
  );
}
