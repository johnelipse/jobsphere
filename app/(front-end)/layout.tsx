import { ChatSupportButton } from "@/components/front-end/chart-support-button";
import { Footer } from "@/components/front-end/footer";
import { Header } from "@/components/front-end/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function FrontEndLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header session={session} />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      <ChatSupportButton />
      <Footer />
    </div>
  );
}
