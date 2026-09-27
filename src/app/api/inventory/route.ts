import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { requireShopAccess } from '@/lib/auth-guard';
import { z } from 'zod';

const updateInventorySchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int('Quantity must be an integer').min(0, 'Inventory quantity cannot be negative'),
  lowStockThreshold: z.number().int().min(0, 'Low stock threshold cannot be negative').optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedShopId = searchParams.get('shopId') || undefined;

    // Enforce authentication & shop scoping
    const auth = requireShopAccess(req, requestedShopId);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }

    // Platform admin can query any shop or all; shop admin is locked to their shopId
    const effectiveShopId = auth.context.isPlatformAdmin ? requestedShopId : auth.context.shopId;

    const inventory = await prisma.inventory.findMany({
      where: effectiveShopId ? { shopId: effectiveShopId } : {},
      include: {
        product: true,
        shop: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return successResponse(inventory, 'Inventory retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function PUT(req: NextRequest) {
  try {
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

    // Validate body (ensuring non-negative quantity)
    const parsed = updateInventorySchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, parsed.error.issues);
    }

    const { productId, quantity, lowStockThreshold } = parsed.data;

    // Verify ownership of the product
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        ...(auth.context.isPlatformAdmin ? {} : { shopId: auth.context.shopId! }),
      },
    });

    if (!product) {
      return errorResponse('Product not found or does not belong to your shop', 403);
    }

    const updated = await prisma.inventory.upsert({
      where: { productId },
      update: {
        quantity,
        ...(lowStockThreshold !== undefined ? { lowStockThreshold } : {}),
      },
      create: {
        productId,
        shopId: product.shopId,
        quantity,
        lowStockThreshold: lowStockThreshold ?? 5,
      },
      include: { product: true },
    });

    return successResponse(updated, 'Inventory updated successfully');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
