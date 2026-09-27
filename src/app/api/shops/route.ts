import { NextRequest } from 'next/server';
import { shopController } from '@/modules/shops/shop.controller';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return shopController.getAll(searchParams);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return shopController.create(body);
}
