"use client";
import {
  Bell,
  ChevronDown,
  Circle,
  CreditCard,
  Pencil,
  Search as SearchIcon,
  Store,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Logout from "./Logout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ENUM_ROLE } from "@/lib/types/enums";
import CustomBreadcrumb from "./CustomBreadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header({
  user,
  group,
  entity,
  loading,
  role
}: {
  user?: any;
  group?: any;
  entity?: any;
  loading?: boolean;
  role: ENUM_ROLE;
}) {
  return (
    <header
    className="h-16 flex items-center justify-between bg-white border-b gap-2 shadow-none sticky px-2 top-0 z-10"
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <CustomBreadcrumb
          role={role}
          group={group}
          entity={entity}
          loading={loading}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-end gap-4">
        {/* <Button
          variant="outline"
          className="hidden items-center gap-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 sm:flex"
        >
          <Circle className="size-3 fill-green-500 text-green-500" />
          <span className="font-semibold">Demo Mode</span>
        </Button> */}
        <Button className="hidden items-center gap-2 bg-green-600 font-semibold text-white hover:bg-green-700 sm:flex">
          <Store className="size-4" />
          Quick Sale
        </Button>

        <div className="relative w-full max-w-xs">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="rounded-full bg-gray-100 pl-10"
          />
        </div>

        <div className="relative">
          <Bell className="size-4 text-muted-foreground" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-3">
              <Avatar className="size-6 rounded-full">
                {user && (
                  <AvatarImage
                    src={
                      user?.image?.url
                        ? user.image.url
                        : `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(
                            `${user?.firstName} ${user?.lastName}` || "user"
                          )}`
                    }
                    alt={`${user?.firstName} ${user?.lastName}`}
                  />
                )}
              </Avatar>
              <div className="hidden md:flex md:flex-col md:items-start">
                <span className="font-lato text-sm font-semibold">
                  {user?.firstName || "Anonymous"}
                </span>
              </div>
              <ChevronDown className="ml-auto hidden size-4 text-muted-foreground md:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => (window.location.href = "/payment")}
              >
                <CreditCard className="mr-2 size-4" />
                <span>Subscription</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
