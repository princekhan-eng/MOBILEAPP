import { UserRole } from '@/types/global';
import { PERMISSIONS } from '@/constants/permissions';

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  SHOP_ADMIN: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.CREATE_SALE,
    PERMISSIONS.VIEW_SHOP_ANALYTICS,
    PERMISSIONS.MANAGE_PURCHASES,
    PERMISSIONS.MANAGE_EMPLOYEES,
  ],
  SHOP_EMPLOYEE: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.CREATE_SALE,
  ],
  CUSTOMER: [],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}
