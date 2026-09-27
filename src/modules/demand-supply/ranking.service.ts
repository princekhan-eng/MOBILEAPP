import { prisma } from '@/lib/prisma';
import { demandService } from './demand.service';

export class RankingService {
  async getSmartRankedProducts(limit = 20) {
    const products = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        shop: true,
        category: true,
        inventory: true,
      },
      take: limit * 2,
    });

    const ranked = await Promise.all(
      products.map(async (p) => {
        const demand = await demandService.calculateDemandForProduct(p.id);
        const score = demand.score + (p.inventory?.quantity || 0) * 0.5;
        return { product: p, score };
      })
    );

    ranked.sort((a, b) => b.score - a.score);
    return ranked.slice(0, limit).map((r) => r.product);
  }
}

export const rankingService = new RankingService();
