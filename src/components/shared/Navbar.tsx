'use client';

import Link from 'next/link';
import { ShoppingBag, Store, Shield, User, Search, Grid, TrendingUp } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

export function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-wider text-indigo-400">
          <Store className="w-6 h-6 text-indigo-500" />
          <span>MobileNet</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/products" className="hover:text-indigo-400 transition flex items-center space-x-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Products</span>
          </Link>
          <Link href="/shops" className="hover:text-indigo-400 transition flex items-center space-x-1">
            <Store className="w-4 h-4" />
            <span>Shops</span>
          </Link>
          <Link href="/categories" className="hover:text-indigo-400 transition flex items-center space-x-1">
            <Grid className="w-4 h-4" />
            <span>Categories</span>
          </Link>
          <Link href="/trending" className="hover:text-indigo-400 transition flex items-center space-x-1 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/search" className="p-2 hover:bg-slate-800 rounded-full transition text-slate-300">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/shop-admin/dashboard" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 transition">
            Shop Portal
          </Link>
          <Link href="/admin/dashboard" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Super Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
