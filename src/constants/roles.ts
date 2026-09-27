export const ROLES = {
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  SHOP_ADMIN: 'SHOP_ADMIN',
  SHOP_EMPLOYEE: 'SHOP_EMPLOYEE',
  CUSTOMER: 'CUSTOMER',
} as const;

export type RoleType = keyof typeof ROLES;

export function isPlatformAdmin(role?: string | null): boolean {
  return role === ROLES.PLATFORM_ADMIN || role === ROLES.SUPER_ADMIN;
}
