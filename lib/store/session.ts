import { create } from "zustand";
import {
  EntityImpersonationPayload,
  GroupImpersonationPayload,
  UserPayload,
} from "../types";

// Define the state and actions for your store
interface SessionState {
  user: UserPayload | null;
  group: GroupImpersonationPayload;
  entity: EntityImpersonationPayload;
  loading: boolean;
  fetchSessionData: () => Promise<void>;
}

// Create the Zustand store
export const useSessionStore = create<SessionState>((set) => ({
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
}));
