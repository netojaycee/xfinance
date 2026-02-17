"use client";

import { useState } from "react";
import { MoreVertical, Eye, Edit, Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CustomModal } from "@/components/local/custom/modal";
import ConfirmationForm from "@/components/local/shared/ConfirmationForm";
import { MODULES } from "@/lib/types/enums";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { useDeleteBill } from "@/lib/api/hooks/usePurchases";
import BillsForm from "./BillsForm";
import BillDetails from "./details/BillDetails";
import MakeBillPayment from "./MakeBillPayment";

interface BillActionsProps {
  bill: any;
}

export function BillActions({ bill }: BillActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const deleteBill = useDeleteBill();

  const deleteKey = MODAL.BILL_DELETE + "-" + bill.id;
  const editKey = MODAL.BILL_EDIT + "-" + bill.id;
  const viewKey = MODAL.BILL_VIEW + "-" + bill.id;
  const paymentKey = MODAL.BILL_PAYMENT + "-" + bill.id;

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setTimeout(() => openModal(deleteKey), 100);
  };

  const handleEditClick = () => {
    setDropdownOpen(false);
    setTimeout(() => openModal(editKey), 100);
  };

  const handleViewClick = () => {
    setDropdownOpen(false);
    setTimeout(() => openModal(viewKey), 100);
  };

  const handlePaymentClick = () => {
    setDropdownOpen(false);
    setTimeout(() => openModal(paymentKey), 100);
  };

  const handleDeleteConfirm = (confirmed: boolean) => {
    if (confirmed) {
      deleteBill.mutate(bill.id);
    }
    closeModal(deleteKey);
  };

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
              handleViewClick();
            }}
          >
            <Eye className="size-4 mr-2" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handlePaymentClick();
            }}
          >
            <DollarSign className="size-4 mr-2" /> Make Payment
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <Edit className="size-4 mr-2" /> Edit
          </DropdownMenuItem>
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

      {/* Delete Confirmation Modal */}
      <CustomModal
        title="Confirm Deletion"
        open={isOpen(deleteKey)}
        onOpenChange={(open) =>
          open ? openModal(deleteKey) : closeModal(deleteKey)
        }
        module={MODULES.PURCHASES}
      >
        <ConfirmationForm
          title={`Are you sure you want to delete this bill (${bill?.billNumber || bill.id})?`}
          onResult={handleDeleteConfirm}
          loading={deleteBill.isPending}
        />
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal
        title={`Edit Bill: ${bill?.billNumber || bill.id}`}
        open={isOpen(editKey)}
        onOpenChange={(open) =>
          open ? openModal(editKey) : closeModal(editKey)
        }
        module={MODULES.PURCHASES}
      >
        <BillsForm bill={bill} isEditMode={true} />
      </CustomModal>

      {/* View Details Modal */}
      <CustomModal
        title={`Bill Details: ${bill?.billNumber || bill.id}`}
        open={isOpen(viewKey)}
        onOpenChange={(open) =>
          open ? openModal(viewKey) : closeModal(viewKey)
        }
        module={MODULES.PURCHASES}
      >
        <BillDetails bill={bill} />
      </CustomModal>

      {/* Make Payment Modal */}
      <CustomModal
        title="Make Bill Payment"
        open={isOpen(paymentKey)}
        onOpenChange={(open) =>
          open ? openModal(paymentKey) : closeModal(paymentKey)
        }
        module={MODULES.PURCHASES}
      >
        <MakeBillPayment
          billId={bill.id}
        />
      </CustomModal>
    </>
  );
}
