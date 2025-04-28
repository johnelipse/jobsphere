"use client";
import Link from "next/link";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
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
import { User } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

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
        {user ? (
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 relative">
              <Bell className="h-5 w-5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  className="bg-transparent text-gray-500 shadow-none hover:bg-transparent"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.image as string}
                      alt={user?.name ?? ""}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
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
                        src={user?.image as string}
                        alt={user?.name ?? ""}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
                  <DropdownMenuItem>
                    <Sparkles />
                    <Link href="/update">Profile Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button asChild>
            <Link href="/role">SignUp</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
