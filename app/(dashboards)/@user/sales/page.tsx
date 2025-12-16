// import { salesTabs } from "@/components/features/user/TabsData";
// import { CustomTabs } from "@/components/local/custom/tabs";
// import React from "react";

// export default function SalesPage() {
//   return (
//     <div>
//       <CustomTabs tabs={salesTabs} storageKey={"sales-tab-key"} />
//     </div>
//   );
// }

import { redirect } from 'next/navigation';

export default function Page() {
    redirect('/sales/customers');
    return null;
}
