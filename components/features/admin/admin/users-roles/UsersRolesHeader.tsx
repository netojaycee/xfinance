"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface UsersRolesHeaderProps {
  onInviteUser: () => void;
}

export default function UsersRolesHeader({ onInviteUser }: UsersRolesHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">Users & Roles</h3>
        <p className="text-sm text-gray-600">
          Manage user access and permissions
        </p>
      </div>
      <Button
        onClick={onInviteUser}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Invite User
      </Button>
    </div>
  );
}
