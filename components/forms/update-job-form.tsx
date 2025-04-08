"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useJob, useJobs } from "@/hooks/useJobsHook";
import { useRouter } from "next/navigation";

// Define the job types and experience levels from the Prisma schema
const JOB_TYPES = ["REMOTE", "ONSITE", "FULLTIME", "PART_TIME", "CONTRACT"];
const EXPERIENCE_LEVELS = ["entry", "mid", "senior", "executive"];
const STATUS_TYPES = ["active", "filled", "expired"];

// Create a schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  company: z.string().optional(),
  salary: z.coerce.number().min(0, "Salary must be a positive number"),
  jobType: z.enum([
    "REMOTE",
    "ONSITE",
    "FULLTIME",
    "PART_TIME",
    "CONTRACT",
  ] as const),
  experience: z
    .enum(["entry", "mid", "senior", "executive"] as const)
    .optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(["active", "filled", "expired"] as const),
  requiredSkills: z.array(z.string()),
  deadline: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

export default function JobUpdateForm({ paramId }: { paramId: string }) {
  const { job, isLoading, error } = useJob(paramId);

  const { jobUpdated, isUpdating } = useJobs();
  const router = useRouter();

  const [skillInput, setSkillInput] = useState("");

  const [selectedJobType, setSelectedJobType] = useState<string>("REMOTE");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [selectedDeadline, setSelectedDeadline] = useState<Date>(new Date());

  // Initialize the form with empty values that will be updated when job data loads
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      company: "",
      salary: 0,
      jobType: "REMOTE" as const,
      experience: undefined,
      city: "",
      country: "",
      status: "active" as const,
      requiredSkills: [],
      deadline: new Date(),
    },
  });

  // Update form values when job data becomes available
  useEffect(() => {
    if (job) {
      // Ensure deadline is a proper Date object
      const deadlineDate = job.deadline ? new Date(job.deadline) : new Date();

      // Update form values
      form.reset({
        title: job.title,
        description: job.description || "",
        company: job.company || "",
        salary: job.salary,
        jobType: job.jobType,
        experience: job.experience || undefined,
        city: job.city || "",
        country: job.country || "",
        status: job.status,
        requiredSkills: job.requiredSkills || [],
        deadline: deadlineDate,
      });

      // Update state values
      setSelectedJobType(job.jobType);
      setSelectedExperience(job.experience || "");
      setSelectedStatus(job.status);
      setSelectedDeadline(deadlineDate);
    }
  }, [job, form]);

  function onSubmit(values: FormValues) {
    // Here you would typically send the updated job data to your API
    const finalValues = {
      ...values,
      jobType: selectedJobType,
      experience: selectedExperience,
      status: selectedStatus,
      deadline: selectedDeadline, // Use the state value instead of form value
    };
    jobUpdated({ data: finalValues, id: paramId });
    router.push("/dashboard/jobs");
  }

  // Function to add a skill to the requiredSkills array
  const addSkill = () => {
    if (skillInput.trim() === "") return;

    const currentSkills = form.getValues("requiredSkills");
    if (!currentSkills.includes(skillInput.trim())) {
      form.setValue("requiredSkills", [...currentSkills, skillInput.trim()]);
    }
    setSkillInput("");
  };

  // Function to remove a skill from the requiredSkills array
  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("requiredSkills");
    form.setValue(
      "requiredSkills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  // Show loading state while job data is being fetched
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Loading Job Data...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-pulse">Loading job information...</div>
        </CardContent>
      </Card>
    );
  }

  // Show error state if job data couldn't be fetched
  if (error || !job) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Error Loading Job Data</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="text-red-500">
            Could not load job data. Please try again later or check the job ID.
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Update Job Posting</CardTitle>
        <CardDescription>
          Make changes to your job posting and save when you're done.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Tech Solutions Inc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job role, responsibilities, and requirements..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Salary */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Type - Using useState */}
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select
                  value={selectedJobType}
                  onValueChange={(value) => setSelectedJobType(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(JOB_TYPES).map(([i, value]) => (
                      <SelectItem key={i} value={value}>
                        {value.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>
                  {form.formState.errors.jobType?.message}
                </FormMessage>
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience Level - Using useState */}
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select
                  value={selectedExperience}
                  onValueChange={(value) => setSelectedExperience(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(EXPERIENCE_LEVELS).map(([i, value]) => (
                      <SelectItem key={i} value={value}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>
                  {form.formState.errors.experience?.message}
                </FormMessage>
              </FormItem>

              {/* Status - Using useState */}
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(STATUS_TYPES).map(([i, value]) => (
                      <SelectItem key={i} value={value}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>
                  {form.formState.errors.status?.message}
                </FormMessage>
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. San Francisco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Required Skills */}
            <FormField
              control={form.control}
              name="requiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Skills</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-sm py-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      Add
                    </Button>
                  </div>
                  <FormDescription>
                    Press Enter or click Add to add a skill
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deadline - Using FormField to utilize the form controller properly */}
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Application Deadline</FormLabel>
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
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date);
                            setSelectedDeadline(date);
                          }
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              disabled={isUpdating}
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            {isUpdating ? (
              <Button disabled type="button">
                Updating...
              </Button>
            ) : (
              <Button type="submit">Update Job</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
