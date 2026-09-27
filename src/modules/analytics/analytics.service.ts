import { analyticsRepository } from './analytics.repository';

export class AnalyticsService {
  async track(data: Parameters<typeof analyticsRepository.trackEvent>[0]) {
    return analyticsRepository.trackEvent(data);
  }

  async getPlatformMetrics() {
    return analyticsRepository.getPlatformSummary();
  }

  async getShopMetrics(shopId: string) {
    return analyticsRepository.getShopSummary(shopId);
  }
}

export const analyticsService = new AnalyticsService();
