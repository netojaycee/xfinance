"use client"
import React from "react";
import { ProjectDetails } from "@/components/features/user/projects/details";
import { mockProjectsData } from "@/components/features/user/projects/utils/data";
import { useParams } from "next/navigation";

/**
 * Project Details Page - Dynamic route [id]
 * Displays project overview with tabbed interface for income, expenses, analysis, team, milestones, and supplies
 */
export default function ProjectDetailsPage() {
      const params = useParams();
      const projectId = params?.id ? params.id.toString().toUpperCase() : undefined;
    
    
  // TODO: Replace with actual API call
  // const { data: project, isLoading } = useProject(params.id);

  // Using mock data for now
  const project = mockProjectsData.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96 ">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <ProjectDetails project={project} />;
}
