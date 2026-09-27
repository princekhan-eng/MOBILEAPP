import { analyticsService } from '@/modules/analytics/analytics.service';
import { Store, Users, ShoppingBag, DollarSign } from 'lucide-react';

export default async function AdminOverviewPage() {
  let metrics = { totalUsers: 0, totalShops: 0, totalProducts: 0, totalRevenue: 0 };
  try {
    metrics = await analyticsService.getPlatformMetrics();
  } catch (e) {
    // fallback defaults
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Platform Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Multi-tenant network health & executive statistics</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-purple-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">${metrics.totalRevenue}</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-indigo-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Shops</span>
            <Store className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">{metrics.totalShops}</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Platform Users</span>
            <Users className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">{metrics.totalUsers}</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-amber-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Products</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-white">{metrics.totalProducts}</p>
        </div>
      </div>
    </div>
  );
}
