export default function BankAccountsCard() {
  {/* Bank Accounts Card (hardcoded) */}
//   <BankAccountsCard />

  const accounts = [
    {
      name: 'Operating Account',
      bank: 'Chase Business',
      number: '****4521',
      status: 'Active',
      amount: '₦487,250',
      currency: 'USD',
    },
    {
      name: 'Savings Account',
      bank: 'Chase Business',
      number: '****7832',
      status: 'Active',
      amount: '₦125,000',
      currency: 'USD',
    },
    {
      name: 'Payroll Account',
      bank: 'Wells Fargo',
      number: '****2914',
      status: 'Active',
      amount: '₦68,500',
      currency: 'USD',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-[#F2F3F5]">
      <div className="mb-1 text-xl font-semibold text-gray-900">Bank Accounts</div>
      <div className="mb-4 text-sm text-gray-500">Connected accounts and balances</div>
      <div className="space-y-4">
        {accounts.map((acc) => (
          <div
            key={acc.number}
            className="flex items-center justify-between bg-[#F7F8FA] rounded-xl px-4 py-3"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg font-medium text-gray-900">{acc.name}</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {acc.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{acc.bank}</span>
                <span>•</span>
                <span>{acc.number}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{acc.amount}</div>
              <div className="text-xs text-gray-400">{acc.currency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}