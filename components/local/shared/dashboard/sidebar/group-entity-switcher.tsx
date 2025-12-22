"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ENUM_ROLE } from "@/lib/types/enums";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// const STORAGE_KEY = "group-entity-switcher-tab";

export default function GroupEntitySwitcher({
  role,
  onTabChange,
}: {
  role: ENUM_ROLE;
  onTabChange: (value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(
    role === ENUM_ROLE.USER ? "entity" : "group"
  );

  useEffect(() => {
    onTabChange(activeTab); // Notify parent of the default tab
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full">
          <div className="flex w-full flex-col gap-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="w-full bg-[#f1f5f9]">
                <TabsTrigger value="group">Group</TabsTrigger>
                <TabsTrigger value="entity">Entity</TabsTrigger>
              </TabsList>
              {/* <TabsContent value="group">group</TabsContent>
        <TabsContent value="entity">entity</TabsContent> */}
            </Tabs>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
