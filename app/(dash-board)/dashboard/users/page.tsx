import { getAllUsers } from "@/actions/users";
import { UserManagement } from "@/components/back-end/back-pages/user-managment";
import React from "react";

export default async function page() {
  const users = await getAllUsers();
  const myUsers = users.filter(
    (user) => user.role === "EMPLOYER" || user.role === "USER"
  );
  return (
    <div className="w-full pt-6">
      <UserManagement allUsers={myUsers} />
    </div>
  );
}
