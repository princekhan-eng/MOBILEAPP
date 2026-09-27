import { shopService } from '@/modules/shops/shop.service';
import { RegisterShopModal } from '@/components/admin/RegisterShopModal';
import { ShopStatusToggle } from '@/components/admin/ShopStatusToggle';
import Link from 'next/link';
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink 
} from 'lucide-react';

export default async function AdminShopsPage() {
  let shops: any[] = [];
  try {
    const res = await shopService.getShops(1, 100);
    shops = res.shops;
  } catch (e) {
    shops = [];
  }

  const activeCount = shops.filter((s) => s.status === 'ACTIVE').length;
  const pendingCount = shops.filter((s) => s.status === 'PENDING').length;
  const suspendedCount = shops.filter((s) => s.status === 'SUSPENDED').length;

  return (
    <div className="space-y-8">
      {/* Top Header & Register Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" />
            <span>Platform Retailer Network</span>
          </div>
          <h1 className="text-3xl font-black text-white">Shops Management</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Register new authorized mobile retail shops, manage vendor accounts, and control network access.
          </p>
        </div>

        {/* Register New Shop Modal */}
        <RegisterShopModal />
      </div>

      {/* Metric Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-semibold">Total Registered</p>
          <p className="text-2xl sm:text-3xl font-black text-white">{shops.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs text-emerald-400 font-semibold">Active Verified</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{activeCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs text-amber-400 font-semibold">Pending Review</p>
          <p className="text-2xl sm:text-3xl font-black text-amber-400">{pendingCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs text-rose-400 font-semibold">Suspended</p>
          <p className="text-2xl sm:text-3xl font-black text-rose-400">{suspendedCount}</p>
        </div>
      </div>

      {/* Shops Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Store className="w-4 h-4 text-purple-400" />
            <span>Authorized Network Locations ({shops.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Shop Name &amp; Slug</th>
                <th className="py-4 px-6">Owner / Admin</th>
                <th className="py-4 px-6">Contact &amp; Location</th>
                <th className="py-4 px-6">Inventory</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {shops.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400 space-y-3">
                    <Store className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold">No registered shops found in the network.</p>
                    <p className="text-xs text-slate-500">Click &ldquo;Register New Shop&rdquo; above to onboard your first partner store.</p>
                  </td>
                </tr>
              ) : (
                shops.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    {/* Shop Name & Slug */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600/30 to-indigo-600/30 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm hover:text-purple-300 transition">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            /{s.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{s.owner?.name || 'Assigned Vendor'}</span>
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {s.owner?.email || s.email}
                        </p>
                      </div>
                    </td>

                    {/* Contact & Location */}
                    <td className="py-4 px-6">
                      <div className="space-y-1 text-xs text-slate-300 max-w-xs">
                        <p className="flex items-center space-x-1.5 truncate text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{s.address}</span>
                        </p>
                        <p className="flex items-center space-x-1.5 text-slate-400 font-mono text-[11px]">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{s.phone}</span>
                        </p>
                      </div>
                    </td>

                    {/* Inventory Count */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1.5 text-xs text-slate-300">
                        <Package className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-semibold">{s._count?.products || 0} Devices</span>
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-6">
                      <ShopStatusToggle shopId={s.id} currentStatus={s.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/shops/${s.id}`}
                        target="_blank"
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700/60"
                        title="View Public Storefront"
                      >
                        <span>Storefront</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
