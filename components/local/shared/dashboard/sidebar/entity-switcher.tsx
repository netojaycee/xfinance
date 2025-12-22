"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Entity } from "@/lib/types";
import { useSessionStore } from "@/lib/store/session";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useImpersonateEntity } from "@/lib/api/hooks/useAuth";

interface EntitySwitcherProps {
  entities: Entity[];
  isLoading: boolean;
}

export function EntitySwitcher({ entities, isLoading }: EntitySwitcherProps) {
  const [selectedEntity, setSelectedEntity] = React.useState<
    string | undefined
  >();
  const { entity: currentEntity } = useSessionStore();

  const { mutate: impersonateEntity, isPending: isImpersonating } =
    useImpersonateEntity({
      onSuccess: () => {
        // toast.success("Switched entity successfully!");
        window.location.reload();
      },
      onError: (error) => {
        // toast.error(error.message || "Failed to switch entity.");
      },
    });

  // Set initial selected entity from session or default to first in list
  React.useEffect(() => {
    if (
      currentEntity?.entityId &&
      entities.some((e) => e.id === currentEntity.entityId)
    ) {
      setSelectedEntity(currentEntity.entityId);
    } else if (entities.length > 0) {
      const firstEntity = entities[0];
      setSelectedEntity(firstEntity.id);
      // Automatically impersonate the first entity if no entity is currently set
      if (!currentEntity?.entityId) {
        impersonateEntity({
          entityId: firstEntity.id,
          entityName: firstEntity.name,
        });
      }
    }
  }, [entities, currentEntity, impersonateEntity]);

  const handleValueChange = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    if (entity) {
      setSelectedEntity(entity.id);
      impersonateEntity({ entityId: entity.id, entityName: entity.name });
    }
  };

  if (isLoading) {
    return (
      <div className="px-2 py-1">
        <div className="h-9 w-full animate-pulse rounded-md bg-gray-200" />
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full">
          <div className="px-0 w-full">
            <Select
              value={selectedEntity}
              onValueChange={handleValueChange}
              disabled={isImpersonating || entities.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an entity..." />
              </SelectTrigger>
              <SelectContent className="w-full">
                {entities.map((entity) => (
                  <SelectItem key={entity.id} value={entity.id}>
                    {entity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
