"use client";
import React from "react";
import AssetsHeader from "./AssetsHeader";
import { CustomTable } from "@/components/local/custom/custom-table";
import { assetsColumns, assetsData } from "./AssetsColumn";

export default function Assets() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4 p-4">
      <AssetsHeader data={data} loading={loading} />
      <CustomTable
        searchPlaceholder="Search assets..."
        tableTitle="Fixed Assets"
        columns={assetsColumns}
        data={assetsData}
        pageSize={10}
        loading={loading}
      />
    </div>
  );
}
