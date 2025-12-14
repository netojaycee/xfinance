import { ENUM_ROLE } from "../types/enums";
import { UserPayload } from "../types";
import { adminMenu, superAdminMenu, userMenu } from "../data/sidebarData";
import { LucideIcon } from "lucide-react";

// Type for a menu item, which can also have sub-items
export type MenuItem = {
  isActive?: boolean;
  openInNewTab?: boolean;
  title: string;
  icon?: LucideIcon;
  url: string;
  requiredPermission?: string; // For single permission checks
  requiredPermissions?: string[]; // For "at least one" permission checks
};

/**
 * Filters a menu based on a user's permissions.
 * @param menu The menu array to filter.
 * @param permissions The user's permissions array.
 * @returns A new array with only the permitted menu items.
 */
function filterMenuByPermissions(
  menu: MenuItem[],
  permissions: string[]
): MenuItem[] {
  return menu.filter((item) => {
    // Case 1: Item requires a single, specific permission.
    if (item.requiredPermission) {
      return permissions.includes(item.requiredPermission);
    }
    // Case 2: Item requires at least one permission from a list.
    if (item.requiredPermissions) {
      return item.requiredPermissions.some((p) => permissions.includes(p));
    }
    // Case 3: Item has no permission requirement (should not happen in userMenu, but safe to include).
    return true;
  });
}

/**
 * Determines the correct sidebar menu based on the user's role and permissions.
 * @param user The user object from the session.
 * @param role The determined role for the current view (could be impersonated).
 * @returns The appropriate menu array for the sidebar.
 */
export function getSidebarMenu(user: UserPayload | null, role: ENUM_ROLE) {
  if (!user) {
    return [];
  }

  switch (role) {
    case ENUM_ROLE.SUPERADMIN:
      return superAdminMenu;

    case ENUM_ROLE.ADMIN:
      // Admins and Superadmins viewing as admins see the full admin menu
      return adminMenu;

    case ENUM_ROLE.USER:
      // If the user is an admin-level user (SuperAdmin or Admin) impersonating a regular user,
      // show the full user menu without permission filtering.
      if (user.systemRole !== ENUM_ROLE.USER) {
        return userMenu;
      }
      // Otherwise, if it's a regular user, filter the menu by their specific permissions.
      return filterMenuByPermissions(userMenu, user.permissions || []);

    default:
      return [];
  }
}
