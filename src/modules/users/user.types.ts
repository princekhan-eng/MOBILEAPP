import { UserRole } from '@/types/global';

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
  phone?: string;
  avatar?: string;
  shopId?: string | null;
}
