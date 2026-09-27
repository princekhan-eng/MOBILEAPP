import { shopService } from '@/modules/shops/shop.service';
import { Store, Plus } from 'lucide-react';

export default async function AdminShopsPage() {
  let shops: any[] = [];
  try {
    const res = await shopService.getShops(1, 50);
    shops = res.shops;
  } catch (e) {
    shops = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Shops Management</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage network vendor accounts & approval status</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Shop Name</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Address</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {shops.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No registered shops found.</td>
              </tr>
            ) : (
              shops.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white">{s.name}</td>
                  <td className="p-4">{s.owner?.name || s.owner?.email}</td>
                  <td className="p-4">{s.address}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">View</button>
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
