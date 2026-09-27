import { prisma } from '@/lib/prisma';

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    });
  } catch (e) {
    categories = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Categories Management</h1>
        <p className="text-slate-400 text-xs mt-0.5">Organize device taxonomies and specs schemas</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <h3 className="font-bold text-white text-lg">{c.name}</h3>
            <p className="text-xs text-slate-400">Slug: {c.slug}</p>
            <p className="text-sm text-emerald-400 font-semibold">{c._count?.products || 0} Products</p>
          </div>
        ))}
      </div>
    </div>
  );
}
