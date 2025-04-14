import { getAllUsers } from "@/actions/users";
import JobsPage from "@/components/front-end/jobs-page";
import React from "react";

export default async function page() {
  const users = await getAllUsers();
  return (
    <div>
      <JobsPage users={users} />
    </div>
  );
}
