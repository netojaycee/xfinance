import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import UsersStatCardSmall from "./UsersStatCardSmall";
import { userStats } from "./utils/data";

export default function UsersHeader() {
  const { openModal } = useModal();

  const handleInviteUser = () => {
    openModal(MODAL.ADMIN_USER_CREATE);
  };

  return (
    <div className="space-y-4">
      {/* Header section */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-sm text-gray-600">
            Manage user access and permissions
          </p>
        </div>
        <Button
          onClick={handleInviteUser}
          className="bg-primary hover:bg-primary/80"
        >
          Invite User
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UsersStatCardSmall
          title="Total Users"
          value={userStats.total}
          subtitle="Across all roles"
        />
        <UsersStatCardSmall
          title="Active Users"
          value={userStats.active}
          subtitle={`${userStats.active} users active`}
        />
        <UsersStatCardSmall
          title="Roles"
          value={userStats.roles}
          subtitle={`${userStats.roles} unique roles`}
        />
        <UsersStatCardSmall
          title="Pending"
          value={userStats.pending}
          subtitle={`${userStats.pending} pending invites`}
        />
      </div>
    </div>
  );
}
