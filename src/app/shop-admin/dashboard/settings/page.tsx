export default function ShopSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Storefront & Profile Settings</h1>
        <p className="text-slate-400 text-xs mt-0.5">Customize your public shop page, logo, banner, and contact details</p>
      </div>

      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Store Name</label>
          <input type="text" defaultValue="TechMobile Hub" className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
          <input type="text" defaultValue="+1 555-0192" className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Physical Address</label>
          <input type="text" defaultValue="123 Tech Blvd, Suite 400" className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white text-sm transition">
          Update Shop Profile
        </button>
      </div>
    </div>
  );
}
