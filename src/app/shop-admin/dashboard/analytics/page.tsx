export default function ShopAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Store Sales & Demand Telemetry</h1>
        <p className="text-slate-400 text-xs mt-0.5">Understand local device popularities, peak sales hours, and turnover rate</p>
      </div>

      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="font-semibold text-white">Device View vs Conversion Rate</h3>
        <div className="h-44 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-600 font-mono text-sm">
          [Store Analytics Telemetry Connected]
        </div>
      </div>
    </div>
  );
}
