import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react';

export default async function ShopEmployeesPage() {
  let employees: any[] = [];
  try {
    employees = await prisma.user.findMany({
      where: { role: 'SHOP_EMPLOYEE' },
    });
  } catch (e) {
    employees = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Shop Staff & Employees</h1>
        <p className="text-slate-400 text-xs mt-0.5">Manage POS permissions, cashier logins, and staff roles</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-slate-500">No employee staff accounts created.</td>
              </tr>
            ) : (
              employees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-semibold text-white">{e.name}</td>
                  <td className="p-4">{e.email}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs">{e.role}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
