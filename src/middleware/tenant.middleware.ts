import { JwtPayload } from '@/types/auth';

export function getTenantShopId(userPayload: JwtPayload): string | null {
  if (userPayload.role === 'SUPER_ADMIN') {
    return null; // Super admin can access all tenants
  }
  return userPayload.shopId || null;
}
