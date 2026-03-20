"use client";

import React from "react";
import { CustomTabs } from "@/components/local/custom/tabs";
import { Project } from "../utils/types";
import ProjectProfileHeader from "./ProjectProfileHeader";

interface ProjectDetailsProps {
  project: Project;
}

/**
 * Project details page wrapper with tabbed interface
 * Header remains static while tab content changes
 */
export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-4">Cost Variance Analysis</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Cost Variance</div>
                <div className="text-2xl font-bold text-green-600">₦-6M</div>
                <div className="text-sm text-gray-600">-21.4%</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Schedule Performance</div>
                <div className="text-2xl font-bold text-blue-600">65%</div>
                <div className="text-sm text-gray-600">On schedule</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Cost Performance Index</div>
                <div className="text-2xl font-bold text-green-600">1.27</div>
                <div className="text-sm text-gray-600">Under budget</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Income",
      value: "income",
      content: (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-4">Income Items</h3>
          <div className="text-center py-8 text-gray-500">
            Income details will be displayed here
          </div>
        </div>
      ),
    },
    {
      title: "Expenses",
      value: "expenses",
      content: (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-4">Expense Items</h3>
          <div className="text-center py-8 text-gray-500">
            Expense details will be displayed here
          </div>
        </div>
      ),
    },
    {
      title: "Analysis",
      value: "analysis",
      content: (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-4">Financial Analysis</h3>
          <div className="text-center py-8 text-gray-500">
            Analysis charts and metrics will be displayed here
          </div>
        </div>
      ),
    },
    {
      title: "Team",
      value: "team",
      content: (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-4">Team Members & Costs</h3>
          <div className="text-center py-8 text-gray-500">
            Team member details will be displayed here
          </div>
        </div>
      ),
    },
    {
      title: "Milestones",
      value: "milestones",
      content: (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-4">Project Milestones</h3>
          <div className="text-center py-8 text-gray-500">
            Milestone tracking will be displayed here
          </div>
        </div>
      ),
    },
    {
      title: "Supplies",
      value: "supplies",
      content: (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-4">Project Supplies</h3>
          <div className="text-center py-8 text-gray-500">
            Supply list will be displayed here
          </div>
        </div>
      ),
    },
  ];


  return (
    <div className="space-y-4 p-4">
      {/* Static header */}
      <ProjectProfileHeader project={project} />

      {/* Tabs wrapper */}
      <div className="">
        <CustomTabs
        classNames={"p-0"}
          tabs={tabs}
          storageKey={`project-details-tab-${project.id}`}
          variant="button"
        />
      </div>
    </div>
  );
}
