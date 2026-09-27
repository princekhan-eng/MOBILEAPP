import { prisma } from '@/lib/prisma';

export async function logProductSearchEvent(query: string, userId?: string) {
  return prisma.analyticsEvent.create({
    data: {
      type: 'PRODUCT_SEARCH',
      userId,
      metadata: JSON.stringify({ query }),
    },
  });
}
