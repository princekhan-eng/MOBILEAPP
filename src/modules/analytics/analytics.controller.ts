import { analyticsService } from './analytics.service';
import { trackEventSchema } from './analytics.schema';
import { successResponse, errorResponse } from '@/lib/response';

export class AnalyticsController {
  async track(body: any) {
    try {
      const parsed = trackEventSchema.parse(body);
      const result = await analyticsService.track(parsed);
      return successResponse(result, 'Event tracked successfully', 201);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async getPlatformMetrics() {
    try {
      const metrics = await analyticsService.getPlatformMetrics();
      return successResponse(metrics, 'Platform metrics retrieved');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async getShopMetrics(shopId: string) {
    try {
      const metrics = await analyticsService.getShopMetrics(shopId);
      return successResponse(metrics, 'Shop metrics retrieved');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }
}

export const analyticsController = new AnalyticsController();
