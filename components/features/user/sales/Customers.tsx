import React from "react";
import CustomersHeader from "./CustomersHeader";

export default function Customers() {
  return (
    <div className="space-y-6">
      <CustomersHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-muted-foreground">Customers table will go here</div>
      </div>
    </div>
  );
}
