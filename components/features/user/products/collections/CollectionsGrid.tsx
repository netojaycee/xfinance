import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Table } from "lucide-react";

// CollectionCardGrid: Card grid for collections (see attached image)
export default function CollectionCardGrid() {
  const collections = [
    {
      name: "Best Sellers",
      items: 24,
      description: "Top selling products",
      value: "$48,500",
    },
    {
      name: "New Arrivals",
      items: 12,
      description: "Recently added items",
      value: "$18,900",
    },
    {
      name: "Premium Collection",
      items: 18,
      description: "High-end products",
      value: "$72,000",
    },
    {
      name: "Seasonal Sale",
      items: 32,
      description: "Discounted items",
      value: "$38,400",
    },
  ];
  return (
    <>
      <div className="flex justify-end my-4">
        <div className="relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <Input className="w-full pl-9" placeholder="Search collections..." />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {collections.map((col, i) => (
          <div
            key={col.name}
            className="bg-white rounded-xl shadow-sm border p-4 flex flex-col relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-100 rounded-xl p-2 flex items-center justify-center">
                <Table className="w-4 h-4" />
              </div>
              <span className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                {col.items} items
              </span>
            </div>
            <div className="font-semibold text-base text-gray-800 mb-1">
              {col.name}
            </div>
            <div className="text-gray-400 text-sm mb-4">{col.description}</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">Total Value</div>
                <div className="text-lg font-semibold text-blue-700">
                  {col.value}
                </div>
              </div>
              <Button className="border border-gray-200 rounded-xl px-4 py-2 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition">
                View Items
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
