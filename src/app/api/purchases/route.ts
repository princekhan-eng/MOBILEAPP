import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { requireShopAccess } from '@/lib/auth-guard';
import { z } from 'zod';

const createPurchaseSchema = z.object({
  supplierName: z.string().min(2, 'Supplier name is required'),
  totalAmount: z.number().positive('Total amount must be greater than 0'),
  items: z.array(z.any()).default([]),
  shopId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedShopId = searchParams.get('shopId') || undefined;

    const auth = requireShopAccess(req, requestedShopId);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }

    const effectiveShopId = auth.context.isPlatformAdmin ? requestedShopId : auth.context.shopId;

    const purchases = await prisma.purchase.findMany({
      where: effectiveShopId ? { shopId: effectiveShopId } : {},
      include: { shop: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(purchases, 'Purchases retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function POST(req: NextRequest) {
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

    const parsed = createPurchaseSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, parsed.error.issues);
    }

    const effectiveShopId =
      auth.context.isPlatformAdmin && parsed.data.shopId ? parsed.data.shopId : auth.context.shopId!;

    const purchase = await prisma.purchase.create({
      data: {
        shopId: effectiveShopId,
        supplierName: parsed.data.supplierName,
        totalAmount: parsed.data.totalAmount,
        items: JSON.stringify(parsed.data.items || []),
      },
    });

    return successResponse(purchase, 'Purchase created successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
