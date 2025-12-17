"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Can } from "@/components/local/shared/Can";


export interface RouteTabNav {
  label: string;
  href: string;
  permission: string;
}

interface RouteTabNavProps {
  tabs: RouteTabNav[];
  className?: string;
}

export default function RouteTabNav({ tabs, className }: RouteTabNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex gap-2 border-b border-t border-gray-400 px-4 bg-white", className)}>
      {tabs.map((tab) => (
        <Can key={tab.href} do={tab.permission}>
          <Link
            href={tab.href}
            prefetch
            className={cn(
              "px-4 py-2 text-sm font-normal",
              pathname === tab.href && "border-b-2 border-primary text-primary"
            )}
          >
            {tab.label}
          </Link>
        </Can>
      ))}
    </div>
  );
}