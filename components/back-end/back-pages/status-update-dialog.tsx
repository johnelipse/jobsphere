"use client";

import * as React from "react";
import { Check, Clock, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useApplications } from "@/hooks/useApplicationHook";
import { Status } from "@prisma/client";

// type Status = "PENDING" | "SHORTLISTED" | "ACCEPTED" | "REJECTED";

interface StatusUpdateDialogProps {
  applicationId: string;
  currentStatus: Status;
  candidateName?: string;
  jobTitle?: string;
  triggerComponent?: React.ReactNode;
  onStatusUpdate?: (applicationId: string, newStatus: Status) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode: string;
}

export function StatusUpdateDialog({
  currentStatus,
  triggerComponent,
  applicationId,
  mode,
  open: controlledOpen,
  onOpenChange,
}: StatusUpdateDialogProps) {
  const { applicationUpdated } = useApplications();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleStatusUpdate = () => {
    setIsUpdating(true);
    if (mode === "accept") {
      const data = { status: Status.ACCEPTED };
      applicationUpdated({ id: applicationId, data });
      if (setOpen) setOpen(false);
    } else if (mode === "shortlist") {
      const data = { status: Status.SHORTLISTED };
      applicationUpdated({ id: applicationId, data });
      if (setOpen) setOpen(false);
    } else if (mode === "reject") {
      const data = { status: Status.REJECTED };
      applicationUpdated({ id: applicationId, data });
      if (setOpen) setOpen(false);
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "SHORTLISTED":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Star className="mr-1 h-3 w-3" /> Shortlisted
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Accepted
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {triggerComponent || <Button variant="outline">Update Status</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Application Status</AlertDialogTitle>
          <AlertDialogDescription>
            Are ypu sure you want to change this status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2">
          <div className="mb-1">
            <div className="text-sm font-medium mb-2">Current Status</div>
            <div>{getStatusBadge(currentStatus)}</div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleStatusUpdate();
            }}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : `${mode.toUpperCase()}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
