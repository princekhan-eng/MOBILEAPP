import { NextRequest } from 'next/server';
import { shopController } from '@/modules/shops/shop.controller';
import { requireShopAccess, requirePlatformAdmin } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest, context: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await context.params;
  return shopController.getById(shopId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await context.params;

  // Only the assigned shop admin or platform admin can update shop profile
  const auth = requireShopAccess(req, shopId);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  return shopController.update(shopId, body, auth.context.isPlatformAdmin);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ shopId: string }> }) {
  // Only platform admins can delete a shop
  const auth = requirePlatformAdmin(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { shopId } = await context.params;
  return shopController.delete(shopId);
}
