import React from "react";
import DashboardView from "../../components/local/shared/dashboard/view/DashboardView";

export default function DashboardLayout(props: {
  superadmin: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const type = {
    admin: props.admin,
    superadmin: props.superadmin,
    user: props.user,
  };
  return <DashboardView type={type} />;
}
