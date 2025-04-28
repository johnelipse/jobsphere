import { getAllUsers } from "@/actions/users";
import { TalentTabs } from "@/components/front-end/talents-tabs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "USER") {
    redirect("/jobs");
  }

  const users = await getAllUsers();
  const filteredUsers = users.filter((user) => user.role === "USER");
  return (
    <div>
      <TalentTabs allUsers={filteredUsers} />
    </div>
  );
}
