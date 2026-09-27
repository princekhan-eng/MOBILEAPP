import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { requireShopAccess } from '@/lib/auth-guard';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedShopId = searchParams.get('shopId') || undefined;

    const auth = requireShopAccess(req, requestedShopId);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }

    const effectiveShopId = auth.context.isPlatformAdmin ? requestedShopId : auth.context.shopId;

    const subscriptions = await prisma.subscription.findMany({
      where: effectiveShopId ? { shopId: effectiveShopId } : {},
      include: { shop: { select: { id: true, name: true } } },
    });

    return successResponse(subscriptions, 'Subscriptions retrieved');
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

    const effectiveShopId =
      auth.context.isPlatformAdmin && body.shopId ? body.shopId : auth.context.shopId!;

    const subscription = await prisma.subscription.create({
      data: {
        shopId: effectiveShopId,
        planName: body.planName || 'BASIC',
        price: Number(body.price) || 29,
        billingCycle: body.billingCycle || 'MONTHLY',
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return successResponse(subscription, 'Subscription created', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
