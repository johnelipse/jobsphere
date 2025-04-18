"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Upload, X, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import FileUpload from "../front-end/form-iniputs/file-upload";
import { updateProfile } from "@/actions/users";
import { toast } from "@mosespace/toast";

// Define the form schema with Zod
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  headline: z.string().optional(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  resume: z.string().optional(),
  linkedin: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileUpdatePage({
  initialData,
}: {
  initialData: User | null;
}) {
  const router = useRouter();

  if (initialData?.role === "ADMIN" || initialData?.role === "EMPLOYER") {
    router.push("/dashboard/settings");
  }

  const [isLoading, setIsLoading] = useState(true);
  const [newSkill, setNewSkill] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<string>("");

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      headline: "",
      summary: "",
      skills: [],
      city: "",
      state: "",
      country: "",
      resume: "",
      linkedin: "",
      github: "",
      website: "",
      image: "",
    },
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Set form values
        form.reset({
          name: initialData?.name,
          email: initialData?.email,
          headline: initialData?.headline || "",
          summary: initialData?.summary || "",
          skills: initialData?.skills || [],
          city: initialData?.city || "",
          state: initialData?.state || "",
          country: initialData?.country || "",
          linkedin: initialData?.linkedin || "",
          github: initialData?.github || "",
          website: initialData?.website || "",
          image: initialData?.image || "",
          resume: initialData?.resume || "",
        });

        setImagePreview(initialData?.image || null);
        setFile(initialData?.resume || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  // Update form value when file changes
  useEffect(() => {
    // Update the form's resume field when file state changes
    form.setValue("resume", file);
  }, [file, form]);

  // Handle form submission
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setIsLoading(true);

      // Ensure the resume URL is included in the values
      const updatedValues = {
        ...values,
        resume: file,
        image: imagePreview,
      };

      await updateProfile(updatedValues);
      toast.success("success", "Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("error", "Failed to update your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;

    const currentSkills = form.getValues("skills") || [];
    if (!currentSkills.includes(newSkill)) {
      form.setValue("skills", [...currentSkills, newSkill]);
      setNewSkill("");
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills") || [];
    form.setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
          // In a real app, you would upload the image to a server
          // and then set the returned URL as the image value
          // form.setValue("image", returnedImageUrl)
        }
      };

      reader.readAsDataURL(file);
    }
  };

  if (isLoading && !form.getValues("name")) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            Update Your Profile
          </CardTitle>
          <CardDescription>
            Make changes to your profile information here. Click save when
            you're done.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              {/* Profile Image Section */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarImage
                      src={
                        imagePreview || "/placeholder.svg?height=96&width=96"
                      }
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {form.getValues("name").substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        document.getElementById("profile-image")?.click()
                      }
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                    {imagePreview &&
                      imagePreview !== "https://hrty.vercel.app/zO2iET" && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setImagePreview("https://hrty.vercel.app/zO2iET");
                            form.setValue(
                              "image",
                              "https://hrty.vercel.app/zO2iET"
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      )}
                  </div>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Professional Information
                </h3>

                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headline</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Senior Frontend Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief professional title that describes your current
                        role or expertise.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself and your professional experience"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief overview of your professional background,
                        skills, and career goals.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills */}
                <div className="space-y-2">
                  <FormLabel>Skills</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.getValues("skills")?.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <FormDescription>
                    Add skills that showcase your expertise (e.g., JavaScript,
                    React, UI Design).
                  </FormDescription>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <FormLabel>Resume</FormLabel>
                  <div className="grid gap-2">
                    <FileUpload
                      label="Upload resume"
                      file={file}
                      setFile={(url: string) => {
                        setFile(url);
                        form.setValue("resume", url);
                      }}
                      endpoint="fileUploader"
                    />
                  </div>
                  <FormDescription>
                    Upload your resume in PDF format (max 4MB).
                  </FormDescription>
                  {/* Show the current resume URL if it exists */}
                  {file && (
                    <div className="text-sm text-muted-foreground">
                      Current resume:{" "}
                      <a
                        href={file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        {file.split("/").pop()}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your state or province"
                            {...field}
                          />
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
                          <Input placeholder="Your country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Links</h3>
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
