'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [resetDone, setResetDone] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h1 className="text-xl font-bold text-white">Set New Password</h1>
        {resetDone ? (
          <div className="space-y-4">
            <p className="text-sm text-emerald-400">Password successfully updated.</p>
            <Link href="/admin/auth/login" className="block text-center py-3 rounded-xl bg-purple-600 text-sm font-semibold text-white">Proceed to Login</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setResetDone(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">New Password</label>
              <input type="password" required minLength={6} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-semibold text-white">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
