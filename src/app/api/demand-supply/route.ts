import { NextRequest } from 'next/server';
import { trendService } from '@/modules/demand-supply/trend.service';
import { rankingService } from '@/modules/demand-supply/ranking.service';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode') || 'opportunities';

    if (mode === 'ranked') {
      const products = await rankingService.getSmartRankedProducts();
      return successResponse(products, 'Smart ranked products retrieved');
    }

    const opportunities = await trendService.getMarketOpportunities();
    return successResponse(opportunities, 'Demand supply market opportunities retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
