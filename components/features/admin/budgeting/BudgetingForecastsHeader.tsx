'use client';

import React from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomModal } from '@/components/local/custom/modal';
import { MODULES } from '@/lib/types/enums';
import { BudgetFormDummy } from './BudgetFormDummy';

export function BudgetingForecastsHeader() {
  const [open, setOpen] = React.useState(false);

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export budget data');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Budgeting & Forecasts</h1>
          <p className="text-sm text-muted-foreground">
            Group-wide budget planning and financial forecasting
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="gap-2 "
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Budget
          </Button>
        </div>
      </div>

      <CustomModal
        title="Create New Budget"
        description="Create a new budget allocation for your group"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.BUDGET}
      >
        <BudgetFormDummy onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
