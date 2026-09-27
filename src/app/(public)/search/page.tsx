import { Search } from 'lucide-react';
import Link from 'next/link';
import { productService } from '@/modules/products/product.service';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  let results: any[] = [];
  if (q) {
    try {
      const res = await productService.getProducts(1, 20, { search: q });
      results = res.products;
    } catch (e) {
      results = [];
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Network Product Search</h1>
        <p className="text-slate-400 text-sm mt-1">Search through products across all network mobile stores</p>
      </div>

      <form action="/search" method="GET" className="flex gap-4">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" />
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="Search by brand, model, or product name..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
          Search
        </button>
      </form>

      {q && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-300">Results for &ldquo;{q}&rdquo; ({results.length})</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 hover:border-indigo-500/50 transition">
                <span className="text-xs text-indigo-400 font-medium">{p.brand}</span>
                <h3 className="font-semibold text-white truncate">{p.name}</h3>
                <p className="text-emerald-400 font-bold">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
