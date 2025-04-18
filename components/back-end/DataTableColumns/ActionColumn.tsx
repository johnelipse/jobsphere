"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useJobs } from "@/hooks/useJobsHook";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";

type ActionColumnProps = {
  row: any;
  model: any;
  editEndpoint: string;
  id?: string | undefined;
  slug?: string | undefined;
};
export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = "",
  slug = "",
}: ActionColumnProps) {
  const isActive = row.isActive;
  const { deletedJob, isDeleting } = useJobs();
  const { deletedCategory } = useCategories();
  const router = useRouter();
  async function handleDelete() {
    try {
      if (model === "job") {
        deletedJob(id);
        router.refresh();
        // window.location.reload();
        // toast.success("success", `${model} Deleted Successfully`);
      } else if (model === "category") {
        deletedCategory(slug);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      // toast.error("error", "Something went wrong");
    }
  }
  return (
    <div className="flex items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer "
          >
            <Trash className="w-4 h-4  mr-2 flex-shrink-0" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this{" "}
              {model}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {isDeleting ? (
              <Button disabled variant={"destructive"}>
                Deleting...
              </Button>
            ) : (
              <Button variant={"destructive"} onClick={() => handleDelete()}>
                Permanently Delete
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {editEndpoint && (
        <Button
          variant={"ghost"}
          size={"icon"}
          asChild
          className="text-green-600 hover:text-green-700 transition-all duration-500 cursor-pointer "
        >
          <Link href={editEndpoint}>
            <Pencil className="w-4 h-4 " />
          </Link>
        </Button>
      )}
    </div>
  );
}
