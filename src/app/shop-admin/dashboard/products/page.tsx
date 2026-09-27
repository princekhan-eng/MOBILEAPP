import { productService } from '@/modules/products/product.service';
import { prisma } from '@/lib/prisma';
import { AddProductModal } from '@/components/shop-admin/AddProductModal';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';
import { redirect } from 'next/navigation';

export default async function ShopProductsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/admin/auth/login');
  
  const user = verifyJwt(token);
  if (!user || !user.shopId) redirect('/admin/auth/login');

  let products: any[] = [];
  let categories: { id: string; name: string }[] = [];

  try {
    const [res, cats] = await Promise.all([
      productService.getProducts(1, 50, { shopId: user.shopId }),
      prisma.category.findMany({ select: { id: true, name: true } }),
    ]);
    products = res.products;
    categories = cats;
  } catch (e) {
    products = [];
    categories = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Devices & Products</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage listings, pricing, stock, and mobile specs</p>
        </div>
        <AddProductModal categories={categories} />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Brand / Model</th>
              <th className="p-4">Price</th>
              <th className="p-4">In Stock</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No products listed in your shop. Click &quot;Add Product&quot; to list your first device!
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{p.name}</td>
                  <td className="p-4 text-xs text-slate-400">
                    {p.brand} {p.model}
                  </td>
                  <td className="p-4 font-bold text-emerald-400">${p.price}</td>
                  <td className="p-4 text-sm font-semibold text-amber-400">
                    {p.inventory?.quantity ?? 0}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
