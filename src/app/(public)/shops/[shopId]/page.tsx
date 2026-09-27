import { shopService } from '@/modules/shops/shop.service';
import { notFound } from 'next/navigation';
import { Store, MapPin, Phone, Mail, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default async function ShopDetailPage({ params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await params;
  let shop: any = null;

  try {
    shop = await shopService.getShop(shopId);
  } catch (e) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-3xl">
            {shop.name[0]}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white">{shop.name}</h1>
            <p className="text-sm text-slate-400">{shop.description || 'Authorized Mobile Device Partner'}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-300">
          <p className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>{shop.address}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-indigo-400" />
            <span>{shop.phone}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>{shop.email}</span>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Shop Inventory ({shop.products?.length || 0})</h2>
        {shop.products?.length === 0 ? (
          <p className="text-slate-400 text-sm">No products currently listed by this shop.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {shop.products?.map((p: any) => (
              <Link key={p.id} href={`/products/${p.id}`} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 hover:border-indigo-500/50 transition">
                <span className="text-xs text-indigo-400 font-medium">{p.brand}</span>
                <h3 className="font-semibold text-white truncate">{p.name}</h3>
                <p className="text-emerald-400 font-bold">${p.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
