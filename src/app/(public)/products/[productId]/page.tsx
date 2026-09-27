import { productService } from '@/modules/products/product.service';
import { notFound } from 'next/navigation';
import { ShoppingBag, Store, Shield, CheckCircle } from 'lucide-react';

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  let product: any = null;

  try {
    product = await productService.getProduct(productId);
  } catch (e) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 h-96 flex items-center justify-center p-8">
          <span className="text-8xl font-black text-slate-700">{product.brand[0]}</span>
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {product.brand}
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">{product.name}</h1>
            <p className="text-sm text-slate-400 mt-1">Model: {product.model}</p>
          </div>

          <div className="text-3xl font-bold text-emerald-400">${product.price}</div>

          <div className="border-t border-b border-slate-800 py-4 space-y-2">
            <p className="text-sm text-slate-300">{product.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Store className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">{product.shop?.name}</p>
                <p className="text-xs text-slate-400">Verified Network Partner</p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>In Stock ({product.inventory?.quantity || 0})</span>
            </span>
          </div>

          <button className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition flex items-center justify-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
