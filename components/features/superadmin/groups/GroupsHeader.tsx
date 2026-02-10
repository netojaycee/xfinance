'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomModal } from '@/components/local/custom/modal';
import { MODULES } from '@/lib/types/enums';
import { GroupForm } from './GroupForm';

export function GroupsHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-sm text-muted-foreground">
            Manage all group organizations on the platform
          </p>
        </div>

        <Button
          size="sm"
          className="gap-2  w-fit"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Group
        </Button>
      </div>

      <CustomModal
        title="Create New Group"
        description="Add a new group organization to the platform"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.GROUP}
      >
        <GroupForm onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
