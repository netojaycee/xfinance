"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { NavMain } from "./nav-main";
import { GroupSwitcher } from "./group-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarMenu } from "@/lib/utils/menu-utils";
import { ENUM_ROLE } from "@/lib/types/enums";
import { UserPayload } from "@/lib/types";
import Logo from "../../Logo";
import GroupEntitySwitcher from "./group-entity-switcher";
import { EntitySwitcher } from "./entity-switcher";
import { toast } from "sonner";
import { useStopEntityImpersonation } from "@/lib/api/hooks/useAuth";
import { useSessionStore } from "@/lib/store/session";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: ENUM_ROLE;
  user: UserPayload | null;
}

export function AppSidebar({ role, user, ...props }: AppSidebarProps) {
  const router = useRouter();
  const whoami = useSessionStore((state) => state.whoami);
  const currentEntity = useSessionStore((state) => state.entity);
  const clearImpersonatedEntity = useSessionStore(
    (state) => state.clearImpersonatedEntity,
  );
  const availableEntities = useSessionStore((state) => state.getAvailableEntities());
  const hasEntityOptions = availableEntities.length > 0;
  const [selectedTab, setSelectedTab] = React.useState<"group" | "entity">(
    currentEntity?.entityId ? "entity" : "group",
  );
  const menuData = React.useMemo(
    () => getSidebarMenu(user, role, whoami),
    [user, role, whoami],
  );

  React.useEffect(() => {
    setSelectedTab(currentEntity?.entityId ? "entity" : "group");
  }, [currentEntity?.entityId]);

  const { mutate: stopEntityImpersonation, isPending: isStoppingEntityImpersonation } = useStopEntityImpersonation({
    onSuccess: () => {
      clearImpersonatedEntity();
      setSelectedTab("group");
      router.replace("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      setSelectedTab("entity");
      toast.error(error.message || "Failed to switch view.");
    },
  });

  const handleTabSwitch = (tab: string) => {
    if (tab === "entity") {
      setSelectedTab("entity");
      return;
    }

    if (currentEntity?.entityId) {
      setSelectedTab("group");
      stopEntityImpersonation();
      return;
    }

    setSelectedTab("group");
  };

  const showGroupEntitySwitcher =
    Boolean(user) && user?.systemRole !== ENUM_ROLE.USER && role !== ENUM_ROLE.SUPERADMIN;

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="w-full flex items-center justify-center px-2 py-1 bg-white">
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
      <SidebarHeader className="bg-white">
        {user && user.systemRole === ENUM_ROLE.SUPERADMIN && <GroupSwitcher />}
        {showGroupEntitySwitcher && (
          <GroupEntitySwitcher
            activeTab={selectedTab}
            showEntityTab={hasEntityOptions}
            disabled={isStoppingEntityImpersonation}
            onTabChange={handleTabSwitch}
          />
        )}
        {showGroupEntitySwitcher && selectedTab === "entity" && hasEntityOptions && (
          <EntitySwitcher
            entities={availableEntities}
            isLoading={false}
            autoSelectFirst={!currentEntity?.entityId}
          />
        )}
      </SidebarHeader>
      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-primary bg-white">
        <NavMain items={menuData} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
