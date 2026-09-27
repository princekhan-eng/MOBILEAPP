'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Store, 
  Users, 
  ShoppingBag, 
  Grid, 
  CreditCard, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  FileSearch, 
  Activity, 
  Settings,
  LogOut 
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Overview', icon: BarChart3 },
  { href: '/admin/dashboard/shops', label: 'Shops', icon: Store },
  { href: '/admin/dashboard/users', label: 'Users', icon: Users },
  { href: '/admin/dashboard/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/dashboard/categories', label: 'Categories', icon: Grid },
  { href: '/admin/dashboard/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/admin/dashboard/contracts', label: 'Contracts', icon: FileText },
  { href: '/admin/dashboard/analytics', label: 'Analytics', icon: Activity },
  { href: '/admin/dashboard/demand-supply', label: 'Demand-Supply', icon: TrendingUp },
  { href: '/admin/dashboard/reports', label: 'Reports', icon: FileSearch },
  { href: '/admin/dashboard/audit-logs', label: 'Audit Logs', icon: FileSearch },
  { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 sticky top-0 h-screen">
        <div className="space-y-6">
          <Link href="/admin/dashboard" className="flex items-center space-x-2 px-3 py-2 text-purple-400 font-bold text-lg">
            <Shield className="w-6 h-6" />
            <span>Super Admin</span>
          </Link>

          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
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
            <span>Exit Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
