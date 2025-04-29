// "use client";
// import Link from "next/link";
// import {
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   LogOut,
//   Sparkles,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { signOut } from "next-auth/react";
// import { Button } from "../ui/button";
// import { User } from "@prisma/client";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Session } from "next-auth";

// export function Header({
//   user,
//   session,
// }: {
//   user: User | null;
//   session: Session | null;
// }) {
//   const navLinks = [
//     {
//       name: "Home",
//       link: "/",
//     },
//     {
//       name: "Jobs",
//       link: "/jobs",
//     },
//     ...(session?.user.role !== "USER"
//       ? [
//           {
//             name: "Hire Talent",
//             link: "/talents",
//           },
//         ]
//       : []),
//   ];

//   const pathName = usePathname();

//   return (
//     <header className="bg-white border-b sticky top-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
//         <div className="flex items-center space-x-6">
//           <Link href="/" className="flex items-center">
//             <Image
//               width={324}
//               height={124}
//               src="/app-logo.png"
//               className="w-auto h-[2.7rem]"
//               alt="logo"
//             />
//           </Link>
//           <nav className="hidden md:flex items-center space-x-6">
//             {navLinks.map((nav, i) => {
//               const active = pathName === nav.link;
//               return (
//                 <Link
//                   key={i}
//                   href={nav.link}
//                   className={`text-sm font-medium text-gray-600 hover:text-gray-900 pb-4 pt-4 ${
//                     active && "border-b-[1px] border-green-900"
//                   }`}
//                 >
//                   {nav.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//         {user ? (
//           <div className="flex items-center space-x-4">
//             <button className="text-gray-600 hover:text-gray-900 relative">
//               <Bell className="h-5 w-5" />
//             </button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   size="lg"
//                   className="bg-transparent text-gray-500 shadow-none hover:bg-transparent"
//                 >
//                   <Avatar className="h-8 w-8 rounded-lg">
//                     <AvatarImage
//                       src={user?.image as string}
//                       alt={user?.name ?? ""}
//                     />
//                     <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                   </Avatar>
//                   <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-semibold">{user?.name}</span>
//                     <span className="truncate text-xs">{user?.email}</span>
//                   </div>
//                   <ChevronsUpDown className="ml-auto size-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//                 side={"bottom"}
//                 align="end"
//                 sideOffset={4}
//               >
//                 <DropdownMenuLabel className="p-0 font-normal">
//                   <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                     <Avatar className="h-8 w-8 rounded-lg">
//                       <AvatarImage
//                         src={user?.image as string}
//                         alt={user?.name ?? ""}
//                       />
//                       <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                     </Avatar>
//                     <div className="grid flex-1 text-left text-sm leading-tight">
//                       <span className="truncate font-semibold">
//                         {user?.name}
//                       </span>
//                       <span className="truncate text-xs">{user?.email}</span>
//                     </div>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   {session?.user.role === "USER" && (
//                     <DropdownMenuItem>
//                       <Sparkles />
//                       <Link href="/update">Profile Settings</Link>
//                     </DropdownMenuItem>
//                   )}
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   {session?.user.role !== "USER" && (
//                     <DropdownMenuItem>
//                       <BadgeCheck />
//                       <Link href="/dashboard">Dashboard</Link>
//                     </DropdownMenuItem>
//                   )}
//                   {/* <DropdownMenuItem>
//                     <CreditCard />
//                     Billing
//                   </DropdownMenuItem> */}
//                   {/* <DropdownMenuItem>
//                     <Bell />
//                     Notifications
//                   </DropdownMenuItem> */}
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={() => signOut({ callbackUrl: "/login" })}
//                 >
//                   <LogOut />
//                   Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         ) : (
//           <Button asChild>
//             <Link href="/role">SignUp</Link>
//           </Button>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";
import Link from "next/link";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Menu,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import type { User } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header({
  user,
  session,
}: {
  user: User | null;
  session: Session | null;
}) {
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Jobs",
      link: "/jobs",
    },
    ...(session?.user.role !== "USER"
      ? [
          {
            name: "Hire Talent",
            link: "/talents",
          },
        ]
      : []),
  ];

  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center">
            <Image
              width={324}
              height={124}
              src="/app-logo.png"
              className="w-auto h-[2.7rem]"
              alt="logo"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((nav, i) => {
              const active = pathName === nav.link;
              return (
                <Link
                  key={i}
                  href={nav.link}
                  className={`text-sm font-medium text-gray-600 hover:text-gray-900 pb-4 pt-4 ${
                    active && "border-b-[1px] border-green-900"
                  }`}
                >
                  {nav.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <SheetHeader className="border-b pb-4 mb-4">
                <SheetTitle className="flex items-center">
                  <Image
                    width={324}
                    height={124}
                    src="/app-logo.png"
                    className="w-auto h-[2.2rem]"
                    alt="logo"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 py-4">
                {navLinks.map((nav, i) => {
                  const active = pathName === nav.link;
                  return (
                    <Link
                      key={i}
                      href={nav.link}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium px-2 py-2 rounded-md ${
                        active
                          ? "bg-green-50 text-green-900"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {nav.name}
                    </Link>
                  );
                })}
                {!user && (
                  <Button asChild className="mt-4">
                    <Link href="/role" onClick={() => setIsOpen(false)}>
                      SignUp
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {user ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-transparent text-gray-500 shadow-none hover:bg-transparent"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={(user?.image as string) || "/placeholder.svg"}
                        alt={user?.name ?? ""}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={"bottom"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={(user?.image as string) || "/placeholder.svg"}
                          alt={user?.name ?? ""}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {session?.user.role === "USER" && (
                      <DropdownMenuItem>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <Link href="/update">Profile Settings</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {session?.user.role !== "USER" && (
                      <DropdownMenuItem>
                        <BadgeCheck className="mr-2 h-4 w-4" />
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button asChild>
                <Link href="/role">SignUp</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
