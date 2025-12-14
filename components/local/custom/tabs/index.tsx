"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Tab {
  title: string;
  value: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[];
  storageKey: string;
}

export function CustomTabs({ tabs, storageKey }: CustomTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    // On component mount, try to get the saved tab from localStorage
    const savedTab = localStorage.getItem(storageKey);
    if (savedTab && tabs.some((tab) => tab.value === savedTab)) {
      setActiveTab(savedTab);
    } else if (tabs.length > 0) {
      // Otherwise, default to the first tab
      setActiveTab(tabs[0].value);
    }
  }, [storageKey, tabs]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Save the new active tab to localStorage
    localStorage.setItem(storageKey, value);
  };

  // Don't render anything until the active tab has been determined from localStorage
  if (activeTab === undefined) {
    return null; // or a loading skeleton
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="w-full relative bg-white">
        <div className=" border-t-[0.3px] border-[#e2e8f0] absolute top-0 w-full"></div>
        <div className=" border-t-[0.3px] border-[#e2e8f0] absolute bottom-0 w-full"></div>
        <TabsList className={`bg-transparent shadow-none space-x-5  `}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='relative  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-bold  data-[state=active]:text-primary data-[state=active]:after:content-[""] data-[state=active]:after:block data-[state=active]:after:absolute data-[state=active]:after:left-1.25 data-[state=active]:after:right-1.25  data-[state=active]:after:-bottom-1 data-[state=active]:after:border-b-2 data-[state=active]:after:border-current underline-offset-14'
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
