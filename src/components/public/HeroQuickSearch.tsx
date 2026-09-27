'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

const POPULAR_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'Xiaomi', 'OnePlus'];

export function HeroQuickSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleBrandClick = (brand: string) => {
    router.push(`/search?q=${encodeURIComponent(brand)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl transition focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20"
      >
        <div className="pl-4 pr-2 text-indigo-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by brand, flagship model, specs, or local shop..."
          className="w-full py-3 pr-4 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-white text-xs tracking-wide uppercase transition shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 shrink-0"
        >
          <span>Find Device</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Quick Brand Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="text-xs font-medium text-slate-400 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Popular:</span>
        </span>
        {POPULAR_BRANDS.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => handleBrandClick(brand)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/40 transition"
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}
