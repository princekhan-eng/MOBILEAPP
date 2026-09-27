import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
});

export function formatZodError(error: any) {
  if (!error) return undefined;
  return error.issues || error.errors || error.message;
}
