import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { attendanceFormSchema } from "./utils/schema";
import dayjs from "dayjs";
import { STATUS_OPTIONS } from "./utils/data";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AttendanceForm({
  employees,
  onSubmit,
  onSaveDraft,
}: {
  employees: Array<{
    id: string;
    name: string;
    department: string;
  }>;
  onSubmit: (data: any) => void;
  onSaveDraft?: (data: any) => void;
}) {
  const form = useForm({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      date: dayjs().format("MM/DD/YYYY"),
      employees: employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
        department: emp.department,
        status: "Present" as
          | "Present"
          | "Absent"
          | "Late"
          | "Half Day"
          | "On Leave",
        checkIn: "",
        checkOut: "",
        notes: "",
      })),
    },
  });

  const { fields, update } = useFieldArray({
    control: form.control,
    name: "employees",
  });

  // Quick Actions
  const markAll = (status: any) => {
    const now = dayjs().format("HH:mm");
    fields.forEach((_, idx) => {
      update(idx, {
        ...fields[idx],
        status,
        checkIn: status === "Present" ? now : "",
        checkOut: "",
      });
    });
  };

  // Stats
  const stats = {
    Present: fields.filter((f) => f.status === "Present").length,
    Absent: fields.filter((f) => f.status === "Absent").length,
    Late: fields.filter((f) => f.status === "Late").length,
    NotMarked: fields.filter((f) => !STATUS_OPTIONS.includes(f.status)).length,
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Attendance Date & Quick Actions */}
        <div className="bg-purple-50 p-2 rounded-xl flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-50">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold flex items-center gap-2 text-purple-700">
                    <span>📅 Attendance Date</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="bg-white border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <span className="font-semibold text-gray-700 text-xs">Quick Actions</span>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
                onClick={() => markAll("Present")}
              >
                ✔️ Mark All Present
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
                onClick={() => markAll("Absent")}
              >
                ❌ Mark All Absent
              </Button>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-gray-700">Present</div>
            <div className="text-green-600 text-xl">{stats.Present}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-gray-700">Absent</div>
            <div className="text-red-600 text-xl">{stats.Absent}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-gray-700">Late</div>
            <div className="text-orange-600 text-xl">{stats.Late}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-gray-700">Not Marked</div>
            <div className="text-gray-400 text-xl">{stats.NotMarked}</div>
          </div>
        </div>
        {/* Employee Attendance List */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <label className="font-semibold flex items-center gap-2 text-purple-700 mb-2">
            <span>👥 Employee Attendance</span>
          </label>
          <div className="space-y-4">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="flex flex-col gap-4 bg-purple-50 rounded-lg p-4 mb-2"
              >
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3 min-w-45 ">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                      {field.name
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{field.name}</div>
                      <div className="text-xs text-gray-500">
                        {field.department || "dept"}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    {field.status === "Present" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        Present
                      </span>
                    )}
                    {field.status === "Absent" && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                        Absent
                      </span>
                    )}
                    {field.status === "Late" && (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                        Late
                      </span>
                    )}
                    {field.status === "On Leave" && (
                      <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-medium">
                        On Leave
                      </span>
                    )}
                    {field.status === "Half Day" && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        Half Day
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4">
                  <FormField
                    control={form.control}
                    name={`employees.${idx}.status`}
                    render={({ field: statusField }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={statusField.onChange}
                            defaultValue={statusField.value}
                          >
                            <SelectTrigger className="w-full bg-white border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`employees.${idx}.checkIn`}
                    render={({ field: checkInField }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Check In
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="bg-white border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={checkInField.value}
                            onChange={checkInField.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`employees.${idx}.checkOut`}
                    render={({ field: checkOutField }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Check Out
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="bg-white border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={checkOutField.value}
                            onChange={checkOutField.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`employees.${idx}.notes`}
                    render={({ field: notesField }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">Notes</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="bg-white border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Optional notes..."
                            value={notesField.value}
                            onChange={notesField.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Guidelines */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <div className="font-semibold mb-2 flex items-center gap-2 text-blue-700">
            <span>ℹ️ Attendance Guidelines</span>
          </div>
          <ul className="text-sm text-blue-700 list-disc pl-5">
            <li>Mark attendance for all employees before submitting</li>
            <li>
              Check-in and check-out times are required for Present, Late, and
              Half Day statuses
            </li>
            <li>Use "On Leave" for employees on approved leave</li>
            <li>Add notes for any special circumstances or exceptions</li>
          </ul>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="text-violet-700 border-violet-300"
            onClick={onSaveDraft}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="bg-linear-to-r from-violet-500 to-blue-500 text-white font-semibold shadow"
          >
            ✔️ Submit Attendance
          </Button>
        </div>
      </form>
    </Form>
  );
}
