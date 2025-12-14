import { userMenu } from '../data/sidebarData';

type PermissionMap = Map<string, string | string[]>;

/**
 * Creates a map of URL path segments to their required permissions.
 * Example: 'sales' => ['sales:customers:view', 'sales:invoices:view', ...]
 */
function createRoutePermissionMap(): PermissionMap {
  const map: PermissionMap = new Map();

  userMenu.forEach((item) => {
    if (item.url) {
      // Extract the first segment of the URL, e.g., 'sales' from '/sales'
      const pathSegment = item.url.split('/')[1];

      if (pathSegment) {
        const permissions =
          item.requiredPermission || item.requiredPermissions || [];
        map.set(pathSegment, permissions);
      }
    }
  });

  return map;
}

export const routePermissions: PermissionMap = createRoutePermissionMap();
