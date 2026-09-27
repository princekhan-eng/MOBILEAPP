import { JwtPayload } from '@/types/auth';
import { isPlatformAdmin } from '@/constants/roles';

export function getTenantShopId(userPayload: JwtPayload): string | null {
  if (isPlatformAdmin(userPayload.role)) {
    return null; // Platform admin can access all tenants
  }
  return userPayload.shopId || null;
}

export { requireShopAccess } from '@/lib/auth-guard';
