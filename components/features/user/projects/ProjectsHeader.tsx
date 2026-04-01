"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ProjectsStatCardSmall from "./ProjectsStatCardSmall";
import { Download, Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import ProjectsForm from "./ProjectsForm";
import { MODULES } from "@/lib/types/enums";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { ProjectsResponse } from "./utils/types";

interface ProjectsHeaderProps {
  data?: ProjectsResponse;
  loading?: boolean;
}

/**
 * Header section for Projects page
 * Displays title, stats cards, and create button
 * Manages create project modal
 */
export default function ProjectsHeader({ data, loading }: ProjectsHeaderProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const totalProjects = data?.totalProjects || 0;
  const totalActive = data?.totalActive || 0;
  const totalBudgetedRevenue = data?.totalBudgetedRevenue || 0;
  const totalBudgetedCost = data?.totalBudgetedCost || 0;
  // const totalProfit = data?.totalProfit || 0;
  const averageProfitMargin = data?.averageProfitMargin || "0%";

  return (
    <div className="mb-6">
      {/* Title and Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Projects</h2>
          <p className="text-muted-foreground">
            Track project income, expenses, and profitability
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl" disabled>
            <Download />
            Export
          </Button>
          <Button
            onClick={() => openModal(MODAL.PROJECT_CREATE)}
            className="rounded-xl"
          >
            <Plus /> New Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectsStatCardSmall
          title="Active Projects"
          value={<span className="text-2xl font-bold text-indigo-900">{totalActive}</span>}
          subtitle={`Of ${totalProjects} total`}
        />
        <ProjectsStatCardSmall
          title="Total Revenue"
          value={<span className="text-2xl font-bold text-green-600">₦{totalBudgetedRevenue.toLocaleString()}</span>}
          subtitle="Budgeted Revenue"
        />
        <ProjectsStatCardSmall
          title="Total Costs"
          value={<span className="text-2xl font-bold text-red-600">₦{totalBudgetedCost.toLocaleString()}</span>}
          subtitle="Budgeted Cost"
        />
        {/* <ProjectsStatCardSmall
          title="Total Profit"
          value={<span className="text-2xl font-bold text-indigo-900">₦{totalProfit.toLocaleString()}</span>}
          subtitle="Budgeted Profit"
        /> */}
        <ProjectsStatCardSmall
          title="Avg Profit Margin"
          value={<span className="text-2xl font-bold text-indigo-900">{averageProfitMargin}</span>}
          subtitle="Across all projects"
        />
      </div>

      {/* Create Project Modal */}
      <CustomModal
        title="Add New Project"
        module={MODULES.PROJECTS}
        open={isOpen(MODAL.PROJECT_CREATE)}
        onOpenChange={(open) =>
          open ? openModal(MODAL.PROJECT_CREATE) : closeModal(MODAL.PROJECT_CREATE)
        }
      >
        <ProjectsForm />
      </CustomModal>
    </div>
  );
}
