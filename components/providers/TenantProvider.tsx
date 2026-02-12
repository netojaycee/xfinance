"use client";

import React, { createContext, useContext } from "react";
import type { TenantConfig } from "@/lib/tenant";

type TenantContextValue = {
  tenant?: TenantConfig | null;
};

const TenantContext = createContext<TenantContextValue>({ tenant: null });

export const TenantProvider = ({
  tenant,
  children,
}: {
  tenant?: TenantConfig | null;
  children: React.ReactNode;
}) => {
  return (
    <TenantContext.Provider value={{ tenant }}>{children}</TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);

export default TenantProvider;
