import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAppSession } from './lib/utils/cookies';
import { routePermissions } from './lib/utils/permission-map';
import { ENUM_ROLE } from './lib/types/enums';

// Define which paths should be protected by this middleware
const protectedPaths = [
  '/dashboard',
  '/sales',
  '/purchases',
  '/products',
  '/quick-sale',
  '/online-store',
  '/banking',
  '/hr',
  '/accounts',
  '/reports',
  '/settings',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is one of the protected routes
//   const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
const isProtected = protectedPaths.some((path) => pathname === path);
  if (isProtected) {
    // Get user session data from the cookies
    const { user } = await getAppSession();

    // 1. If no user is found, redirect to the login page with a redirect query
    if (!user) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Superadmins and Admins have unrestricted access to all user-level pages
    if (
      user.systemRole === ENUM_ROLE.SUPERADMIN ||
      user.systemRole === ENUM_ROLE.ADMIN
    ) {
      return NextResponse.next();
    }

    // 3. For regular users, check their permissions for the entire section
    if (user.systemRole === ENUM_ROLE.USER) {
      const pathSegment = pathname.split('/')[1]; // e.g., 'sales'
      const required = routePermissions.get(pathSegment);

      // If the route is in our permission map, we need to validate access
      if (required) {
        const userPermissions = user.permissions || [];
        let hasPermission = false;

        // Check for a single required permission (e.g., for 'dashboard')
        if (typeof required === 'string') {
          hasPermission = userPermissions.includes(required);
        }
        // Check if user has at least one of the required permissions for the section
        else if (Array.isArray(required)) {
          hasPermission = required.some((p) => userPermissions.includes(p));
        }

        // If the user has NO permissions for this entire section, redirect them.
        if (!hasPermission) {
          const dashboardUrl = new URL('/dashboard', request.url);
          return NextResponse.redirect(dashboardUrl);
        }
      }
    }
  }

  // If the path is not protected or the user has access, continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};
