'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  Globe 
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Subscription Banner */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span>Get Weekly Mobile Price Drops &amp; Stock Alerts</span>
            </h3>
            <p className="text-xs text-slate-400">
              Subscribe to algorithmic price alerts on new Apple, Samsung, and Google flagships arriving at verified local shops.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex max-w-md w-full gap-2">
            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-full">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You have been subscribed to network stock alerts!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-grow"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30 flex items-center space-x-1 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2 font-black text-xl text-white">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Store className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                MobileNet
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier multi-tenant marketplace platform for authorized mobile retailers, live inventory telemetry, and verified in-store hardware reservations.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Network Status: All Systems Operational</span>
            </div>
          </div>

          {/* For Buyers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              For Smartphone Buyers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-indigo-400 transition">
                  Browse All Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=Flagship" className="hover:text-indigo-400 transition">
                  Flagship Pro &amp; Ultra Models
                </Link>
              </li>
              <li>
                <Link href="/products?category=Refurbished" className="hover:text-indigo-400 transition">
                  Certified Pre-Owned (Grade-A)
                </Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-indigo-400 transition">
                  Authorized Retail Store Locator
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-indigo-400 transition">
                  Filter by Local Distance &amp; Price
                </Link>
              </li>
            </ul>
          </div>

          {/* For Retailers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              For Mobile Retailers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop-admin/auth/login" className="hover:text-indigo-400 transition">
                  Register Your Mobile Store
                </Link>
              </li>
              <li>
                <Link href="/shop-admin/dashboard" className="hover:text-indigo-400 transition">
                  Cloud POS &amp; Inventory Terminal
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-indigo-400 transition">
                  Regional Demand Radar Gaps
                </Link>
              </li>
              <li>
                <Link href="/shop-admin/dashboard/sales" className="hover:text-indigo-400 transition">
                  Instant POS Receipt Generator
                </Link>
              </li>
              <li>
                <Link href="/shop-admin/dashboard/inventory" className="hover:text-indigo-400 transition">
                  Barcode &amp; Serial Number Sync
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust, Security & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Trust &amp; Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin/dashboard" className="hover:text-indigo-400 transition flex items-center space-x-1 text-purple-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Platform Super Admin</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-400 block">
                  100% Tenant-Isolated Prisma Scope
                </span>
              </li>
              <li>
                <span className="text-slate-400 block">
                  IMEI &amp; ESN Blacklist Validation
                </span>
              </li>
              <li>
                <span className="text-slate-400 block">
                  Sub-15ms Transaction Sync Speed
                </span>
              </li>
              <li>
                <span className="text-slate-400 block">
                  Zero-Knowledge CRM Security
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} MobileNet Inc. All rights reserved. Built for multi-tenant mobile commerce.
          </p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Merchant Service Terms</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
