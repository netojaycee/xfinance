"use client";

import { useState } from "react";
import { CustomTable } from "@/components/local/custom/custom-table";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import { useEntities } from "@/lib/api/hooks/useEntity";
import { useDebounce } from "use-debounce";
import EntitiesHeader from "./EntitiesHeader";
import { entitiesColumns, Entity } from "./EntitiesColumn";
import { EntityForm } from "./EntityForm";
import EntitiesActions from "./EntitiesActions";

export default function Entities() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Fetch entities with search and pagination
  const { data = { entities: [], totalCount: 0 }, isLoading } = useEntities({
    search: debouncedSearchTerm,
    page: currentPage,
    limit: rowsPerPage,
  });

  const entities = data.entities || [];

  // Add actions column to columns array
  const columnsWithActions = [
    ...entitiesColumns.slice(0, -1),
    {
      key: "id",
      title: "",
      className: "w-8 text-sm",
      render: (_: any, row: Entity) => <EntitiesActions row={row} />,
      searchable: false,
    },
  ];

  return (
    <div className="space-y-4">
      <EntitiesHeader onAddEntity={() => setOpen(true)} />

      <CustomTable
        columns={columnsWithActions as any}
        data={entities}
        pageSize={rowsPerPage}
        searchPlaceholder="Search entities..."
        tableTitle="All Entities"
        onSearchChange={setSearchTerm}
        display={{
          searchComponent: true,
        }}
        loading={isLoading}
      />

      <CustomModal
        open={open}
        onOpenChange={setOpen}
        title="Add New Entity"
        description="Create a new entity within your group"
        module={MODULES.ENTITY}
      >
        <EntityForm onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
