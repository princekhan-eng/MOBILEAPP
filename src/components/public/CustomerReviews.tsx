'use client';

import { Star, CheckCircle, Quote, Store, UserCheck } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  shopOrCity: string;
  avatarText: string;
  avatarBg: string;
  rating: number;
  content: string;
  tag: 'Store Owner' | 'Smartphone Buyer';
}

const REVIEWS: Review[] = [
  {
    name: 'Tariq Mahmood',
    role: 'Managing Partner',
    shopOrCity: 'TechMobile Hub • Downtown',
    avatarText: 'TM',
    avatarBg: 'bg-indigo-600',
    rating: 5,
    content: 'Migrating our 2 retail branches to MobileNet cut inventory reconciliation from 2 hours every evening down to zero. The cloud POS barcode checkout never lags.',
    tag: 'Store Owner',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Verified Customer',
    shopOrCity: 'Purchased iPhone 15 Pro Max',
    avatarText: 'SJ',
    avatarBg: 'bg-emerald-600',
    rating: 5,
    content: 'I needed a specific Natural Titanium 256GB phone immediately. MobileNet showed me exactly which shop had it in stock 15 minutes away. Picked it up seamlessly!',
    tag: 'Smartphone Buyer',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Retail Operations Lead',
    shopOrCity: 'Galaxy Cellular Express',
    avatarText: 'BA',
    avatarBg: 'bg-purple-600',
    rating: 5,
    content: 'The real-time Demand Gap telemetry engine is a game changer. We stocked up on high-demand Samsung S24 models ahead of the weekend rush and sold out within 48 hours.',
    tag: 'Store Owner',
  },
  {
    name: 'Marcus Vance',
    role: 'Mobile Tech Enthusiast',
    shopOrCity: 'Purchased Google Pixel 8 Pro',
    avatarText: 'MV',
    avatarBg: 'bg-amber-600',
    rating: 5,
    content: 'The 100% IMEI verification guarantee gives complete confidence. I checked the serial and warranty on spot at the shop. Far superior to unverified classifieds.',
    tag: 'Smartphone Buyer',
  },
];

export function CustomerReviews() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Network Testimonials
        </span>
        <h2 className="text-3xl font-extrabold text-white">
          Trusted by Retailers and Shoppers
        </h2>
        <p className="text-sm text-slate-400">
          Real feedback from store owners running daily operations and buyers finding authentic hardware.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 relative group"
          >
            <div className="space-y-3">
              {/* Top rating & tag */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  rev.tag === 'Store Owner'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                }`}>
                  {rev.tag}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{rev.content}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                {rev.avatarText}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1">
                  <h4 className="font-bold text-white text-xs truncate">{rev.name}</h4>
                  <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 truncate">{rev.shopOrCity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
