import RouteTabNav from "@/components/local/custom/route-tab-nav";
import { PERMISSIONS } from "@/lib/utils/permissions";

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      label: "Employees",
      href: "/hr/employees",
      permission: PERMISSIONS.HR_EMPLOYEES_VIEW,
    },
    {
      label: "Attendance",
      href: "/hr/attendance",
      permission: PERMISSIONS.HR_ATTENDANCE_VIEW,
    },
    {
      label: "Payroll",
      href: "/hr/payroll",
      permission: PERMISSIONS.HR_PAYROLL_VIEW,
    },
    {
      label: "Leave Management",
      href: "/hr/leave-management",
      permission: PERMISSIONS.HR_MANAGE_LEAVE_VIEW,
    },
  ];
  return (
    <>
      <RouteTabNav tabs={tabs} />
      <main className="p-4">{children}</main>
    </>
  );
}
