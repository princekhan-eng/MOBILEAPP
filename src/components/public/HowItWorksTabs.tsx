'use client';

import { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  CreditCard, 
  Store, 
  Barcode, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export function HowItWorksTabs() {
  const [activeTab, setActiveTab] = useState<'buyers' | 'shops'>('buyers');

  const buyerSteps = [
    {
      num: '01',
      title: 'Search Live Verified Inventory',
      desc: 'Browse flagship and certified smartphones with guaranteed real-time stock at verified physical mobile shops near you.',
      icon: Search,
      highlight: 'Zero ghost listings • Real-time DB sync',
    },
    {
      num: '02',
      title: 'Compare Prices & Reserve',
      desc: 'Lock in competitive local retail rates. Request instant hold on your preferred colorway and storage specification.',
      icon: ShieldCheck,
      highlight: 'Guaranteed IMEI reservation hold',
    },
    {
      num: '03',
      title: 'Pick Up & Test In-Store',
      desc: 'Walk into the physical shop, perform official IMEI diagnostics, and complete purchase with manufacturer warranty receipt.',
      icon: CreditCard,
      highlight: 'Official receipt & 7-day swap guarantee',
    },
  ];

  const shopSteps = [
    {
      num: '01',
      title: 'Onboard Shop in 2 Minutes',
      desc: 'Create your digital storefront, upload business credentials, and configure your address and store operating hours.',
      icon: Store,
      highlight: 'Dedicated shop domain & isolated DB',
    },
    {
      num: '02',
      title: 'Cloud POS & Barcode Sync',
      desc: 'Scan incoming inventory, print branded sales receipts, track customer records, and prevent negative stock overselling.',
      icon: Barcode,
      highlight: '< 15ms transaction execution speed',
    },
    {
      num: '03',
      title: 'Unlock High-Intent Traffic',
      desc: 'Automatically attract local shoppers searching for models you have in stock, boosted by our algorithmic demand engine.',
      icon: TrendingUp,
      highlight: 'Live market opportunity alerts',
    },
  ];

  const steps = activeTab === 'buyers' ? buyerSteps : shopSteps;

  return (
    <div className="space-y-8">
      {/* Switcher Tab */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <button
            onClick={() => setActiveTab('buyers')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'buyers'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            For Smartphone Buyers
          </button>
          <button
            onClick={() => setActiveTab('shops')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'shops'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            For Mobile Retail Shops
          </button>
        </div>
      </div>

      {/* Steps Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition relative flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-slate-800 group-hover:text-indigo-900/60 font-mono transition">
                    {s.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{s.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA for active tab */}
      <div className="text-center pt-2">
        {activeTab === 'buyers' ? (
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            <span>Start exploring verified models</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/shop-admin/auth/login"
            className="inline-flex items-center space-x-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            <span>Onboard your shop portal today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
