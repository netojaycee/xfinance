import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Send, Ban } from "lucide-react";
import { format } from "date-fns";

interface SalesReceiptDetailsProps {
    receipt: any;
    onClose?: () => void;
}

export default function SalesReceiptDetails({ receipt, onClose }: SalesReceiptDetailsProps) {
    if (!receipt) return null;

    const getItems = () => {
        if (!receipt.items) return [];
        if (typeof receipt.items[0] === 'string') {
            return receipt.items.map((item: string) => JSON.parse(item));
        }
        return receipt.items;
    };

    const parsedItems = getItems();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 text-sm">View complete details of sales receipt</p>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <h2 className="text-2xl font-semibold mb-1">{receipt.receiptNumber || "RCP-YYYY-001"}</h2>
                        <p className="text-gray-500 text-sm">
                            {receipt.date ? format(new Date(receipt.date), "MMMM d, yyyy") : "Date"}
                        </p>
                    </div>
                    <Badge
                        className={
                            receipt.status === "Completed"
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }
                    >
                        {receipt.status || "Completed"}
                    </Badge>
                </div>
            </div>

            {/* Customer & Payment Section */}
            <div className="bg-green-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Customer</p>
                        <p className="font-medium">{receipt.customer?.name || receipt.customerName || "Walk-in Customer"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Payment Method</p>
                        <p className="font-medium">{receipt.paymentMethod || "Cash"}</p>
                    </div>
                </div>
            </div>

            {/* Items Section */}
            <div className="bg-yellow-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">Items</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    {parsedItems.length > 0 ? (
                        parsedItems.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{item.description || "Product"}</p>
                                    <p className="text-gray-500 text-sm">
                                        {item.quantity} x {item.rate != null ? `₦${Number(item.rate).toLocaleString()}` : ""}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    ₦{((item.quantity || 0) * (item.rate || 0)).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No items</p>
                    )}
                </div>
            </div>

            {/* Total Section */}
            <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-bold">₦{(receipt.total || 0).toLocaleString()}</span>
            </div>

            {/* Actions Section */}
            <div className="grid grid-cols-3 gap-3 pt-4">
                <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
                <Button variant="outline">
                    <Send className="w-4 h-4 mr-2" /> Email
                </Button>
                <Button variant="destructive">
                    <Ban className="w-4 h-4 mr-2" /> Void
                </Button>
            </div>
        </div>
    );
}
