import { ENUM_ROLE } from "./enums";

export type UserPayload = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  systemRole: ENUM_ROLE;
  permissions: string[];
  image: {
    secureUrl: string;
    publicId: string;
  } | null;
  // Add any other user properties you expect
};

export type GroupImpersonationPayload = {
  groupId: string;
  groupName: string;
};

export type EntityImpersonationPayload = {
  entityId: string;
  entityName: string;
};

// This type represents the complete session state
export type AppSession = {
  user: UserPayload | null;
  group: GroupImpersonationPayload | null;
  entity: EntityImpersonationPayload | null;
};

export type Group = {
  id: string;
  name: string;
  legalName: string;
  logo:  {
    secureUrl: string;
    publicId: string;
  } | null;
  taxId: string;
  industry: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  website?: string | null;
  subscriptionId?: string | null;
  billingCycle?: string | null;
  // entities, groupRoles, users can be added as needed
  subscription?: any;
  createdAt: string;
  updatedAt: string;
};

export type Entity = {
  id: string;
  name: string;
  groupId: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  currency?: string | null;
  email?: string | null;
  legalName?: string | null;
  phoneNumber?: string | null;
  postalCode?: string | null;
  state?: string | null;
  taxId?: string | null;
  website?: string | null;
  yearEnd?: string | null;
  // Add related types for customer, invoice, users, receipt, vendor, expenses as needed
};
