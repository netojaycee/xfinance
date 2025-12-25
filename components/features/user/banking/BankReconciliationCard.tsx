import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BankReconciliationCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-[#F2F3F5] w-full">
      <div className="text-xl font-semibold text-gray-900 mb-1">
        Bank Reconciliation
      </div>
      <div className="text-sm text-gray-500 mb-6">
        Operating Account - November 2025
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="bg-[#F4F5FB] rounded-xl px-4 py-3">
            <div className="text-sm text-gray-500 mb-1">
              Bank Statement Balance
            </div>
            <div className="text-2xl font-bold text-gray-900">$487,250</div>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl px-4 py-3">
            <div className="text-sm text-gray-500 mb-1">Book Balance</div>
            <div className="text-2xl font-bold text-gray-900">$485,050</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-[#F7F8FA] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Outstanding Deposits
              </div>
              <div className="text-lg font-semibold text-green-600">
                +$18,750
              </div>
            </div>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Outstanding Checks
              </div>
              <div className="text-lg font-semibold text-red-600">-$20,950</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
        <AlertTriangle className="text-yellow-500 mt-1" size={24} />
        <div>
          <div className="font-semibold text-yellow-900 mb-1">
            Reconciliation Variance Detected
          </div>
          <div className="text-sm text-yellow-900">
            There is a variance of $2,200 between bank and book balances. Please
            review outstanding items.
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-700">Reconciliation Progress</div>
        <div className="text-xs text-gray-500">32 of 44 items matched</div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="h-2 bg-gray-900 rounded-full"
          style={{ width: "72.7%" }}
        />
      </div>
      <div className="flex gap-4">
        <Button
          variant={"secondary"}
          className="flex-1 py-3 rounded-full border border-gray-200 bg-white text-gray-900 font-semibold text-base transition hover:bg-gray-50"
        >
          Review Items
        </Button>
        <Button className="flex-1 py-3 rounded-full bg-[#3B4FEA] text-white font-semibold text-base transition hover:bg-[#2c3bb3]">
          Complete Reconciliation
        </Button>
      </div>
    </div>
  );
}
