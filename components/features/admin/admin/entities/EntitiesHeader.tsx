"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EntitiesHeaderProps {
  onAddEntity: () => void;
}

export default function EntitiesHeader({ onAddEntity }: EntitiesHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">Entities</h3>
        <p className="text-sm text-gray-600">
          Manage group entities and ownership structure
        </p>
      </div>
      <Button
        onClick={onAddEntity}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Entity
      </Button>
    </div>
  );
}
