import { NextRequest } from 'next/server';
import { productController } from '@/modules/products/product.controller';
import { requireShopAccess } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return productController.getAll(searchParams);
}

export async function POST(req: NextRequest) {
  // 1. Enforce shop access
  const auth = requireShopAccess(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  // 2. Resolve target shopId:
  // Non-platform admin CANNOT override their own shopId.
  // Platform admin can specify a shopId in body, or fall back to their assigned shopId.
  let targetShopId = auth.context.shopId;
  if (auth.context.isPlatformAdmin && body.shopId) {
    targetShopId = body.shopId;
  }

  if (!targetShopId) {
    return errorResponse('Target shop ID is required to create a product.', 400);
  }

  return productController.create(body, targetShopId);
}
