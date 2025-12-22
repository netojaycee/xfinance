"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Send,
  DollarSign,
  Download,
} from "lucide-react";
import ConfirmationForm from "@/components/local/shared/ConfirmationForm";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InvoiceForm from "./InvoiceForm";
import { useDeleteInvoice } from "@/lib/api/hooks/useSales";

export default function InvoicessActions({ row }: { row: any }) {
const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const deleteInvoice = useDeleteInvoice({
    onSuccess: () => {
      toast.success("Invoice deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete invoice");
    },
  });

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setTimeout(() => setOpen(true), 100);
  };

  const handleEditClick = () => {
    setDropdownOpen(false);
    setTimeout(() => setEditOpen(true), 100);
  };

  const handleConfirm = (confirmed: boolean) => {
    if (confirmed) {
      deleteInvoice.mutate(row.id);
    } else {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (deleteInvoice.isSuccess || deleteInvoice.isError) {
      setOpen(false);
    }
  }, [deleteInvoice.isSuccess, deleteInvoice.isError]);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              // View logic
              router.push(`/sales/invoices/${row.id}`);
            }}
          >
            <Eye className="size-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              // Record payment logic
              console.log("record payment", row.id);
            }}
          >
            <DollarSign className="size-4 mr-2" /> Record payment
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <Edit3 className="size-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              // Send to customer logic
              console.log("send", row.id);
            }}
          >
            <Send className="size-4 mr-2" /> Send to customer
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              // Download PDF logic
              console.log("download", row.id);
            }}
          >
            <Download className="size-4 mr-2" /> Download PDF
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            data-variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              handleDeleteClick();
            }}
          >
            <Trash2 className="size-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomModal
        title={"Confirm Deletion"}
        open={open}
        onOpenChange={setOpen}
        module={MODULES.SALES}
      >
        <ConfirmationForm
          title={`Are you sure you want to delete invoice ${row.invoiceNumber}?`}
          onResult={handleConfirm}
          loading={deleteInvoice.isPending}
        />
      </CustomModal>
      <CustomModal
        title={`Edit Invoice: ${row.name || row.invoiceNumber || row.id}`}
        open={editOpen}
        onOpenChange={setEditOpen}
        module={MODULES.SALES}
      >
        <InvoiceForm invoice={row} isEditMode onSuccess={() => setEditOpen(false)} />
      </CustomModal>
    </>
  );
}
