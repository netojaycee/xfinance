"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { leaveRequestSchema } from "./utils/schema";

// Zod schema for leave request


type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;

interface LeaveManagementFormProps {
  onSuccess?: () => void;
  leaveBalance?: {
    annual: number;
    sick: number;
    personal: number;
  };
}

export default function LeaveManagementForm({
  onSuccess,
  leaveBalance = {
    annual: 15,
    sick: 8,
    personal: 5,
  },
}: LeaveManagementFormProps) {
  const [totalDays, setTotalDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      leaveType: "Annual Leave",
      startDate: "",
      endDate: "",
      reason: "",
      contactNumber: "",
      emergencyContact: "",
    },
  });

  // Calculate total days based on start and end date
  useEffect(() => {
    const startDate = form.watch("startDate");
    const endDate = form.watch("endDate");

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(Math.max(0, days));
    }
  }, [form.watch("startDate"), form.watch("endDate")]);

  const onSubmit = async (values: LeaveRequestFormData) => {
    try {
      setIsLoading(true);
      // API call would go here
      console.log("Leave request submitted:", { ...values, totalDays });
      toast.success("Leave request submitted successfully");
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to submit leave request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Leave Information */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Leave Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Leave Type <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full rounded-lg border-gray-300">
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                        <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                        <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          className="pl-10 rounded-lg border-gray-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      End Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          className="pl-10 rounded-lg border-gray-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="text-gray-700">Total Days</FormLabel>
                <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
                  {totalDays} days
                </div>
              </FormItem>
            </div>
          </div>

          {/* Details */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Details</h3>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Reason for Leave <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide a brief reason for your leave request..."
                        className="rounded-lg border-gray-300 min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Contact Number During Leave <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="rounded-lg border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Emergency Contact <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 987-6543"
                          className="rounded-lg border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Leave Balance */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Leave Balance</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600">Annual Leave</p>
                <p className="text-lg font-bold text-gray-900">{leaveBalance.annual} days</p>
                <p className="text-xs text-gray-500">remaining</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600">Sick Leave</p>
                <p className="text-lg font-bold text-gray-900">{leaveBalance.sick} days</p>
                <p className="text-xs text-gray-500">remaining</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600">Personal Leave</p>
                <p className="text-lg font-bold text-gray-900">{leaveBalance.personal} days</p>
                <p className="text-xs text-gray-500">remaining</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-3 border-t pt-4">
            <Button variant="outline" className="rounded-lg" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
