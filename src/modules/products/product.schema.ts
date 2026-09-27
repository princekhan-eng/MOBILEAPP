import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().min(5, 'Description is required'),
  price: z.number().positive('Price must be greater than 0'),
  compareAtPrice: z.number().positive().optional(),
  images: z.array(z.string()).default([]),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  specs: z.record(z.string(), z.any()).default({}),
  categoryId: z.string().uuid('Category ID is required'),
  shopId: z.string().uuid('Shop ID is required'),
  initialStock: z.number().int().min(0).default(0),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  price: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional(),
  images: z.array(z.string()).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  specs: z.record(z.string(), z.any()).optional(),
  categoryId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'OUT_OF_STOCK']).optional(),
});
