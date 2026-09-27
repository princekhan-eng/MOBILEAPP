import { prisma } from '@/lib/prisma';

export default async function AdminAuditLogsPage() {
  let logs: any[] = [];
  try {
    logs = await prisma.auditLog.findMany({
      take: 20,
      orderBy: { timestamp: 'desc' },
      include: { user: { select: { email: true } } },
    });
  } catch (e) {
    logs = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Audit Trail</h1>
        <p className="text-slate-400 text-xs mt-0.5">Immutable audit logging for security compliance</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">User</th>
              <th className="p-4">Action</th>
              <th className="p-4">Entity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No audit entries recorded yet.</td>
              </tr>
            ) : (
              logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/50">
                  <td className="p-4 text-xs font-mono text-slate-400">{new Date(l.timestamp).toLocaleString()}</td>
                  <td className="p-4">{l.user?.email || 'System'}</td>
                  <td className="p-4 font-semibold text-purple-400">{l.action}</td>
                  <td className="p-4">{l.entity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
