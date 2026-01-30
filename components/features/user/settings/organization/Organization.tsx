"use client";

import OrganizationHeader from "./OrganizationHeader";
import OrganizationForm from "./OrganizationForm";

export default function Organization() {
  return (
    <div className="space-y-4">
      <OrganizationHeader />

      <OrganizationForm />
    </div>
  );
}
