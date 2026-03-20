"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit2, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Project } from "../utils/types";

interface ProjectProfileHeaderProps {
  project: Project;
}

/**
 * Static project header shown on all tabs
 * Displays project title, status, timeline, key stats, and action buttons
 */
export default function ProjectProfileHeader({ project }: ProjectProfileHeaderProps) {
  const router = useRouter();

  const statusColors = {
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Planning: "bg-purple-100 text-purple-700",
    "On Hold": "bg-yellow-100 text-yellow-700",
  };

  // Calculate variance
  const revenueVariance = ((project.actualRevenue - project.budgetRevenue) / project.budgetRevenue) * 100;
  const costVariance = ((project.actualCost - project.budgetCost) / project.budgetCost) * 100;
  const profitVariance = ((project.actualRevenue - project.actualCost) - (project.budgetRevenue - project.budgetCost)) / (project.budgetRevenue - project.budgetCost) * 100;

  return (
    <div className="mb-6">
      {/* Back button and header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-lg gap-2">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="outline" className="rounded-lg gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Project title and info */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <Badge className={`px-3 py-1 rounded-full font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
            {project.status}
          </Badge>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            📅
            <span>
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            👥 <span>6 team members</span>
          </div>
          <div className="flex items-center gap-2">
            ⏱️ <span>{project.progress}% complete</span>
          </div>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Revenue Card */}
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-600 text-lg">📈</span>
            <h3 className="font-medium text-gray-700">Revenue</h3>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-500">Actual</div>
              <div className="text-2xl font-bold text-green-600">
                ₦{(project.actualRevenue / 1000000).toFixed(0)}M
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Budget</div>
              <div className="text-sm text-gray-700">₦{(project.budgetRevenue / 1000000).toFixed(0)}M</div>
            </div>
            <div className={`text-sm font-medium ${revenueVariance < 0 ? "text-red-600" : "text-green-600"}`}>
              {revenueVariance < 0 ? "-" : "+"}{Math.abs(revenueVariance).toFixed(1)}% variance
            </div>
          </div>
        </div>

        {/* Costs Card */}
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-red-600 text-lg">📉</span>
            <h3 className="font-medium text-gray-700">Costs</h3>
            <span className="text-xs text-gray-500">Expense + Supplies</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-500">Actual</div>
              <div className="text-2xl font-bold text-red-600">
                ₦{(project.actualCost / 1000000).toFixed(0)}M
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Budget</div>
              <div className="text-sm text-gray-700">₦{(project.budgetCost / 1000000).toFixed(0)}M</div>
            </div>
            <div className={`text-sm font-medium ${costVariance > 0 ? "text-red-600" : "text-green-600"}`}>
              {costVariance > 0 ? "+" : ""}{costVariance.toFixed(1)}% variance
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-indigo-600 text-lg">💰</span>
            <h3 className="font-medium text-gray-700">Profit</h3>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-500">Actual</div>
              <div className="text-2xl font-bold text-indigo-600">
                ₦{((project.actualRevenue - project.actualCost) / 1000000).toFixed(0)}M
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Budget</div>
              <div className="text-sm text-gray-700">
                ₦{((project.budgetRevenue - project.budgetCost) / 1000000).toFixed(0)}M
              </div>
            </div>
            <div className={`text-sm font-medium ${profitVariance < 0 ? "text-red-600" : "text-green-600"}`}>
              {profitVariance < 0 ? "-" : "+"}{Math.abs(profitVariance).toFixed(1)}% variance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
