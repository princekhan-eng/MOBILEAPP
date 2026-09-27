import { productService } from '@/modules/products/product.service';
import { Plus } from 'lucide-react';

export default async function ShopProductsPage() {
  let products: any[] = [];
  try {
    const res = await productService.getProducts(1, 50);
    products = res.products;
  } catch (e) {
    products = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Devices & Products</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage listings, pricing, and mobile specs</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white text-sm transition flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No products listed in your shop.</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{p.name}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4 font-bold text-emerald-400">${p.price}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs">{p.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
