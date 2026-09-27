import { prisma } from '@/lib/prisma';
import { Package, AlertTriangle } from 'lucide-react';

export default async function ShopInventoryPage() {
  let inventoryItems: any[] = [];
  try {
    inventoryItems = await prisma.inventory.findMany({
      include: { product: true },
    });
  } catch (e) {
    inventoryItems = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Stock & Inventory Management</h1>
        <p className="text-slate-400 text-xs mt-0.5">Real-time stock counts, reorder alerts, and warehouse tracking</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Quantity In Stock</th>
              <th className="p-4">Low Stock Alert Level</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {inventoryItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No inventory tracked yet.</td>
              </tr>
            ) : (
              inventoryItems.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{inv.product?.name}</td>
                  <td className="p-4 font-bold text-amber-400">{inv.quantity}</td>
                  <td className="p-4 text-slate-400">{inv.lowStockThreshold}</td>
                  <td className="p-4">
                    <button className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Adjust Stock</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
