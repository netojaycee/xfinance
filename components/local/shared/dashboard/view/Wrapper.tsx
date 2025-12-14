"use client";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";
import {
  Bell,
  ChevronDown,
  CreditCard,
  
  Pencil,
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
import { ENUM_ROLE } from "@/lib/types/enums";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSessionStore } from "@/lib/store/session";
import Logout from "../../Logout";

export default function Wrapper({
  children,
  pageTitle,
  role = ENUM_ROLE.USER,
  wrapperStyle,
}: {
  wrapperStyle?: string;
  children: React.ReactNode;
  pageTitle?: string;
  role?: ENUM_ROLE;
}) {
  const { user, group, entity, loading } = useSessionStore();

  return (
    <SidebarProvider>
      <AppSidebar user={user} role={role} />
      <SidebarInset>
        <header
          className="fixed top-0 left-0 right-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 bg-white shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 group-has-data-[collapsible=icon]/sidebar-wrapper:lg:left-16
         group-has-data-[collapsible=collapsed]/sidebar-wrapper:lg:left-0 lg:left-64"
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <p className="text-sm font-semibold text-muted-foreground font-lato">
              Welcome, {user?.firstName || user?.email || "Anonymous"}!
            </p>
          </div>

          <div className="flex items-center gap-6 px-4">
            <div className="border h-5 border-yellow-300" />
            <Bell className="h-5 w-5 text-muted-foreground" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user && (
                      <AvatarImage
                        src={
                          user?.image?.url
                            ? user.image.url
                            : `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(
                                user?.firstName || "anonymous"
                              )}`
                        }
                        alt={user?.firstName || "Anonymous"}
                      />
                    )}
                  </Avatar>{" "}
                  {user ? (
                    <span className="hidden md:inline-flex font-lato font-semibold text-sm">
                      {user?.firstName || "Anonymous"}{" "}
                      {user?.lastName || "Anonymous"}
                    </span>
                  ) : (
                    <span className="hidden md:inline-flex font-lato font-semibold text-sm">
                      Anonymous
                    </span>
                  )}
                  <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => (window.location.href = "/payment")}
                  >
                    <CreditCard />
                    Subscription
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <Logout />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-16 bg-[#f5f5f5] min-h-screen ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
