import { prisma } from '@/lib/prisma';
import { Grid, Smartphone, Shield, Cpu, Headphones, Battery } from 'lucide-react';
import Link from 'next/link';

export default async function CategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    });
  } catch (e) {
    categories = [];
  }

  const categoryIcons: Record<string, any> = {
    Smartphones: Smartphone,
    Accessories: Headphones,
    Batteries: Battery,
    Processors: Cpu,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Product Categories</h1>
        <p className="text-slate-400 text-sm mt-1">Browse mobile network items by specialized category</p>
      </div>

      {categories.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400">No categories initialized yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((c) => {
            const Icon = categoryIcons[c.name] || Grid;
            return (
              <Link key={c.id} href={`/products?categoryId=${c.id}`} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{c.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{c._count?.products || 0} Listed Items</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
