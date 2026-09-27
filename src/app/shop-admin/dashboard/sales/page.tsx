import { prisma } from '@/lib/prisma';
import { ShoppingCart, Plus } from 'lucide-react';

export default async function ShopSalesPage() {
  let sales: any[] = [];
  try {
    sales = await prisma.sale.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    sales = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales & POS Terminal</h1>
          <p className="text-slate-400 text-xs mt-0.5">Register walk-in sales, customer receipts, and digital orders</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-white text-sm transition flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Sale Receipt</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sales.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No recorded sales transactions.</td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{s.customerName}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">{s.paymentMethod}</span></td>
                  <td className="p-4 font-bold text-emerald-400">${s.totalAmount}</td>
                  <td className="p-4 text-xs text-slate-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
