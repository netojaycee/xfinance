"use client";

import  { useState } from "react";


  import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
  import ItemProductForm from "./ItemProductForm";
  import ItemServiceForm from "./ItemServiceForm";

  export default function ItemForm({ item, isEditMode = false }: { item?: any; isEditMode?: boolean; }) {
    // Determine which tab to show in edit mode, or allow switching in add mode
    const initialTab = isEditMode && item?.type ? item.type : "product";
    const [tab, setTab] = useState(initialTab);

    const handleTabChange = (value: string) => {
      if (isEditMode) return; // Prevent tab switch in edit mode
      setTab(value);
    };

    return (
      <div className="w-full max-w-lg mx-auto">
        <Tabs value={tab} onValueChange={handleTabChange} className="mb-4">
          {!isEditMode && (
            <TabsList className="w-2/5 flex bg-gray-50 rounded-t-xl">
              <TabsTrigger value="product" className={tab === "product" ? "text-green-600 font-bold" : ""}>Product</TabsTrigger>
              <TabsTrigger value="service" className={tab === "service" ? "text-blue-600 font-bold" : ""}>Service</TabsTrigger>
            </TabsList>
          )}
          <TabsContent value="product">
            {(!isEditMode || tab === "product") && (
              <ItemProductForm item={item} isEditMode={isEditMode && tab === "product"} />
            )}
          </TabsContent>
          <TabsContent value="service">
            {(!isEditMode || tab === "service") && (
              <ItemServiceForm item={item} isEditMode={isEditMode && tab === "service"} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
    