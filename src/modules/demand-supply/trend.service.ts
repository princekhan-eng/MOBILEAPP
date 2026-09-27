import { prisma } from '@/lib/prisma';
import { MarketOpportunity } from './demand-supply.types';

export class TrendService {
  async getMarketOpportunities(): Promise<MarketOpportunity[]> {
    const products = await prisma.product.findMany({
      include: { inventory: true },
    });

    const brandGroups = new Map<string, { totalDemand: number; totalSupply: number; count: number }>();

    for (const p of products) {
      const key = `${p.brand} ${p.model}`;
      const current = brandGroups.get(key) || { totalDemand: 10, totalSupply: 0, count: 0 };
      current.totalSupply += p.inventory?.quantity || 0;
      current.count += 1;
      brandGroups.set(key, current);
    }

    const opportunities: MarketOpportunity[] = [];
    brandGroups.forEach((val, key) => {
      const [brand, ...modelParts] = key.split(' ');
      const model = modelParts.join(' ');
      opportunities.push({
        brand,
        model,
        demandIndex: val.totalDemand,
        supplyIndex: val.totalSupply,
        opportunityGap: val.totalDemand - val.totalSupply,
      });
    });

    return opportunities.sort((a, b) => b.opportunityGap - a.opportunityGap);
  }
}

export const trendService = new TrendService();
