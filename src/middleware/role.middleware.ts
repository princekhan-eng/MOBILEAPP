import { UserRole } from '@/types/global';

export function authorizeRoles(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}
