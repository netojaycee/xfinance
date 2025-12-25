"use client";
import CollectionsHeader from "./CollectionsHeader";

import { useCustomers } from "@/lib/api/hooks/useSales";

export default function Collections() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <CollectionsHeader data={data} loading={isLoading} />
      
    </div>
  );
}
