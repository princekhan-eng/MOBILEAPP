import { ShopStatus } from '@/types/global';

export interface CreateShopInput {
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  address: string;
  phone: string;
  email: string;
  ownerId: string;
  status?: ShopStatus;
}

export interface UpdateShopInput {
  name?: string;
  description?: string;
  logo?: string;
  banner?: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: ShopStatus;
}
