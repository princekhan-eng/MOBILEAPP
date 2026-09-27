import Link from 'next/link';
import { Store, ShieldCheck, Zap, TrendingUp, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 pt-20 pb-24 text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-3xl" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Next-Generation Multi-Tenant Mobile Marketplace</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            Empowering Mobile Retailers & Global Buyers
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect directly with verified mobile shops, compare real-time inventory, track live market demand-supply signals, and buy with confidence.
          </p>
          <div className="flex justify-center space-x-4 pt-4">
            <Link href="/products" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition shadow-lg shadow-indigo-600/30 flex items-center space-x-2">
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/shops" className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-slate-200 border border-slate-700 transition">
              View Verified Shops
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Multi-Tenant Shops</h3>
          <p className="text-sm text-slate-400">
            Each mobile vendor has their dedicated admin panel, inventory control, and branded marketplace front.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Demand & Supply Engine</h3>
          <p className="text-sm text-slate-400">
            Real-time analytics and market gap ranking to predict mobile phone trends and inventory needs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Super Admin Control</h3>
          <p className="text-sm text-slate-400">
            Comprehensive platform management, subscriptions, audit logging, and automated compliance.
          </p>
        </div>
      </section>
    </div>
  );
}
