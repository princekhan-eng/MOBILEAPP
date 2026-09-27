import { NextRequest } from 'next/server';
import { productController } from '@/modules/products/product.controller';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return productController.getAll(searchParams);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return productController.create(body);
}
