import { prisma } from '@/lib/prisma';

export async function logProductClickEvent(productId: string, userId?: string, source?: string) {
  return prisma.analyticsEvent.create({
    data: {
      type: 'PRODUCT_CLICK',
      productId,
      userId,
      metadata: JSON.stringify({ source }),
    },
  });
}
