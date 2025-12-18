"use client";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { AlertError } from "../../../custom/alert/Error"; // Adjust path as needed
import Loader from "@/app/loading";
import { ENUM_ROLE } from "@/lib/types/enums";
import { useSessionStore } from "@/lib/store/session";

type userNode = {
  superadmin: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
};

type STATUS = "loading" | "completed" | "error";

const DashboardView = ({ type }: { type: userNode }) => {
  const [status, setStatus] = useState<STATUS>("loading");
  const [role, setRole] = useState<ENUM_ROLE | null>(null);
  const { user, group, entity, loading } = useSessionStore();

  useEffect(() => {
    // We should only determine the role once the session loading is complete
    if (loading) {
      setStatus("loading");
      return;
    }

    // If there's no user after loading, it's an unauthenticated state.
    if (!user) {
      setStatus("error");
      return;
    }

    let determinedRole: ENUM_ROLE = user.systemRole;

    // Logic from prompt:
    // 1. Superadmin viewing as a group becomes an admin view.
    if (user.systemRole === ENUM_ROLE.SUPERADMIN && group?.groupId) {
      determinedRole = ENUM_ROLE.ADMIN;
    }

    // 2. Any user viewing as an entity becomes a user view. This has higher precedence.
    if ((user.systemRole === ENUM_ROLE.SUPERADMIN || user.systemRole === ENUM_ROLE.ADMIN) && entity?.entityId) {
      determinedRole = ENUM_ROLE.USER;
    }

    // Final check to ensure the determined role is a valid, expected role.
    if (Object.values(ENUM_ROLE).includes(determinedRole)) {
      setRole(determinedRole);
      // setRole(ENUM_ROLE.USER);
      setStatus("completed");
    } else {
      // This case handles if the role is somehow invalid or not one of the three.
      setStatus("error");
    }
  }, [user, group, entity, loading]);

  // Select the view based on role
  const view = role && type[role as keyof userNode];

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        {status === "loading" && <Loader />}
        {status === "completed" && view && <main className="">{view}</main>}
        {status === "error" && (
          <NotLoggedIn message="You are not authorized to view this page." />
        )}
      </Suspense>
    </Fragment>
  );
};

function NotLoggedIn({ message }: { message: string }) {
  return (
    <article className="flex w-full items-center justify-center h-screen">
      <div className="w-100">
        <AlertError message={message} />
      </div>
    </article>
  );
}

export default DashboardView;
