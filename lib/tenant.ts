export type TenantConfig = {
  id?: string;
  name?: string;
  logo?: string;
  favicon?: string;
  colors?: {
    primary?: string;
    bg?: string;
    text?: string;
  };
};

export async function fetchTenantConfig(subdomain: string) {
  if (!subdomain) return null;
  try {
    const res = await fetch(
      `http://localhost:3810/api/v1/groups/tenant-config`,
      {
        headers: { "x-tenant": subdomain },
        // next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    console.log(json, "tenant config")
    return json as TenantConfig;
  } catch (err) {
    return null;
  }
}
