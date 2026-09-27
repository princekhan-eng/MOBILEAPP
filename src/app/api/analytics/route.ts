import { NextRequest } from 'next/server';
import { analyticsController } from '@/modules/analytics/analytics.controller';
import { requireShopAccess, requirePlatformAdmin } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestedShopId = searchParams.get('shopId');

  if (requestedShopId) {
    const auth = requireShopAccess(req, requestedShopId);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }
    const effectiveShopId = auth.context.isPlatformAdmin ? requestedShopId : auth.context.shopId!;
    return analyticsController.getShopMetrics(effectiveShopId);
  }

  // Viewing platform-wide analytics requires Platform Admin
  const auth = requirePlatformAdmin(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  return analyticsController.getPlatformMetrics();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return analyticsController.track(body);
  } catch (err: any) {
    return errorResponse(err.message || 'Invalid tracking payload', 400);
  }
}
