import { getAllUsers } from "@/actions/users";
import { ApplicationManagement } from "@/components/back-end/back-pages/application-man";
import React from "react";

export default async function page() {
  const users = await getAllUsers();
  return (
    <div className="w-full pt-6">
      <ApplicationManagement users={users} />
    </div>
  );
}
