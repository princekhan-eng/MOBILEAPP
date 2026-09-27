import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId') || undefined;

    const purchases = await prisma.purchase.findMany({
      where: shopId ? { shopId } : {},
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
    const body = await req.json();
    const purchase = await prisma.purchase.create({
      data: {
        shopId: body.shopId,
        supplierName: body.supplierName,
        totalAmount: body.totalAmount,
        items: JSON.stringify(body.items || []),
      },
    });

    return successResponse(purchase, 'Purchase created successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
