import { prisma } from '@/lib/prisma';
import { SupplyScore } from './demand-supply.types';

export class SupplyService {
  async calculateSupplyForProduct(productId: string): Promise<SupplyScore> {
    const inventory = await prisma.inventory.findUnique({
      where: { productId },
    });

    const quantity = inventory ? inventory.quantity : 0;
    let supplyLevel: 'LOW' | 'OPTIMAL' | 'HIGH' = 'OPTIMAL';

    if (quantity < 5) supplyLevel = 'LOW';
    else if (quantity > 50) supplyLevel = 'HIGH';

    return {
      productId,
      totalInventoryQuantity: quantity,
      competingShopsCount: 1,
      supplyLevel,
    };
  }

  async getLowStockAlerts(shopId?: string) {
    return prisma.inventory.findMany({
      where: {
        ...(shopId ? { shopId } : {}),
        quantity: { lte: prisma.inventory.fields.lowStockThreshold },
      },
      include: {
        product: true,
        shop: { select: { id: true, name: true } },
      },
    });
  }
}

export const supplyService = new SupplyService();
