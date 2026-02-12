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
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import ConfirmationForm from "@/components/local/shared/ConfirmationForm";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import { useDeletePaymentReceived } from "@/lib/api/hooks/useSales";
import { toast } from "sonner";
import PaymentReceivedForm from "./PaymentReceivedForm";
import { useRouter } from "next/navigation";
import { PaymentReceived } from "./utils/types";

export default function PaymentReceivedActions({
  row,
}: {
  row: PaymentReceived;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const deletePayment = useDeletePaymentReceived({
    onSuccess: () => {
      toast.success("Payment deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete payment");
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
      deletePayment.mutate(row.id);
    } else {
      setOpen(false);
    }
  };

  const handlePrint = () => {
    setDropdownOpen(false);
    toast.info("Print functionality coming soon");
  };

  React.useEffect(() => {
    if (deletePayment.isSuccess || deletePayment.isError) {
      setOpen(false);
    }
  }, [deletePayment.isSuccess, deletePayment.isError]);

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
              toast.info("View details coming soon");
            }}
          >
            <Eye className="size-4 mr-2" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <Edit3 className="size-4 mr-2" /> Edit Payment
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handlePrint();
            }}
          >
            <Download className="size-4 mr-2" /> Print Receipt
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {row.invoice && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                router.push(`/sales/invoices/${row.invoiceId}`);
              }}
            >
              <FileText className="size-4 mr-2" /> View Invoice
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            data-variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              handleDeleteClick();
            }}
          >
            <Trash2 className="size-4 mr-2" /> Delete Payment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomModal
        title="Confirm Deletion"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.SALES}
      >
        <ConfirmationForm
          title={`Are you sure you want to delete this payment (${row.reference})?`}
          onResult={handleConfirm}
          loading={deletePayment.isPending}
        />
      </CustomModal>

      <CustomModal
        title={`Edit Payment: ${row.reference}`}
        open={editOpen}
        onOpenChange={setEditOpen}
        module={MODULES.SALES}
      >
        <PaymentReceivedForm
          payment={{
            ...row,
            paidAt: typeof row.paidAt === 'string' ? new Date(row.paidAt) : row.paidAt,
          }}
          isEditMode
          onSuccess={() => setEditOpen(false)}
        />
      </CustomModal>
    </>
  );
}
