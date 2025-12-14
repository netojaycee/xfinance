import { ENUM_ROLE } from "./enums";

export type UserPayload = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  systemRole: ENUM_ROLE;
  permissions: string[];
  image: {
    url: string;
    pub_id: string;
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
  logo: {
    url: string;
    public_id: string;
  } | null;
  subscription?: any
};

export type Entity = {
  id: string;
  name: string;
  logo: {
    url: string;
    public_id: string;
  } | null;
};
