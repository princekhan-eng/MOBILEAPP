import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId') || undefined;

    const inventory = await prisma.inventory.findMany({
      where: shopId ? { shopId } : {},
      include: {
        product: true,
        shop: { select: { id: true, name: true } },
      },
    });

    return successResponse(inventory, 'Inventory retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json(); // { productId, quantity, lowStockThreshold }
    const updated = await prisma.inventory.update({
      where: { productId: body.productId },
      data: {
        quantity: body.quantity,
        ...(body.lowStockThreshold !== undefined ? { lowStockThreshold: body.lowStockThreshold } : {}),
      },
      include: { product: true },
    });

    return successResponse(updated, 'Inventory updated successfully');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
