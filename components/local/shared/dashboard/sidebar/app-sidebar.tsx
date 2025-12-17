"use client";

import * as React from "react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { GroupSwitcher } from "./group-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarMenu } from "@/lib/utils/menu-utils";
import { Separator } from "@/components/ui/separator";
import { ENUM_ROLE } from "@/lib/types/enums";
import { UserPayload } from "@/lib/types";
import Logo from "../../Logo";
import GroupEntitySwitcher from "./group-entity-switcher";
import { EntitySwitcher } from "./entity-switcher";
import { useEntities } from "@/lib/api/queries/entityQueries";
import { useStopEntityImpersonation } from "@/lib/api/mutations/authMutations";
import { toast } from "sonner";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: ENUM_ROLE;
  user: UserPayload | null;
}

export function AppSidebar({ role, user, ...props }: AppSidebarProps) {
  const [selectedTab, setSelectedTab] = React.useState<string | null>(null);
  const menuData = React.useMemo(
    () => getSidebarMenu(user, role),
    [user, role]
  );

  // console.log(menuData)

  const { data: entities, isLoading: isLoadingEntities } = useEntities();

  const { mutate: stopEntityImpersonation } = useStopEntityImpersonation({
    onSuccess: () => {
      // toast.info("Switched back to group view.");
      window.location.href = '/dashboard'; 
    },
    onError: (error) => {
      toast.error(error.message || "Failed to switch view.");
    },
  });

  const handleTabSwitch = (tab: string) => {
    if (selectedTab && tab !== selectedTab && tab === "group") {
      stopEntityImpersonation();
    }
    setSelectedTab(tab);
    // console.log("Selected tab in parent:", tab);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="w-full flex items-center justify-center px-2 py-1">
        {" "}
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-transparent hover:bg-transparent hover:text-white "
        >
          <div>
            <Logo />{" "}
          </div>
        </SidebarMenuButton>
      </div>
      {/* <Separator className="" /> */}
      <SidebarHeader>
        {user && user.systemRole === ENUM_ROLE.SUPERADMIN && <GroupSwitcher />}
        {user &&
          user.systemRole !== ENUM_ROLE.USER &&
          role !== ENUM_ROLE.SUPERADMIN && (
            <GroupEntitySwitcher role={role} onTabChange={handleTabSwitch} />
          )}
        {role !== ENUM_ROLE.SUPERADMIN && selectedTab === "entity" && (
          <EntitySwitcher
            entities={entities || []}
            isLoading={isLoadingEntities}
          />
        )}
      </SidebarHeader>
      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-primary">
        <NavMain items={menuData} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
