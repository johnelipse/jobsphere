"use client";

import { Home, Shield, User2 } from "lucide-react";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddressSettings } from "./address-settings";
import { BankingSettings } from "./banking-settings";
import { EmploymentSettings } from "./employment-settings";
import { NotificationSettings } from "./notification-settings";
import { ProfileForm } from "./profile-form";
import { SecuritySettings } from "./security-settings";
import { User } from "@prisma/client";

export default function SettingsLayout({ user }: { user: User | null }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Tabs */}
        <div className="md:hidden w-full">
          <Tabs
            defaultValue="profile"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileForm user={user} />
              <Separator className="my-6" />
              <AddressSettings />
              <Separator className="my-6" />
              <EmploymentSettings user={user} />
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <SecuritySettings />
              <Separator className="my-6" />
              <BankingSettings />
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <NotificationSettings />
              <Separator className="my-6" />
              {/* <AppearanceSettings /> */}
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Sidebar and Content */}
        <div className="hidden md:flex md:flex-col md:w-64 gap-2">
          <div className="font-medium text-sm text-muted-foreground mb-2">
            Profile
          </div>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors ${
              activeTab === "profile"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <User2 size={16} />
            <span>Personal Info</span>
          </button>
          <button
            onClick={() => setActiveTab("address")}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors ${
              activeTab === "address"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Home size={16} />
            <span>Address</span>
          </button>
          <div className="font-medium text-sm text-muted-foreground mt-6 mb-2">
            Account
          </div>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors ${
              activeTab === "security"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Shield size={16} />
            <span>Security</span>
          </button>
        </div>

        <div className="flex-1">
          <div className="hidden md:block">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <p className="text-muted-foreground">
                  Update your personal information and how others see you on the
                  platform.
                </p>
                <ProfileForm user={user} />
              </div>
            )}

            {activeTab === "address" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Address Information</h2>
                <p className="text-muted-foreground">
                  Update your address and contact information.
                </p>
                <AddressSettings user={user} />
              </div>
            )}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Security Settings</h2>
                <p className="text-muted-foreground">
                  Manage your password and account security preferences.
                </p>
                <SecuritySettings />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
