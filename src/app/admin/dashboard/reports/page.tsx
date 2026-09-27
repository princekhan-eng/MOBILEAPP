import { FileSearch } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Executive Reports</h1>
        <p className="text-slate-400 text-xs mt-0.5">Export platform financial summaries, vendor audits, and tax reports</p>
      </div>

      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-lg">System Audit & Revenue Report</h3>
          <p className="text-xs text-slate-400">PDF & CSV exports for current fiscal period</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-white text-sm transition">
          Generate Report
        </button>
      </div>
    </div>
  );
}
