import Link from 'next/link';
import { productService } from '@/modules/products/product.service';
import { ShoppingBag } from 'lucide-react';

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    const res = await productService.getProducts(1, 20);
    products = res.products;
  } catch (e) {
    products = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">All Mobile Devices</h1>
        <p className="text-slate-400 text-sm mt-1">Browse verified smartphones and accessories across network shops</p>
      </div>

      {products.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-400">No products available in the network yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="group bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition">
              <div className="h-48 bg-slate-800 flex items-center justify-center p-4">
                <span className="text-4xl text-slate-600 font-bold">{p.brand[0]}</span>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-xs text-indigo-400 font-medium">{p.brand}</span>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition truncate">{p.name}</h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-emerald-400">${p.price}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{p.shop?.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
