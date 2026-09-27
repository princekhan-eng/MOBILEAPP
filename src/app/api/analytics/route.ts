import { NextRequest } from 'next/server';
import { analyticsController } from '@/modules/analytics/analytics.controller';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shopId = searchParams.get('shopId');

  if (shopId) {
    return analyticsController.getShopMetrics(shopId);
  }
  return analyticsController.getPlatformMetrics();
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return analyticsController.track(body);
}
