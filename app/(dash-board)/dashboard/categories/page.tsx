"use client";
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DataTable from "@/components/back-end/DataTableComponents/DataTable";
import { columns } from "./columns";
import { useCategories } from "@/hooks/useCategories";
import { CategoryCreateForm } from "@/components/forms/create-category";

export default function page() {
  const { allCategories } = useCategories();
  return (
    <div className="pt-6 w-full">
      <Tabs defaultValue="blogs" className="space-y-8">
        <TabsContent value="blogs" className="space-y-8">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
            <h2 className="scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0">
              Categories ({allCategories.length})
            </h2>
            <div className="ml-auto flex items-center gap-2">
              <CategoryCreateForm />
            </div>
          </div>
          <div className="py-8">
            <DataTable data={allCategories} columns={columns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
