import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { requireShopAccess } from '@/lib/auth-guard';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedShopId = searchParams.get('shopId') || undefined;

    const auth = requireShopAccess(req, requestedShopId);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }

    const effectiveShopId = auth.context.isPlatformAdmin ? requestedShopId : auth.context.shopId;

    const [salesAggregate, inventoryCount, productsCount] = await Promise.all([
      prisma.sale.aggregate({
        where: effectiveShopId ? { shopId: effectiveShopId } : {},
        _sum: { totalAmount: true },
        _count: true,
      }),
      prisma.inventory.count({
        where: effectiveShopId ? { shopId: effectiveShopId } : {},
      }),
      prisma.product.count({
        where: effectiveShopId ? { shopId: effectiveShopId } : {},
      }),
    ]);

    const report = {
      generatedAt: new Date().toISOString(),
      shopId: effectiveShopId || 'PLATFORM_WIDE',
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
