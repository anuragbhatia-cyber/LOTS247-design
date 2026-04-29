export function InvoiceList() {
  return (
    <div className="w-full h-full p-5 sm:p-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Invoices</h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Manage your customer invoices</p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Invoice #</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {[
                { id: '001', customer: 'Acme Corp', amount: '$2,400', status: 'Paid', date: '2024-01-15' },
                { id: '002', customer: 'Tech Solutions', amount: '$1,800', status: 'Pending', date: '2024-02-01' },
                { id: '003', customer: 'Design Studio', amount: '$3,200', status: 'Overdue', date: '2024-01-20' },
              ].map((invoice) => (
                <tr key={invoice.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-5 py-4 text-stone-900 dark:text-stone-100 font-medium">{invoice.id}</td>
                  <td className="px-5 py-4 text-stone-700 dark:text-stone-300">{invoice.customer}</td>
                  <td className="px-5 py-4 text-stone-900 dark:text-stone-100 tabular-nums">{invoice.amount}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === 'Paid'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : invoice.status === 'Pending'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-stone-700 dark:text-stone-300">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
