import { prisma } from '@/lib/prisma';
import { NewSaleModal } from '@/components/shop-admin/NewSaleModal';

export default async function ShopSalesPage() {
  let sales: any[] = [];
  let availableProducts: { id: string; name: string; price: number; stock: number }[] = [];

  try {
    const [salesList, productsList] = await Promise.all([
      prisma.sale.findMany({
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.findMany({
        where: { status: 'ACTIVE' },
        include: { inventory: true },
      }),
    ]);

    sales = salesList;
    availableProducts = productsList.map((p) => ({
      id: p.id,
      name: `${p.brand} ${p.name}`,
      price: p.price,
      stock: p.inventory?.quantity || 0,
    }));
  } catch (e) {
    sales = [];
    availableProducts = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales & POS Terminal</h1>
          <p className="text-slate-400 text-xs mt-0.5">Register walk-in sales, customer receipts, and digital orders</p>
        </div>
        <NewSaleModal products={availableProducts} />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Items Sold</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sales.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No recorded sales transactions yet. Click &quot;New Sale Receipt&quot; to issue a receipt.
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/50">
                  <td className="p-4">
                    <p className="font-semibold text-white">{s.customerName}</p>
                    {s.customerPhone && <p className="text-xs text-slate-500">{s.customerPhone}</p>}
                  </td>
                  <td className="p-4 text-xs text-slate-300">
                    {s.items?.map((item: any) => `${item.product?.name} (x${item.quantity})`).join(', ') || '-'}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                      {s.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">${s.totalAmount.toFixed(2)}</td>
                  <td className="p-4 text-xs text-slate-400">
                    {new Date(s.createdAt).toLocaleDateString()}
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
