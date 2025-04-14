"use client";

import * as React from "react";
import { Download, Printer } from "lucide-react";

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
import { Application } from "@prisma/client";

interface CoverLetterDialogProps {
  triggerComponent?: React.ReactNode;
  application: Application;
}

export default function CoverLetterDialog({
  application,
  triggerComponent,
}: CoverLetterDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {triggerComponent || (
            <Button variant="outline">View Cover Letter</Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Cover Letter</DialogTitle>
            <DialogDescription>
              Application for Software Developer position
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-4">
            <div className="space-y-6 text-sm">{application.coverLetter}</div>
          </div>
          <DialogFooter className="flex flex-row items-center justify-between sm:justify-between">
            <div className="text-sm text-muted-foreground">
              PDF version available upon request
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                <span className="sr-only">Print</span>
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
