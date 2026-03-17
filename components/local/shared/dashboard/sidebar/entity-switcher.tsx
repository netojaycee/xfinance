"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  entities: Array<Pick<Entity, "id" | "name">>;
  isLoading: boolean;
  autoSelectFirst?: boolean;
}

export function EntitySwitcher({
  entities,
  isLoading,
  autoSelectFirst = false,
}: EntitySwitcherProps) {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = React.useState<
    string | undefined
  >();
  const autoSelectedEntityIdRef = React.useRef<string | null>(null);
  const currentEntity = useSessionStore((state) => state.entity);
  const setImpersonatedEntity = useSessionStore(
    (state) => state.setImpersonatedEntity,
  );

  const { mutate: impersonateEntity, isPending: isImpersonating } =
    useImpersonateEntity({
      onSuccess: (data, variables) => {
        setImpersonatedEntity(data?.entityId || variables.entityId);
        router.replace("/dashboard");
        router.refresh();
      },
    });

  React.useEffect(() => {
    if (
      currentEntity?.entityId &&
      entities.some((e) => e.id === currentEntity.entityId)
    ) {
      autoSelectedEntityIdRef.current = null;
      setSelectedEntity(currentEntity.entityId);
    } else {
      setSelectedEntity(undefined);
    }
  }, [entities, currentEntity?.entityId]);

  React.useEffect(() => {
    if (!autoSelectFirst) {
      autoSelectedEntityIdRef.current = null;
      return;
    }

    if (currentEntity?.entityId || entities.length === 0) {
      return;
    }

    const firstEntity = entities[0];

    if (autoSelectedEntityIdRef.current === firstEntity.id) {
      return;
    }

    autoSelectedEntityIdRef.current = firstEntity.id;
    setSelectedEntity(firstEntity.id);
    impersonateEntity({
      entityId: firstEntity.id,
      entityName: firstEntity.name,
    });
  }, [autoSelectFirst, currentEntity?.entityId, entities, impersonateEntity]);

  const handleValueChange = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    if (entity && entity.id !== currentEntity?.entityId) {
      autoSelectedEntityIdRef.current = entity.id;
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
          <div className="w-full px-0">
            <Select
              value={selectedEntity}
              onValueChange={handleValueChange}
              // disabled={isImpersonating || entities.length === 0}
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
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
