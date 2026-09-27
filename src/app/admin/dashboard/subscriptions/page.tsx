import { prisma } from '@/lib/prisma';
import { CreditCard } from 'lucide-react';

export default async function AdminSubscriptionsPage() {
  let subscriptions: any[] = [];
  try {
    subscriptions = await prisma.subscription.findMany({
      include: { shop: { select: { name: true } } },
    });
  } catch (e) {
    subscriptions = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Vendor Subscriptions</h1>
        <p className="text-slate-400 text-xs mt-0.5">SaaS plans, recurring billing, and tenant status</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400">Basic Tier</span>
          <p className="text-2xl font-bold text-white">$29 / mo</p>
          <p className="text-xs text-slate-500">Up to 50 product listings</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/40 space-y-2 relative">
          <span className="text-xs font-semibold text-indigo-400">Pro Tier</span>
          <p className="text-2xl font-bold text-white">$99 / mo</p>
          <p className="text-xs text-slate-400">Unlimited listings + Demand Intelligence</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-purple-500/40 space-y-2">
          <span className="text-xs font-semibold text-purple-400">Enterprise</span>
          <p className="text-2xl font-bold text-white">$299 / mo</p>
          <p className="text-xs text-slate-400">Custom contracts & dedicated support</p>
        </div>
      </div>
    </div>
  );
}
