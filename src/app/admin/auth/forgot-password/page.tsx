'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h1 className="text-xl font-bold text-white">Reset Super Admin Password</h1>
        {submitted ? (
          <p className="text-sm text-emerald-400">If an account matches, a reset link has been dispatched.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
              <input type="email" required placeholder="admin@mobilenet.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-semibold text-white">Send Reset Link</button>
          </form>
        )}
        <div className="text-center">
          <Link href="/admin/auth/login" className="text-xs text-purple-400 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
