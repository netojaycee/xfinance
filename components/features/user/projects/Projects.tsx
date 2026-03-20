"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { CustomTable } from "@/components/local/custom/custom-table";
import ProjectsHeader from "./ProjectsHeader";
import { projectsColumns } from "./ProjectsColumn";
import { mockProjectsData } from "./utils/data";

/**
 * Main Projects list component
 * Handles search, filtering, pagination, and row navigation to details page
 * TODO: Replace mockProjectsData with actual useProjects API hook
 */
export default function Projects() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const pageSize = 10;

  // TODO: Replace with actual API hook
  // const { data, isLoading } = useProjects({
  //   search: debouncedSearchTerm,
  //   page,
  //   limit: pageSize,
  //   status: statusFilter === 'All' ? '' : statusFilter,
  // });

  // Using mock data for now
  const isLoading = false;
  const data = mockProjectsData;

  // Filter by status from filter options
  const filteredProjects = data.projects.filter((project) => {
    return statusFilter === "All" || project.status === statusFilter;
  });

  // Handle search term change and reset pagination
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };

  // Navigate to project details page
  const handleRowClick = (project: any) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className="space-y-4 p-4">
      <ProjectsHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search projects..."
        tableTitle="All Projects"
        columns={projectsColumns}
        data={filteredProjects}
        pageSize={pageSize}
        loading={isLoading}
        onSearchChange={handleSearchChange}
        onRowClick={handleRowClick}
        statusOptions={["All", "In Progress", "Completed", "Planning", "On Hold"]}
        onStatusChange={setStatusFilter}
        display={{
          searchComponent: true,
        }}
        pagination={{
          page,
          totalPages: Math.ceil(filteredProjects.length / pageSize) || 1,
          total: filteredProjects.length,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
