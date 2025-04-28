"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useHires } from "@/hooks/useHireHook";

// Define the form schema with validation
const formSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  employmentType: z.enum(
    ["FULLTIME", "PART_TIME", "CONTRACT", "ONSITE", "REMOTE"],
    {
      required_error: "Employment type is required",
    }
  ),
  salaryOffered: z.coerce
    .number()
    .min(1, { message: "Salary must be greater than 0" }),
  currency: z.string({
    required_error: "Currency is required",
  }),
});

type HiringFormValues = z.infer<typeof formSchema>;

interface HiringDialogProps {
  user: User;
  applicantId: string;
  jobId?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onHire?: (data: HiringFormValues) => void;
}

export function HiringDialog({
  applicantId,
  isOpen,
  user,
  onOpenChange,
}: HiringDialogProps) {
  const [open, setOpen] = useState(isOpen || false);

  // Initialize the form with default values
  const form = useForm<HiringFormValues>({
    defaultValues: {
      jobTitle: "",
      startDate: new Date(),
      employmentType: "FULLTIME",
      salaryOffered: 0,
    },
  });
  const { data } = useSession();
  const { createInvitation, isCreating } = useHires();

  // Handle form submission
  async function handleSubmit(formData: HiringFormValues) {
    applicantId = user.id;
    formData.salaryOffered = Number(formData.salaryOffered);
    const employerId = data?.user.id as string;

    const newData = {
      ...formData,
      employerId,
      applicantId,
    };
    try {
      await createInvitation(newData);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  // Update local state when controlled from parent
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Hire Me</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hire {user.name}</DialogTitle>
          <DialogDescription>
            Complete the form below to hire this applicant. All fields marked
            with * are required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter salary amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employment Type */}
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FULLTIME">Full-Time</SelectItem>
                      <SelectItem value="PART_TIME">Part-Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="REMOTE">Remote</SelectItem>
                      <SelectItem value="ONSITE">Onsite</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary and Currency (side by side on larger screens) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              {/* Salary Offered */}
              <FormField
                control={form.control}
                name="salaryOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Offered *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter salary amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                disabled={isCreating}
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button disabled={isCreating} type="submit">
                {isCreating ? "submitting..." : `Hire ${user.name}`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
