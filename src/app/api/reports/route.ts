import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId') || undefined;

    const [salesAggregate, inventoryCount, productsCount] = await Promise.all([
      prisma.sale.aggregate({
        where: shopId ? { shopId } : {},
        _sum: { totalAmount: true },
        _count: true,
      }),
      prisma.inventory.count({
        where: shopId ? { shopId } : {},
      }),
      prisma.product.count({
        where: shopId ? { shopId } : {},
      }),
    ]);

    const report = {
      generatedAt: new Date().toISOString(),
      shopId: shopId || 'PLATFORM_WIDE',
      totalRevenue: salesAggregate._sum.totalAmount || 0,
      totalSalesCount: salesAggregate._count || 0,
      totalInventoryItems: inventoryCount,
      totalProducts: productsCount,
    };

    return successResponse(report, 'Executive report generated successfully');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
