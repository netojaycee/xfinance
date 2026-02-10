"use client";

import AttendanceStatCardSmall from "./AttendanceStatCardSmall";
import { EmployeeStats } from "@/lib/api/hooks/types/hrTypes";

interface AttendanceHeaderProps {
  stats?: EmployeeStats;
  loading: boolean;
}

export default function AttendanceHeader({
  stats,
  loading,
}: AttendanceHeaderProps) {
  return (
    <div className="mb-6">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AttendanceStatCardSmall
          title="Present Today"
          value={<span className="text-3xl">{stats?.totalActive ?? 0}</span>}
          subtitle={`${Math.round((stats?.totalActive || 0) / (stats?.totalEmployees || 1) * 100)}% attendance`}
          loading={loading}
        />
        <AttendanceStatCardSmall
          title="On Leave"
          value={<span className="text-3xl">{stats?.totalOnLeave ?? 0}</span>}
          subtitle={`${Math.round((stats?.totalOnLeave || 0) / (stats?.totalEmployees || 1) * 100)}% of workforce`}
          loading={loading}
        />
        <AttendanceStatCardSmall
          title="Absent"
          value={<span className="text-3xl">{Math.max(0, (stats?.totalEmployees || 0) - (stats?.totalActive || 0) - (stats?.totalOnLeave || 0))}</span>}
          subtitle={`${Math.round(Math.max(0, (stats?.totalEmployees || 0) - (stats?.totalActive || 0) - (stats?.totalOnLeave || 0)) / (stats?.totalEmployees || 1) * 100)}% of workforce`}
          loading={loading}
        />
        <AttendanceStatCardSmall
          title="Avg Hours/Day"
          value={<span className="text-3xl">8</span>}
          subtitle="This month"
          loading={loading}
        />
      </div>
    </div>
  );
}
