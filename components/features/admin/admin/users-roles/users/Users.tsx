"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { CustomTable } from "@/components/local/custom/custom-table";
import UsersHeader from "../UsersHeader";
import { usersColumns } from "../UsersColumn";
import { mockUsersData } from "../utils/data";
import { useUsers } from "@/lib/api/hooks/useUsers";
import { useModal } from "@/components/providers/ModalProvider";
import { CustomModal } from "@/components/local/custom/modal";
import UsersForm from "./UsersForm";
import { MODAL } from "@/lib/data/modal-data";
import { MODULES } from "@/lib/types/enums";

/**
 * Users list component
 * Displays all users with search, filtering, and pagination
 * TODO: Replace mockUsersData with actual useUsers API hook
 */
export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [isCreating, setIsCreating] = useState(false);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  // TODO: Replace with actual API hook
  const { data: userData, isLoading: isLoadingUsers } = useUsers({
    search: debouncedSearchTerm,
    page,
    limit: pageSize,
  });
console.log(userData, "users")
  const isLoading = false;
  const data = mockUsersData;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };

  // Placeholder for create user logic
  const handleCreateUser = async (formData: any) => {
    setIsCreating(true);
    // TODO: Call create user API here
    setTimeout(() => {
      setIsCreating(false);
      closeModal(MODAL.ADMIN_USER_CREATE);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <UsersHeader />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded text-sm"
          onClick={() => openModal(MODAL.ADMIN_USER_CREATE)}
        >
          Invite User
        </button>
      </div>
      <CustomTable
        searchPlaceholder="Search users by name or email..."
        tableTitle="All Users"
        columns={usersColumns}
        data={data}
        pageSize={pageSize}
        loading={isLoading}
        onSearchChange={handleSearchChange}
        display={{
          searchComponent: true,
        }}
        pagination={{
          page,
          totalPages: Math.ceil(data.length / pageSize) || 1,
          total: data.length,
          onPageChange: setPage,
        }}
      />
      <CustomModal
        title="Invite User"
        description="Invite users to your entire group"
        module={MODULES.ADMIN}
        open={isModalOpen(MODAL.ADMIN_USER_CREATE)}
        onOpenChange={(open) =>
          open ? openModal(MODAL.ADMIN_USER_CREATE) : closeModal(MODAL.ADMIN_USER_CREATE)
        }
      >
        <UsersForm
          onSubmit={handleCreateUser}
          isLoading={isCreating}
          onClose={() => closeModal(MODAL.ADMIN_USER_CREATE)}
        />
      </CustomModal>
    </div>
  );
}
