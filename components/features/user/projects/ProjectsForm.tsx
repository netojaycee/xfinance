"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
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
import { ArrowRight, Loader2 } from "lucide-react";
import { projectFormSchema, ProjectFormInputs } from "./utils/schema";
import { projectStatuses } from "./utils/data";

interface ProjectsFormProps {
  project?: Partial<ProjectFormInputs> & { id?: string };
  isEditMode?: boolean;
}

/**
 * Form component for creating/editing projects
 * Handles project details, timeline, budget, and team assignment
 * Integrates with modal provider for state management
 */
export default function ProjectsForm({
  project,
  isEditMode = false,
}: ProjectsFormProps) {
  const { closeModal } = useModal();

  const form = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      code: project?.code || "",
      name: project?.name || "",
      description: project?.description || "",
      customerId: project?.customerId || "",
      status: (project?.status as any) || "Planning",
      startDate: project?.startDate || "",
      endDate: project?.endDate || "",
      budgetRevenue: project?.budgetRevenue || 0,
      budgetCost: project?.budgetCost || 0,
      manager: project?.manager || "",
      isActive: project?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        code: project.code || "",
        name: project.name || "",
        description: project.description || "",
        customerId: project.customerId || "",
        status: (project.status as any) || "Planning",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        budgetRevenue: project.budgetRevenue || 0,
        budgetCost: project.budgetCost || 0,
        manager: project.manager || "",
        isActive: project.isActive ?? true,
      });
    }
  }, [project]);

  const onSubmit = async (values: ProjectFormInputs) => {
    try {
      // TODO: Replace with actual API call
      console.log("Submitted:", values);
      closeModal(isEditMode ? MODAL.PROJECT_EDIT + "-" + project?.id : MODAL.PROJECT_CREATE);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Mock data - replace with API calls later
  const customers = [
    { id: "cust-1", name: "TechCorp Solutions" },
    { id: "cust-2", name: "RetailHub Ltd" },
    { id: "cust-3", name: "FinanceApp Inc" },
    { id: "cust-4", name: "DataSystems Corp" },
    { id: "cust-5", name: "Analytics Pro Ltd" },
    { id: "cust-6", name: "SecureNet Solutions" },
  ];

  const managers = [
    { id: "mgr-1", name: "John Smith" },
    { id: "mgr-2", name: "Sarah Johnson" },
    { id: "mgr-3", name: "Michael Chen" },
    { id: "mgr-4", name: "Emma Wilson" },
    { id: "mgr-5", name: "Robert Garcia" },
    { id: "mgr-6", name: "Jessica Lee" },
  ];

  return (
    <div className="w-full max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Project Details Section */}
          <div className="bg-indigo-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-3">Project Details</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., PRJ-2024-001"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Website Redesign"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Project scope and objectives"
                      {...field}
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Client & Status Section */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-3">Client & Status</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                        <SelectContent>
                          {customers.map((cust) => (
                            <SelectItem key={cust.id} value={cust.id}>
                              {cust.name}
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Timeline Section */}
          <div className="bg-green-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-3">Timeline</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="rounded-lg"
                      />
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
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Budget Section */}
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-3">Budget</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="budgetRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Revenue (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budgetCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Cost (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-purple-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-3">Team</h6>
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Manager</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {managers.map((mgr) => (
                          <SelectItem key={mgr.id} value={mgr.name}>
                            {mgr.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Settings Section */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-3">Settings</h6>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-3">
                  <FormLabel className="cursor-pointer">Mark as active</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg flex-1"
              onClick={() =>
                closeModal(
                  isEditMode
                    ? MODAL.PROJECT_EDIT + "-" + project?.id
                    : MODAL.PROJECT_CREATE
                )
              }
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-lg flex-1 gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isEditMode ? "Update Project" : "Create Project"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
