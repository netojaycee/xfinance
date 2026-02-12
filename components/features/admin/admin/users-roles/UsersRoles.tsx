"use client";

import { useState } from "react";
import { CustomTable } from "@/components/local/custom/custom-table";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import UsersRolesHeader from "./UsersRolesHeader";
import { usersColumns, usersData, User } from "./UsersRolesColumn";

export default function UsersRoles() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(usersData);

  return (
    <div className="space-y-4">
      <UsersRolesHeader onInviteUser={() => setOpen(true)} />

      <CustomTable
        columns={usersColumns as any}
        data={users}
        pageSize={10}
        searchPlaceholder="Search users..."
        tableTitle="All Users"
        className="border rounded-lg"
      />

      <CustomModal
        open={open}
        onOpenChange={setOpen}
        title="Invite User"
        description="Add a new user to your group"
        module={MODULES.GROUP}
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            User invitation form will be implemented here
          </p>
        </div>
      </CustomModal>
    </div>
  );
}
