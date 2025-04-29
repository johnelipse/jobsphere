import { getSingleUser } from "@/actions/users";
import { Footer } from "@/components/front-end/footer";
import { Header } from "@/components/front-end/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function FrontEndLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  const user = await getSingleUser(session?.user.id as string);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} session={session} />
      <main className="max-w-7xl mx-auto py-6">{children}</main>
      {/* <ChatSupportButton /> */}
      <Footer />
    </div>
  );
}
