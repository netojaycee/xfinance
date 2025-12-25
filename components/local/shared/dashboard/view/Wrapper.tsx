"use client";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";

import { ENUM_ROLE } from "@/lib/types/enums";
import { useSessionStore } from "@/lib/store/session";

import Header from "../../Header";

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
        <Header role={role} user={user} group={group} entity={entity} loading={loading} />
        <div className="flex-1 min-h-screen bg-[#f8fafc]">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
