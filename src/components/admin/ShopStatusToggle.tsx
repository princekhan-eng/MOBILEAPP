'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function ShopStatusToggle({ shopId, currentStatus }: { shopId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;
    setUpdating(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`/api/shops/${shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to update shop status');
      }

      setStatus(newStatus);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to change shop status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'ACTIVE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PENDING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'SUSPENDED':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="inline-flex items-center space-x-1.5">
      <select
        value={status}
        disabled={updating}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold border bg-slate-950 focus:outline-none cursor-pointer transition ${getStatusColor(status)}`}
      >
        <option value="ACTIVE" className="bg-slate-900 text-emerald-400">ACTIVE</option>
        <option value="PENDING" className="bg-slate-900 text-amber-400">PENDING</option>
        <option value="SUSPENDED" className="bg-slate-900 text-rose-400">SUSPENDED</option>
      </select>
      {updating && <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin" />}
    </div>
  );
}
