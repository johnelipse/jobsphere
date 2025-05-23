import { AppSidebar } from "@/components/back-end/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import Breadcrumb from "../../components/back-end/breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SendFeedback } from "@/components/send-feedback";

export default async function BackEndLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callback=${encodeURIComponent("/dashboard")}`);
  }

  if (session?.user.role === "USER") {
    redirect("/jobs");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      <SidebarInset>
        <header className="sticky justify-between top-0 z-10 w-full border-[0.5px] flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <Breadcrumb />
            </div>
          </div>
        </header>
        <div className="flex max-w-5xl mx-auto w-full min-h-screen px-4">
          {children}
        </div>
      </SidebarInset>

      <SendFeedback user={session?.user} />
    </SidebarProvider>
  );
}
