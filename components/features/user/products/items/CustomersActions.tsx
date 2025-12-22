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
  FilePlus,
  FileText,
  Trash2,
} from "lucide-react";
import ConfirmationForm from "@/components/local/shared/ConfirmationForm";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import { useDeleteCustomer } from "@/lib/api/hooks/useSales";
import { toast } from "sonner";
import CustomerForm from "./ItemsForm";
import { useRouter } from "next/navigation";

export default function CustomersActions({ row }: { row: any }) {
    const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const deleteCustomer = useDeleteCustomer({
    onSuccess: () => {
      toast.success("Customer deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete customer");
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
      deleteCustomer.mutate(row.id);
    } else {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (deleteCustomer.isSuccess || deleteCustomer.isError) {
      setOpen(false);
    }
  }, [deleteCustomer.isSuccess, deleteCustomer.isError]);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              router.push(`/sales/customers/${row.id}`);
            }}
          >
            <Eye className="size-4 mr-2" /> View details
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <Edit3 className="size-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <FilePlus className="size-4 mr-2" /> Create invoice
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <FileText className="size-4 mr-2" /> View invoices
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
          title={`Are you sure you want to delete ${row.name}?`}
          onResult={handleConfirm}
          loading={deleteCustomer.isPending}
        />
      </CustomModal>
      <CustomModal
        title={`Edit Customer: ${row.name}`}
        open={editOpen}
        onOpenChange={setEditOpen}
        module={MODULES.SALES}
      >
        <CustomerForm customer={row} isEditMode onSuccess={() => setEditOpen(false)} />
      </CustomModal>
    </>
  );
}
