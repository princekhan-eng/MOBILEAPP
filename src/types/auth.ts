import { UserRole } from './global';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  shopId?: string | null;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    shopId?: string | null;
  };
}
