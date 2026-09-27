import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId') || undefined;

    const subscriptions = await prisma.subscription.findMany({
      where: shopId ? { shopId } : {},
      include: { shop: { select: { id: true, name: true } } },
    });

    return successResponse(subscriptions, 'Subscriptions retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const subscription = await prisma.subscription.create({
      data: {
        shopId: body.shopId,
        planName: body.planName,
        price: body.price,
        billingCycle: body.billingCycle || 'MONTHLY',
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
      },
    });

    return successResponse(subscription, 'Subscription created', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
