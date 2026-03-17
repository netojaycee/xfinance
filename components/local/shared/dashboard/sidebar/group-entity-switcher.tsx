"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function GroupEntitySwitcher({
  activeTab,
  showEntityTab,
  disabled,
  onTabChange,
}: {
  activeTab: "group" | "entity";
  showEntityTab: boolean;
  disabled?: boolean;
  onTabChange: (value: string) => void;
}) {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full">
          <div className="flex w-full flex-col gap-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="w-full bg-[#f1f5f9]">
                <TabsTrigger value="group" disabled={disabled}>
                  Group
                </TabsTrigger>
                {showEntityTab && (
                  <TabsTrigger value="entity" disabled={disabled}>
                    Entity
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
