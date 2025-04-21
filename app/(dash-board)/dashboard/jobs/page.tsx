"use client";
import React from "react";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/back-end/DataTableComponents/DataTable";
import { useJobs } from "@/hooks/useJobsHook";
import { JobCreationForm } from "@/components/forms/create-job-form";

export default function page() {
  const { jobs } = useJobs();
  return (
    <div className="pt-6 w-full">
      <Tabs defaultValue="jobs" className="space-y-8">
        <TabsContent value="jobs" className="space-y-8">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
            <h2 className="scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0">
              Jobs({jobs.length})
            </h2>
            <div className="ml-auto flex items-center gap-2">
              <JobCreationForm />
            </div>
          </div>
          <div className="py-8">
            <DataTable data={jobs} columns={columns} />
          </div>
        </TabsContent>
        {/* <TabsContent value="blog-categories" className="space-y-8">
          <div className="max-w-2xl py-6">
            <BlogCategoryList fetchedCategories={categories} />
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
