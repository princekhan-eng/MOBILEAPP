import { NextRequest } from 'next/server';
import { productController } from '@/modules/products/product.controller';

export async function GET(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;
  return productController.getById(productId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;
  const body = await req.json();
  return productController.update(productId, body);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;
  return productController.delete(productId);
}
