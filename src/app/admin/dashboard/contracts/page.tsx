import { prisma } from '@/lib/prisma';
import { FileText } from 'lucide-react';

export default async function AdminContractsPage() {
  let contracts: any[] = [];
  try {
    contracts = await prisma.contract.findMany({
      include: { shop: { select: { name: true } } },
    });
  } catch (e) {
    contracts = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Legal & B2B Vendor Contracts</h1>
        <p className="text-slate-400 text-xs mt-0.5">SLA agreements, terms of service, and vendor compliance</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Contract Title</th>
              <th className="p-4">Shop</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-slate-500">No active contracts found.</td>
              </tr>
            ) : (
              contracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{c.title}</td>
                  <td className="p-4">{c.shop?.name}</td>
                  <td className="p-4"><span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs">{c.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
