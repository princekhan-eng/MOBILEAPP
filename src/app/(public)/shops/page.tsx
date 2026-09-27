import Link from 'next/link';
import { shopService } from '@/modules/shops/shop.service';
import { Store, MapPin, Phone } from 'lucide-react';

export default async function ShopsPage() {
  let shops: any[] = [];
  try {
    const res = await shopService.getShops(1, 20);
    shops = res.shops;
  } catch (e) {
    shops = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Network Mobile Shops</h1>
        <p className="text-slate-400 text-sm mt-1">Discover verified vendors and local mobile hubs across the network</p>
      </div>

      {shops.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
          <Store className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-400">No active network shops found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shops.map((s) => (
            <Link key={s.id} href={`/shops/${s.id}`} className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-indigo-500/50 transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                  {s.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{s.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Verified Vendor</span>
                </div>
              </div>

              <div className="text-sm text-slate-400 space-y-1">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{s.address}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{s.phone}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
