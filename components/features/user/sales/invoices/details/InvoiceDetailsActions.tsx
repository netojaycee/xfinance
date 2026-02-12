"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  CheckCircle,
  Copy,
  Trash2,
  Currency,
  X,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ConfirmationForm from "@/components/local/shared/ConfirmationForm";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import InvoiceForm from "../InvoiceForm";
import PaymentReceivedForm from "../../payment-received/PaymentReceivedForm";

interface InvoiceDetailsActionsProps {
  invoice: any;
}

export default function InvoiceDetailsActions({
  invoice,
}: InvoiceDetailsActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [voidOpen, setVoidOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);

  const handleRecordPayment = () => {
    setDropdownOpen(false);
    setTimeout(() => setRecordOpen(true), 100);
  };

  const handleMarkAsPaid = () => {
    setDropdownOpen(false);
    toast.success("Invoice marked as paid");
  };

  const handleDuplicate = () => {
    setDropdownOpen(false);
    toast.success("Invoice duplicated successfully");
  };

  const handleVoidInvoice = () => {
    setDropdownOpen(false);
    setTimeout(() => setVoidOpen(true), 100);
  };

  const handleEditClick = () => {
    setDropdownOpen(false);
    setTimeout(() => setEditOpen(true), 100);
  };

  const handleConfirmVoid = (confirmed: boolean) => {
    if (confirmed) {
      toast.success("Invoice voided successfully");
      setVoidOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleRecordPayment();
            }}
          >
            <Currency className="size-4 mr-2" /> Record Payment
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleMarkAsPaid();
            }}
          >
            <CheckCircle className="size-4 mr-2" /> Mark as Paid
          </DropdownMenuItem>
          <DropdownMenuItem
            data-variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              handleVoidInvoice();
            }}
          >
            <X className="size-4 mr-2" /> Void Invoice
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleDuplicate();
            }}
          >
            <Copy className="size-4 mr-2" /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <Edit3 className="size-4 mr-2" /> Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Void Invoice Modal */}
      <CustomModal
        title="Void Invoice"
        open={voidOpen}
        onOpenChange={setVoidOpen}
        module={MODULES.SALES}
      >
        <ConfirmationForm
          title={`Are you sure you want to void invoice ${invoice.invoiceNumber}?`}
          onResult={handleConfirmVoid}
          loading={false}
        />
      </CustomModal>

      {/* Edit Invoice Modal */}
      <CustomModal
        title={`Edit Invoice: ${invoice.invoiceNumber}`}
        open={editOpen}
        onOpenChange={setEditOpen}
        module={MODULES.SALES}
      >
        <InvoiceForm
          invoice={invoice}
          isEditMode
          onSuccess={() => setEditOpen(false)}
        />
      </CustomModal>

      <CustomModal
        title={`Record a Payment`}
        description={`Record a payment received for invoice ${invoice?.invoiceNumber} `}
        open={recordOpen}
        onOpenChange={setRecordOpen}
        module={MODULES.SALES}
      >
        <PaymentReceivedForm invoiceId={invoice?.id} onSuccess={() => setRecordOpen(false)} />
      </CustomModal>
    </>
  );
}
