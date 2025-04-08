// "use client";

// import {
//   AlignVerticalJustifyEnd,
//   ArrowLeftRight,
//   BadgeEuro,
//   BarChart3,
//   DollarSign,
//   FileText,
//   Flag,
//   Home,
//   LayoutGrid,
//   Logs,
//   LucideAirVent,
//   MessageSquare,
//   PlusCircle,
//   Projector,
//   Settings,
//   Shield,
//   Users,
//   Volume2,
// } from "lucide-react";
// import * as React from "react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { siteConfig } from "@/constants/site";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { buttonVariants } from "../ui/button";
// import { Separator } from "../ui/separator";
// import { NavUser } from "./nav-user";

// export const data = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutGrid,
//     roles: ["ADMIN", "EMPLOYEE", "MANAGER"],
//   },
//   {
//     title: "Payroll",
//     href: "/dashboard/payroll",
//     icon: BadgeEuro,
//     roles: ["ADMIN", "MANAGER"],
//   },
//   {
//     title: "Attendances",
//     href: "/dashboard/attendance",
//     icon: AlignVerticalJustifyEnd,
//     roles: ["ADMIN", "EMPLOYEE", "MANAGER"],
//   },
//   // {
//   //   title: 'Integrations',
//   //   href: '/dashboard/integrations',
//   //   icon: ArrowLeftRight,
//   //   roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
//   // },
//   {
//     title: "Employees",
//     href: "/dashboard/employees",
//     icon: Users,
//     roles: ["ADMIN", "MANAGER"],
//   },
//   {
//     title: "Notices",
//     href: "/dashboard/notices",
//     icon: Volume2,
//     roles: ["ADMIN", "MANAGER"],
//   },
//   {
//     title: "Payments",
//     href: "/dashboard/payments",
//     icon: DollarSign,
//     roles: ["EMPLOYEE"],
//   },
//   {
//     title: "Projects",
//     href: "/dashboard/projects",
//     icon: Projector,
//     roles: ["EMPLOYEE"],
//   },
//   {
//     title: "Leaves",
//     href: "/dashboard/leave",
//     icon: LucideAirVent,
//     roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
//   },
//   {
//     title: "Logs",
//     href: "/dashboard/logs",
//     icon: Logs,
//     roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
//   },
//   {
//     title: "Settings",
//     href: "/dashboard/settings",
//     icon: Settings,
//     roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
//   },
// ];

// interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
//   user: any;
// }

// export function AppSidebar({ user, ...props }: AppSidebarProps) {
//   const pathname = usePathname();
//   const [activeSection, setActiveSection] = React.useState("overview");
//   return (
//     <Sidebar {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <div className="flex flex-col w-full">
//                 <a href="#" className="flex w-full gap-2">
//                   <img
//                     className="w-8 h-8"
//                     src={siteConfig.logo}
//                     alt={siteConfig.description}
//                   />
//                   <span className="flex flex-col gap-0.5 leading-none">
//                     <span className="font-semibold">{siteConfig.name}</span>
//                     <span className="">v1.0.0</span>
//                   </span>
//                 </a>
//                 <Separator />
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       {/* <SidebarContent>
//         <nav className={cn('flex space-y-1 lg:space-y-2 flex-col')} {...props}>
//           {data.map((item) => {
//             const segments = pathname.split('/dashboard').filter(Boolean);

//             // Skip rendering if user's role is not in item's roles
//             if (!item.roles.includes(user?.role)) {
//               return null;
//             }

//             const isActive = (href: string) => {
//               if (href === '/dashboard') {
//                 return pathname === '/dashboard';
//               }
//               if (pathname === href) return true;
//               if (!segments[0]) return false;

//               const hrefWithoutDashboard = href.replace('/dashboard', '');
//               return segments[0].startsWith(hrefWithoutDashboard);
//             };

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   buttonVariants({ variant: 'ghost' }),
//                   isActive(item.href)
//                     ? 'bg-muted rounded-none hover:bg-muted'
//                     : 'hover:bg-transparent hover:underline',
//                   'justify-start gap-2',
//                 )}
//               >
//                 <item.icon className="h-4 w-4" />
//                 {item.title}
//               </Link>
//             );
//           })}
//         </nav>
//       </SidebarContent> */}

//       <SidebarContent>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "overview"}
//               onClick={() => setActiveSection("overview")}
//             >
//               <Home className="h-4 w-4" />
//               <span>Dashboard</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "jobs"}
//               onClick={() => setActiveSection("jobs")}
//             >
//               <FileText className="h-4 w-4" />
//               <span>Job Posts</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "applications"}
//               onClick={() => setActiveSection("applications")}
//             >
//               <Users className="h-4 w-4" />
//               <span>Applications</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "messages"}
//               onClick={() => setActiveSection("messages")}
//             >
//               <MessageSquare className="h-4 w-4" />
//               <span>Messages</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "create"}
//               onClick={() => setActiveSection("create")}
//             >
//               <PlusCircle className="h-4 w-4" />
//               <span>Post a Job</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>

//         <div className="mt-6 px-3 text-xs font-semibold text-gray-500">
//           Admin Tools
//         </div>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "users"}
//               onClick={() => setActiveSection("users")}
//             >
//               <Shield className="h-4 w-4" />
//               <span>User Management</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "reports"}
//               onClick={() => setActiveSection("reports")}
//             >
//               <Flag className="h-4 w-4" />
//               <span>Reports</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "analytics"}
//               onClick={() => setActiveSection("analytics")}
//             >
//               <BarChart3 className="h-4 w-4" />
//               <span>Analytics</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               isActive={activeSection === "tools"}
//               onClick={() => setActiveSection("tools")}
//             >
//               <Settings className="h-4 w-4" />
//               <span>Quick Tools</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarContent>

//       <SidebarFooter>
//         {/* <div className="p-1">
//           <SidebarOptInForm />
//         </div> */}
//         <div className="p-1">
//           <NavUser {...user} />
//         </div>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

"use client";

import {
  AlignVerticalJustifyEnd,
  BadgeEuro,
  BarChart3,
  DollarSign,
  File,
  FilePlus2,
  Flag,
  LayoutGrid,
  LogInIcon as Logs,
  LucideAirVent,
  Projector,
  Settings,
  Shield,
  Users,
  Volume2,
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
    title: "Reports",
    href: "/dashboard/reports",
    icon: Flag,
    roles: ["ADMIN", "EMPLOYER"],
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
  // Remove the activeSection state as we'll use pathname for active state
  // const [activeSection, setActiveSection] = React.useState("overview");
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
          {data.map((item) => {
            // Skip rendering if user's role is not in item's roles
            // if (!item.roles.includes(user?.role)) {
            //   return null;
            // }

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

        {/* Only show admin tools section if user has admin or manager role */}
        {/* {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
          <>
            <div className="mt-6 px-3 text-xs font-semibold text-gray-500">Admin Tools</div>
            <SidebarMenu>
              {adminTools.map((item) => {
                // Skip rendering if user's role is not in item's roles
                if (!item.roles.includes(user?.role)) {
                  return null
                }

                const isActive = pathname === item.href || pathname.startsWith(item.href)

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
                )
              })}
            </SidebarMenu>
          </>
        )} */}
        <>
          <div className="mt-6 px-3 text-xs font-semibold text-gray-500">
            Admin Tools
          </div>
          <SidebarMenu>
            {adminTools.map((item) => {
              // Skip rendering if user's role is not in item's roles
              // if (!item.roles.includes(user?.role)) {
              //   return null;
              // }

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
