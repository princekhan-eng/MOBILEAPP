'use client';

import Link from 'next/link';
import { 
  Smartphone, 
  Sparkles, 
  Tablet, 
  Watch, 
  Headphones, 
  Zap, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  itemCount: string;
  href: string;
  tag?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'flagships',
    name: 'Flagship Smartphones',
    description: 'Pro & Ultra models with maximum computing power and titanium chassis.',
    icon: Smartphone,
    color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30',
    itemCount: '120+ In Stock',
    href: '/products?category=Flagship',
    tag: 'Trending',
  },
  {
    id: 'mid-range',
    name: '5G Performance & Gaming',
    description: 'High refresh rates, Snapdragon silicon, and fast charging value champions.',
    icon: Zap,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    itemCount: '85+ In Stock',
    href: '/products?category=Mid-Range',
  },
  {
    id: 'refurbished',
    name: 'Certified Pre-Owned',
    description: '100% functional, 40-point tested devices with standard 6-month shop warranty.',
    icon: ShieldCheck,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    itemCount: '94+ In Stock',
    href: '/products?category=Refurbished',
    tag: 'Save 40%',
  },
  {
    id: 'tablets',
    name: 'Tablets & Workstations',
    description: 'iPad Pro, Galaxy Tabs, and portable productivity hardware with stylus support.',
    icon: Tablet,
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    itemCount: '45+ In Stock',
    href: '/products?category=Tablets',
  },
  {
    id: 'wearables',
    name: 'Smartwatches & Fitness',
    description: 'Cellular LTE watches, biometric health monitors, and sports bands.',
    icon: Watch,
    color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
    itemCount: '60+ In Stock',
    href: '/products?category=Wearables',
  },
  {
    id: 'audio-accessories',
    name: 'Audio & GaN Fast Chargers',
    description: 'Noise cancelling earbuds, MagSafe stations, and 120W GaN power adapters.',
    icon: Headphones,
    color: 'from-violet-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/30',
    itemCount: '150+ In Stock',
    href: '/products?category=Accessories',
  },
];

export function CategoryGrid() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className="group p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle hover gradient bloom */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr border flex items-center justify-center ${cat.color} group-hover:scale-110 transition duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {cat.tag && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {cat.tag}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between relative z-10">
                <span className="text-xs font-semibold text-slate-400">
                  {cat.itemCount}
                </span>
                <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition flex items-center space-x-1">
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
