import { create } from "zustand";
import {
  EntityImpersonationPayload,
  GroupImpersonationPayload,
  UserPayload,
} from "../types";
import { PermissionKey, PERMISSIONS } from "../utils/permissions";
import { ENUM_ROLE } from "../types/enums";

// Define the state and actions for your store
interface SessionState {
  user: UserPayload | null;
  group: GroupImpersonationPayload;
  entity: EntityImpersonationPayload;
  loading: boolean;
  fetchSessionData: () => Promise<void>;
  hasPermission: (permissionKey: PermissionKey) => boolean;
}

// Create the Zustand store
export const useSessionStore = create<SessionState>((set, get) => ({
  user: null,
  group: { groupName: "", groupId: "" },
  entity: { entityName: "", entityId: "" },
  loading: true,
  fetchSessionData: async () => {
    try {
      const response = await fetch("/api/v1/cookies", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const { user, group, entity } = await response.json();
        set({ user, group, entity, loading: false });
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      set({ loading: false });
      // Handle error appropriately, maybe set state to an error status
    }
  },
  hasPermission: (permissionKey: PermissionKey) => {
    const { user } = get();
    if (!user) return false;

    const perm = PERMISSIONS[permissionKey];
    const role = user.systemRole; // Or determined role from DashboardView logic

    if (role === ENUM_ROLE.SUPERADMIN) return true;
    if (role === ENUM_ROLE.ADMIN) return true;
    return (user.permissions || []).includes(perm);
  },
}));
