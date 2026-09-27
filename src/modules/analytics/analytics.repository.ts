import { prisma } from '@/lib/prisma';
import { AnalyticsEventType } from '@/types/global';

export class AnalyticsRepository {
  async trackEvent(data: { type: AnalyticsEventType; productId?: string; shopId?: string; userId?: string; metadata?: any }) {
    return prisma.analyticsEvent.create({
      data: {
        type: data.type,
        productId: data.productId,
        shopId: data.shopId,
        userId: data.userId,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });
  }

  async getPlatformSummary() {
    const [totalUsers, totalShops, totalProducts, totalSalesCount, aggregateSales] = await Promise.all([
      prisma.user.count(),
      prisma.shop.count(),
      prisma.product.count(),
      prisma.sale.count(),
      prisma.sale.aggregate({ _sum: { totalAmount: true } }),
    ]);

    return {
      totalUsers,
      totalShops,
      totalProducts,
      totalSalesCount,
      totalRevenue: aggregateSales._sum.totalAmount || 0,
    };
  }

  async getShopSummary(shopId: string) {
    const [totalProducts, totalSales, totalPurchases, aggregateSales] = await Promise.all([
      prisma.product.count({ where: { shopId } }),
      prisma.sale.count({ where: { shopId } }),
      prisma.purchase.count({ where: { shopId } }),
      prisma.sale.aggregate({ where: { shopId }, _sum: { totalAmount: true } }),
    ]);

    return {
      totalProducts,
      totalSales,
      totalPurchases,
      totalRevenue: aggregateSales._sum.totalAmount || 0,
    };
  }
}

export const analyticsRepository = new AnalyticsRepository();
