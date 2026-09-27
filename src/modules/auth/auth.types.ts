import { UserRole } from '@/types/global';

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  shopName?: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
