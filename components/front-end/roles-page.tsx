"use client";
import { useState } from "react";
import Link from "next/link";
import { UserIcon, BriefcaseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleCreateAccount = () => {
    if (selectedRole === "client") {
      // Redirect to signup page with EMPLOYER role
      window.location.href = "/signup?role=EMPLOYER";
    } else if (selectedRole === "freelancer") {
      // Redirect to signup page with USER role
      window.location.href = "/signup?role=USER";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
          Join as a client or freelancer
        </h1>

        <div className="grid md:grid-cols-2 gap-4 w-full mb-8">
          <label
            className={`relative border rounded-lg p-6 cursor-pointer transition-colors ${
              selectedRole === "client"
                ? "border-green-500 bg-green-50"
                : "hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="account-type"
              className="absolute right-4 top-4 h-5 w-5"
              checked={selectedRole === "client"}
              onChange={() => handleRoleChange("client")}
            />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <BriefcaseIcon className="h-5 w-5" />
              </div>
              <div className="text-xl font-medium">
                I&apos;m a client, hiring for a project
              </div>
            </div>
          </label>

          <label
            className={`relative border rounded-lg p-6 cursor-pointer transition-colors ${
              selectedRole === "freelancer"
                ? "border-green-500 bg-green-50"
                : "hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="account-type"
              className="absolute right-4 top-4 h-5 w-5"
              checked={selectedRole === "freelancer"}
              onChange={() => handleRoleChange("freelancer")}
            />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <BriefcaseIcon className="h-5 w-5" />
              </div>
              <div className="text-xl font-medium">
                I&apos;m a freelancer, looking for work
              </div>
            </div>
          </label>
        </div>

        <Button
          onClick={handleCreateAccount}
          disabled={!selectedRole}
          className={`font-medium py-3 px-6 rounded-md transition-colors w-full max-w-xs mb-6 ${
            selectedRole
              ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Create Account
        </Button>

        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 font-medium">
            Log In
          </Link>
        </div>
      </main>
    </div>
  );
}
