import { NextRequest } from 'next/server';
import { productController } from '@/modules/products/product.controller';
import { requireShopAccess } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;
  return productController.getById(productId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  const auth = requireShopAccess(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { productId } = await context.params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  // Scoped shopId: null for platform admins, user.shopId for shop admins/employees
  const scopedShopId = auth.context.isPlatformAdmin ? null : auth.context.shopId;
  return productController.update(productId, body, scopedShopId);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  const auth = requireShopAccess(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { productId } = await context.params;
  const scopedShopId = auth.context.isPlatformAdmin ? null : auth.context.shopId;
  return productController.delete(productId, scopedShopId);
}
