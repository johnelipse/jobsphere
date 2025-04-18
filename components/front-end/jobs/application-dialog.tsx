"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FileUpload from "../form-iniputs/file-upload";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useApplications } from "@/hooks/useApplicationHook";

interface JobApplicationDialogProps {
  jobId: string;
  jobTitle: string;
}

export interface ApplicationProps {
  jobId: string;
  applicantId: string;
  coverLetter: string;
  resume: string;
}

export function JobApplicationDialog({
  jobId,
  jobTitle,
}: JobApplicationDialogProps) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const { applicationCreated, isCreating } = useApplications();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationProps>();

  const [file, setFile] = useState<string>("");

  async function submit(data: ApplicationProps) {
    data.resume = file;
    data.jobId = jobId;
    data.applicantId = session.data?.user.id ?? "";
    applicationCreated(data);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Apply For this job</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(submit)}>
          <DialogHeader>
            <DialogTitle>Apply for: {jobTitle}</DialogTitle>
            <DialogDescription>
              Complete the form below to submit your application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="coverLetter" className="font-medium">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell us why you're a good fit for this position..."
                className="min-h-[150px]"
                {...register("coverLetter", { required: true })}
              />
              {errors["coverLetter"] && (
                <span className="text-xs text-red-600">
                  this field is required
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <FileUpload
                label="Upload resume"
                file={file}
                setFile={setFile}
                endpoint="fileUploader"
              />
            </div>
            <input type="hidden" name="jobId" value={jobId} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
