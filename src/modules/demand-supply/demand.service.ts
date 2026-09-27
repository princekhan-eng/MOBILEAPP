import { prisma } from '@/lib/prisma';
import { DemandScore } from './demand-supply.types';

export class DemandService {
  async calculateDemandForProduct(productId: string): Promise<DemandScore> {
    const [views, sales] = await Promise.all([
      prisma.analyticsEvent.count({
        where: { productId, type: 'PRODUCT_VIEW' },
      }),
      prisma.saleItem.count({
        where: { productId },
      }),
    ]);

    const score = views * 1 + sales * 10;

    return {
      productId,
      searchVolume: views,
      viewCount: views,
      score,
    };
  }

  async getTopDemandedProducts(limit = 10) {
    const events = await prisma.analyticsEvent.groupBy({
      by: ['productId'],
      _count: { id: true },
      where: { productId: { not: null } },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    });

    const productIds = events.map((e) => e.productId!).filter(Boolean);

    return prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { shop: true, category: true, inventory: true },
    });
  }
}

export const demandService = new DemandService();
