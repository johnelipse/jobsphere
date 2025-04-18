import { getSingleUser } from "@/actions/users";
import ProfileUpdatePage from "@/components/forms/update-user-profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id as string;

  const singleUser = await getSingleUser(id);

  return (
    <div>
      <ProfileUpdatePage initialData={singleUser} />
    </div>
  );
}
