'use client';

import { 
  ShieldCheck, 
  Lock, 
  QrCode, 
  RotateCcw, 
  CheckCircle2, 
  Fingerprint 
} from 'lucide-react';

export function TrustAndSecuritySection() {
  const guarantees = [
    {
      icon: Fingerprint,
      title: 'IMEI & Serial Number Integrity',
      desc: 'Every listed device is verified against official database registries. Zero carrier blacklists, lost, or stolen hardware.',
      badge: '100% Clean ESN',
    },
    {
      icon: Lock,
      title: 'Tenant-Isolated Architecture',
      desc: 'Shop inventory, financial receipts, and customer CRM records are cryptographically isolated with zero cross-tenant leakage.',
      badge: 'Zero-Leak Security',
    },
    {
      icon: QrCode,
      title: 'Physical In-Store Hand-Off',
      desc: 'Inspect cosmetic condition, run battery health checks, and verify accessories in person at authorized storefronts before paying.',
      badge: 'Hands-On Inspection',
    },
    {
      icon: RotateCcw,
      title: '7-Day Hardware Warranty',
      desc: 'All network transactions come backed by our network service guarantee, with instant replacement for verified technical defects.',
      badge: 'Buyer Guarantee',
    },
  ];

  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Network Trust & Security Protocol</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Built on Rigorous Hardware Integrity
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            We eliminate the risks of online smartphone transactions by pairing cloud software with authenticated local physical storefronts.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl shrink-0 self-start md:self-auto">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-300">Verified Retail Standards</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {guarantees.map((g, idx) => {
          const Icon = g.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/60 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {g.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base">{g.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
