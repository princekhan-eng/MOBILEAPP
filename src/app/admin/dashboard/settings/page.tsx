export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-slate-400 text-xs mt-0.5">Global marketplace parameters, rate limits, and API keys</p>
      </div>

      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Platform Name</label>
          <input type="text" defaultValue="Mobile Shop Network" className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Default Vendor Commission Rate (%)</label>
          <input type="number" defaultValue="2.5" className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-white text-sm transition">
          Save Settings
        </button>
      </div>
    </div>
  );
}
