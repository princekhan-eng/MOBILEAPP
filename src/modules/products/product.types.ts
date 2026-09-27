import { ProductStatus } from '@/types/global';

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  brand: string;
  model: string;
  specs: Record<string, any>;
  categoryId: string;
  shopId: string;
  initialStock?: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  compareAtPrice?: number;
  images?: string[];
  brand?: string;
  model?: string;
  specs?: Record<string, any>;
  categoryId?: string;
  status?: ProductStatus;
}
