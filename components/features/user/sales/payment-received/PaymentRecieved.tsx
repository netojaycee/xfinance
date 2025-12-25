"use client";
import { Badge } from "@/components/ui/badge";
import InvoicesHeader from "./PaymenrReceivedHeader";
import {  CustomTable } from "@/components/local/custom/custom-table";

import { paymentReceived, PaymentReceivedColumns } from "./PaymentReceivedColumns";

export default function PaymentReceived() {
  return (
    <div className="space-y-6">
      <InvoicesHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable
        searchPlaceholder="Search invoices..."
        tableTitle="Paid Invoices"
        columns={PaymentReceivedColumns}
        data={paymentReceived}
        pageSize={10}
        display={{
          statusComponent: false,
          filterComponent: true,
          searchComponent: true,
        }}
      />

     
    </div>
  );
}
