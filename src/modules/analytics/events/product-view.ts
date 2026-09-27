import { prisma } from '@/lib/prisma';

export async function logProductViewEvent(productId: string, userId?: string, shopId?: string) {
  return prisma.analyticsEvent.create({
    data: {
      type: 'PRODUCT_VIEW',
      productId,
      userId,
      shopId,
    },
  });
}
