import { z } from 'zod';

export const createShopSchema = z.object({
  name: z.string().min(2, 'Shop name is required'),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
  ownerId: z.string().uuid('Owner ID is required'),
});

export const updateShopSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'SUSPENDED']).optional(),
});
