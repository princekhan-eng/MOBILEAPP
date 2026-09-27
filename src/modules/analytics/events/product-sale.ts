import { prisma } from '@/lib/prisma';

export async function logProductSaleEvent(productId: string, shopId: string, quantity: number, amount: number) {
  return prisma.analyticsEvent.create({
    data: {
      type: 'PRODUCT_SALE',
      productId,
      shopId,
      metadata: JSON.stringify({ quantity, amount }),
    },
  });
}
