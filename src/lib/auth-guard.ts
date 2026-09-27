import { NextRequest } from 'next/server';
import { authenticateRequestWithDetail } from '@/middleware/auth.middleware';
import { isPlatformAdmin } from '@/constants/roles';
import { JwtPayload } from '@/types/auth';
import { UserRole } from '@/types/global';

export interface AuthContext {
  user: JwtPayload;
  isPlatformAdmin: boolean;
  shopId: string | null;
}

export type AuthGuardResult =
  | { success: true; context: AuthContext }
  | { success: false; status: 401 | 403; message: string };

/**
 * Ensures the request has a valid, non-expired authentication token.
 */
export function requireAuth(req: NextRequest | Request): AuthGuardResult {
  const verifyResult = authenticateRequestWithDetail(req);

  if (!verifyResult.valid) {
    if (verifyResult.reason === 'expired') {
      return { success: false, status: 401, message: 'Session expired. Please log in again.' };
    }
    return { success: false, status: 401, message: 'Authentication required. Please log in.' };
  }

  const user = verifyResult.payload;
  return {
    success: true,
    context: {
      user,
      isPlatformAdmin: isPlatformAdmin(user.role),
      shopId: user.shopId || null,
    },
  };
}

/**
 * Ensures the user is authenticated and possesses one of the allowed roles.
 */
export function requireRoles(req: NextRequest | Request, allowedRoles: UserRole[]): AuthGuardResult {
  const auth = requireAuth(req);
  if (!auth.success) return auth;

  const { user, isPlatformAdmin: isAdmin } = auth.context;

  // Platform admin passes if PLATFORM_ADMIN or SUPER_ADMIN is accepted
  const acceptsPlatformAdmin = allowedRoles.includes('PLATFORM_ADMIN') || allowedRoles.includes('SUPER_ADMIN');
  const hasAllowedRole = allowedRoles.includes(user.role) || (isAdmin && acceptsPlatformAdmin);

  if (!hasAllowedRole) {
    return { success: false, status: 403, message: 'Forbidden: Insufficient role permissions.' };
  }

  return auth;
}

/**
 * Ensures the user is a platform admin.
 */
export function requirePlatformAdmin(req: NextRequest | Request): AuthGuardResult {
  return requireRoles(req, ['PLATFORM_ADMIN', 'SUPER_ADMIN']);
}

/**
 * Enforces multi-tenant isolation:
 * - A SHOP_ADMIN / SHOP_EMPLOYEE can only access their assigned shopId.
 * - If targetShopId is provided, it MUST match the user's shopId (unless Platform Admin).
 * - Client-supplied shopId from browser/body is NEVER trusted for non-platform admins.
 */
export function requireShopAccess(
  req: NextRequest | Request,
  targetShopId?: string | null
): AuthGuardResult & { targetShopId?: string | null } {
  const auth = requireAuth(req);
  if (!auth.success) return auth;

  const { user, isPlatformAdmin: isAdmin, shopId } = auth.context;

  if (isAdmin) {
    return {
      success: true,
      context: {
        ...auth.context,
        shopId: targetShopId || shopId,
      },
      targetShopId: targetShopId || null,
    };
  }

  // Non-platform admin MUST belong to a shop
  if (!shopId) {
    return { success: false, status: 403, message: 'Access denied: User is not associated with any shop.' };
  }

  // If a specific shop was requested, it must be the user's own shop
  if (targetShopId && targetShopId !== shopId) {
    return { success: false, status: 403, message: 'Access denied: You cannot access or modify another shop’s data.' };
  }

  return {
    success: true,
    context: {
      ...auth.context,
      shopId,
    },
    targetShopId: shopId,
  };
}
