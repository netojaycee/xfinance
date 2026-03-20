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

  const activeProjects = data?.activeProjects || 0;
  const totalRevenue = data?.totalRevenue || 0;
  const totalCosts = data?.totalCosts || 0;
  const avgMargin = data?.avgProfitMargin || 0;

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
          value={<span className="text-2xl font-bold text-indigo-900">{activeProjects}</span>}
          subtitle={`Of ${data?.total || 0} total`}
        />
        <ProjectsStatCardSmall
          title="Total Revenue"
          value={<span className="text-2xl font-bold text-green-600">₦{(totalRevenue / 1000000).toFixed(0)}M</span>}
          subtitle="Budget: ₦485M"
        />
        <ProjectsStatCardSmall
          title="Total Costs"
          value={<span className="text-2xl font-bold text-red-600">₦{(totalCosts / 1000000).toFixed(1)}M</span>}
          subtitle="Budget: ₦318M"
        />
        <ProjectsStatCardSmall
          title="Avg Profit Margin"
          value={<span className="text-2xl font-bold text-indigo-900">{avgMargin.toFixed(1)}%</span>}
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
