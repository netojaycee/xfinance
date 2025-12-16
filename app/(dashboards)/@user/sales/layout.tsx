import { ENUM_ROLE } from "@/lib/types/enums";
import { TabsNav } from "./(components)/Tabsnav";

export default function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TabsNav />
      <main className="p-4">{children}</main>
    </>
  );
}
