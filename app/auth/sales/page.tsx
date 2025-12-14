"use client";

import Unauthorized from "@/app/unauthorized";
import { salesTabs } from "@/components/features/user/TabsData";
import { CustomTabs } from "@/components/local/custom/tabs";
import { useSessionStore } from "@/lib/store/session";
import { getPermittedTabs } from "@/lib/utils/tab-utils";
import { useMemo } from "react";


export default function SalesPage() {
  const user = useSessionStore((state) => state.user);

  const permittedTabs = useMemo(
    () => getPermittedTabs(salesTabs, user),
    [user]
  );

  if (permittedTabs.length === 0) {
    return <Unauthorized />;
  }

  return (
    <div className="w-full">
      <CustomTabs
        tabs={permittedTabs}
        storageKey="sales-active-tab" // Unique key for this set of tabs
      />
    </div>
  );
}
