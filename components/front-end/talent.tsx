import { User } from "@prisma/client";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { TalentSidebar } from "./talent-sidebar";
import { TalentList } from "./talent-list";

export default function TalentPage({ allUsers }: { allUsers: User[] }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider>
        <div className="flex flex-1">
          <TalentSidebar />
          <SidebarInset>
            <TalentList allUsers={allUsers} />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
