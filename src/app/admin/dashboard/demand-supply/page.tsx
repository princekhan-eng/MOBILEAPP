import { trendService } from '@/modules/demand-supply/trend.service';

export default async function AdminDemandSupplyPage() {
  let opportunities: any[] = [];
  try {
    opportunities = await trendService.getMarketOpportunities();
  } catch (e) {
    opportunities = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Demand vs Supply Intelligence Engine</h1>
        <p className="text-slate-400 text-xs mt-0.5">Real-time market gap analysis and inventory allocation advisor</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {opportunities.map((op, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-white text-lg">{op.brand}</h3>
            <p className="text-xs text-slate-400">Model: {op.model}</p>
            <div className="pt-2 border-t border-slate-800 text-xs flex justify-between text-slate-300">
              <span>Gap score:</span>
              <span className="text-indigo-400 font-bold">+{op.opportunityGap}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
