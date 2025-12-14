"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ENUM_ROLE } from "@/lib/types/enums";

const STORAGE_KEY = "group-entity-switcher-tab";

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

  // On component mount, try to load the saved tab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem(STORAGE_KEY);
    if (savedTab) {
      setActiveTab(savedTab);
      onTabChange(savedTab); // Notify parent of the initial tab
    } else {
      onTabChange(activeTab); // Notify parent of the default tab
    }
  }, []);

  // Whenever the active tab changes, save it to localStorage and notify the parent
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(STORAGE_KEY, value);
    onTabChange(value);
  };

  return (
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
  );
}
