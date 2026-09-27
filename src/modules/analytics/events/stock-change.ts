import { prisma } from '@/lib/prisma';

export async function logStockChangeEvent(productId: string, shopId: string, oldQuantity: number, newQuantity: number) {
  return prisma.analyticsEvent.create({
    data: {
      type: 'STOCK_CHANGE',
      productId,
      shopId,
      metadata: JSON.stringify({ oldQuantity, newQuantity, delta: newQuantity - oldQuantity }),
    },
  });
}
