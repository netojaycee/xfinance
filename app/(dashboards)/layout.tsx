import React from "react";
import { redirect } from "next/navigation";
import SessionProvider from "@/components/providers/SessionProvider";
import DashboardView from "../../components/local/shared/dashboard/view/DashboardView";
import { WhoamiResponse } from "@/lib/types";
import { getWhoamiServer } from "@/lib/server/auth";

/**
 * Server-side dashboard layout
 * Fetches whoami once and passes to SessionProvider as initialData
 */
async function getDashboardWhoami(): Promise<WhoamiResponse | null> {
  try {
    const whoami = await getWhoamiServer();
    if (!whoami) {
      redirect("/auth/login");
    }
    return whoami;
  } catch (error) {
    console.error("Error loading dashboard:", error);
    redirect("/auth/login");
  }
}

export default async function DashboardLayout(props: {
  superadmin: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  // Fetch whoami data server-side (cached by Next.js)
  const whoami = await getDashboardWhoami();

  if (!whoami) {
    redirect("/auth/login");
  }

  const type = {
    admin: props.admin,
    superadmin: props.superadmin,
    user: props.user,
  };

  return (
    <SessionProvider initialWhoami={whoami}>
      <DashboardView type={type} />
    </SessionProvider>
  );
}
