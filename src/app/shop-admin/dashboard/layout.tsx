'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Store, 
  ShoppingBag, 
  Package, 
  ShoppingCart, 
  Truck, 
  BarChart2, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const SHOP_NAV = [
  { href: '/shop-admin/dashboard', label: 'Overview', icon: BarChart2 },
  { href: '/shop-admin/dashboard/products', label: 'Products', icon: ShoppingBag },
  { href: '/shop-admin/dashboard/inventory', label: 'Inventory', icon: Package },
  { href: '/shop-admin/dashboard/sales', label: 'Sales POS', icon: ShoppingCart },
  { href: '/shop-admin/dashboard/purchases', label: 'Purchases', icon: Truck },
  { href: '/shop-admin/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/shop-admin/dashboard/employees', label: 'Employees', icon: Users },
  { href: '/shop-admin/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function ShopDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 sticky top-0 h-screen">
        <div className="space-y-6">
          <Link href="/shop-admin/dashboard" className="flex items-center space-x-2 px-3 py-2 text-indigo-400 font-bold text-lg">
            <Store className="w-6 h-6 text-indigo-500" />
            <span>Shop Manager</span>
          </Link>

          <nav className="space-y-1">
            {SHOP_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
