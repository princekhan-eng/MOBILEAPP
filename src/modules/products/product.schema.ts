import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  price: z.number().positive('Price must be greater than 0'),
  compareAtPrice: z.number().positive('Compare at price must be greater than 0').optional(),
  images: z.array(z.string()).default([]),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  specs: z.record(z.string(), z.any()).default({}),
  categoryId: z.string().min(1, 'Category ID is required'),
  initialStock: z.number().int('Initial stock must be an integer').min(0, 'Initial stock cannot be negative').default(0),
  shopId: z.string().optional(), // Injected from session for shop admin, or supplied by platform admin
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  price: z.number().positive('Price must be greater than 0').optional(),
  compareAtPrice: z.number().positive('Compare at price must be greater than 0').optional(),
  images: z.array(z.string()).optional(),
  brand: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  specs: z.record(z.string(), z.any()).optional(),
  categoryId: z.string().min(1).optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'OUT_OF_STOCK']).optional(),
});

export type CreateProductSchemaInput = z.infer<typeof createProductSchema>;
export type UpdateProductSchemaInput = z.infer<typeof updateProductSchema>;
