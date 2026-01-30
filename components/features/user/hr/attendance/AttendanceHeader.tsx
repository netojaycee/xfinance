"use client";

import AttendanceStatCardSmall from "./AttendanceStatCardSmall";

export default function AttendanceHeader({
  data,
  loading,
}: {
  data?: any;
  loading: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AttendanceStatCardSmall
          title="Present Today"
          value={<span className="text-3xl">{data?.presentToday ?? 0}</span>}
          subtitle={`${data?.presentPercent ?? 0}% attendance`}
          loading={loading}
        />
        <AttendanceStatCardSmall
          title="On Leave"
          value={<span className="text-3xl">{data?.onLeave ?? 0}</span>}
          subtitle={`${data?.onLeavePercent ?? 0}% of workforce`}
          loading={loading}
        />
        <AttendanceStatCardSmall
          title="Absent"
          value={<span className="text-3xl">{data?.absent ?? 0}</span>}
          subtitle={`${data?.absentPercent ?? 0}% of workforce`}
          loading={loading}
        />
        <AttendanceStatCardSmall
          title="Avg Hours/Day"
          value={<span className="text-3xl">{data?.avgHours ?? 0}</span>}
          subtitle="This month"
          loading={loading}
        />
      </div>
    </div>
  );
}
