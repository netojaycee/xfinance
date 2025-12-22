"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ENUM_ROLE } from "@/lib/types/enums";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

interface CustomBreadcrumbProps {
  group?: { groupName?: string };
  entity?: { entityName?: string };
  loading?: boolean;
  role: ENUM_ROLE;
}

const capitalize = (s: string) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
};

export default function CustomBreadcrumb({
  role,
  group,
  entity,
  loading,
}: CustomBreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const getRootItem = () => {
    if (loading) {
      return <Skeleton className="h-5 w-28" />;
    }
    switch (role) {
      case ENUM_ROLE.SUPERADMIN:
        return "SuperAdmin";
      case ENUM_ROLE.ADMIN:
        return group?.groupName || "Group";
      case ENUM_ROLE.USER:
        return entity?.entityName || "Entity";
      default:
        return "Dashboard";
    }
  };

  const rootItem = getRootItem();

  return (
    <div className="w-full">
      <Breadcrumb className="">
        <BreadcrumbList className="flex items-center flex-wrap">
          <BreadcrumbItem>
            {loading ? (
              rootItem
            ) : (
              <BreadcrumbLink asChild>
                <Link href="/dashboard">{rootItem}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            // Ignore 'dashboard' segment if it's part of the URL
            if (segment.toLowerCase() === "dashboard") return null;

            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-semibold text-gray-800">
                      {capitalize(segment)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{capitalize(segment)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <h1 className="text-base mt-1">
        {pathSegments.length > 1 && pathSegments[0].toLowerCase() === 'dashboard'
          ? capitalize(pathSegments[pathSegments.length - 1])
          : pathSegments.length > 0 && pathSegments[0].toLowerCase() !== 'dashboard'
          ? capitalize(pathSegments[pathSegments.length - 1])
          : "Dashboard"}
      </h1> */}
    </div>
  );
}
