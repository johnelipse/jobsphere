"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Plus, X } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";
import { useJobs } from "@/hooks/useJobsHook";

// Enums based on your model
enum JobType {
  FULLTIME = "FULLTIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  REMOTE = "REMOTE",
  ONSITE = "ONSITE",
}

enum ExperienceLevel {
  entry = "entry",
  mid = "mid",
  senior = "senior",
  executive = "executive",
}

// Common skills for the skill selector
const commonSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Docker",
  "Git",
];

// Form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  salary: z.coerce.number().positive({ message: "Salary must be positive" }),
  jobType: z.nativeEnum(JobType),
  experience: z.nativeEnum(ExperienceLevel).optional(),
  requiredSkills: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" }),
  deadline: z.date({ required_error: "Deadline is required" }),
  categoryId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function JobCreationForm() {
  const { allCategories } = useCategories();
  const { createJob, success, isCreating, jobs } = useJobs();
  const [open, setOpen] = useState(false);
  //   const [success, setSuccess] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      salary: 0,
      jobType: JobType.FULLTIME,
      requiredSkills: [],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Default to 2 weeks from now
    },
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
    try {
      // In a real app, this would call a server action to create the job
      const result = createJob(values);
      setJobId(jobs[0].id);
      //   setSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  }

  const addSkill = () => {
    if (
      skillInput.trim() &&
      !form.getValues().requiredSkills.includes(skillInput.trim())
    ) {
      form.setValue("requiredSkills", [
        ...form.getValues().requiredSkills,
        skillInput.trim(),
      ]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    form.setValue(
      "requiredSkills",
      form.getValues().requiredSkills.filter((s) => s !== skill)
    );
  };

  const handleEditJob = () => {
    setOpen(false);
    // setSuccess(false);
    router.push(`/dashboard/jobs/update/${jobId}`);
  };

  const handleViewJobs = () => {
    setOpen(false);
    // setSuccess(false);
    router.push("/dashboard/jobs");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          <span className="hidden md:block">Create Job</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {success ? (
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle className="text-green-800 flex items-center gap-2">
              <Check className="h-4 w-4" />
              Job Created Successfully
            </AlertTitle>
            <AlertDescription className="text-green-700 mt-2">
              Your job has been created successfully. What would you like to do
              next?
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleEditJob}
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  Edit Job
                </Button>
                <Button
                  onClick={handleViewJobs}
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  View All Jobs
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create New Job</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new job posting.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Senior React Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the job responsibilities and requirements"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Annual salary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(JobType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(ExperienceLevel).map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requiredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skills*</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.value.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="gap-1 px-3 py-1"
                          >
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addSkill}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" type="button" size="sm">
                              Common Skills
                              <ChevronsUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search skills..." />
                              <CommandList>
                                <CommandEmpty>No skill found.</CommandEmpty>
                                <CommandGroup>
                                  {commonSkills.map((skill) => (
                                    <CommandItem
                                      key={skill}
                                      onSelect={() => {
                                        if (!field.value.includes(skill)) {
                                          form.setValue("requiredSkills", [
                                            ...field.value,
                                            skill,
                                          ]);
                                        }
                                      }}
                                    >
                                      {skill}
                                      {field.value.includes(skill) && (
                                        <Check className="ml-auto h-4 w-4" />
                                      )}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Application Deadline*</FormLabel>
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
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    disabled={isCreating}
                    type="submit"
                    className="w-full sm:w-auto"
                  >
                    {isCreating ? "Creating..." : "Create Job"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
