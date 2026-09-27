export const PERMISSIONS = {
  // Super Admin Permissions
  MANAGE_SHOPS: 'shops:manage',
  MANAGE_USERS: 'users:manage',
  MANAGE_CATEGORIES: 'categories:manage',
  VIEW_PLATFORM_ANALYTICS: 'analytics:platform',
  MANAGE_SUBSCRIPTIONS: 'subscriptions:manage',
  MANAGE_CONTRACTS: 'contracts:manage',
  VIEW_AUDIT_LOGS: 'audit_logs:view',

  // Shop Admin & Employee Permissions
  MANAGE_PRODUCTS: 'products:manage',
  MANAGE_INVENTORY: 'inventory:manage',
  CREATE_SALE: 'sales:create',
  VIEW_SHOP_ANALYTICS: 'analytics:shop',
  MANAGE_PURCHASES: 'purchases:manage',
  MANAGE_EMPLOYEES: 'employees:manage',
} as const;
