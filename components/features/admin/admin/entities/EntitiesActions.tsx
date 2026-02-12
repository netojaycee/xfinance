"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";
import ConfirmationForm from "@/components/local/shared/ConfirmationForm";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import { useDeleteEntity } from "@/lib/api/hooks/useEntity";
import { toast } from "sonner";
import { EntityForm } from "./EntityForm";
import { Entity } from "./EntitiesColumn";

interface EntitiesActionsProps {
  row: Entity;
}

export default function EntitiesActions({ row }: EntitiesActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteEntity = useDeleteEntity({
    onSuccess: () => {
      toast.success("Entity deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete entity");
    },
  });

  const handleEditClick = () => {
    setDropdownOpen(false);
    setTimeout(() => setEditOpen(true), 100);
  };

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setTimeout(() => setDeleteOpen(true), 100);
  };

  const handleConfirmDelete = (confirmed: boolean) => {
    if (confirmed) {
      deleteEntity.mutate(row.id);
    } else {
      setDeleteOpen(false);
    }
  };

  React.useEffect(() => {
    if (deleteEntity.isSuccess || deleteEntity.isError) {
      setDeleteOpen(false);
    }
  }, [deleteEntity.isSuccess, deleteEntity.isError]);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEditClick}>
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomModal
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Entity"
        description="Update entity details"
        module={MODULES.ENTITY}
      >
        <EntityForm
          entity={row as any}
          isEditMode={true}
          onSuccess={() => setEditOpen(false)}
        />
      </CustomModal>

      {/* {deleteOpen && ( */}
      <CustomModal
        title="Confirm Deletion"
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        module={MODULES.GROUP}
      >
        <ConfirmationForm
          title={`Are you sure you want to delete "${row.name}"? This action cannot be undone.`}
          onResult={handleConfirmDelete}
          loading={deleteEntity.isPending}
        />
      </CustomModal>
      {/* )} */}
    </>
  );
}
