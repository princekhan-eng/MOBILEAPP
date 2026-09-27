import { prisma } from '@/lib/prisma';
import { Truck } from 'lucide-react';

export default async function ShopPurchasesPage() {
  let purchases: any[] = [];
  try {
    purchases = await prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    purchases = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wholesale Purchases & Suppliers</h1>
        <p className="text-slate-400 text-xs mt-0.5">Track B2B orders from device distributors</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Supplier</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No wholesale purchases recorded.</td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{p.supplierName}</td>
                  <td className="p-4 font-bold text-amber-400">${p.totalAmount}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs">{p.status}</span></td>
                  <td className="p-4 text-xs text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
