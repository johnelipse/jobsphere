import RolesPage from "@/components/front-end/roles-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/jobs");
  }
  return (
    <div>
      <RolesPage />
    </div>
  );
}
