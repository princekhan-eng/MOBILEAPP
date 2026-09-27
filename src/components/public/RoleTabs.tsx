'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  BarChart3, 
  Layers, 
  Zap, 
  Lock 
} from 'lucide-react';

const TABS = [
  {
    id: 'buyers',
    label: 'For Mobile Buyers',
    icon: ShoppingBag,
    title: 'Discover Verified Shops & Best Device Deals',
    badge: 'Smart Consumer Marketplace',
    description:
      'Compare real-time physical store inventory, authentic device serial guarantees, and competitive local prices with zero markup.',
    features: [
      'Real-time live in-store stock checks across local mobile hubs',
      'Direct comparison of flagship specs (Apple, Samsung, Pixel)',
      'Transparent walk-in or reservation orders with verified warranty',
      'Exclusive seasonal vendor bundles and refurbished certified models',
    ],
    ctaText: 'Browse Device Catalog',
    ctaHref: '/products',
    accentColor: 'indigo',
  },
  {
    id: 'vendors',
    label: 'For Shop Owners',
    icon: Store,
    title: 'Your Complete In-Store POS & Online Hub',
    badge: 'Turnkey Vendor OS',
    description:
      'Equip your mobile retail store with high-speed POS receipt generation, automated inventory deductions, and local demand insights.',
    features: [
      'Instant POS sales terminal with Cash, Card, and Digital payments',
      'Automated inventory tracking with low-stock replenishment alerts',
      'Real-time customer demand analytics & hot device signals',
      'Wholesale purchase orders tracking from verified distributors',
    ],
    ctaText: 'Open Shop Portal',
    ctaHref: '/shop-admin/dashboard',
    accentColor: 'emerald',
  },
  {
    id: 'enterprise',
    label: 'For Network Operators',
    icon: ShieldCheck,
    title: 'Enterprise Multi-Tenant Security & Oversight',
    badge: 'Platform Administration',
    description:
      'Scale an expansive network of independent mobile shops with strict cryptographic tenant isolation, SLA contracts, and audit trails.',
    features: [
      'Strict multi-tenant cryptographic query scoping & role permissions',
      'Immutable audit logging of device catalog & financial events',
      'SaaS vendor subscription tiers & recurring billing lifecycle',
      'Algorithmic Demand vs Supply intelligence engine and trend ranking',
    ],
    ctaText: 'Super Admin Gateway',
    ctaHref: '/admin/dashboard',
    accentColor: 'purple',
  },
];

export function RoleTabs() {
  const [activeTab, setActiveTab] = useState('buyers');
  const current = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="space-y-8">
      {/* Tab Selector */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-xl mx-auto backdrop-blur-md">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {current.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              {current.description}
            </p>

            <ul className="space-y-3">
              {current.features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href={current.ctaHref}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/30"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">mobilenet-engine.v1</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <span>Tenant Isolation</span>
                </span>
                <span className="text-emerald-400 font-semibold">ACTIVE</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Inventory Sync</span>
                </span>
                <span className="text-slate-400 font-semibold">&lt; 15ms</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Demand/Supply Index</span>
                </span>
                <span className="text-emerald-400 font-semibold">CALCULATED</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Audit Trail</span>
                </span>
                <span className="text-indigo-400 font-semibold">IMMUTABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
