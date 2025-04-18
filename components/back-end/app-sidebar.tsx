"use client";

import {
  BarChart3,
  File,
  FilePlus2,
  Flag,
  LayoutGrid,
  Settings,
  Shield,
} from "lucide-react";
import type * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/constants/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { NavUser } from "./nav-user";

// Add the data array for navigation items
export const data = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
    roles: ["ADMIN", "EMPLOYER"],
  },
  {
    title: "Job Managment",
    href: "/dashboard/jobs",
    icon: File,
    roles: ["ADMIN", "EMPLOYER"],
  },
  {
    title: "Application Managment",
    href: "/dashboard/applications",
    icon: FilePlus2,
    roles: ["ADMIN", "EMPLOYER"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["ADMIN", "EMPLOYER"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: Flag,
    roles: ["ADMIN", "EMPLOYER"],
  },
];

// Add admin tools data
export const adminTools = [
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: Shield,
    roles: ["ADMIN"],
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: File,
    roles: ["ADMIN"],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["ADMIN"],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: any;
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const filteredItems = data.filter((item) => item.roles.includes(user.role));
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex flex-col w-full">
                <a href="#" className="flex w-full gap-2">
                  <img
                    className="w-8 h-8"
                    src={siteConfig.logo || "/placeholder.svg"}
                    alt={siteConfig.description}
                  />
                  <span className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{siteConfig.name}</span>
                    <span className="">v1.0.0</span>
                  </span>
                </a>
                <Separator />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {filteredItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton isActive={isActive} asChild>
                    <div>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <>
          {user.role === "ADMIN" && (
            <>
              <div className="mt-6 px-3 text-xs font-semibold text-gray-500">
                Admin Tools
              </div>
              <SidebarMenu>
                {adminTools.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href} passHref>
                        <SidebarMenuButton isActive={isActive} asChild>
                          <div>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </>
          )}
        </>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-1">
          <NavUser {...user} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
