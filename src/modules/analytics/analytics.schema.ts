import { z } from 'zod';

export const trackEventSchema = z.object({
  type: z.enum(['PRODUCT_VIEW', 'PRODUCT_SEARCH', 'PRODUCT_CLICK', 'PRODUCT_SALE', 'STOCK_CHANGE']),
  productId: z.string().optional(),
  shopId: z.string().optional(),
  userId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});
