"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TalentList } from "./talent-list";
import type { User } from "@prisma/client";
import { HiredTalentList } from "./hired-list";
import { useHires } from "@/hooks/useHireHook";

export function TalentTabs({ allUsers }: { allUsers: User[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const { Invitations } = useHires();
  const hiredUsers = allUsers.filter((user) => user.isMachine === true);

  return (
    <Tabs defaultValue="all" className="" onValueChange={setActiveTab}>
      <TabsList className="grid max-w-sm grid-cols-2 mb-6">
        <TabsTrigger value="all">All Talent</TabsTrigger>
        <TabsTrigger value="hired">Hired</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-0 max-w-4xl mx-auto">
        <TalentList allUsers={allUsers} />
      </TabsContent>

      <TabsContent value="hired" className="mt-0 max-w-4xl mx-auto">
        <HiredTalentList userDetails={allUsers} hiredUsers={Invitations} />
      </TabsContent>
    </Tabs>
  );
}
