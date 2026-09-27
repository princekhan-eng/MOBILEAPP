export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SHOP_ADMIN: 'SHOP_ADMIN',
  SHOP_EMPLOYEE: 'SHOP_EMPLOYEE',
  CUSTOMER: 'CUSTOMER',
} as const;

export type RoleType = keyof typeof ROLES;
