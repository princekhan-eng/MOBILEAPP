'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Store, 
  Shield, 
  Search, 
  Grid, 
  TrendingUp, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Top network status ticker banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-indigo-900/40 text-xs py-1.5 px-4 text-center text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-300">
            <strong className="text-white">Live Network:</strong> 100% Clean ESN &amp; IMEI Guaranteed • Real-Time Local Stock Sync
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 text-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 font-black text-xl tracking-tight group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Store className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent font-extrabold text-lg leading-tight">
                MobileNet
              </span>
              <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-mono -mt-0.5">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/products" 
              className="text-slate-300 hover:text-white hover:bg-slate-900/60 px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-400" />
              <span>Smartphones</span>
            </Link>
            <Link 
              href="/shops" 
              className="text-slate-300 hover:text-white hover:bg-slate-900/60 px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Verified Shops</span>
            </Link>
            <Link 
              href="/categories" 
              className="text-slate-300 hover:text-white hover:bg-slate-900/60 px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5"
            >
              <Grid className="w-4 h-4 text-cyan-400" />
              <span>Categories</span>
            </Link>
            <Link 
              href="/trending" 
              className="text-slate-300 hover:text-white hover:bg-slate-900/60 px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5"
            >
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Demand Radar</span>
            </Link>
          </nav>

          {/* Right Action Icons & Auth Portals */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/search" 
              className="p-2 hover:bg-slate-800/80 rounded-xl transition text-slate-300 hover:text-white"
              title="Search marketplace"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-slate-800/80 rounded-xl transition text-slate-300 hover:text-white"
              title="Cart / Reservations"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-slate-950 animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-800">
              <Link
                href="/shop-admin/dashboard"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700/80 hover:border-slate-600 transition flex items-center space-x-1.5"
              >
                <Store className="w-3.5 h-3.5 text-indigo-400" />
                <span>Shop Portal</span>
              </Link>
              <Link
                href="/admin/dashboard"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 transition flex items-center space-x-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <span>Smartphones &amp; Devices</span>
            </Link>
            <Link
              href="/shops"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <Store className="w-5 h-5 text-emerald-400" />
              <span>Verified Partner Shops</span>
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <Grid className="w-5 h-5 text-cyan-400" />
              <span>Categories</span>
            </Link>
            <Link
              href="/trending"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Demand Radar Intelligence</span>
            </Link>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <Link
                href="/shop-admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold"
              >
                Shop Portal
              </Link>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-bold"
              >
                Super Admin
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
