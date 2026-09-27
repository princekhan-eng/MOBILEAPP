import { z } from 'zod';

export const createShopSchema = z.object({
  name: z.string().min(2, 'Shop name is required'),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Valid shop contact email is required'),
  ownerId: z.string().optional(), // Derived or assigned by platform admin
  ownerName: z.string().optional(),
  ownerEmail: z.string().email('Valid owner email is required').optional().or(z.literal('')),
  ownerPassword: z.string().min(6, 'Owner password must be at least 6 characters').optional().or(z.literal('')),
  status: z.enum(['PENDING', 'ACTIVE', 'SUSPENDED']).optional(),
});

export const updateShopSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'SUSPENDED']).optional(), // Only platform admins can modify
});

export type CreateShopSchemaInput = z.infer<typeof createShopSchema>;
export type UpdateShopSchemaInput = z.infer<typeof updateShopSchema>;
