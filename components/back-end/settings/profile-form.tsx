"use client";

import { updateProfile } from "@/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { toast } from "@mosespace/toast";
import { Badge, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import Select from "react-tailwindcss-select";
import { Option } from "react-tailwindcss-select/dist/components/type";
import { z } from "zod";
import CustomDatePicker from "../re-usable-inputs/custom-date-picker";
import CustomTextArea from "../re-usable-inputs/custom-text-area";
import CustomText from "../re-usable-inputs/text-reusable";
import { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  personalEmail: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.date().optional(),
  skills: z.array(z.string()),
  notes: z.string().optional(),
});

export function ProfileForm({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [bloodGroup, setBloodGroup] = useState<Option | null>(null);

  const methods = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      ...user,
      skills: (user?.skills as string[]) || [],
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
  const addSkill = () => {
    if (skillInput.trim() === "") return;

    const currentSkills = getValues("skills") || [];
    if (!currentSkills.includes(skillInput.trim())) {
      setValue("skills", [...currentSkills, skillInput.trim()]);
    }
    setSkillInput("");
  };

  // Function to remove a skill from the requiredSkills array
  const removeSkill = (skillToRemove: string) => {
    const currentSkills = getValues("skills") || [];
    setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  async function onSubmit(values: any) {
    setIsLoading(true);
    try {
      const formData = {
        ...values,
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
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="text-2xl">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="font-medium">Profile Picture</h3>
            <p className="text-sm text-muted-foreground">
              This will be displayed on your profile and in comments.
            </p>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="mr-2 h-4 w-4" />
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4"></div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" className="mt-2">
                Remove
              </Button>
            </div>
          </div>
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
              <CustomDatePicker
                label="Date Of Birth (D.O.B)"
                name="dateOfBirth"
                control={control}
                errors={errors}
                className=""
              />
            </div>
            {/* Required Skills */}
            <div>
              <Label>Required Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(watch("skills") || []).map((skill) => (
                  <Badge key={skill} className="text-sm py-1">
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
              <div>Press Enter or click Add to add a skill</div>
              <FormMessage />
            </div>

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
