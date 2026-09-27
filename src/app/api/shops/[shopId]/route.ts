import { NextRequest } from 'next/server';
import { shopController } from '@/modules/shops/shop.controller';

export async function GET(req: NextRequest, context: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await context.params;
  return shopController.getById(shopId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await context.params;
  const body = await req.json();
  return shopController.update(shopId, body);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await context.params;
  return shopController.delete(shopId);
}
