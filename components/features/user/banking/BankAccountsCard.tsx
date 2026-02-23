"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBankAccounts } from "@/lib/api/hooks/useBanking";

export default function BankAccountsCard() {
  const router = useRouter();
  const { data: accountsData, isLoading } = useBankAccounts();

  const accounts = (accountsData as any)?.data || [];



  const handleAccountClick = (accountId: string) => {
    router.push(`/banking/${accountId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-[#F2F3F5]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xl font-semibold text-gray-900 mb-1">Bank Accounts</div>
          <div className="text-sm text-gray-500">Connected accounts and balances</div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-sm text-gray-500">Loading accounts...</div>
      ) : accounts.length === 0 ? (
        <div className="text-sm text-gray-500 py-4">No bank accounts connected</div>
      ) : (
        <div className="space-y-4">
          {accounts.map((acc: any) => (
            <div
              key={acc.id}
              className="flex items-center justify-between bg-[#F7F8FA] rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => handleAccountClick(acc.id)}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-medium text-gray-900">
                    {acc.accountName}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{acc.bankName}</span>
                  <span>•</span>
                  <span>
                    {acc.accountNumber?.slice(-4)
                      ? `****${acc.accountNumber.slice(-4)}`
                      : "****"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: acc.currency || "USD",
                  }).format(acc.currentBalance || 0)}
                </div>
                <div className="text-xs text-gray-400">{acc.currency}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
