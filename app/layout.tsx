import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";
import SessionProvider from "@/components/providers/SessionProvider";
import { headers } from "next/headers";
import { fetchTenantConfig } from "@/lib/tenant";
import TenantProvider from "@/components/providers/TenantProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xFinance | Financial Dashboard & Management Platform",
  description:
    "xFinance is a modern financial dashboard and management platform for tracking sales, purchases, products, and business analytics. Empower your business with real-time insights and streamlined operations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // determine tenant from incoming host header
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0] || "";
  const tenantConfig = await fetchTenantConfig(subdomain);

  const cssVars: React.CSSProperties = {
    // set a --primary var for tailwind/custom usage
    ["--primary" as any]: tenantConfig?.data?.colors?.primary || undefined,
    ["--tenant-bg" as any]: tenantConfig?.data?.colors?.bg || undefined,
  };

  // Friendly fallback when tenant configuration cannot be loaded.
  if (!tenantConfig) {
    return (
      <html lang="en" style={cssVars} suppressHydrationWarning>
        <body className={`${nunito.variable} ${geistMono.variable} antialiased font-sans`}>
          <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6">
            <div className="max-w-lg text-center p-6 bg-white rounded-xl shadow">
              <h1 className="text-2xl font-semibold mb-2">Tenant not found</h1>
              <p className="mb-4 text-sm text-gray-600">We couldn't locate the tenant settings for <strong>{subdomain || "this site"}</strong>. This may be an incorrect URL or the tenant is not configured.</p>
              <p className="mb-4 text-sm text-gray-600">If you believe this is an error, contact your administrator or support.</p>
              <div className="flex items-center justify-center gap-3">
                <a href="/" className="px-4 py-2 rounded bg-[var(--primary)] text-white">Go to Home</a>
                <a href="mailto:support@example.com" className="px-4 py-2 rounded border">Contact Support</a>
              </div>
            </div>
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" style={cssVars} suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <QueryProvider>
          <SessionProvider>
            <TenantProvider tenant={tenantConfig}>
              <main className="bg-[#f8fafc] min-h-screen">{children}</main>
            </TenantProvider>
          </SessionProvider>
        </QueryProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
