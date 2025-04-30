"use client";

import { updateProfile } from "@/actions/users";
import { toast } from "@mosespace/toast";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { z } from "zod";
import CustomTextArea from "../re-usable-inputs/custom-text-area";
import CustomText from "../re-usable-inputs/text-reusable";
import type { User } from "@prisma/client";
import ImageInput from "../re-usable-inputs/single-image";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  personalEmail: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Please enter a valid LinkedIn URL." })
    .optional()
    .or(z.literal("")),
  headline: z
    .string()
    .max(100, { message: "Headline must be at most 100 characters." })
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url({ message: "Please enter a valid GitHub URL." })
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url({ message: "Please enter a valid website URL." })
    .optional()
    .or(z.literal("")),
  // skills: z.array(z.string()),
  summary: z.string().optional().or(z.literal("")),
  // image: z.string().optional().or(z.literal("")),
});

export function ProfileForm({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const initialImage = user?.image || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const methods = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      personalEmail: user?.email || "",
      linkedin: user?.linkedin || "",
      headline: user?.headline || "",
      github: user?.github || "",
      website: user?.website || "",
      // skills: (user?.skills as string[]) || [],
      summary: user?.summary || "",
      // image: user?.image || "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    control,
    formState: { errors },
  } = methods;

  const [skillInput, setSkillInput] = useState("");

  // const handleAddSkill = () => {
  //   if (skillInput.trim() === "") return;

  //   const currentSkills = methods.getValues("skills") || [];
  //   if (!currentSkills.includes(skillInput)) {
  //     methods.setValue("skills", [...currentSkills, skillInput]);
  //     setSkillInput("");
  //   }
  // };

  // // Handle removing a skill
  // const handleRemoveSkill = (skillToRemove: string) => {
  //   const currentSkills = methods.getValues("skills") || [];
  //   methods.setValue(
  //     "skills",
  //     currentSkills.filter((skill) => skill !== skillToRemove)
  //   );
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const image = imageUrl;
    setIsLoading(true);
    try {
      const formData = {
        ...values,
        image,
      };

      const result = await updateProfile(formData);

      if (result.success) {
        toast.success(
          "Profile updated",
          "Your profile has been updated successfully."
        );
      } else {
        throw new Error(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-8">
        <div className="max-w-md mx-auto">
          <ImageInput
            title="Profile Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="profileUploader"
          />
        </div>

        {/* Wrap the form with FormProvider */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
            <div className="grid items-center gap-4 w-full sm:grid-cols-2">
              <CustomText
                label="Full Name(s)"
                register={register}
                name="name"
                errors={errors}
                type="text"
                placeholder="John Doe"
                disabled={isLoading}
                className="w-full"
              />
              <CustomText
                label="Personal Email"
                register={register}
                name="email"
                errors={errors}
                type="text"
                placeholder="john.doe@example.com"
                disabled={isLoading}
                className="w-full"
              />
              <CustomText
                label="LinkedIn Profile"
                register={register}
                name="linkedin"
                errors={errors}
                type="text"
                placeholder="LinkedIn profile"
                disabled={isLoading}
                className="w-full"
              />
              <CustomText
                label="Headline"
                register={register}
                name="headline"
                errors={errors}
                type="text"
                placeholder="Something about you"
                disabled={isLoading}
                className="w-full"
              />
              <CustomText
                label="GitHub Profile"
                isRequired={false}
                register={register}
                name="github"
                errors={errors}
                type="text"
                placeholder="GitHub Profile"
                disabled={isLoading}
                className="w-full"
              />
              <CustomText
                label="Your Website Link"
                register={register}
                name="website"
                errors={errors}
                type="text"
                placeholder="Your Website Link"
                disabled={isLoading}
                className="w-full"
              />
            </div>
            {/* Required Skills */}
            {/* <div className="space-y-2">
              <FormLabel>Skills</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {methods.getValues("skills")?.map((skill) => (
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
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <FormDescription>
                Add skills that showcase your expertise (e.g., JavaScript,
                React, UI Design).
              </FormDescription>
            </div> */}

            <CustomTextArea
              label="Notes"
              register={register}
              name="summary"
              errors={errors}
              height={8}
              isRequired={false}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
