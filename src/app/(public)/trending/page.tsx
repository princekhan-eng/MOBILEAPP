import { rankingService } from '@/modules/demand-supply/ranking.service';
import { trendService } from '@/modules/demand-supply/trend.service';
import { TrendingUp, Flame, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function TrendingPage() {
  let rankedProducts: any[] = [];
  let opportunities: any[] = [];

  try {
    rankedProducts = await rankingService.getSmartRankedProducts(8);
    opportunities = await trendService.getMarketOpportunities();
  } catch (e) {
    rankedProducts = [];
    opportunities = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div>
        <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
          <Flame className="w-5 h-5" />
          <span>Real-Time Market Intelligence</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1">Trending & High Demand Devices</h1>
        <p className="text-slate-400 text-sm mt-1">Algorithmic ranking driven by customer interest, view velocity, and stock availability</p>
      </div>

      {/* Market Gap Opportunities */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          <span>Market Opportunity Gaps (High Demand / Low Stock)</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {opportunities.map((op, idx) => (
            <div key={idx} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-lg">{op.brand}</h3>
                  <p className="text-xs text-slate-400">{op.model}</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Gap: +{op.opportunityGap}
                </span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 border-t border-slate-800/60 pt-3">
                <div className="flex justify-between">
                  <span>Demand Index:</span>
                  <span className="text-emerald-400 font-semibold">{op.demandIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span>Supply Index:</span>
                  <span className="text-amber-400 font-semibold">{op.supplyIndex}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Smart Ranked Products */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>Top Smart Ranked Products</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {rankedProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 hover:border-emerald-500/50 transition">
              <span className="text-xs text-indigo-400 font-medium">{p.brand}</span>
              <h3 className="font-semibold text-white truncate">{p.name}</h3>
              <p className="text-emerald-400 font-bold">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
