import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'SHOP_ADMIN', 'SHOP_EMPLOYEE', 'CUSTOMER']).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  shopId: z.string().nullable().optional(),
});
