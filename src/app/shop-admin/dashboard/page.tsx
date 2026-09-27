import { DollarSign, ShoppingBag, Package, ShoppingCart } from 'lucide-react';

export default async function ShopOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Shop Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Store performance & stock metrics</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Today Sales</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">$0.00</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-indigo-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Products</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-amber-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">In Stock Devices</span>
            <Package className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-purple-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sales Transactions</span>
            <ShoppingCart className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
      </div>
    </div>
  );
}
