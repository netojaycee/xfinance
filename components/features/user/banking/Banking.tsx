"use client";
import React from "react";
import BankingHeader from "./BankingHeader";
import BankAccountsCard from "./BankAccountsCard";
import { BankingTabs } from "./BankingTabs";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { CustomModal } from "@/components/local/custom/modal";
import BankForm from "./BankForm";
import { MODULES } from "@/lib/types/enums";

export default function Banking() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { isOpen, closeModal } = useModal();

  return (
    <div className="flex flex-col gap-4 p-4">
      <BankingHeader data={data} loading={loading} />
      <BankAccountsCard />
      <BankingTabs />

      {/* Connect Bank Modal */}
      <CustomModal
        open={isOpen(MODAL.BANK_CONNECT)}
        onOpenChange={(open) => {
          if (!open) closeModal(MODAL.BANK_CONNECT);
        }}
        title="Add Bank Account Manually"
        description="Enter your bank account details below"
        module={MODULES.BANKING}
      >
        <BankForm />
      </CustomModal>
    </div>
  );
}

