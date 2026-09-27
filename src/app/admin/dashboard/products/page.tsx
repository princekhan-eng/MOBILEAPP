import { productService } from '@/modules/products/product.service';

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    const res = await productService.getProducts(1, 50);
    products = res.products;
  } catch (e) {
    products = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Product Catalog</h1>
        <p className="text-slate-400 text-xs mt-0.5">Network-wide device listings and stock oversight</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Shop</th>
              <th className="p-4">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No products found.</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{p.name}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4 font-bold text-emerald-400">${p.price}</td>
                  <td className="p-4">{p.shop?.name}</td>
                  <td className="p-4">{p.inventory?.quantity || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
